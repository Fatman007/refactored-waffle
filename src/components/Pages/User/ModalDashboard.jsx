import React, { useEffect } from "react";

export const ModalDelete = ({
    showModal,
    handleClose,
    title,
    children,
    onShow,
    onClose,
    onDelete
}) => {
    // Use useEffect to trigger onShow and onClose functions
    useEffect(() => {
        if (showModal && onShow) {
            onShow();
        }
        if (!showModal && onClose) {
            onClose();
        }
    }, [showModal, onShow, onClose]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
                showModal ? "block" : "hidden"
            }`}
            style={{ zIndex: 999 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="px-4 py-3">
                    <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                    >
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="absolute top-0 right-0 mr-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={handleClose}
                        style={{ fontSize: 30 }}
                    >
                        <span className="sr-only">Close</span>
                        &times;
                    </button>
                </div>
                <div className="p-4">{children}</div>
                <div className="px-4 py-3 text-center">
                    <button
                        type="button"
                        className="overflow-hidden px-4 py-1 rounded bg-white border border-red-600 border-solid shadow text-slate-600"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        type="button"
                        className="ml-3 overflow-hidden px-4 py-1 rounded bg-red-600 text-white shadow"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ModalRefreshApi = ({
    showModal,
    handleClose,
    title,
    children,
    onShow,
    onClose,
    onContinue
}) => {
    // Use useEffect to trigger onShow and onClose functions
    useEffect(() => {
        if (showModal && onShow) {
            onShow();
        }
        if (!showModal && onClose) {
            onClose();
        }
    }, [showModal, onShow, onClose]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
                showModal ? "block" : "hidden"
            }`}
            style={{ zIndex: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="px-4 py-3">
                    <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                    >
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="absolute top-0 right-0 mr-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={handleClose}
                        style={{ fontSize: 30 }}
                    >
                        <span className="sr-only">Close</span>
                        &times;
                    </button>
                </div>
                <div className="p-4">{children}</div>
                <div className="px-4 py-3 text-center">
                    <button
                        type="button"
                        className="overflow-hidden px-4 py-1 rounded bg-white border border-teal-600 border-solid shadow text-slate-600"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onContinue}
                        type="button"
                        className="ml-3 overflow-hidden px-4 py-1 rounded bg-teal-600 text-white shadow"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ModalChatbot = ({
    showModal,
    handleClose,
    title,
    children,
    onShow,
    onClose
}) => {
    // Use useEffect to trigger onShow and onClose functions
    useEffect(() => {
        if (showModal && onShow) {
            onShow();
        }
        if (!showModal && onClose) {
            onClose();
        }
    }, [showModal, onShow, onClose]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
                showModal ? "block" : "hidden"
            }`}
            style={{ zIndex: 999 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-lg overflow-scroll shadow-xl transform transition-all w-3/5 h-3/5">
                <div className="px-4 py-3">
                    <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                    >
                        <span className="font-semibold">
                            Chatbot Configurations:{" "}
                        </span>
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="absolute top-0 right-0 mr-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={handleClose}
                        style={{ fontSize: 30 }}
                    >
                        <span className="sr-only">Close</span>
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
