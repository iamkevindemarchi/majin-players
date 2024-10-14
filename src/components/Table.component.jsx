import React, { useEffect, useState } from "react";

// Assets
import { DeleteIcon, LeftArrowIcon, RightArrowIcon } from "../assets/icons";

// Components
import IconButton from "./IconButton.component";

const Table = ({
    columns,
    data,
    theme,
    onRowClick,
    page,
    setPage,
    from,
    setFrom,
    totalRecords,
    dataForPage,
    onDelete,
}) => {
    const [isPreviousPageBtnDisabled, setIsPreviousPageBtnDisabled] =
        useState(false);
    const [isNextPageBtnDisabled, setIsNextPageBtnDisabled] = useState(false);

    const isDarkMode = theme === "dark";
    const totalPages = totalRecords / dataForPage;
    const canGoPrevious = page > 0;
    const canGoNext = page <= parseInt(totalPages - 1);
    const hasData = data && data.length > 0;

    function previousPageHandler() {
        setPage(page - 1);
        setFrom(from - 5);
    }

    function nextPageHandler() {
        setPage(page + 1);
        setFrom(from + 5);
    }

    const arrowBtnDisabledClassName = isDarkMode
        ? "bg-pink2-dark cursor-not-allowed text-pink3-dark"
        : "bg-pink2 cursor-not-allowed text-pink3";

    const ArrowBtn = ({ disabled, onClick, children }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-lg transition-all duration-200 ${
                !disabled &&
                (isDarkMode
                    ? "bg-pink3-dark cursor-pointer hover:opacity-50 text-primary"
                    : "bg-pink3 cursor-pointer hover:opacity-50 text-primary")
            } ${disabled && arrowBtnDisabledClassName}`}
        >
            {children}
        </button>
    );

    const footer = (
        <>
            {!hasData && (
                <div
                    className={`transition-all duration-200 w-full flex justify-center text-center p-5 ${
                        isDarkMode ? "bg-black" : "bg-white"
                    }`}
                >
                    <span
                        className={`transition-all duration-200 text-base ${
                            isDarkMode ? "text-white" : "text-black"
                        }`}
                    >
                        Nessun risultato...
                    </span>
                </div>
            )}
            <div
                className={`transition-all duration-200 desktop:px-10 desktop:py-3 desktop:z-0 desktop:relative desktop:w-full computer:px-10 computer:py-3 computer:z-0 computer:relative computer:w-full phone:px-5 phone:py-2 rounded-b-lg flex justify-between phone:absolute phone:z-10 phone:w-[90%] ${
                    isDarkMode ? "bg-pink-dark" : "bg-pink"
                }`}
            >
                <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
                    Tot: {totalRecords}
                </span>
                <div className="flex flex-row gap-5">
                    <ArrowBtn
                        disabled={isPreviousPageBtnDisabled}
                        onClick={previousPageHandler}
                    >
                        <LeftArrowIcon className="transition-all duration-200 text-2xl" />
                    </ArrowBtn>
                    <ArrowBtn
                        disabled={isNextPageBtnDisabled}
                        onClick={nextPageHandler}
                    >
                        <RightArrowIcon className="transition-all duration-200 text-2xl" />
                    </ArrowBtn>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        setIsPreviousPageBtnDisabled(!canGoPrevious);
        setIsNextPageBtnDisabled(!canGoNext || totalRecords <= dataForPage);
    }, [canGoPrevious, canGoNext, totalRecords, dataForPage]);

    return (
        <div className="desktop:overflow-hidden computer:overflow-hidden phone:overflow-x-scroll">
            <table className="w-full rounded-t-lg border-none border-collapse border-spacing-0">
                <thead
                    className={`transition-all duration-200 ${
                        isDarkMode ? "bg-pink-dark" : "bg-pink"
                    }`}
                >
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`text-left desktop:px-10 desktop:py-3 computer:px-10 computer:py-3 phone:px-5 phone:py-2 ${
                                    column.key === "actions" ? "w-10" : "w-auto"
                                }`}
                            >
                                <span className="text-base text-primary">
                                    {column.label}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                {hasData && (
                    <tbody>
                        {data?.map((item, index) => {
                            return (
                                <tr
                                    key={index}
                                    onClick={() => onRowClick(item)}
                                    className={`transition-all duration-200 cursor-pointer ${
                                        isDarkMode
                                            ? "bg-black hover:bg-pink3-dark"
                                            : "bg-white hover:bg-pink3"
                                    }`}
                                >
                                    {columns.map((column, index2) => {
                                        const value = item[column.key];
                                        const isActionCell =
                                            column.key === "actions";
                                        const isTextEmail =
                                            column.key === "email";

                                        return (
                                            <td
                                                key={index2}
                                                className="desktop:px-10 desktop:py-3 computer:px-10 computer:py-3 phone:px-5 phone:py-2"
                                            >
                                                {isActionCell ? (
                                                    <IconButton
                                                        theme={theme}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            onDelete(item);
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            className={`transition-all duration-200 text-lg ${
                                                                isDarkMode
                                                                    ? "text-white"
                                                                    : "text-black"
                                                            }`}
                                                        />
                                                    </IconButton>
                                                ) : (
                                                    <span
                                                        className={`transition-all duration-200 text-base ${
                                                            isDarkMode
                                                                ? "text-white"
                                                                : "text-black"
                                                        } ${
                                                            isTextEmail &&
                                                            "text-primary"
                                                        }`}
                                                    >
                                                        {value}
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
            {footer}
        </div>
    );
};

export default Table;
