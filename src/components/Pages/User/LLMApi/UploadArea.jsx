import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import FileItem from "./FileItem";
import uploadIcon from "../../../../assets/frontend/img/upload.png";

const UploadArea = ({ setIsLoading, setIsEmptyDocs }) => {
    const [docs, setDocs] = useState([]);
    const fileRef = useRef(null);

    const onDragEnter = () => fileRef.current.classList.add("dragover");
    const onDragLeave = () => fileRef.current.classList.remove("dragover");
    const onDrop = () => fileRef.current.classList.remove("dragover");

    useEffect(() => {
        if (docs.length === 0) {
            setIsEmptyDocs(true);
        } else {
            setIsEmptyDocs(false);
        }
    }, [docs]);

    useEffect(() => {
        axios
            .get("http://localhost:3777/files")
            .then((res) => {
                setDocs(res?.data?.files);
            })
            .catch((error) => {});
    }, []);

    const onFileDrop = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = [".pdf", ".txt", ".docx"];
        const maxFileSizeMB = 45;

        const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();
        if (allowedExtensions.includes("." + fileExtension)) {
            if (file.size <= maxFileSizeMB * 1024 * 1024) {
                const formData = new FormData();
                formData.append("file", file);
                setIsLoading(true);
                axios
                    .post("http://localhost:3777/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then((res) => {
                        setDocs((v) => {
                            return [
                                ...v,
                                {
                                    name: file?.name,
                                    size: file?.size / 1024 / 1024
                                }
                            ];
                        });
                        toast("Upload Success: File uploaded", {
                            type: toast.TYPE.SUCCESS,
                            hideProgressBar: true
                        });
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        toast("Upload Failed: Unstable network connection", {
                            type: toast.TYPE.ERROR,
                            hideProgressBar: true
                        });
                        setIsLoading(false);
                    });
            } else {
                toast("Upload Failed: File is too large to upload", {
                    type: toast.TYPE.ERROR,
                    hideProgressBar: true
                });
            }
        } else {
            toast("Upload Failed: File type is not supported", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        }
    };

    const onDelete = (id) => {};

    return (
        <>
            <div
                className="relative flex flex-col items-center px-20 pt-4 pb-8 mt-2.5 max-w-full text-sm text-center bg-white rounded-xl border border border-dashed max-md:px-5"
                ref={fileRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="flex flex-col items-center ml-3 max-w-full w-[478px]">
                    <img
                        src={uploadIcon}
                        alt=""
                        className="object-contain aspect-square w-[61px]"
                    />
                    <p className="mt-1 font-medium text-gray-700">
                        <span className="font-bold text-teal-600">
                            Click to upload
                        </span>{" "}
                        or drag & drop
                    </p>
                    <p className="self-stretch mt-2.5 font-light text-gray-500 max-md:max-w-full">
                        File must be in PDF, TXT, or DOCX format with a maximum
                        of 45 MB file size.
                    </p>
                </div>
                <input
                    accept=".docx,.txt,.pdf"
                    type="file"
                    onChange={onFileDrop}
                    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            {docs?.map((item, index) => {
                return (
                    <FileItem
                        key={index}
                        fileName={item?.name}
                        fileSize={item?.size + " mb"}
                        onDelete={onDelete}
                    />
                );
            })}
        </>
    );
};

export default UploadArea;
