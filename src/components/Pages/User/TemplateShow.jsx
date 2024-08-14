import { Head } from "@inertiajs/inertia-react";
import App from "./layouts/App";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UilCopy, UilImport, UilTrashAlt, UilCheckCircle, UilHtml5Alt } from '@iconscout/react-unicons'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../../css/editor.css'
import Spinner from "@/Components/Spinner";
import toast, { Toaster } from 'react-hot-toast';
import showdown from 'showdown';
import { useTranslation } from "react-i18next";

export default function TemplateShow({ auth, logo, template, languages })
{
    const data = JSON.parse(template.data);

    const [formValues, setFormValues] = useState({}); // State to store input field values
    const [validationErrors, setValidationErrors] = useState({});
    const [isDropDown, setIsDropDown] = useState(false);
    const [language, setLanguage] = useState('English')
    const [tone, setTone] = useState('Professional')
    const [length, setLength] = useState(200)
    const [result, setResult] = useState(1)
    const [creativity, setCreativity] = useState(0.5)
    const [content, setContent] = useState()
    const [isSubmit, setIsSubmit] = useState(false)
    const [copied, setCopied] = useState(false)
    const [text, setText] = useState('');
    const [typingTimer, setTypingTimer] = useState(null);
    const [documentId, setDocumentId] = useState()
    const [isSaveMode, setIsSaveMode] = useState(false)
    const [t] = useTranslation('global')
    const [error, setError] = useState({
        param: '',
        msg: ''
    })

    const handleChange = (event) => {
        const inputText = event.target.value;
        setText(inputText);

        // Clear previous timer
        clearTimeout(typingTimer);

        // Set a new timer to detect typing end
        const newTypingTimer = setTimeout(() => {
            if(documentId)
            {
                setIsSaveMode(true)

                axios.post('/user/document/rename', {
                    id: documentId,
                    title: inputText
                }).then(res => {
                    setIsSaveMode(false)
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })

            }
        }, 1000); // Adjust the delay as needed (in milliseconds)

        setTypingTimer(newTypingTimer);
    };

    const quillRef = useRef(null)

    const [quill, setQuill] = useState(null)

    useEffect(() => {
        setQuill(quillRef.current.editor);
    },[])

    const modules = {
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { header: []}, { font: [] }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            ['link', 'image', 'code-block'],
            ['clean'],

          ],
        },
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        setIsSubmit(true)
        setDocumentId('')
        setText('')
        setError({
            param: '',
            msg: ''
        })

        const updatedValidationErrors = {};

        data.input_groups.forEach((value, index) => {
            const inputUniqueName = value.input_unique_name;
            if (value.input_type === 'input' && (!formValues[inputUniqueName] || formValues[inputUniqueName].trim() === '')) {
                updatedValidationErrors[inputUniqueName] = 'This field is required';
            } else if (value.input_type === 'textarea' && (!formValues[inputUniqueName] || formValues[inputUniqueName].trim() === '')) {
                updatedValidationErrors[inputUniqueName] = 'This field is required';
            }
        });


        setValidationErrors(updatedValidationErrors);

        const isValid = Object.keys(updatedValidationErrors).length === 0;

        if (isValid) {


        } else {
            // Display error messages or handle invalid form
            console.log('Form submission failed. Please fill in all required fields.');
            setIsSubmit(false);
            return;
        }

        let updatedPrompt = data.custom_prompt;

        for (const [inputName, inputValue] of Object.entries(formValues)) {
            const placeholder = `${inputName}`;
            updatedPrompt = updatedPrompt.split(placeholder).join(inputValue);
        }

        const encodedPrompt = encodeURIComponent(updatedPrompt);


        const eventSource = new EventSource(`/user/ai/generate?prompt=${encodedPrompt}&language=${language}&tone=${tone}&length=${length}&result=${result}&creativity=${creativity}&template=${template.id}&type=aiwrite`);

        let responseData = '';
        eventSource.addEventListener("message", function (event) {

            if (event.data === "[DONE]") {
                eventSource.close();

                const content = responseData

                const formData = new FormData();
                formData.append('template', template.id)
                formData.append('type', 'aiwrite')
                formData.append('content', content)

                axios.post('/user/ai/document/store', formData).then(res => {
                    setDocumentId(res.data.documentId)
                    setIsSubmit(false)
                }).catch(error => {
                    console.log(error)
                });
                return;
            }

            responseData += event.data;

            const converter = new showdown.Converter();


            const new_data = responseData.replace( /\\n/g, "\n" );
            quill.root.innerHTML = '<p>' + new_data + '</p>';
        });

        eventSource.addEventListener("stop", function (event) {
            eventSource.close();
            setIsSubmit(false)
            toast.error(event.data)
        });
    };

    const handleInputChange = (inputUniqueName, value) => {
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [inputUniqueName]: value,
        }));

        // Clear the validation error when user starts typing
        setValidationErrors(prevValidationErrors => ({
            ...prevValidationErrors,
            [inputUniqueName]: '',
        }));
    };

    const copyContent = () => {

        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();
            const length = quillInstance.getLength();

            // Select the entire content of the editor
            quillInstance.setSelection(0, length);

            // Focus on the editor
            quillInstance.focus();
        }

        const htmlContent = quill.root.innerHTML;

        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = htmlContent;
        document.body.appendChild(tempTextArea);
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        toast.success('Content copied to clipboard.')

        setTimeout(() => {
            setCopied(false)
        }, 4000);
    }

    const clickableAreaRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          clickableAreaRef.current &&
          !clickableAreaRef.current.contains(event.target) &&
          !event.target.classList.contains('ignore-click')
        ) {
            setIsDropDown(false);
        }
      };

      window.addEventListener('mousedown', handleClickOutside);
      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const downloadHtml = () => {
        const htmlContent = quill.root.innerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
    };


    const downloadWord = () => {
        const htmlContent = quill.root.innerHTML;
        const sanitizedContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
        const blob = new Blob([sanitizedContent], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

        // Create a link that downloads the blob object.
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "document.docx";

        // Add the link to the DOM.
        document.body.appendChild(link);

        // Click the link to download the file.
        link.click();
    };

    const handleQuillChange = () => {
        const content = quill.root.innerHTML

        // Clear previous timer
        clearTimeout(typingTimer);

        // Set a new timer to detect typing end
        const newTypingTimer = setTimeout(() => {
            if(documentId)
            {
                setIsSaveMode(true)
                axios.post('/user/document/update', {
                    id: documentId,
                    data: content
                }).then(res => {
                    setIsSaveMode(false)
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }
        }, 1000); // Adjust the delay as needed (in milliseconds)

        setTypingTimer(newTypingTimer);
    }

    const handleUndo = () => {
        const quillEditor = quillRef.current.getEditor();
        quillEditor.history.undo();
    };

    const handleRedo = () => {
        const quillEditor = quillRef.current.getEditor();
        quillEditor.history.redo();
    };

    const deleteContent = () => {
        if(window.confirm("Are you sure you want to delete this document?"))
        {
            axios.post('/user/document/delete', {
                id: documentId
            }).then(res => {
                window.location.reload()
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <>
            <Head>
                <title>{template.title}</title>
            </Head>
            <App auth={auth.user} logo={logo}>
                <div className="flex md:flex xs:block">
                    <div className="border-r border-violet-100 pb-12 p-5 w-1/3 xl:w-1/3 lg:w-45p md:w-45p xs:w-full hide-scrollbar custom-sidebar-editor overflow-y-scroll">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 flex items-center border-b border-violet-100 pb-5">
                                <img className="h-10 mr-3" src={data.image} alt="" />
                                <h4 className="text-xl text-slate-600 font-medium">{template.title}</h4>
                            </div>
                            <div className=" flex items-center space-x-5">
                                <div className=" w-1/2">
                                    <label className=" text-gray-700">{t('Select Language')}</label>
                                    <select onChange={(e) => setLanguage(e.target.value)} className="w-full rounded-xl py-3.5 px-5 mt-0.5 text-gray-700 cursor-pointer">
                                        {
                                            languages.map((lang, index) => (
                                                <option value={lang.code}>{lang.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className=" w-1/2">
                                    <label className="text-gray-700">{t('Select Tone')}</label>
                                    <select onChange={(e) => setTone(e.target.value)} className="w-full rounded-xl py-3.5 px-5 mt-0.5 text-gray-700 cursor-pointer">
                                        <option value={t('Professional')}>{t('Professional')}</option>
                                        <option value={t('Funny')}>{t('Funny')}</option>
                                        <option value={t('Casual')}>{t('Casual')}</option>
                                        <option value={t('Excited')}> {t('Excited')} </option>
                                        <option value={t('Bold')}>{t('Bold')}</option>
                                        <option value={t('Dramatic')}>{t('Dramatic')}</option>
                                    </select>
                                </div>
                            </div>
                            {data.input_groups.map((value, index) => (
                                <div key={index} className="mt-5">
                                    <label className="text-gray-700">{value.input_name} <span className="text-red-500 ml-0.5">*</span></label>
                                    {value.input_type === 'input' ? (
                                        <input type="text" onChange={(e) => handleInputChange(value.input_unique_name, e.target.value)} className={`bg-white rounded-xl w-full py-3.5 px-5 mt-0.5 placeholder:text-slate-300 ${validationErrors[value.input_unique_name] ? ' border border-red-500' : ' border-none'} `} placeholder={value.input_description} />
                                    ) : (
                                        <textarea rows="4" onChange={(e) => handleInputChange(value.input_unique_name, e.target.value)} className={`bg-white rounded-xl w-full py-3.5 px-5 mt-0.5 placeholder:text-slate-300 ${validationErrors[value.input_unique_name] ? ' border border-red' : ' border-none'} `} placeholder={value.input_description}></textarea>
                                    )}
                                    {validationErrors[value.input_unique_name] && <p className="text-red-500 mt-1">{validationErrors[value.input_unique_name]}</p>}
                                </div>
                            ))}
                            <div className=" mt-5">
                                <label className="text-gray-700">{t('Maximum Length')}</label>
                                <input onChange={(e) => setLength(e.target.value)} type="number" min={1} max={1000} className=" bg-white rounded-xl w-full border-none py-3.5 px-5 mt-0.5 placeholder:text-sm placeholder:text-slate-300" defaultValue={200} />
                            </div>
                            <div className=" flex items-center space-x-5 mt-5">
                                <div className=" w-1/2">
                                    <label className=" text-gray-700">{t('Number Of Results')}</label>
                                    <input onChange={(e) => setResult(e.target.value)} type="number" min={1} max={10} className=" bg-white rounded-xl w-full border-none py-3.5 px-5 mt-0.5 placeholder:text-sm placeholder:text-slate-300" defaultValue={1} />
                                </div>
                                <div className=" w-1/2">
                                    <label className="text-gray-700">{t('Creativity Level')}</label>
                                    <select onChange={(e) => setCreativity(e.target.value)} className="w-full rounded-xl py-3.5 px-5 mt-0.5 text-gray-700 cursor-pointer">
                                        <option value="0.5">{t('Optimal')}</option>
                                        <option value="0.8">{t('Low')}</option>
                                        <option value="0.9">{t('Medium')}</option>
                                        <option value="1">{t('High')}</option>
                                    </select>
                                </div>
                            </div>
                            {
                                error && error.param === 'error' && (
                                    <div className="bg-red-500 text-white mt-5 rounded-xl px-3 py-2 font-mono overflow-hidden">
                                        <div className=" text-xs">{error.msg}</div>
                                    </div>
                                )
                            }
                            {
                                isSubmit ? (
                                    <button type="button" className=" mt-5 bg-gradient text-white rounded-full py-3.5 w-full flex items-center justify-center cursor-not-allowed"><div className=" mr-2">{t('Generate Content')}</div> <Spinner className=' ml-1' strokeWidth={2.5} strokeColor='stroke-white' size={15} width={6} /></button>
                                ) : (
                                    <button type="submit" className=" mt-5 bg-gradient text-white rounded-full py-3.5 w-full">{t('Generate Content')}</button>
                                )
                            }
                        </form>
                    </div>
                    <div className=" bg-white w-2/3 xl:w-2/3 lg:w-55p md:w-55p xs:w-full p-5 relative">
                        {
                            copied && (
                                <div className=" absolute bottom-12 left-1/2 x-middle z-30 bg-violet-500 px-6 py-3.5 text-white rounded-lg copied-message animated-opacity">
                                    <p className=" text-sm flex items-center"><UilCheckCircle size={20} className='mr-1' /> {t('Content copied to clipboard')}.</p>
                                </div>
                            )
                        }
                        <div className=" flex justify-between space-x-5 border-b border-slate-100 pb-2 mb-4">
                            <div className=" flex items-center space-x-2">
                                <div className=" flex items-center">
                                    <button onClick={handleUndo} className=" hover:bg-violet-50 p-2 rounded-lg">
                                        <svg className=" fill-slate-500" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve"><g><path d="M7 16a1 1 0 0 0 .71-.3 1 1 0 0 0 0-1.41L4.38 11h10.13a4.49 4.49 0 0 1 0 9H12a1 1 0 0 0 0 2h2.51a6.49 6.49 0 0 0 0-13H4.37L7.7 5.71a1 1 0 0 0-1.4-1.42l-5.07 5a1 1 0 0 0-.29.71 1 1 0 0 0 .3.71l5.06 5A1 1 0 0 0 7 16z"></path></g></svg>
                                    </button>
                                    <button onClick={handleRedo} className=" hover:bg-violet-50 p-2 rounded-lg">
                                        <svg className=" fill-slate-500" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" xml:space="preserve"><g><path d="M17.64 4.29a1 1 0 0 0-1.41 1.42L19.57 9H9.43a6.49 6.49 0 0 0 0 13h2.51a1 1 0 0 0 0-2H9.43a4.49 4.49 0 1 1 0-9h10.13l-3.32 3.27a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.3 1 1 0 0 0 .7-.29l5.06-5A1 1 0 0 0 23 10a1 1 0 0 0-.3-.71z"></path></g></svg>
                                    </button>
                                </div>
                                <button onClick={copyContent} className=" hover:bg-violet-50 p-2 rounded-lg"><UilCopy className=' text-slate-500 text-sm' size={20} /></button>
                                <div className=" relative" ref={clickableAreaRef}>
                                    <button onClick={() => setIsDropDown(!isDropDown)} className={`hover:bg-violet-50 p-2 rounded-lg ${isDropDown ? 'bg-violet-50' : ''}`}><UilImport className=' text-slate-500 text-sm' size={20} /></button>
                                    {
                                        isDropDown && (
                                            <div class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-violet-100 z-30">
                                            <div class="py-1 px-1">
                                                <button onClick={downloadWord} class="rounded-lg font-medium px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 flex items-center w-full">
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25" height="25" className="mr-1.5"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 44 13 L 44 15 L 32 15 L 32 20 L 44 20 L 44 22 L 32 22 L 32 27 L 44 27 L 44 29 L 32 29 L 32 35 L 44 35 L 44 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 4.625 15.65625 L 8.1875 15.65625 L 10.21875 28.09375 C 10.308594 28.621094 10.367188 29.355469 10.40625 30.25 L 10.46875 30.25 C 10.496094 29.582031 10.613281 28.855469 10.78125 28.0625 L 13.40625 15.65625 L 16.90625 15.65625 L 19.28125 28.21875 C 19.367188 28.679688 19.433594 29.339844 19.5 30.21875 L 19.53125 30.21875 C 19.558594 29.53125 19.632813 28.828125 19.75 28.125 L 21.75 15.65625 L 25.0625 15.65625 L 21.21875 34.34375 L 17.59375 34.34375 L 15.1875 22.375 C 15.058594 21.75 14.996094 21.023438 14.96875 20.25 L 14.9375 20.25 C 14.875 21.101563 14.769531 21.824219 14.65625 22.375 L 12.1875 34.34375 L 8.4375 34.34375 Z"/></svg> <span>{t('MS Word')}</span>
                                                </button>
                                                <button onClick={downloadHtml} class="flex w-full font-medium text-slate-600 items-center rounded-lg px-4 py-2 text-sm hover:bg-violet-100 "><UilHtml5Alt className=' mr-1.5' size={25} /> <span>{t('HTML')}</span></button>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {
                                    documentId && (
                                        <>
                                            <span className=" bg-slate-50 text-xs px-3 text-slate-500 rounded-md py-1.5 flex items-center space-x-1">
                                            {
                                                isSaveMode ? (
                                                    <>
                                                        <span>{t('Saving...')}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UilCheckCircle size={14} /> <span>{t('Saved')}</span>
                                                    </>
                                                )
                                            }
                                            </span>
                                            <button onClick={deleteContent} className="hover:bg-red-50 p-2 rounded-lg"><UilTrashAlt size={20} className=' text-red-500 text-sm ' /></button>
                                        </>
                                    )
                                }
                            </div>

                        </div>
                        <input type="text" onChange={handleChange} placeholder={t('Untitled Document...')} className="p-0 w-full border-none placeholder:text-xl placeholder:text-slate-400 text-xl text-gray-700 font-medium placeholder:font-normal" defaultValue={text}/>
                        <ReactQuill theme="snow" onChange={handleQuillChange} ref={quillRef} modules={modules} />
                    </div>
                </div>
            </App>
        </>
    )
}
