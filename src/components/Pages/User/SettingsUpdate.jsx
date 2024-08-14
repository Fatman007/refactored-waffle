import { useEffect, useRef, useState } from "react";
import Menubar from "./demo/components/settings/Menubar";
import App from "./layouts/App";
import { UilCloudUpload, UilTimes } from "@iconscout/react-unicons";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Head } from "@inertiajs/inertia-react";

export default function SettingsUpdate({ user, auth, logo }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState();
    const [previousPassword, setPreviousPassword] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [profilePreviewImage, setProfilePreviewImage] = useState();
    const profileRef = useRef(null);
    const [error, setError] = useState({
        param: "",
        msg: ""
    });

    const { t } = useTranslation("global");

    const onDragEnter = () => profileRef.current.classList.add("dragover");
    const onDragLeave = () => profileRef.current.classList.remove("dragover");
    const onDrop = () => profileRef.current.classList.remove("dragover");

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setProfilePreviewImage(user.profile);
    }, []);

    const onFileDrop = (e) => {
        const file = e.target.files[0];

        if (!file) {
            toast.error("The profile image filed is Required!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        setProfile(file);

        const reader = new FileReader();

        reader.onload = (event) => {
            setProfilePreviewImage(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const deleteProfileImage = () => {
        setProfilePreviewImage("");
        setProfile("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError({
            param: "",
            msg: ""
        });

        if (!name) {
            return setError({
                param: "name",
                msg: t("The Name Field Is Required")
            });
        }

        if (!email) {
            return setError({
                param: "email",
                msg: t("The Email Field Is Required")
            });
        }

        if (previousPassword) {
            if (!password) {
                return setError({
                    param: "password",
                    msg: t("The Password Field Is Required")
                });
            }

            if (!confirmPassword) {
                return setError({
                    param: "confirmPassword",
                    msg: t("The Confirm Password Field Is Required")
                });
            }

            if (password != confirmPassword) {
                return setError({
                    param: "password",
                    msg: t("The Password doesn't match in the record.")
                });
            }
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("profile", profile);
        if (previousPassword) {
            formData.append("previousPassword", previousPassword);
            formData.append("password", password);
            formData.append("confirmPassword", confirmPassword);
        }

        axios
            .post("/user/account", formData)
            .then((res) => {
                setPassword("");
                setConfirmPassword("");
                setPreviousPassword("");
                toast.success("Profile Updated!");
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.currentPassword);
            });
    };

    return (
        <>
            <Head>
                <title>{t("Edit User Information")}</title>
            </Head>
            <App auth={auth.user} logo={logo}>
                <Menubar />
                <div className="bg-gradient-to-r m-5 p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto">
                    <div className=" bg-white  p-8 rounded-xl h-full">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h2 className="text-xl font-medium text-slate-500">
                                    {t("User Information")}
                                </h2>
                                <div className=" 2xl:flex xl:flex md:flex sm:flex items-center 2xl:space-x-5 xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-5">
                                    <div className="w-full mt-5">
                                        <label
                                            className="block text-slate-500 text-base font-medium mb-1"
                                            for="chatbot_name"
                                        >
                                            {t("Name")}
                                        </label>
                                        <input
                                            defaultValue={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            type="text"
                                            className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                        />
                                    </div>
                                    <div className="w-full mt-5">
                                        <label
                                            className="block text-slate-500 text-base font-medium mb-1"
                                            for="chatbot_name"
                                        >
                                            {t("Email")}
                                        </label>
                                        <input
                                            defaultValue={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            type="text"
                                            className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                        />
                                    </div>
                                </div>
                                <div className=" w-full mt-5">
                                    <label className="  block text-slate-500 text-base font-medium mb-2">
                                        {t("Upload profile picture")}
                                    </label>
                                    <div
                                        ref={profileRef}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                        className="relative border-dashed border-2 rounded-md bg-white py-8"
                                    >
                                        <div className="text-center">
                                            <div>
                                                <UilCloudUpload
                                                    className=" mx-auto mb-1 text-slate-500"
                                                    size={40}
                                                />
                                                <p className="font-normal text-slate-600">
                                                    {t(
                                                        "Click to Upload or drag & drop"
                                                    )}
                                                </p>
                                                <small className=" text-slate-500 font-light">
                                                    {t(
                                                        "SVG, PNG, JPG or GIF (MAX 800*800px)"
                                                    )}
                                                </small>
                                            </div>
                                            {profilePreviewImage && (
                                                <div className=" relative w-28 mx-auto">
                                                    <img
                                                        className="w-28 h-auto rounded-md mx-auto mt-5"
                                                        src={
                                                            profilePreviewImage
                                                        }
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            deleteProfileImage
                                                        }
                                                        className=" absolute -top-3 -right-2 bg-white rounded-full shadow-inner p-1 z-50"
                                                    >
                                                        <UilTimes size={20} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept=".svg, .png, .jpg, .gif"
                                            onChange={onFileDrop}
                                            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="border-slate-100 mt-12" />
                            <div className=" mt-10">
                                <h2 className="text-xl font-medium text-slate-500">
                                    {t("Security")}
                                </h2>
                                <div className="2xl:flex xl:flex md:flex sm:flex items-center 2xl:space-x-5 xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-5">
                                    <div className="w-full mt-5">
                                        <label
                                            className="block text-slate-500 text-base font-medium mb-1"
                                            for="chatbot_name"
                                        >
                                            {t("Previous Password")}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setPreviousPassword(
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                        />
                                        {error &&
                                            error.param ===
                                                "previousPassword" && (
                                                <p className=" text-xs text-red-500">
                                                    {error.msg}
                                                </p>
                                            )}
                                    </div>
                                    <div className="w-full mt-5">
                                        <label
                                            className="block text-slate-500 text-base font-medium mb-1"
                                            for="chatbot_name"
                                        >
                                            {t("Password")}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            type="password"
                                            className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                        />
                                        {error &&
                                            error.param === "password" && (
                                                <p className=" text-sm text-red-500 mt-1">
                                                    {error.msg}
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label
                                        className="block text-slate-500 text-base font-medium mb-1"
                                        for="chatbot_name"
                                    >
                                        {t("Confirm Password")}
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        type="password"
                                        className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                    />
                                    {error &&
                                        error.param === "confirmPassword" && (
                                            <p className=" text-sm text-red-500 mt-1">
                                                {error.msg}
                                            </p>
                                        )}
                                </div>
                            </div>
                            <div className=" mt-5 text-right">
                                <button
                                    type="submit"
                                    className=" bg-gradient text-white px-10 py-2.5 rounded-lg text-base"
                                >
                                    {t("Update")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </App>
        </>
    );
}
