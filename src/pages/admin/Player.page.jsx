import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Api
import { PLAYERS_API, IMAGES_API, TOP_API } from "../../api";

// Assets
import {
    AddIcon,
    CancelIcon,
    DeleteIcon,
    EditIcon,
    SaveIcon,
    UserIcon,
} from "../../assets/icons";

// Components
import {
    Button,
    GoBackBtn,
    GoBtn,
    IconButton,
    Input,
    InputFile,
    Modal,
    TextArea,
} from "../../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../../providers";

// Utils
import {
    checkRequiredField,
    setPageTitle,
    checkEmail,
    checkYear,
    checkTopYear,
} from "../../utils";

const initialState = {
    name: "",
    surname: "",
    img: null,
    email: "",
    birthYear: "",
    favouriteCard: "",
    favouriteDeck: "",
    instagramLink: "",
    description: "",
    topYear: "",
    topPlacement: "",
    topEvent: "",
    topDeck: "",
    topPlace: "",
};

const errorsInitialState = {
    name: {
        value: false,
        message: "",
    },
    surname: {
        value: false,
        message: "",
    },
    email: {
        value: false,
        message: "",
    },
    img: {
        value: false,
        message: "",
    },
    birthYear: {
        value: false,
        message: "",
    },
    topYear: {
        value: false,
        message: "",
    },
    topPlacement: {
        value: false,
        message: "",
    },
    topEvent: {
        value: false,
        message: "",
    },
    topPlace: {
        value: false,
        message: "",
    },
    topDeck: {
        value: false,
        message: "",
    },
};

const Player = () => {
    const { theme } = useContext(ThemeContext);
    const [formDataValues, setFormDataValues] = useState(initialState);
    const { activeSnackbar } = useContext(SnackbarContext);
    const { setIsLoading } = useContext(LoaderContext);
    const [errors, setErrors] = useState(errorsInitialState);
    const [top, setTop] = useState([]);
    const navigate = useNavigate();
    const { playerId } = useParams();
    const [selectedTop, setSelectedTop] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [image, setImage] = useState(false);

    const isEditMode = playerId ? true : false;
    const pageTitle = isEditMode ? "Modifica giocatore" : "Nuovo giocatore";
    const isDarkMode = theme === "dark";

    setPageTitle(pageTitle);

    async function getPlayerHandler() {
        setIsLoading(true);

        const res = await PLAYERS_API.get(playerId);
        setFormDataValues(res);
        setImage(res.img);

        setIsLoading(false);
    }

    async function getTopHandler() {
        setIsLoading(true);

        const res = await TOP_API.getAll(playerId);
        setTop(res);

        setIsLoading(false);
    }

    function goBackToRosterHandler() {
        navigate(`/admin/roster`);
    }

    const goBackBtn = isEditMode ? (
        <GoBtn theme={theme} page="/admin/roster" label="Torna indietro" />
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
                Foto profilo
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
        const isSurnameValid = checkRequiredField(formDataValues.surname);
        const isEmailValid = checkEmail(formDataValues.email);
        const isImgValid = checkRequiredField(formDataValues.img);
        const isYearValid = formDataValues.birthYear
            ? checkYear(formDataValues.birthYear)
            : true;

        setErrors((prevState) => ({
            ...prevState,
            name: {
                value: isNameValid,
                message: isNameValid ? "" : "Campo obbligatorio*",
            },
            surname: {
                value: isSurnameValid,
                message: isSurnameValid ? "" : "Campo obbligatorio*",
            },
            email: {
                value: isEmailValid.value,
                message: isEmailValid.value ? "" : isEmailValid.message,
            },
            img: {
                value: isImgValid,
                message: isImgValid ? "" : "Campo obbligatorio*",
            },
            birthYear: {
                value: isYearValid,
                message: isYearValid ? "" : "Anno non valido",
            },
        }));

        if (
            !isNameValid ||
            !isSurnameValid ||
            !isEmailValid.value ||
            !isImgValid ||
            !isYearValid
        )
            return false;
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
                surname: formDataValues.surname,
                email: formDataValues.email,
                img: fileName,
                birthYear: formDataValues.birthYear,
                favouriteCard: formDataValues.favouriteCard,
                favouriteDeck: formDataValues.favouriteDeck,
                instagramLink: formDataValues.instagramLink,
                description: formDataValues.description,
            };

            const res = await PLAYERS_API.create(data);

            if (res) {
                const imageRes = await IMAGES_API.add(file, fileName);
                if (imageRes) {
                    activeSnackbar("success", "Giocatore creato con successo");
                    navigate(`/admin/roster/edit/${res.id}`);
                } else
                    activeSnackbar(
                        "error",
                        "Impossibile aggiungere l'immagine"
                    );
            } else activeSnackbar("error", "Impossibile creare il giocatore");
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
                surname: formDataValues.surname,
                email: formDataValues.email,
                img: isImageChanged ? fileName : formDataValues.img,
                birthYear: formDataValues.birthYear,
                favouriteCard: formDataValues.favouriteCard,
                favouriteDeck: formDataValues.favouriteDeck,
                instagramLink: formDataValues.instagramLink,
                description: formDataValues.description,
            };

            const res = await PLAYERS_API.update(data, playerId);
            if (res) {
                if (isImageChanged) {
                    const imageRes = await IMAGES_API.delete(image);

                    if (imageRes) {
                        const imageRes2 = await IMAGES_API.add(file, fileName);

                        if (imageRes2) {
                            activeSnackbar(
                                "success",
                                "Giocatore aggiornato con successo"
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
                        "Giocatore aggiornato con successo"
                    );
            } else
                activeSnackbar("error", "Impossibile aggiornare il giocatore");
        } else activeSnackbar("error", "Dati inseriti non validi");

        setIsLoading(false);
    }

    const form = (
        <form className="flex flex-col gap-5 w-full justify-center desktop:px-60 computer:px-60">
            <div className="flex justify-between desktop:flex-row computer:flex-row phone:flex-col phone:gap-5">
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
                    name="surname"
                    placeholder="Cognome"
                    value={formDataValues.surname}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.surname.message}
                />
                <Input
                    name="email"
                    placeholder="E-mail"
                    value={formDataValues.email}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.email.message}
                />
            </div>
            <div className="flex justify-between desktop:flex-row computer:flex-row phone:flex-col phone:gap-5">
                <Input
                    type="number"
                    name="birthYear"
                    placeholder="Anno di nascita"
                    value={formDataValues.birthYear}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.birthYear.message}
                />
                <Input
                    name="favouriteCard"
                    placeholder="Carta preferita"
                    value={formDataValues.favouriteCard}
                    onChange={inputHandler}
                    theme={theme}
                />
                <Input
                    name="favouriteDeck"
                    placeholder="Mazzo preferito"
                    value={formDataValues.favouriteDeck}
                    onChange={inputHandler}
                    theme={theme}
                />
            </div>
            <Input
                name="instagramLink"
                placeholder="Link Instagram"
                value={formDataValues.instagramLink}
                onChange={inputHandler}
                theme={theme}
                className="w-full"
            />
            <TextArea
                name="description"
                placeholder="Descrizione"
                value={formDataValues.description}
                onChange={inputHandler}
                theme={theme}
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
                <Button variant="cancel" onClick={goBackToRosterHandler}>
                    <CancelIcon />
                    Anulla
                </Button>
            </div>
        </form>
    );

    function validateTopForm() {
        const isYearValid = checkTopYear(formDataValues.topYear);
        const isTopPlacementValid = checkRequiredField(
            formDataValues.topPlacement
        );
        const isTopEventValid = checkRequiredField(formDataValues.topEvent);
        const isTopDeckValid = checkRequiredField(formDataValues.topDeck);
        const isTopPlaceValid = checkRequiredField(formDataValues.topPlace);

        setErrors((prevState) => ({
            ...prevState,
            topYear: {
                value: isYearValid.value,
                message: isYearValid.value ? "" : isYearValid.message,
            },
            topPlacement: {
                value: isTopPlacementValid,
                message: isTopPlacementValid ? "" : "Campo obbligatorio*",
            },
            topEvent: {
                value: isTopEventValid,
                message: isTopEventValid ? "" : "Campo obbligatorio*",
            },
            topDeck: {
                value: isTopDeckValid,
                message: isTopDeckValid ? "" : "Campo obbligatorio*",
            },
            topPlace: {
                value: isTopPlaceValid,
                message: isTopPlaceValid ? "" : "Campo obbligatorio*",
            },
        }));

        if (
            !isYearValid.value ||
            !isTopPlacementValid ||
            !isTopEventValid ||
            !isTopPlaceValid ||
            !isTopDeckValid
        )
            return false;
        else return true;
    }

    async function topSubmitHandler() {
        setIsLoading(true);
        const isFormValid = validateTopForm();

        if (isFormValid) {
            const data = {
                playerId,
                year: formDataValues.topYear,
                placement: formDataValues.topPlacement,
                event: formDataValues.topEvent,
                place: formDataValues.topPlace,
                deck: formDataValues.topDeck,
            };

            const res = await TOP_API.create(data);

            if (res) {
                activeSnackbar("success", "Top aggiunta con successo");
                setFormDataValues((prevState) => ({
                    ...prevState,
                    topYear: "",
                    topPlacement: "",
                    topEvent: "",
                    topPlace: "",
                    topDeck: "",
                }));
                await getTopHandler();
            } else activeSnackbar("success", "Impossibile aggiungere la top");
        } else activeSnackbar("error", "Dati inseriti non validi");

        setIsLoading(false);
    }

    function topDeleteHandler(rowData) {
        setSelectedTop(rowData);
    }

    const topForm = isEditMode && (
        <form className="flex flex-col gap-5 justify-center items-center">
            <span className="uppercase font-bold text-2xl text-primary">
                Top
            </span>
            <div className="w-full flex desktop:flex-row computer:flex-row phone:flex-col desktop:gap-5 computer:gap-5 phone:gap-5 justify-between">
                <Input
                    type="number"
                    name="topYear"
                    placeholder="Anno"
                    value={formDataValues.topYear}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.topYear.message}
                />
                <Input
                    name="topPlacement"
                    placeholder="Piazzamento"
                    value={formDataValues.topPlacement}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.topPlacement.message}
                />
                <Input
                    name="topEvent"
                    placeholder="Evento"
                    value={formDataValues.topEvent}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.topEvent.message}
                />
                <Input
                    name="topDeck"
                    placeholder="Mazzo"
                    value={formDataValues.topDeck}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.topDeck.message}
                />
                <Input
                    name="topPlace"
                    placeholder="Luogo"
                    value={formDataValues.topPlace}
                    onChange={inputHandler}
                    theme={theme}
                    error={errors.topPlace.message}
                />
            </div>
            <Button onClick={topSubmitHandler} type="submit">
                <AddIcon />
                Aggiungi
            </Button>
            {isEditMode &&
                top &&
                top.map((top) => (
                    <div
                        key={top.id}
                        className={`flex flex-col justify-center items-center p-5 gap-3 rounded-lg w-full ${
                            isDarkMode
                                ? "bg-pink-dark text-white"
                                : "bg-pink text-black"
                        }`}
                    >
                        <div
                            className={`flex flex-row gap-5 items-center flex-wrap`}
                        >
                            <span className="text-md">
                                {top.placement}° posto
                            </span>
                            <span className="text-md">{top.event}</span>
                            <span className="text-md">{top.place}</span>
                            <span className="text-md">{top.deck}</span>
                        </div>
                        <DeleteIcon
                            onClick={() => {
                                topDeleteHandler(top);
                                setIsDeleteModalOpen(true);
                            }}
                            className="transition-all duration-200 desktop:text-xl computer:text-xl phone:text-2xl cursor-pointer text-red hover:opacity-50"
                        />
                    </div>
                ))}
        </form>
    );

    async function deleteTopHandler() {
        setIsDeleteModalOpen(false);
        setIsLoading(true);

        const res = await TOP_API.delete(selectedTop.id);
        if (res) {
            activeSnackbar("success", "Top eliminata con successo");
            await getTopHandler();
        } else activeSnackbar("error", "Impossibile eliminare la top");

        setIsLoading(false);
    }

    const deleteModal = (
        <Modal
            title="Eliminazione top"
            isOpen={isDeleteModalOpen}
            onSubmit={deleteTopHandler}
            onClose={() => setIsDeleteModalOpen(false)}
            theme={theme}
        >
            <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                Sicuro di voler eliminare la top del seguente evento?{" "}
                <span className="text-primary font-bold">
                    {selectedTop?.event}
                </span>
            </span>
        </Modal>
    );

    useEffect(() => {
        if (playerId) {
            getPlayerHandler();
            getTopHandler();
        }
        // eslint-disable-next-line
    }, [playerId]);

    useEffect(() => {
        if (formDataValues?.img && typeof formDataValues?.img === "object") {
            const image = document.getElementById("image");
            image.src = URL.createObjectURL(formDataValues.img);
        }
    }, [formDataValues?.img]);

    return (
        <>
            <div
                className={`flex flex-col desktop:gap-10 computer:gap-10 phone:gap-5 desktop:pt-40 desktop:px-[19%] computer:px-[17%] phone:pt-40 phone:px-[5%] transition-all duration-200 pb-32 min-h-[100vh] ${
                    isDarkMode ? "bg-pink2-dark" : "bg-pink2"
                }`}
            >
                {goBackBtn}
                {title}
                {avatar}
                {form}
                {topForm}
            </div>
            {deleteModal}
        </>
    );
};

export default Player;
