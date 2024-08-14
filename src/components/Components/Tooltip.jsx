import React, { useEffect, useRef, useState } from "react";

const Tooltip = ({ text, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2 z-10 w-72">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
