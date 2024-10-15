import React, { useContext, useEffect, useState } from "react";

// Api
import { EQUIPMENT_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Equipments = () => {
    const { setIsLoading } = useContext(LoaderContext);
    const { activeSnackbar } = useContext(SnackbarContext);
    const [tshirt, setTshirt] = useState(null);
    const [spellground, setSpellground] = useState(null);
    const [legWarmer, setLegWarmer] = useState(null);
    const [fieldCenter, setFieldCenter] = useState(null);
    const [playmat, setPlaymat] = useState(null);
    const { theme } = useContext(ThemeContext);

    setPageTitle("Equipaggiamento");

    const isDarkMode = theme === "dark";

    async function getEquipmentsHandler() {
        setIsLoading(true);

        try {
            const res = await EQUIPMENT_API.getAllWithoutFilters();

            if (res) {
                const tshirt = res.find((x) => x.name === "Maglia");
                const spellground = res.find((x) => x.name === "Spellground");
                const legWarmer = res.find((x) => x.name === "Scaldamuscolo");
                const fieldCenter = res.find((x) => x.name === "Field Center");
                const playmat = res.find((x) => x.name === "Playmat");

                setTshirt(tshirt);
                setSpellground(spellground);
                setLegWarmer(legWarmer);
                setFieldCenter(fieldCenter);
                setPlaymat(playmat);
            } else
                activeSnackbar(
                    "error",
                    "Impossibile recuperare l'equipaggiamento"
                );
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }

        setIsLoading(false);
    }

    const title = (
        <span
            className={`transition-all duration-200 desktop:text-[3em] phone:text-[2em] font-bold uppercase font-montserrat-bold ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Equipaggiamento
        </span>
    );

    useEffect(() => {
        getEquipmentsHandler();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:pt-40 phone:pt-40 desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-32 phone:gap-20">
            {title}
            <div className="flex flex-row desktop:gap-10 phone:gap-5 items-center">
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${tshirt?.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="w-[40vh] object-contain"
                />
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${legWarmer?.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="desktop:w-[30vh] phone:w-[25vh] object-contain"
                />
            </div>
            <div className="flex desktop:flex-row phone:flex-col gap-10 items-center">
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${spellground?.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="w-[60vh] object-contain"
                />
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${playmat?.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="w-[60vh] object-contain"
                />
                <img
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${fieldCenter?.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="w-[15vh] object-contain"
                />
            </div>
        </div>
    );
};

export default Equipments;
