import React from "react";

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
                        className={`mt-1 text-right ${isUser ? "text-black text-opacity-10" : "text-zinc-400"}`}
                    >
                        {time}
                    </div>
                </div>
                {isUser && (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc3820b24fdba148edeea0b5836112d4b8deadb3961b3c9cdcabb4125d1150e7?placeholderIfAbsent=true&apiKey=c894d7e13beb4ddfbb27cd6a29f48e4d"
                        className="object-contain shrink-0 w-2 aspect-[0.53]"
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
