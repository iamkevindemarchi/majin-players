import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Api
import { IMAGES_API, PLAYERS_API, TOP_API } from "../../api";

// Assets
import { AddIcon, CancelIcon, SearchIcon } from "../../assets/icons";

// Components
import { Button, IconButton, Input, Modal, Table } from "../../components";

// Contexts
import { LoaderContext, SnackbarContext, ThemeContext } from "../../providers";

// Utils
import { setPageTitle } from "../../utils";

const initialState = {
    name: "",
    surname: "",
};

const Roster = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tableData, setTableData] = useState([]);
    const { setIsLoading } = useContext(LoaderContext);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 0);
    const [from, setFrom] = useState(parseInt(searchParams.get("from")) || 0);
    const [values, setValues] = useState({
        name: searchParams.get("name") || "",
        surname: searchParams.get("surname") || "",
    });
    const newQueryParameters = new URLSearchParams();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const { activeSnackbar } = useContext(SnackbarContext);

    const isDarkMode = theme === "dark";
    const dataForPage = 5;

    setPageTitle("Roster");

    async function getPlayersHandler(
        name = values.name,
        surname = values.surname
    ) {
        setIsLoading(true);
        const res = await PLAYERS_API.getAll(from, dataForPage, name, surname);
        res
            ? setTableData(res)
            : activeSnackbar("error", "Impossibile recuperare i giocatori");
        setIsLoading(false);
    }

    async function getTotalPlayersHandler(
        name = values.name,
        surname = values.surname
    ) {
        setIsLoading(true);
        const res = await PLAYERS_API.getAllRecords(name, surname);
        res || res === 0
            ? setTotalRecords(res)
            : activeSnackbar("error", "Impossibile recuperare il totale");
        setIsLoading(false);
    }

    const title = (
        <h1
            className={`transition-all duration-200 desktop:text-3xl computer:text-3xl phone:text-2xl text-center font-bold uppercase ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Roster giocatori
        </h1>
    );

    function inputHandler(event) {
        setValues((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }

    function updateQueryParams() {
        newQueryParameters.set("name", values.name);
        newQueryParameters.set("surname", values.surname);
        newQueryParameters.set("page", page);
        newQueryParameters.set("from", from);
        setSearchParams(newQueryParameters);
    }

    function searchHandler() {
        setPage(0);
        setFrom(0);
        updateQueryParams();
        getPlayersHandler();
        getTotalPlayersHandler();
    }

    const filters = (
        <form className="flex desktop:flex-row computer:flex-row gap-5 phone:flex-col phone:justify-center phone:items-center w-full">
            <Input
                placeholder="Nome"
                theme={theme}
                name="name"
                value={values.name}
                onChange={inputHandler}
            />
            <Input
                placeholder="Cognome"
                theme={theme}
                name="surname"
                value={values.surname}
                onChange={inputHandler}
            />
            <div className="flex flex-row gap-5">
                <Button onClick={searchHandler}>
                    <SearchIcon />
                    <span>Cerca</span>
                </Button>
                <Button
                    type="submit"
                    variant="cancel"
                    onClick={() => {
                        setValues(initialState);
                        getPlayersHandler("", "");
                        getTotalPlayersHandler("", "");
                    }}
                    theme={theme}
                >
                    <CancelIcon />
                    <span>Reset</span>
                </Button>
            </div>
        </form>
    );

    const tableColumns = [
        { key: "name", label: "Nome" },
        { key: "surname", label: "Cognome" },
        { key: "email", label: "E-mail" },
        { key: "birthYear", label: "Anno di nascita" },
        { key: "actions", label: "" },
    ];

    function tableRowHandler(rowData) {
        navigate(`${pathname}/edit/${rowData.id}`);
    }

    function tableDeleteHandler(rowData) {
        setSelectedPlayer(rowData);
        setIsDeleteModalOpen(true);
    }

    const table = (
        <Table
            columns={tableColumns}
            data={tableData}
            theme={theme}
            onRowClick={tableRowHandler}
            dataForPage={dataForPage}
            page={page}
            setPage={setPage}
            from={from}
            setFrom={setFrom}
            totalRecords={totalRecords}
            onDelete={tableDeleteHandler}
        />
    );

    function pageHandler(partialUrl) {
        navigate(`${pathname}/${partialUrl}`);
    }

    const addBtn = (
        <IconButton
            onClick={() => pageHandler("new")}
            variant="add"
            theme={theme}
        >
            <AddIcon />
        </IconButton>
    );

    async function deletePlayerHandler() {
        setIsDeleteModalOpen(false);
        setIsLoading(true);

        const res = await PLAYERS_API.delete(selectedPlayer.id);
        if (res) {
            const imageRes = await IMAGES_API.delete(selectedPlayer.img);
            if (imageRes) {
                const topRes = await TOP_API.deleteAll(selectedPlayer.id);

                if (topRes) {
                    activeSnackbar(
                        "success",
                        "Giocatore eliminato con successo"
                    );
                    await getPlayersHandler();
                    await getTotalPlayersHandler();
                } else activeSnackbar("error", "Impossibile eliminare le top");
            } else activeSnackbar("error", "Impossibile eliminare l'immagine");
        } else activeSnackbar("error", "Impossibile eliminare il giocatore");

        setIsLoading(false);
    }

    const selectedPlayerFullName = `${selectedPlayer?.name} ${selectedPlayer?.surname}`;
    const deleteModal = (
        <Modal
            title="Eliminazione giocatore"
            isOpen={isDeleteModalOpen}
            onSubmit={deletePlayerHandler}
            onClose={() => setIsDeleteModalOpen(false)}
            theme={theme}
        >
            <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                Sicuro di voler eliminare il seguente giocatore?{" "}
                <span className="text-primary font-bold">
                    {selectedPlayerFullName}
                </span>
            </span>
        </Modal>
    );

    useEffect(() => {
        getTotalPlayersHandler();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getPlayersHandler();
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        updateQueryParams();
        // eslint-disable-next-line
    }, [page, from, values.name, values.surname]);

    return (
        <>
            <div
                className={`flex flex-col gap-10 desktop:pt-60 desktop:px-[20%] computer:pt-60 computer:px-[20%] phone:pt-40 phone:px-[5%] transition-all duration-200 pb-32 min-h-[100vh] ${
                    isDarkMode ? "bg-pink2-dark" : "bg-pink2"
                }`}
            >
                {title}
                {filters}
                {table}
                {addBtn}
            </div>
            {deleteModal}
        </>
    );
};

export default Roster;
