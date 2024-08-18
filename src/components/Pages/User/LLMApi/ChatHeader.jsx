import React from "react";

const ChatHeader = () => {
    return (
        <header className="flex relative gap-4 px-6 py-3.5 font-semibold rounded-t-xl bg-slate-600">
            <div className="px-3 pt-2.5 pb-5 w-11 h-11 text-xl text-cyan-900 whitespace-nowrap bg-sky-200 rounded-full">
                JB
            </div>
            <div className="flex-auto my-auto text-lg text-white w-[245px]">
                JTSMobile Bot
            </div>
        </header>
    );
};

export default ChatHeader;
