import Locate from "../../Components/Locate"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { UilBars, UilMultiply } from '@iconscout/react-unicons'
import { useTranslation } from "react-i18next"

export default function Header({ logo, settings, menuitems, locate })
{
    const [t] = useTranslation('global')

    const [showMenu, setShowMenu] = useState(false)

    const clickableAreaRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          clickableAreaRef.current &&
          !clickableAreaRef.current.contains(event.target) &&
          !event.target.classList.contains('ignore-click')
        ) {
            setShowMenu(false);
        }
      };

      window.addEventListener('mousedown', handleClickOutside);
      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
        <>
            {/* <div className={`${route().current() != 'welcome' ? 'secondary-bg' : ''}`}> */}
            <div className='secondary-bg'>
                <div className='pt-8 container mx-auto z-50'>
                    <div className=' flex items-center justify-between bg-white rounded-full px-4 py-3.5 z-30 relative'>
                        <Link href='/'>
                            <img className='h-10 sm:h-10 xs:h-8 ml-3' src={logo} alt="" />
                        </Link>
                        <div className=" 2xl:block xl:block xs:hidden">
                            <ul>
                                {
                                    menuitems?.menuitems?.map((value, index) => (
                                        <li key={index} className='inline-block px-18 text-lg'>
                                            {
                                                JSON.parse(value.data).target === '_self' ? (
                                                    <Link href={JSON.parse(value.data).url}><span>{value.name}</span> { value.childs != '' && <i className="ri-arrow-down-s-line flex text-xl pl-2"></i>  }</Link>
                                                ) : (
                                                    <a href={JSON.parse(value.data).url}><span>{value.name}</span> { value.childs != '' && <i className="ri-arrow-down-s-line flex text-xl pl-2"></i>  }</a>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className=' flex items-center'>
                            <Link to={"/login"} className=' text-black underline font-medium text-xl pr-6 sm:block xs:hidden'>{t('LogIn')}</Link>
                            <Link href={settings?.register_button_url} className='bg-gradient xs:whitespace-nowrap text-white text-xl font-medium flex items-center px-2.5 py-4 rounded-full h-14 2xl:pr-7 xl:pr-7 lg:pr-12 md:pr-12 xs:pr-12 sm:flex xs:hidden'> <img className=' h-10 bg-white rounded-full flex items-center justify-center px-2.5 py-3.5 mr-3' src={require("../../../assets/frontend/img/header/arrow-right.svg")} alt="" /> <span>{t('Try Free')}</span></Link>
                            <div ref={clickableAreaRef} className="lg:w-4/5 md:w-4/5 sm:w-4/5 xs:w-1/2 ml-auto 2xl:hidden xl:hidden lg:block xs:block">
                                <button onClick={() => setShowMenu(!showMenu)} className=" float-right border border-slate-100 p-2 rounded-lg z-30 relative">
                                    {
                                        showMenu ? <UilMultiply size={25} /> : <UilBars size={25} />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={clickableAreaRef}>
                {
                    showMenu && (
                        <div className=' 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-2/5 sm:w-3/5 xs:w-5/6  secondary-bg shadow-lg fixed left-0 top-0 bottom-0 2xl:hidden xl:hidden lg:block md:block sm:block xs:block z-50 p-5 transition-transform ease-in-out duration-300 transform -translate-x-full lg:translate-x-0 md:translate-x-0 sm:translate-x-0 xs:translate-x-0'>
                            <div className=' mt-5'>
                                <Link href='/' className=" bg-white inline-block text-center px-7 py-2.5 rounded-tl-3xl rounded-br-3xl">
                                    <img className="m-auto h-9" src={logo} alt="logo" />
                                </Link>
                            </div>
                            <ul className=' mt-8 p-0'>
                                {
                                    menuitems.menuitems.map((value, index) => (
                                        <li key={index} className='relative group py-3 border-b last:border-none border-slate-700'>
                                            <Link className='text-lg font-normal flex items-center text-slate-300' href={JSON.parse(value.data).url}><span>{value.name}</span> { value.childs != '' && <i className="ri-arrow-down-s-line flex text-xl pl-2"></i>  }</Link>
                                            {
                                                value.childs != '' && (
                                                    <ul className="absolute group-hover:block hidden w-52 shadow-lg px-5 py-4 rounded-md group-hover:transition group-hover:duration-500 opacity-100 bg-white">
                                                        {
                                                            value.childs.map((child, index) => (
                                                                <li key={index} className='relative group font-light text-slate-500 hover:text-indigo-500 text-base py-2'>
                                                                    <Link href={JSON.parse(child.data).url}>{ child.name }</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                </div>
            </div>
        </>

    )
}
