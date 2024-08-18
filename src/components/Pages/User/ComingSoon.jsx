import { useState, useEffect } from "react";
import App from "./layouts/App";
import rocket from "../../../assets/frontend/img/3d-rocket.png";

export default function ComingSoon({ auth, logo }) {
    return (
        <>
            <App auth={auth?.user} logo={logo}>
                <div className="flex flex-col items-center justify-center text-center text-gray-700 min-h-screen">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            width={"30%"}
                            height={"30%"}
                            src={rocket}
                            alt="Coming Soon illustration"
                            className=""
                        />
                        <h1 className="mt-6 text-5xl font-semibold max-md:text-4xl">
                            Coming Soon
                        </h1>
                        <h2 className="mt-2.5 text-2xl max-md:max-w-full">
                            Get Ready to Experience the Power of AI
                        </h2>
                    </div>
                    <div
                        style={{ width: "70%" }}
                        className="flex flex-col mt-12 w-full text-xl"
                    >
                        We're working on something incredible! Soon, you'll have
                        access to a cutting-edge dashboard powered by the latest
                        in AI technology, designed to transform the way you
                        interact with data, automate tasks, and generate
                        insights like never before.
                    </div>
                </div>
            </App>
        </>
    );
}
