import { Switch, Route as Routes } from "react-router-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import notFoundLogo from "../assets/frontend/img/404.png";
import logo from "../assets/frontend/img/logo/Ngobrol Logo_Color.png";

import Welcome from "./Pages/Welcome";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/User/Dashboard";
import Document from "./Pages/User/Document";
import Chats from "./Pages/User/Chats";
import ChatShow from "./Pages/User/ChatShow";
import LLMApi from "./Pages/User/LLMApi/LLMApi";
import ComingSoon from "./Pages/User/ComingSoon";

import { variables } from "../common/Variable";

const templates = [
    {
        id: "1",
        title: "Blog Ideas & Outline",
        slug: "blog-ideas-outline",
        type: "aiwrite",
        data: JSON.stringify({
            image: "/uploads/templates/64kJziKQgdQtk7l9ZVNekGtunfOxDOqo2xwIGiTn.png",
            description:
                "Blog Ideas/Outline that you can use to generate more traffic, leads, and sales for your business.",
            input_groups: [
                {
                    input_name: "Topic",
                    input_unique_name: "##topic##",
                    input_type: "input",
                    input_description: "Ex: Travel, Laravel"
                }
            ],
            created_inputs: ["##topic##"],
            custom_prompt: "Write me Blog Ideas & Outline About ##topic##"
        }),
        is_favorite: "0",
        template_type: "buildIn",
        status: "approved",
        created_at: "2023-09-10 03:27:13",
        updated_at: "2023-11-01 15:29:46"
    },
    {
        id: "2",
        title: "Google Ads Description",
        slug: "google-ads-descriptionc4Nt7DKaMo",
        type: "aiwrite",
        data: JSON.stringify({
            image: "/uploads/templates/FVVhq1cpfKwTbGhgt1soLDgrQOw0arQA1cIPTyMo.png",
            description:
                "The best-performing Google ad copy converts visitors into customers..",
            input_groups: [
                {
                    input_name: "Product Name",
                    input_unique_name: "##product-name##",
                    input_type: "input",
                    input_description: "Ex: Canva, Laravel"
                },
                {
                    input_name: "Product Title",
                    input_unique_name: "##product-title##",
                    input_type: "input",
                    input_description:
                        "Ex: It's a unique laravel script for Codecanyon"
                },
                {
                    input_name: "My Name",
                    input_unique_name: "##my-name##",
                    input_type: "input",
                    input_description: "Hello"
                }
            ],
            created_inputs: [
                "##product-name##",
                "##product-title##",
                "##my-name##"
            ],
            custom_prompt:
                "Write me a google ads product description. My Product Name is ##product-name##. My Product Title is ##product-title##"
        }),
        is_favorite: "1",
        template_type: "buildIn",
        status: "approved",
        created_at: "2023-09-10 03:29:52",
        updated_at: "2023-11-01 18:59:10"
    },
    {
        id: "69",
        title: "ChatGPT",
        slug: "chatgpt",
        type: "aiChat",
        data: JSON.stringify({
            role: "General Chatbot",
            profile:
                "/uploads/chat/profile/MbdZBKEcp8aMwAAH9RmEHpL9msLNSCwDjDK6UHcq.png",
            message: "Hello!! How i can help you?",
            prompt: "Hello! I'm your friendly chatbot here to answer any questions or engage in a conversation on a wide range of topics. Feel free to ask me anything or start a conversation on a subject that interests you, and I'll provide you with the best information and responses I can. Whether it's about science, history, technology, travel, or just a friendly chat, I'm here to chat with you. How can I assist you today?"
        }),
        is_favorite: "0",
        template_type: "custom",
        status: "approved",
        created_at: "2023-10-23 21:57:38",
        updated_at: "2023-10-23 21:57:38"
    }
];

const documents = [
    {
        id: "1",
        user_id: "2",
        template_id: "2",
        used_token: "193",
        is_bookmark: "0",
        title: null,
        slug: null,
        type: "aiwrite",
        data: "<p><br></p><p><br></p><p>1. Laravel is a powerful php script that helps you create amazing web applications. It is easy to use and provides a wide range of features to help you create the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel.</p><p><br></p><p>2. Create amazing web applications with Laravel, a powerful php script. It is easy to use and provides a wide range of features to help you <strong>create</strong> the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel.</p><p><br></p><p>3. Get started with Laravel, a powerful php script that helps you create amazing web applications. It is easy to use and provides a wide range of features to help you create the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel. </p>",
        created_at: "2023-09-10 13:23:28",
        updated_at: "2023-09-10 13:24:30",
        template: templates[0]
    },
    {
        id: "2",
        user_id: "2",
        template_id: "2",
        used_token: "193",
        is_bookmark: "1",
        title: null,
        slug: null,
        type: "aiwrite",
        data: "<p>1. <strong>Laravel</strong> is a powerful PHP script that helps you create amazing web applications. It is easy to use and provides a wide range of features to help you create the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel.</p><p><br></p><p>2. Create amazing web applications with <strong>Laravel</strong>, a powerful PHP script. It is easy to use and provides a wide range of features to help you create the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel.</p><p><br></p><p>3. Get started with <strong>Laravel</strong>, a powerful PHP script that helps you create amazing web applications. It is easy to use and provides a wide range of features to help you create the perfect website. With Laravel, you can create dynamic and interactive websites with ease. Get started today and experience the power of Laravel. </p>",
        created_at: "2023-09-10 13:24:39",
        updated_at: "2023-09-10 13:36:08",
        template: templates[1]
    }
];

const template = {
    data: '{"message":"Hello, this is a message!"}' // Example JSON data for template->data
};

const info = JSON.parse(template.data);

const data = [
    {
        message: info.message,
        type: "bot",
        created_at: new Date().toISOString() // JavaScript equivalent of Carbon::now()
    }
];

const conversation = {
    user_id: 123, // Example user ID, equivalent to Auth::User()->id
    template_id: 456, // Example template ID, equivalent to $template->id
    title: "Conversation Title", // Example title, equivalent to $template->title
    data: JSON.stringify(data)
};

const MainRoute = () => {
    useEffect(() => {
        // const currentPath = window.location.pathname;
        // if (currentPath === "/" || currentPath === "") {
        //     window.location.href = "/user/llm";
        // }
        // variables.socket = socketIOClient(
        //     process.env.REACT_APP_NODE_BACKEND_URL
        // );
    }, []);

    return (
        <Router>
            <Switch>
                {/* <Routes path="/" exact component={Welcome} /> */}
                <Routes path="/" exact>
                    <Dashboard logo={logo} documents={{ data: documents }} />
                </Routes>
                {/* <Routes path="/login">
                    <Login logo={logo} />
                </Routes> */}
                <Routes path="/user/insight">
                    <Dashboard logo={logo} documents={{ data: documents }} />
                </Routes>
                {/* <Routes path="/user/documents">
                    <Document logo={logo} documents={{ data: documents }} />
                </Routes> */}
                <Routes path="/user/llm">
                    <LLMApi logo={logo} documents={{ data: documents }} />
                </Routes>
                <Routes path="/user/stt">
                    <ComingSoon logo={logo} />
                </Routes>
                <Routes path="/user/tts">
                    <ComingSoon logo={logo} />
                </Routes>
                <Routes path="/user/vtt">
                    <ComingSoon logo={logo} />
                </Routes>
                <Routes path="/user/settings">
                    <ComingSoon logo={logo} />
                </Routes>
                <Routes path="/user/report">
                    <ComingSoon logo={logo} />
                </Routes>
                {/* <Routes path="/user/ai/chats">
                    <Chats logo={logo} aiChats={{ data: [templates[2]] }} />
                </Routes> */}
                {/* <Routes path="/user/ai/chat/:slug">
                    <ChatShow
                        logo={logo}
                        conversations={{ data: [conversation] }}
                    />
                </Routes> */}
                <Routes path="*">
                    <NoMatch />
                </Routes>
            </Switch>
        </Router>
    );
};

const NoMatch = () => {
    const history = useHistory();

    return (
        <div class="container mx-auto">
            <div class=" w-full h-screen flex items-center justify-center">
                <div class=" text-center">
                    <img
                        class="h-96 w-full object-cover"
                        src={notFoundLogo}
                        alt=""
                    />
                    <h2 class="text-2xl my-8 text-gray-500 font-mono">
                        OPPS!! Page Not Found.
                    </h2>
                    <div
                        onClick={() => history.goBack()}
                        class="bg-gradient text-white px-10 py-3.5 text-lg rounded-full font-mono flex items-center justify-center space-x-4 max-w-max mx-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-arrow-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                            />
                        </svg>{" "}
                        <span>Go Back</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainRoute;
