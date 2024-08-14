import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputError from "../../Components/InputError";
import { Link, useForm } from "@inertiajs/inertia-react";
import loginPic from "../../../assets/frontend/img/login.png";

export default function Login({ status, canResetPassword, global, logo }) {
    const history = useHistory();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: ""
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        history.push("/user/insight");
    };

    return (
        <>
            <div className="2xl:flex xl:flex lg:block">
                <div className=" 2xl:w-1/2 xl:w-1/2 flex items-center justify-center min-h-screen">
                    <div className="2xl:px-40 xl:px-40 lg:px-80 md:px-20 w-full  sm:px-20 xs:px-5">
                        <div className=" mb-8">
                            <Link href="/">
                                <img className=" h-10" src={logo} alt="" />
                            </Link>
                        </div>
                        <div className="mb-8">
                            <h2 className=" font-sans text-3xl text-slate-600 font-medium">
                                Log in to your account{" "}
                            </h2>
                            <p className=" text-gray-400 font-light my-1">
                                Welcome Back! Select method to log in:
                            </p>
                        </div>

                        <form onSubmit={submit} className="">
                            <div className=" mb-4">
                                <label
                                    className=" block text-left text-slate-700 mb-1 text-base"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={(e) => onHandleChange(e)}
                                    className=" w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5"
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-left"
                                />
                            </div>
                            <div className=" mb-2">
                                <label
                                    className=" block text-left text-slate-500 mb-1 text-base"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className=" w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5"
                                    type="password"
                                    onChange={(e) => onHandleChange(e)}
                                    name="password"
                                    id="password"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-left"
                                />
                            </div>
                            <div className=" flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        onChange={(e) => onHandleChange(e)}
                                        name="remember"
                                        id="default-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 color bg-white border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={"/"}
                                        className=" text-slate-600 font-medium text-sm"
                                    >
                                        Forgotten Password?
                                    </Link>
                                )}
                            </div>
                            <button
                                type="submit"
                                className=" mt-8 py-3 rounded-lg bg-color bg-gradient text-white w-full mb-2 text-lg"
                            >
                                Sign In
                            </button>
                            <p className=" text-gray-500 font-light text-sm text-center mt-2">
                                Don't Have And Account yet?{" "}
                                <Link
                                    className=" text-slate-600 font-medium"
                                    href="/register"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className=" w-1/2 bg-gradient min-h-screen 2xl:block   xl:block xs:hidden relative">
                    <div className="flex items-center justify-center h-full">
                        <img
                            className=" mx-auto h-fit px-12"
                            src={loginPic}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
