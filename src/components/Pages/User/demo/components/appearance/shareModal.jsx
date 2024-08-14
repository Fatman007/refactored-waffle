import { useEffect, useRef, useState } from "react";
import { UilMultiply } from '@iconscout/react-unicons'

export default function ShareModal({ size, closeButton = true, heading, description, children, close }){

    const handleClose = () => {
        close(); // Call the close function to close the modal
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none transition delay-75 z-100">
                <div className={`relative mx-auto my-6 ${size ? size : '2xl:w-1/3 xl:w-1/2 lg:w-1/2 md:w-3/4 xs:w-full'}`}>
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none p-8">
                        {
                            closeButton === true && (
                                <div>
                                    <button onClick={handleClose} className=" absolute top-3 right-3"><UilMultiply className='text-slate-500' size={25} /></button>
                                </div>
                            )
                        }
                        <div>
                            <h2 className=" font-medium text-2xl text-gray-900">{heading}</h2>
                            <p className=" mt-1 text-gray-500">{description}</p>
                        </div>
                        <div className="relative flex-auto">{children}</div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    )
}
