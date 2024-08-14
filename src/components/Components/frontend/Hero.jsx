import { TypeAnimation } from 'react-type-animation'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import Typewriter from './Typewriter';
import { useTranslation } from 'react-i18next';
import Locate from '../Locate';
import Spinner from '../Spinner';
import { usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-hot-toast';
import { Inertia } from '@inertiajs/inertia';

export default function Hero({ hero, allTitles, templates, templatesCount, locate })
{
    const [t, i18n] = useTranslation("global")
    const [email, setEmail] = useState('')
    const [Titles, setTitles] = useState([])
    const [allData, setAllData] = useState()
    const [sequence, setSequence] = useState([
        // Same substring at the start will only be typed out once, initially
        'We produce food for Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email)
        {
            return toast.error('The Email Field Is Required.')
        }

        localStorage.setItem('email', email)

        setEmail('')

        // Inertia.visit(route('register'))
    }

    return (
        <>
            <div className='mt-158 sm:mt-158 xs:mt-24 pb-150 sm:pb-150 xs:pb-24 text-center mx-auto container relative'>
                <img className=' absolute -top-44 left-1/2 x-middle z-1' src="/frontend/img/header/hello.png" alt="" />
                    <h1 className='font-hiragino text-white text-6xl 2xl:leading-70 xl:leading-70 lg:leading-70 mb-3 relative 2xl:text-6xl xl:text-6xl lg:text-6xl md:hero-md-font sm:hero-md-font xs:text-3xl'>{t('Use AI to Generate Creative')} <br />
                    <div className='text-gradient inline-block ml-2'>
                    <TypeAnimation
                        className='custom-typing-animation'
                        sequence={sequence}
                        wrapper="div"
                        repeat={Infinity}
                    />
                    </div>
                </h1>
                <p className=' relative text-xl md:text-xl sm:text-lg xs:text-base text-E3E3E3 leading-28 font-normal mx-auto 2xl:w-3/5 xl:w-3/5 lg:w-3/4 xs:w-full mb-8'>{t('hero_des')}</p>
                <div className=' flex items-center justify-center mb-1.5 relative'>
                    {
                        templates?.map((value, index) => {
                            const info = JSON.parse(value.data)
                            return (
                                <div key={index} className='-ml-5 bg-white inline-block rounded-full p-1'>
                                    <img className='mx-auto w-52 h-52 rounded-full' src={info.image} alt="" />
                                </div>
                            )
                        })
                    }
                    <div className=' -ml-5 bg-white inline-block rounded-full p-1'>
                        <div className='mx-auto bg-gradient w-52 h-52 rounded-full flex items-center justify-center'>
                            <span className=' text-white text-base font-medium'>{templatesCount}+</span>
                        </div>
                    </div>
                </div>
                <p className='text-E3E3E3 text-base relative'>{t('More than 60+ Built-In Templates to use.')}</p>
                <div className='w-1/2 lg:w-1/2 md:w-2/3 sm:w-3/4 xs:w-11/12 mt-7 relative mx-auto'>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" required className='h-68 border-none rounded-full px-7 w-full mx-auto placeholder:text-gray-400 placeholder:text-base sm:placeholder:text-base xs:placeholder:text-sm' placeholder={t('Write Your Email Address')} />
                        <button type='submit' className='bg-gradient absolute text-white right-3 top-1/2 y-middle py-3.5 px-10 sm:px-10 xs:px-6 rounded-full font-medium'>{t('Start Free Trial')}</button>
                    </form>
                </div>
                <div className='mt-10 mx-auto bg-gradient p-2 rounded-20 relative w-3/4 lg:w-3/4 md:w-10/12 sm:w-10/12 xs:w-full'>
                    <img src={hero?.image} className=' rounded-20' alt="" />
                </div>
            </div>
        </>
    )
}
