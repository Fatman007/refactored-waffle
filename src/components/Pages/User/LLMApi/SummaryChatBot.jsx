import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StepIndicator from "./StepIndicator";
import BottomButton from "./BottomButton";

const SummaryChatBot = ({ setCategoryId }) => {
    const [val, setVal] = useState(false);
    const documents = ["bob", "bubu"];
    const chatbotName = "test";
    const characterResponse = "ok";
    const chatbotInstructions = "move";

    const onPressContinue = () => {
        if (!val) {
            toast("Please agree and check the checkbox first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else {
            setCategoryId(1);
            window?.scrollTo(0, 0);
        }
    };

    const onPressBack = () => {
        setCategoryId(6);
        window?.scrollTo(0, 0);
    };

    const onPressCancel = () => {
        setCategoryId(1);
        window?.scrollTo(0, 0);
    };

    return (
        <main className="flex flex-col items-start justify-center">
            <section className="flex z-10 flex-wrap items-start self-center mt-8 w-70 ">
                <StepIndicator
                    label="Create Bot"
                    isActive={true}
                    isFirst={true}
                />
                <StepIndicator label="Add Document" isActive={true} />
                <StepIndicator label="Summary" isActive={true} isLast={true} />
            </section>
            <h1 className="text-3xl text-gray-700 mt-12 px-10">Summary</h1>
            <section className="self-stretch pt-6 px-5 ml-10 mr-10 pb-24 mt-6 text-sm font-bold text-gray-700 border border-green-700 bg-white rounded-xl">
                <p>
                    Chatbot Name
                    <span className="text-gray-700 font-light">
                        : {chatbotName}
                    </span>
                </p>
                <p>
                    Character Response{" "}
                    <span className="text-gray-700 font-light">
                        : {characterResponse}
                    </span>
                </p>
                <p>
                    Chatbot Instructions{" "}
                    <span className="text-gray-700 font-light">
                        : {chatbotInstructions}
                    </span>
                </p>
                <p>
                    Documents Used<span className="text-gray-700">:</span>
                </p>
                <DocumentList documents={documents} />
            </section>
            <div className="flex gap-3 mt-6 ml-12 max-md:ml-2.5">
                <div className="flex flex-col self-center">
                    <input
                        type="checkbox"
                        checked={val}
                        onChange={() => setVal(!val)}
                    />
                </div>
                <button className="flex-auto text-sm text-gray-700">
                    Agree; Continue processing my chatbot
                </button>
            </div>
            <div className="flex gap-2 px-10 items-start self-end mt-14 text-sm font-medium leading-none text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <BottomButton
                    onPress={onPressCancel}
                    disabled={false}
                    variant="text"
                    label="Cancel"
                />
                <BottomButton
                    onPress={onPressBack}
                    disabled={false}
                    variant="outline"
                    label="Back"
                />
                <BottomButton
                    onPress={onPressContinue}
                    disabled={false}
                    variant="primary"
                    label="Train Chatbot"
                />
            </div>
        </main>
    );
};

const DocumentList = ({ documents }) => {
    return (
        <ol>
            {documents.map((document, index) => (
                <li key={index}>
                    <span className="text-gray-700 font-light">
                        {index + 1} {". "} {document}
                    </span>
                </li>
            ))}
        </ol>
    );
};

export default SummaryChatBot;
