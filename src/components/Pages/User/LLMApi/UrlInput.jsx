import React, { useState, useEffect } from "react";
import deleteIcon from "../../../../assets/frontend/img/round-close-green.svg";

const UrlInput = () => {
    const [urlList, setUrlList] = useState([]);

    useEffect(() => {
        setUrlList([
            {
                id: 1,
                url: "Example: https://login.ngobrol.ai/login"
            },
            {
                id: 2,
                url: "Example: https://login.ngobrol.ai/login"
            },
            {
                id: 3,
                url: "Example: https://login.ngobrol.ai/logins"
            }
        ]);
    }, []);

    return (
        <>
            <h3 className="mt-14 text-lg font-medium leading-none text-gray-700 max-md:mt-10">
                Enter URL (optional)
            </h3>
            {urlList?.map((item) => {
                return (
                    <div
                        key={item?.id}
                        className="flex flex-wrap justify-between shrink gap-2 px-3 py-2 mt-4 max-w-full text-sm bg-white rounded border border-solid border-slate-300 text-slate-400 max-md:max-w-full"
                    >
                        {item?.url}
                        <div className="flex overflow-hidden gap-2.5 items-start">
                            <img
                                src={deleteIcon}
                                alt=""
                                className="object-contain w-5 aspect-square"
                            />
                        </div>
                    </div>
                );
            })}

            <div className="flex flex-wrap self-stretch mt-3.5 w-full max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                    <div className="flex flex-wrap gap-2 items-start pr-2 w-full bg-white rounded border border-solid border-teal-600 max-md:max-w-full">
                        <input
                            type="url"
                            placeholder="https://login.coster.id/login"
                            className="grow shrink text-sm border-none rounded leading-none max-md:max-w-full"
                        />
                    </div>
                </div>
                <button className="gap-2.5 self-start px-8 py-2 ml-8 text-sm font-medium leading-none text-teal-600 whitespace-nowrap bg-white rounded border border-teal-600 border-solid max-md:px-5">
                    ADD
                </button>
            </div>
        </>
    );
};

export default UrlInput;
