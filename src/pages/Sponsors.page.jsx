import React, { useContext, useEffect, useState } from "react";

// Api
import { SPONSOR_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Sponsors = () => {
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoaderContext);
    const [sponsors, setSponsors] = useState([]);
    const { activeSnackbar } = useContext(SnackbarContext);

    setPageTitle("Sponsor");

    const isDarkMode = theme === "dark";
    const hasSponsorsData = sponsors && sponsors.length > 0;

    async function getSponsorsHandler() {
        setIsLoading(true);

        try {
            const res = await SPONSOR_API.getAllWithoutFilters();

            if (res) setSponsors(res);
            else
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
            Sponsor
        </span>
    );

    const description = (
        <span
            className={`transition-all duration-200 w-full text-xl text-center flex flex-wrap justify-center ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Vuoi collaborare con noi? Scrivi una mail a questo indirizzo:
            <a
                href={`mailto: ${process.env.REACT_APP_EMAIL}`}
                className="transition-all duration-200 font-montserrat-bold text-primary ml-1 hover:opacity-50"
            >
                {process.env.REACT_APP_EMAIL}
            </a>
        </span>
    );

    const sponsorsComponent = (
        <div className="flex desktop:flex-row phone:flex-col desktop:justify-around phone:justify-center phone:items-center phone:gap-20 w-full">
            {sponsors.map((sponsor) => (
                <div
                    key={sponsor.id}
                    className={`transition-all duration-200 rounded-full w-60 h-60 flex justify-center items-center p-10 ${
                        isDarkMode ? "bg-pink2-dark" : "bg-pink3-dark"
                    }`}
                >
                    <img
                        src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${sponsor?.img}`}
                        alt="Impossibile visualizzare l'immagine."
                        className="desktop:w-60 phone:w-40 object-contain"
                    />
                </div>
            ))}
        </div>
    );

    useEffect(() => {
        getSponsorsHandler();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:pt-60 phone:pt-40 desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-20 phone:gap-20">
            {title}
            {description}
            {hasSponsorsData && sponsorsComponent}
        </div>
    );
};

export default Sponsors;
