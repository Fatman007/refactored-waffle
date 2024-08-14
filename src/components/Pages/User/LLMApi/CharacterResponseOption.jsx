import React, { useEffect, useRef, useState } from "react";
import infoIcon from "../../../../assets/frontend/img/info.svg";
import Tooltip from "../../../Components/Tooltip";

const CharacterResponseOption = ({
    label,
    isSelected,
    toolTipText,
    onChange
}) => {
    return (
        <div
            onClick={() => onChange(label)}
            className="flex gap-2 items-center mt-4 w-full"
        >
            <div
                className={`flex flex-col justify-center self-stretch p-1.5 rounded-full border-2 ${isSelected ? "border-teal-600" : "border-zinc-500"} border-solid  h-[24px] w-[24px]`}
            >
                {isSelected && (
                    <div
                        className="flex shrink-0 bg-teal-600 rounded-full"
                        style={{ width: 16, height: 16, marginLeft: -4 }}
                    />
                )}
            </div>
            <div className="self-stretch my-auto text-sm leading-none text-gray-500 basis-auto">
                {label}
            </div>
            {toolTipText ? (
                <Tooltip text={toolTipText}>
                    <div
                        className="flex flex-col self-stretch my-auto"
                        data-toggle="tooltip"
                    >
                        <img
                            src={infoIcon}
                            alt=""
                            className="object-contain w-3.5 aspect-[1.08] fill-slate-500"
                        />
                    </div>
                </Tooltip>
            ) : null}
        </div>
    );
};

export default CharacterResponseOption;
