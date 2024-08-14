import { Head } from "@inertiajs/inertia-react";
import App from "./layouts/App";
import { UilPlus, UilMessage, UilEditAlt, UilTrashAlt, UilCommentDots, UilSearch } from '@iconscout/react-unicons'
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { template } from "lodash";
import Spinner from "../../Components/Spinner";
import Typewriter from "../../Components/frontend/Typewriter";
import ShareModal from "./demo/components/appearance/shareModal";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import showdown from "showdown";
import socketIOClient from "socket.io-client";
import { variables } from "../../../common/Variable";

export default function ChatShow({ auth, logo, chat, conversations })
{
    let { slug } = useParams()
    const info = JSON.parse(chat?.data ?? "{}")
    const [Conversation, setConversation] = useState(conversations?.data)
    const [conversationId, setConversationId] = useState()
    const [conversationName, setConversationName] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [isActiveAnimation, setIsActiveAnimation] = useState(false)
    const [allConversation, setAllConversation] = useState(conversations?.data)
    const [showModal, setShowModel] = useState(false)
    const [ conversationModalName, setConversationModalName ] = useState('')
    const [ conversationModalId, setConversationModalId ] = useState('')
    const [ isDeleted, setIsDeleted ] = useState(false)
    const [ response, setResponse ] = useState('')
    const [t] = useTranslation('global')

    useEffect(() => {
          const selectedConversation = conversations?.data?.[0];
          if (selectedConversation) {
            setConversationId(selectedConversation.id)
            setConversationName(selectedConversation.title)
            setMessages(JSON.parse(selectedConversation.data));
          }

        // const socket = socketIOClient("http://localhost:3777");
        variables.socket?.on("FromAPI", data => setResponse(data));
      }, []);

      console.log(response)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSubmit)
        {
            return;
        }

        if(!message)
        {
            return;
        }

        setIsSubmit(true)

        const newMessage = {
            message: message,
            type: 'user',
            created_at: moment.now()
        }

        setMessages(prevMessages => [...prevMessages, newMessage])

        const newBotMessage = {
            message: '',
            type: 'bot',
            created_at: moment.now()
        }

        setMessages(prevMessages => [...prevMessages, newBotMessage])

        const getMessage = message;

        setMessage('')

        setIsTyping(true)

        setIsActiveAnimation(true)

        // const eventSource = new EventSource(`/user/ai/chats/generate?conversation_id=${encodeURIComponent(conversationId)}&message=${encodeURIComponent(getMessage)}&template_id=${encodeURIComponent(chat.id)}`);

        // let responseData = '';

        // eventSource.addEventListener("message", function (event) {
        //     if (event.data === "[DONE]") {
        //         eventSource.close();

        //         axios.post('/user/message/send', {
        //             conversation_id: conversationId,
        //             content: responseData,
        //         }).then(res => {
        //             setIsTyping(false);
        //             setIsSubmit(false);
        //         }).catch(error => {
        //             setIsTyping(false);
        //             setIsSubmit(false);
        //             toast.error(error.response.data);
        //         });

        //         return;
        //     }

        //     responseData += event.data;

        //     setIsTyping(false);

        //     const newMessage = {
        //         message: responseData,
        //         type: 'bot',
        //         created_at: moment.now(),
        //         animation: true
        //     };

        //     setMessages(prevMessages => {
        //         // Replace the last message with the updated response
        //         const updatedMessages = [...prevMessages];
        //         if (updatedMessages.length > 0) {
        //             const lastMessage = updatedMessages[updatedMessages.length - 1];
        //             lastMessage.message = responseData;
        //         } else {
        //             // If there are no messages, add the new message
        //             updatedMessages.push(newMessage);
        //         }
        //         return updatedMessages;
        //     });

        // });

        // eventSource.addEventListener("stop", function (event) {
        //     eventSource.close();
        // });


    }

    const newConversation = () => {
        // axios.post('/user/new/conversation', {
        //     template_id: chat.id
        // }).then(res => {
        //     const data = res.data
        //     const conversation = {
        //         id: data.id,
        //         title: data.title,
        //         data: data.data,
        //         created_at: data.created_at
        //     }

        //     const updatedConversations = [...Conversation, conversation];

        //     // Sort the conversations based on the 'created_at' timestamp in descending order
        //     updatedConversations.sort((a, b) => b.id - a.id);

        //     setConversation(updatedConversations)

        //     const updatedAllConversations = [...allConversation, conversation];

        //     // Sort the conversations based on the 'created_at' timestamp in descending order
        //     updatedAllConversations.sort((a, b) => b.id - a.id);

        //     setAllConversation(updatedAllConversations)
        //     setIsDeleted(false)
        //     setConversationId(data.id)
        //     setMessages(JSON.parse(data.data))
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    const selectConversation = (id, data) => {
        // axios.post('/user/ai/chat/messages/get', {
        //     id: id
        // }).then(res => {
        //     setIsDeleted(false)
        //     setConversationId(id)
        //     setConversationName(res.data.title)
        //     setMessages(JSON.parse(res.data.data))

        // }).catch(error => {
        //     console.log(error)
        // })
    }

    const searchConversation = (e) => {
        const value = e.target.value
        const lowerSearchValue = value.toLowerCase(); // You can also use .toUpperCase()

        // Perform the case-insensitive search based on the lowercased searchValue
        const filteredConversations = allConversation.filter(value => {
            // Convert the template title to lowercase (or uppercase) before comparison
            const lowerTitle = value.title.toLowerCase(); // You can also use .toUpperCase()
            return lowerTitle.includes(lowerSearchValue);
        });

        setConversation(filteredConversations)
    }

    const handleEditConversation = (e, id, name) => {
        e.preventDefault()
        setShowModel(true)
        setConversationModalId(id)
        setConversationModalName(name)
    }

    const handleModalSubmit = async (e) => {
        e.preventDefault()

        // await axios.post('/user/conversation/rename', {
        //     id: conversationModalId,
        //     title: conversationModalName
        // }).then(res => {
        //     setShowModel(false)

        //     const updatedConversation = res.data;

        //     const conversationIndex = Conversation.findIndex(conversation => conversation.id === updatedConversation.id);

        //     // If the conversation is found, update it in the state
        //     if (conversationIndex !== -1) {
        //         const updatedConversationData = [...Conversation];
        //         updatedConversationData[conversationIndex] = updatedConversation;

        //         setConversation(updatedConversationData);
        //     }

        //     const allConversationIndex = allConversation.findIndex(conversation => conversation.id === updatedConversation.id)
        //     if(allConversationIndex !== -1)
        //     {
        //         const allUpdateConversationData = [...allConversation];
        //         allUpdateConversationData[allConversationIndex] = updatedConversation
        //         setAllConversation(allUpdateConversationData)
        //     }

        // }).catch(error => {
        //     console.log(error)
        // })
    }

    const handleDeleteConversation = async (id) => {
        if(window.confirm('Are you sure want to delete this conversation?'))
        {
            await axios.post('/user/conversation/delete', {
                id: id
            }).then(res => {
                setConversation(prevConversation => prevConversation.filter(conversation => conversation.id !== id));
                setAllConversation(prevConversation => prevConversation.filter(conversation => conversation.id !== id));
                if(conversationId === id || Conversation.length <= 0)
                {
                    setIsDeleted(true)
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }

    return (
        <>
            <App auth={auth?.user} logo={logo}>
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">{chat?.title}</h2>
                    </div>
                </div>
                <div className="bg-gradient-to-r p-[1px] from-[#8B5CF6] mx-5 mb-5 to-[#7ef3e5f7] rounded-xl h-fit">
                    <div className=" bg-white rounded-xl custom-chat-height">
                        <div className="flex sm:flex xs:block items-center h-full">
                            <div className="w-1/4 xl:w-1/4 md:w-2/6 sm:w-2/5 xs:w-full border-r border-slate-50 h-full sm:mb-0 xs:mb-5">
                                <div className=" flex h-screen max-h-full rounded-xl">
                                    <div className="relative flex min-h-0 flex-1 flex-col rounded-xl bg-white">
                                        <div className="p-5 border-b border-slate-50 relative">
                                            <UilSearch size={17} className=' text-slate-300 absolute left-8 top-1/2 y-middle' />
                                            <input onChange={searchConversation} type="text" placeholder={t('Search')} className=" w-full border border-slate-100 rounded-full placeholder:text-slate-300 px-5 placeholder:text-sm pl-9"/>
                                        </div>
                                        <div className="flex-grow flex-col overflow-y-auto flex-container">
                                            {
                                                Conversation?.map((conversation, index) => (
                                                    <div key={index} className={`border-b border-slate-50 cursor-pointer group transition-all delay-75 relative ${conversationId === conversation.id ? ' bg-slate-50' : ''}`}>
                                                        <div onClick={() => selectConversation(conversation.id, conversation.data)} className=" px-5 py-4 flex space-x-3">
                                                            <UilCommentDots className=' text-slate-600' />
                                                            <div>
                                                                <h4 className=" mb-0 text-slate-700">{conversation.title}</h4>
                                                                <div className=" text-xs -mt-0 text-gray-400">{moment(conversation.created_at).fromNow()}</div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-1/2 y-middle right-5 hidden group-hover:block transition-all delay-75 z-50">
                                                            <button type="button" onClick={(e) => handleEditConversation(e, conversation.id, conversation.title)} className=" bg-gradient text-white p-2.5 rounded-full mr-2"><UilEditAlt size={15} /></button>
                                                            <button type="button" onClick={() => handleDeleteConversation(conversation.id)} className=" bg-red-500 text-white p-2.5 rounded-full"><UilTrashAlt size={15} /></button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="bottom-content"></div>
                                        </div>
                                        <div className="border-t border-slate-50">
                                            <div className="text-center m-5">
                                                <button type="button" onClick={newConversation} className=" bg-gradient text-white w-full py-2.5 rounded-lg flex items-center justify-center space-x-2"><UilPlus size={20} className=' inline-block' /> <div className=" mt-0.5">{t('New Conversation')}</div></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-3/4 xl:w-3/4 md:w-4/6 sm:w-3/5 xs:w-full h-full">
                            {
                                !isDeleted ? (
                                <div className="flex h-screen max-h-full rounded-xl">
                                    <div className="relative flex min-h-0 flex-1 flex-col rounded-xl bg-white">
                                        <div className=" border-b border-slate-50 px-5 py-custom">
                                            <div className=" flex items-center space-x-3">
                                                <img className=" h-11" src={info.profile} alt="" />
                                                <div className=" text-lg text-gray-500 font-medium">{ conversationName}</div>
                                            </div>
                                        </div>
                                        <div className="flex-grow flex-col overflow-y-auto p-5">
                                            {
                                                messages.map((value, index) => {

                                                    if(value.message != '' && value.type === 'bot')
                                                    {
                                                        return (
                                                            <div key={index} className='flex space-x-3 mb-5'>
                                                                <img className=' w-8 h-8 inline-block' src={info.profile} alt="" />
                                                                <div className=" whitespace-pre-line">
                                                                    <p className='text-white bg-gradient rounded-3xl rounded-tl-none px-5 py-3 text-sm'>
                                                                        {
                                                                            value.animation ? (
                                                                                <Typewriter text={value.message} />
                                                                            ) : (
                                                                                <>{value.message}</>
                                                                            )
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    if(value.type === 'user')
                                                    {
                                                        return (
                                                            <div key={index} className='flex space-x-3 items-end justify-end mb-5'>
                                                                <div>
                                                                    <p className='text-black border border-slate-200 rounded-3xl rounded-br-none px-5 py-3 text-sm'>{value.message}</p>

                                                                </div>
                                                                <div>
                                                                    <svg className=' inline-block mb-0 w-8 h-8' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="32" height="32" x="0" y="0" viewBox="0 0 53 53" xmlSpace="preserve"><g><path d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z" fill="#9ca3af" data-original="#e7eced"></path><path d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z" fill="#e5e7eb" data-original="#556080"></path></g></svg>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                            {
                                                isTyping && (
                                                    <div className='flex space-x-3 mb-5'>
                                                        <img className=' w-7 h-7 inline-block' src={`${info.profile}`} alt="" />
                                                        <p className='text-white bg-gradient rounded-3xl rounded-tl-none px-5 py-3'>
                                                            <div className='typing-dots'>
                                                                <span class="dot"></span>
                                                                <span class="dot"></span>
                                                                <span class="dot"></span>
                                                            </div>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="  border-t border-slate-50">
                                            <form onSubmit={handleSubmit}>
                                                <div className=" flex items-center p-4 space-x-3">
                                                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className=" w-full border border-slate-100 rounded-full py-3.5 px-7 placeholder:text-sm placeholder:text-slate-300 text-base text-gray-700" placeholder="Ask Your Question ..."/>
                                                    {
                                                        isSubmit ? (
                                                            <button disabled className=" bg-gradient rounded-full  p-4 cursor-not-allowed"><Spinner size={22} strokeColor={'stroke-white'} width={5} /></button>
                                                        ) : (
                                                            <button type="submit" className=" bg-gradient rounded-full  p-4"><UilMessage className=' text-white' size={20} /></button>
                                                        )
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                                    <div className=" flex items-center justify-center h-full text-lg text-slate-300">{t('Please Select a conversation or create a conversation.')}</div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </App>
            {
                showModal && (
                    <ShareModal size={'w-1/3'} heading='Edit Conversation' close={() => setShowModel(false)} description={'Here you can edit conversation name as you need.'}>
                        <form onSubmit={handleModalSubmit}>
                            <div className=" mt-5">
                                <label className=" text-slate-500">{t('Name')}</label>
                                <input onChange={(e) => setConversationModalName(e.target.value)} type="text" className="w-full mt-1 border border-slate-100 rounded-lg h-12 px-5 placeholder:text-sm text-sm font-medium text-slate-500" defaultValue={conversationModalName} />
                                <div className="float-right">
                                    <button className=" bg-gradient text-white px-8 py-2.5 mt-2 rounded-md">{t('Update')}</button>
                                </div>
                            </div>
                        </form>
                    </ShareModal>
                )
            }
        </>

    )
}
