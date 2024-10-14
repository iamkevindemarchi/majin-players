import React from "react";

const InputFile = ({ value, name, onChange, error, children }) => {
    return (
        <div className="flex desktop:flex-row computer:flex-row phone:flex-col items-center gap-5">
            <label htmlFor="file-upload" className="cursor-pointer">
                <input
                    name={name}
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onChange}
                />
                {children}
            </label>
            {error && <span className={`text-red text-sm`}>{error}</span>}
        </div>
    );
};

export default InputFile;
