import React, { useContext, useEffect, useState } from "react";

// Api
import { EQUIPMENT_API, SPONSOR_API } from "../api";

// Contexts
import { ThemeContext } from "../providers";

// Utils
import { setPageTitle } from "../utils";

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const [img, setImg] = useState("");
    const [sponsors, setSponsors] = useState([]);

    setPageTitle("Home");

    const isDarkMode = theme === "dark";

    async function getEquipmentsHandler() {
        const res = await EQUIPMENT_API.getByName("Maglia");
        setImg(res.img);
    }

    async function getSponsorsHandler() {
        const res = await SPONSOR_API.getAllWithoutFilters();
        setSponsors(res);
    }

    const title = (
        <span
            className={`transition-all duration-200 desktop:text-[3em] phone:text-[2em] font-bold uppercase ${
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
        getEquipmentsHandler();
        getSponsorsHandler();
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
