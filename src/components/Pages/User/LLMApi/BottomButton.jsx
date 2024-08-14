import React from "react";

// interface ButtonProps {
//   variant: 'text' | 'outline' | 'primary';
//   label: string;
// }

const BottomButton = ({ variant, label, disabled, onPress }) => {
    const baseClasses = "overflow-hidden px-4 py-1.5 rounded";
    const variantClasses = {
        text: "text-slate-600",
        outline:
            "bg-white border border-teal-600 border-solid shadow text-slate-600",
        primary: "bg-teal-600 text-white shadow"
    };

    return (
        <button
            onClick={onPress}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {label}
        </button>
    );
};

export default BottomButton;
