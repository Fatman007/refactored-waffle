import React from "react";

const ChatInput = () => {
    return (
        <form className="flex gap-2 mt-20 rounded-none">
            <div className="flex flex-auto gap-10 py-1.5 pr-2.5 pl-5 bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <label htmlFor="messageInput" className="sr-only">
                    Enter your message
                </label>
                <input
                    id="messageInput"
                    type="text"
                    className="flex-grow bg-transparent outline-none"
                    placeholder="Enter your message"
                    aria-label="Enter your message"
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee184a9cffde8b5d4e6acb0fabe7a6c1b8edd4d553fa46783a63b6c347e8921?placeholderIfAbsent=true&apiKey=c894d7e13beb4ddfbb27cd6a29f48e4d"
                    className="object-contain shrink-0 w-7 aspect-square"
                    alt="Send message"
                />
            </div>
            <button type="submit" aria-label="Send message">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/81f9d16a97c10d78064e634c186395cc72f133cb1bf25180ce065879b907168e?placeholderIfAbsent=true&apiKey=c894d7e13beb4ddfbb27cd6a29f48e4d"
                    className="object-contain shrink-0 rounded-full aspect-square w-[39px]"
                    alt=""
                />
            </button>
        </form>
    );
};

export default ChatInput;
