import React from "react";

// Assets
import { DeleteIcon } from "../assets/icons";

// Utils
import { getArrayByDifferentProperty } from "../utils";

const Top = ({ data, theme, onDelete }) => {
    const isDarkMode = theme === "dark";
    const years = getArrayByDifferentProperty(data, "year");
    const hasYearsData = years && years.length > 0;
    const hasData = data && data.length > 0;

    return (
        <div className="flex flex-col gap-5">
            {hasYearsData &&
                years.map((year) => (
                    <div key={year} className="flex flex-col gap-5">
                        <span
                            className={`transition-all duration-200 text-2xl font-montserrat-bold flex flex-col gap-2 desktop:text-left phone:text-center ${
                                isDarkMode ? "text-white" : "text-black"
                            }`}
                        >
                            {year}
                        </span>
                        <div className="flex flex-col gap-5">
                            {hasData &&
                                data.map((item) => {
                                    const isVisible = item.year === year;
                                    const itemPlacement = `${item.placement}° posto`;
                                    const itemDescription = ` - ${item.event} (${item.deck}) - ${item.place}`;

                                    return (
                                        isVisible && (
                                            <div
                                                key={item.id}
                                                className={`desktop:ml-20 phone:ml-0 px-10 py-5 rounded-xl flex flex-row justify-between items-center ${
                                                    isDarkMode
                                                        ? "bg-black"
                                                        : "bg-white"
                                                }`}
                                            >
                                                <div>
                                                    <span className="text-lg font-bold text-primary">
                                                        {itemPlacement}
                                                    </span>
                                                    <span
                                                        className={`transition-all duration-200 ${
                                                            isDarkMode
                                                                ? "text-white"
                                                                : "text-black"
                                                        }`}
                                                    >
                                                        {itemDescription}
                                                    </span>
                                                </div>
                                                {onDelete && (
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            onDelete(item)
                                                        }
                                                        className="transition-all duration-200 text-red text-lg cursor-pointer hover:opacity-50"
                                                    />
                                                )}
                                            </div>
                                        )
                                    );
                                })}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Top;
