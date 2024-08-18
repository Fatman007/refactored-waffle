import React from "react";
import triangleIcon from "../../../../assets/frontend/img/chattriangle.svg";
import waUnionIcon from "../../../../assets/frontend/img/waunion.svg";

const ChatMessage = ({ content, time, isUser }) => {
    return (
        <div
            className={`flex flex-col items-${isUser ? "end" : "start"} mt-3.5 w-full text-sm`}
        >
            <div className={`flex items-${isUser ? "end" : "start"} w-full`}>
                {!isUser && <div className="flex shrink-0 h-[7px] w-[7px]" />}
                <div
                    className={`flex flex-col p-2 rounded ${isUser ? "bg-lime-100" : "bg-stone-50"} min-w-[240px] ${isUser ? "" : "w-[282px]"}`}
                >
                    <div className="leading-5 text-black">{content}</div>
                    <div
                        className={`mt-1 flex flex-row justify-end ${isUser ? "text-black text-opacity-10" : "text-zinc-400"}`}
                    >
                        <div>{time}</div>
                        {isUser && (
                            <img
                                src={waUnionIcon}
                                className="object-contain shrink-0 w-3 aspect-[0.53] ml-1"
                                alt=""
                            />
                        )}
                    </div>
                </div>
                {isUser && (
                    <img
                        src={triangleIcon}
                        className="object-contain shrink-0 w-2 aspect-[0.53]"
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
