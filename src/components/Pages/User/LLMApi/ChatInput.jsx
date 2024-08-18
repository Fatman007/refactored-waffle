import React, { useRef, useState } from "react";
import waSendIcon from "../../../../assets/frontend/img/wasendbutton.png";
import waClipboardIcon from "../../../../assets/frontend/img/clipboard.svg";

const ChatInput = () => {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger click on hidden file input
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <form className="flex gap-2 mt-10 rounded-none">
            <div className="flex flex-auto relative gap-10 py-1.5 pr-2.5 pl-5 bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <label htmlFor="messageInput" className="sr-only">
                    Enter your message
                </label>
                <input
                    id="messageInput"
                    type="text"
                    className="flex-grow bg-transparent outline-none border-none"
                    placeholder="Enter your message"
                    aria-label="Enter your message"
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <img
                    onClick={handleImageClick}
                    src={waClipboardIcon}
                    className="object-contain shrink-0 w-7 aspect-square cursor-pointer"
                    alt="Send message"
                    style={{
                        position: "absolute",
                        right: 5,
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                />
            </div>
            <img
                onClick={() => {}}
                width={45}
                src={waSendIcon}
                className="object-contain shrink-0 rounded-full aspect-square cursor-pointer"
                alt=""
            />
        </form>
    );
};

export default ChatInput;
