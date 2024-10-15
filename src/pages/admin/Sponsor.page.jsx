import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Api
import { SPONSOR_API, IMAGES_API } from "../../api";

// Assets
import { CancelIcon, EditIcon, SaveIcon, UserIcon } from "../../assets/icons";

// Components
import {
    Button,
    GoBackBtn,
    GoBtn,
    IconButton,
    Input,
    InputFile,
} from "../../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../../providers";

// Utils
import { checkRequiredField, setPageTitle } from "../../utils";

const initialState = {
    name: "",
    img: null,
    instagramLink: "",
};

const errorsInitialState = {
    name: {
        value: false,
        message: "",
    },
    img: {
        value: false,
        message: "",
    },
    instagramLink: {
        value: false,
        message: "",
    },
};

const Sponsor = () => {
    const { theme } = useContext(ThemeContext);
    const [formDataValues, setFormDataValues] = useState(initialState);
    const { activeSnackbar } = useContext(SnackbarContext);
    const { setIsLoading } = useContext(LoaderContext);
    const [errors, setErrors] = useState(errorsInitialState);
    const navigate = useNavigate();
    const { sponsorId } = useParams();
    const [image, setImage] = useState(false);

    const isEditMode = sponsorId ? true : false;
    const pageTitle = isEditMode ? "Modifica sponsor" : "Nuovo sponsor";
    const isDarkMode = theme === "dark";

    setPageTitle(pageTitle);

    async function getSponsorHandler() {
        setIsLoading(true);

        const res = await SPONSOR_API.get(sponsorId);
        setFormDataValues(res);
        setImage(res.img);

        setIsLoading(false);
    }

    function goBackToSponsorsHandler() {
        navigate(`/admin/sponsor`);
    }

    const goBackBtn = isEditMode ? (
        <GoBtn theme={theme} page="/admin/sponsor" label="Torna indietro" />
    ) : (
        <GoBackBtn theme={theme} />
    );

    const title = (
        <h1
            className={`transition-all duration-200 desktop:text-3xl computer:text-3xl phone:text-2xl text-center font-bold uppercase ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            {pageTitle}
        </h1>
    );

    function inputHandler(event, type) {
        const isFile = type === "file";
        const value = isFile ? event.target.files[0] : event.target.value;

        setFormDataValues((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value,
            };
        });
        setErrors((prevState) => ({
            ...prevState,
            [event.target.name]: { value: false, message: "" },
        }));
    }

    const avatar = (
        <div className="flex justify-center items-center gap-5">
            {formDataValues.img && (
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${formDataValues.img}`}
                    id="image"
                    alt="Impossibile visualizzare l'immagine."
                    className="w-32 object-contain rounded-lg"
                />
            )}
            <span
                className={`transition-all duration-200 text-lg ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                Foto
            </span>
            <InputFile
                name="img"
                value={formDataValues.img}
                onChange={(event) => inputHandler(event, "file")}
                theme={theme}
                error={errors.img.message}
            >
                <IconButton
                    theme={theme}
                    className={`text-3xl p-5 ${
                        isDarkMode
                            ? "bg-pink-dark text-white placeholder:text-pink3-dark"
                            : "bg-pink text-black placeholder:text-pink3"
                    }`}
                >
                    {formDataValues?.img ? (
                        <EditIcon className="text-darkgray2" />
                    ) : (
                        <UserIcon className="text-darkgray2" />
                    )}
                </IconButton>
            </InputFile>
        </div>
    );

    function validateForm() {
        const isNameValid = checkRequiredField(formDataValues.name);
        const isImgValid = checkRequiredField(formDataValues.img);
        const isInstagramLinkValid = checkRequiredField(
            formDataValues.instagramLink
        );

        setErrors((prevState) => ({
            ...prevState,
            name: {
                value: isNameValid,
                message: isNameValid ? "" : "Campo obbligatorio*",
            },
            img: {
                value: isImgValid,
                message: isImgValid ? "" : "Campo obbligatorio*",
            },
            instagramLink: {
                value: isInstagramLinkValid,
                message: isInstagramLinkValid ? "" : "Campo obbligatorio*",
            },
        }));

        if (!isNameValid || !isImgValid || !isInstagramLinkValid) return false;
        else return true;
    }

    async function createHandler() {
        setIsLoading(true);
        const isFormValid = validateForm();

        if (isFormValid) {
            const file = formDataValues.img;
            const fileName = Date.now();
            const data = {
                name: formDataValues.name,
                img: fileName,
                instagramLink: formDataValues.instagramLink,
            };

            const res = await SPONSOR_API.create(data);

            if (res) {
                const imageRes = await IMAGES_API.add(file, fileName);
                if (imageRes) {
                    activeSnackbar("success", "Sponsor creato con successo");
                    navigate(`/admin/sponsor/edit/${res.id}`);
                } else
                    activeSnackbar(
                        "error",
                        "Impossibile aggiungere l'immagine"
                    );
            } else activeSnackbar("error", "Impossibile creare lo sponsor");
        } else activeSnackbar("error", "Dati inseriti non validi");

        setIsLoading(false);
    }

    async function editHandler() {
        setIsLoading(true);
        const isFormValid = validateForm();

        if (isFormValid) {
            const file = formDataValues.img;
            const isImageChanged = typeof file === "object";
            const fileName = Date.now();
            const data = {
                name: formDataValues.name,
                img: isImageChanged ? fileName : formDataValues.img,
                instagramLink: formDataValues.instagramLink,
            };

            const res = await SPONSOR_API.update(data, sponsorId);
            if (res) {
                if (isImageChanged) {
                    const imageRes = await IMAGES_API.delete(image);

                    if (imageRes) {
                        const imageRes2 = await IMAGES_API.add(file, fileName);

                        if (imageRes2) {
                            activeSnackbar(
                                "success",
                                "Sponsor aggiornato con successo"
                            );
                        } else
                            activeSnackbar(
                                "error",
                                "Impossibile aggiornare l'immagine"
                            );
                    } else
                        activeSnackbar(
                            "error",
                            "Impossibile aggiornare l'immagine"
                        );
                } else
                    activeSnackbar(
                        "success",
                        "Sponsor aggiornato con successo"
                    );
            } else activeSnackbar("error", "Impossibile aggiornare lo sponsor");
        } else activeSnackbar("error", "Dati inseriti non validi");

        setIsLoading(false);
    }

    const form = (
        <form className="flex flex-col gap-5 w-full justify-center desktop:px-60 computer:px-60">
            <Input
                name="name"
                placeholder="Nome"
                value={formDataValues.name}
                onChange={inputHandler}
                theme={theme}
                autofocus={!isEditMode}
                error={errors.name.message}
            />
            <Input
                name="instagramLink"
                placeholder="Link Instagram"
                value={formDataValues.instagramLink}
                onChange={inputHandler}
                theme={theme}
                className="w-full"
            />
            <div className="flex flex-row justify-center gap-5">
                <Button
                    type="submit"
                    onClick={(event) =>
                        isEditMode ? editHandler(event) : createHandler(event)
                    }
                >
                    <SaveIcon />
                    Salva
                </Button>
                <Button variant="cancel" onClick={goBackToSponsorsHandler}>
                    <CancelIcon />
                    Anulla
                </Button>
            </div>
        </form>
    );

    useEffect(() => {
        sponsorId && getSponsorHandler();
        // eslint-disable-next-line
    }, [sponsorId]);

    useEffect(() => {
        if (formDataValues?.img && typeof formDataValues?.img === "object") {
            const image = document.getElementById("image");
            image.src = URL.createObjectURL(formDataValues.img);
        }
    }, [formDataValues?.img]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className={`flex flex-col desktop:gap-10 computer:gap-10 phone:gap-5 desktop:pt-40 desktop:px-[19%] computer:px-[17%] phone:pt-40 phone:px-[5%] transition-all duration-200 pb-32 min-h-[100vh] ${
                isDarkMode ? "bg-pink2-dark" : "bg-pink2"
            }`}
        >
            {goBackBtn}
            {title}
            {avatar}
            {form}
        </div>
    );
};

export default Sponsor;
