import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Api
import { PLAYERS_API } from "../api";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Roster = () => {
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoaderContext);
    const [players, setPlayers] = useState([]);
    const { activeSnackbar } = useContext(SnackbarContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isDarkMode = theme === "dark";

    setPageTitle("Roster");

    async function getPlayersHandler() {
        setIsLoading(true);

        try {
            const res = await PLAYERS_API.getAllWithoutFilters();

            if (res) setPlayers(res);
            else activeSnackbar("error", "Impossibile recuperare i giocatori");
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
            Roster
        </span>
    );

    function pageHandler(partialUrl) {
        navigate(`${pathname}/${partialUrl}`);
    }

    const playersComponent = (
        <div className="flex flex-row flex-wrap desktop:gap-10 phone:gap-5 justify-center">
            {players.map((player) => (
                <div
                    key={player.id}
                    className={`transition-all duration-200 desktop:w-[20%] phone:w-[45%] rounded-xl border-2 cursor-pointer hover:opacity-80 flex justify-center items-center ${
                        isDarkMode ? "border-white" : "border-black"
                    }`}
                >
                    <img
                        onClick={() => pageHandler(player.id)}
                        src={`https://vtzrbvwdrbdsmovbtapo.supabase.co/storage/v1/object/public/images/${player.img}`}
                        alt="Impossibile visualizzare l'immagine."
                        className="w-full h-full"
                    />
                    <div className="px-5 py-1 rounded-xl bg-backdrop absolute text-white font-montserrat-bold uppercase desktop:text-lg phone:text-sm desktop:mt-[50vh] phone:mt-[30vh]">
                        {player.name}
                    </div>
                </div>
            ))}
        </div>
    );

    useEffect(() => {
        getPlayersHandler();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[100vh] desktop:pt-40 phone:pt-40 desktop:px-[10%] phone:px-[5%] flex flex-col justify-center items-center desktop:gap-32 phone:gap-20">
            {title}
            {playersComponent}
        </div>
    );
};

export default Roster;
