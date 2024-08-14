import React from "react";
import docIcon from "../../../../assets/frontend/img/document.svg";
import deleteIcon from "../../../../assets/frontend/img/round-close.svg";

const FileItem = ({ fileName, fileSize, onDelete }) => {
    return (
        <div className="flex flex-wrap gap-5 justify-between px-3.5 pt-1 pb-3 mt-3.5 w-full bg-teal-600 rounded-sm max-md:max-w-full">
            <div className="flex gap-3 items-start">
                <img
                    src={docIcon}
                    alt=""
                    className="object-contain shrink-0 mt-2 aspect-square w-[22px]"
                />
                <div className="flex flex-col">
                    <div className="text-xs font-medium leading-loose text-white">
                        {fileName}
                    </div>
                    <div className="self-start mt-1.5 text-xs font-light leading-loose text-white text-opacity-50">
                        {fileSize}
                    </div>
                </div>
            </div>
            <img
                onClick={onDelete}
                src={deleteIcon}
                alt="Remove file"
                className="object-contain shrink-0 my-auto w-5 aspect-square"
            />
        </div>
    );
};

export default FileItem;
