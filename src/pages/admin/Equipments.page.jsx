import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Api
import { IMAGES_API, EQUIPMENT_API, TOP_API } from "../../api";

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
};

const Equipments = () => {
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
    });
    const newQueryParameters = new URLSearchParams();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const { activeSnackbar } = useContext(SnackbarContext);

    const isDarkMode = theme === "dark";
    const dataForPage = 5;

    setPageTitle("Equipaggiamento");

    async function getEquipmentsHandler(name = values.name) {
        setIsLoading(true);
        const res = await EQUIPMENT_API.getAll(from, dataForPage, name);
        if (res) setTableData(res);
        else
            activeSnackbar(
                "error",
                "Impossibile recuperare gli equipaggiamenti"
            );
        setIsLoading(false);
    }

    async function getTotalEquipmentsHandler(name = values.name) {
        setIsLoading(true);
        const res = await EQUIPMENT_API.getAllRecords(name);
        res || res === 0
            ? setTotalRecords(res)
            : activeSnackbar("error", "Impossibile recuperare il totale");
        setIsLoading(false);
    }

    const title = (
        <h1
            className={`transition-all duration-200 desktop:text-3xl phone:text-2xl text-center font-bold uppercase ${
                isDarkMode ? "text-white" : "text-black"
            }`}
        >
            Equipaggiamenti
        </h1>
    );

    function inputHandler(event) {
        setValues((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        });
    }

    function updateQueryParams() {
        newQueryParameters.set("name", values.name);
        newQueryParameters.set("page", page);
        newQueryParameters.set("from", from);
        setSearchParams(newQueryParameters);
    }

    function searchHandler() {
        setPage(0);
        setFrom(0);
        updateQueryParams();
        getEquipmentsHandler();
        getTotalEquipmentsHandler();
    }

    const filters = (
        <form className="flex desktop:flex-row gap-5 phone:flex-col phone:justify-center phone:items-center w-full">
            <Input
                placeholder="Nome"
                theme={theme}
                name="name"
                value={values.name}
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
                        getEquipmentsHandler("", "");
                        getTotalEquipmentsHandler("");
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
        { key: "actions", label: "" },
    ];

    function tableRowHandler(rowData) {
        navigate(`${pathname}/edit/${rowData.id}`);
    }

    function tableDeleteHandler(rowData) {
        setSelectedEquipment(rowData);
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

    async function deleteEquipmentHandler() {
        setIsDeleteModalOpen(false);
        setIsLoading(true);

        const res = await EQUIPMENT_API.delete(selectedEquipment.id);
        if (res) {
            const imageRes = await IMAGES_API.delete(selectedEquipment.img);
            if (imageRes) {
                const topRes = await TOP_API.deleteAll(selectedEquipment.id);

                if (topRes) {
                    activeSnackbar(
                        "success",
                        "Quipaggiamento eliminato con successo"
                    );
                    await getEquipmentsHandler();
                    await getTotalEquipmentsHandler();
                } else activeSnackbar("error", "Impossibile eliminare le top");
            } else activeSnackbar("error", "Impossibile eliminare l'immagine");
        } else
            activeSnackbar("error", "Impossibile eliminare l'equipaggiamento");

        setIsLoading(false);
    }

    const deleteModal = (
        <Modal
            title="Eliminazione equipaggiamento"
            isOpen={isDeleteModalOpen}
            onSubmit={deleteEquipmentHandler}
            onClose={() => setIsDeleteModalOpen(false)}
            theme={theme}
        >
            <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                Sicuro di voler eliminare il seguente equipaggiamento?{" "}
                <span className="text-primary font-bold">
                    {selectedEquipment?.name}
                </span>
            </span>
        </Modal>
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        getTotalEquipmentsHandler();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getEquipmentsHandler();
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        updateQueryParams();
        // eslint-disable-next-line
    }, [page, from, values.name]);

    return (
        <>
            <div
                className={`flex flex-col gap-10 desktop:pt-60 desktop:px-[20%] phone:pt-40 phone:px-[5%] transition-all duration-200 pb-32 min-h-[100vh] ${
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

export default Equipments;
