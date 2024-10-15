import React, { useContext, useEffect, useState } from "react";

// Api
import { EQUIPMENT_API, SPONSOR_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const [img, setImg] = useState("");
    const [sponsors, setSponsors] = useState([]);
    const { setIsLoading } = useContext(LoaderContext);
    const { activeSnackbar } = useContext(SnackbarContext);

    setPageTitle("Home");

    const isDarkMode = theme === "dark";

    async function getEquipmentsHandler() {
        try {
            const res = await EQUIPMENT_API.getByName("Maglia");

            if (res) setImg(res.img);
            else
                activeSnackbar(
                    "error",
                    "Impossibile recuperare l'equipaggiamento"
                );
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    async function getSponsorsHandler() {
        try {
            const res = await SPONSOR_API.getAllWithoutFilters();

            if (res) setSponsors(res);
            else activeSnackbar("error", "Impossibile recuperare gli sponsor");
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    const title = (
        <span
            className={`transition-all duration-200 desktop:text-[3em] phone:text-[2em] font-bold uppercase font-montserrat-bold ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            {process.env.REACT_APP_WEBSITE_NAME}
        </span>
    );

    const imgComponent = (
        <img
            src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${img}`}
            alt="Impossibile visualizzare l'immagine."
            className="desktop:w-[30%] phone:w-[100%]"
        />
    );

    const sponsor = (
        <div className="flex desktop:flex-row phone:flex-col desktop:justify-around phone:justify-center items-center desktop:gap-0 phone:gap-10 overflow-hidden w-full">
            {sponsors.map((sponsor) => (
                <img
                    key={sponsor.id}
                    src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${sponsor.img}`}
                    alt="Impossibile visualizzare l'immagine."
                    className="desktop:w-48 phone:w-32 object-contain"
                />
            ))}
        </div>
    );

    useEffect(() => {
        setIsLoading(true);

        getEquipmentsHandler();
        getSponsorsHandler();

        setIsLoading(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:pt-40 phone:pt-40 desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-32 phone:gap-20">
            {title}
            {imgComponent}
            {sponsor}
        </div>
    );
};

export default Home;
