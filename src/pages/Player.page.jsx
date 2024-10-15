import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Api
import { PLAYERS_API, TOP_API } from "../api";

// Assets
import { InstagramIcon } from "../assets/icons";

// Components
import { GoBackBtn, Top } from "../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Player = () => {
    const { playerId } = useParams();
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoaderContext);
    const [player, setPlayer] = useState([]);
    const [top, setTop] = useState([]);
    const { activeSnackbar } = useContext(SnackbarContext);

    const isDarkMode = theme === "dark";
    const playerFullName = `${player?.name} ${player?.surname}`;
    const hasTopData = top && top.length > 0;

    setPageTitle(playerFullName);

    async function getPlayerHandler() {
        try {
            const res = await PLAYERS_API.get(playerId);

            if (res) setPlayer(res);
            else activeSnackbar("error", "Impossibile recuperare il giocatore");
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    async function getTopHandler() {
        try {
            const res = await TOP_API.getAll(playerId);

            if (res) setTop(res);
            else activeSnackbar("error", "Impossibile recuperare le top");
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    const goBackBtn = (
        <div className="w-full justify-start">
            <GoBackBtn theme={theme} />
        </div>
    );

    const title = (
        <div className="flex flex-row items-center gap-20">
            <span
                className={`transition-all duration-200 desktop:text-[3em] phone:text-[1.8em] font-bold uppercase font-montserrat-bold ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                {playerFullName}
            </span>
        </div>
    );

    const Row = ({ label, value }) => (
        <div className="flex flex-row items-center">
            <span
                className={`text-2xl ${
                    isDarkMode ? "text-white" : "text-black"
                }`}
            >
                {label}: <span className="text-primary font-bold">{value}</span>
            </span>
        </div>
    );

    const box = (
        <div
            className={`rounded-xl w-full flex desktop:flex-row phone:flex-col desktop:gap-20 phone:gap-0 relative desktop:pb-0 phone:pb-20 ${
                isDarkMode ? "bg-backdrop" : "bg-backdrop-dark2"
            }`}
        >
            <img
                src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${player.img}`}
                alt="Impossibile visualizzare l'immagine."
                className="desktop:w-[20%] phone:w-[100%] object-contain"
            />
            <div className="flex flex-col gap-5 py-20 desktop:pr-10 desktop:max-w-[70%] phone:max-w-[100%] phone:pr-10 desktop:px-0 phone:px-10">
                <Row label="Classe" value={player?.birthYear} />
                <Row label="Mazzo preferito" value={player?.favouriteDeck} />
                <Row label="Carta preferita" value={player?.favouriteCard} />
                <span
                    className={`desktop:text-md phone:text-lg ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                >
                    {player?.description}
                </span>
            </div>
            <a href={player?.instagramLink} target="_blank" rel="noreferrer">
                <InstagramIcon
                    className={`transition-all duration-200 absolute bottom-10 right-10 text-[4em] cursor-pointer hover:text-primary ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                />
            </a>
        </div>
    );

    const topComponent = hasTopData && (
        <div className="w-full flex flex-col gap-5">
            <span className="font-montserrat-bold text-3xl uppercase text-primary">
                Top giocatore
            </span>
            <Top data={top} theme={theme} />
        </div>
    );

    useEffect(() => {
        setIsLoading(true);

        getPlayerHandler();
        getTopHandler();

        setIsLoading(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:pt-40 phone:pt-40 desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-10 phone:gap-5">
            {goBackBtn}
            {title}
            {box}
            {topComponent}
        </div>
    );
};

export default Player;
