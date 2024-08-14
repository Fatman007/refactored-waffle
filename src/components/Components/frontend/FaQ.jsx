import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

export default function FaQ({ faqs, title }){

    const [activeFaQ, setActiveFaQ] = useState()
    const [t] = useTranslation('global')

    useEffect(() => {
        const firstIndex = faqs[0];
        setActiveFaQ(firstIndex.id)
    }, [])


    return (
        <div className='container mx-auto z-30 relative'>
            <div className=' text-center mx-auto container'>
                <h2 className='text-white text-5xl sm:text-5xl xs:text-4xl mb-4 font-hiragino'>{t('Frequently Ask')}  <span className='text-gradient'>{t('Questions')}</span></h2>
            </div>
            <div className=' mt-12 w-3/4 lg:w-3/4 md:w-11/12 xs:w-full mx-auto'>
                <div className='' data-aos="fade-up" data-aos-anchor-placement="top-center">
                    {
                        faqs.map((value, index) => {
                            const info = JSON.parse(value.faq_meta.value)
                            if(value.id === activeFaQ) {
                                return (
                                    <div onClick={() => setActiveFaQ('')} key={index} className='cursor-pointer bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl mb-5'>
                                        <div className='flex justify-between secondary-bg p-9 rounded-xl'>
                                            <div>
                                                <h2 className='font-medium text-xl text-gradient mb-6 inline-block'>{value.name}</h2>
                                                <p className=' text-base text-E2E5EC'>{info.description}</p>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 27 27" fill="none">
                                            <path d="M20.25 14.6228H6.75C6.45163 14.6228 6.16548 14.5043 5.95451 14.2933C5.74353 14.0823 5.625 13.7962 5.625 13.4978C5.625 13.1994 5.74353 12.9133 5.95451 12.7023C6.16548 12.4913 6.45163 12.3728 6.75 12.3728H20.25C20.5484 12.3728 20.8345 12.4913 21.0455 12.7023C21.2565 12.9133 21.375 13.1994 21.375 13.4978C21.375 13.7962 21.2565 14.0823 21.0455 14.2933C20.8345 14.5043 20.5484 14.6228 20.25 14.6228Z" fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                )
                            }else {
                                return (
                                    <div onClick={() => setActiveFaQ(value.id)} key={index} className='cursor-pointer bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl mb-5'>
                                        <div className='flex items-center justify-between secondary-bg p-9 rounded-xl'>
                                            <h2 className='font-medium text-xl text-white'>{value.name}</h2>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                            <path d="M20.25 14.6228H14.625V20.2478C14.625 20.5462 14.5065 20.8323 14.2955 21.0433C14.0845 21.2543 13.7984 21.3728 13.5 21.3728C13.2016 21.3728 12.9155 21.2543 12.7045 21.0433C12.4935 20.8323 12.375 20.5462 12.375 20.2478V14.6228H6.75C6.45163 14.6228 6.16548 14.5043 5.95451 14.2933C5.74353 14.0823 5.625 13.7962 5.625 13.4978C5.625 13.1994 5.74353 12.9133 5.95451 12.7023C6.16548 12.4913 6.45163 12.3728 6.75 12.3728H12.375V6.7478C12.375 6.44943 12.4935 6.16329 12.7045 5.95231C12.9155 5.74133 13.2016 5.6228 13.5 5.6228C13.7984 5.6228 14.0845 5.74133 14.2955 5.95231C14.5065 6.16329 14.625 6.44943 14.625 6.7478V12.3728H20.25C20.5484 12.3728 20.8345 12.4913 21.0455 12.7023C21.2565 12.9133 21.375 13.1994 21.375 13.4978C21.375 13.7962 21.2565 14.0823 21.0455 14.2933C20.8345 14.5043 20.5484 14.6228 20.25 14.6228Z" fill="#F9FFFA"/>
                                            </svg>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
            </div>
        </div>
    )
}
