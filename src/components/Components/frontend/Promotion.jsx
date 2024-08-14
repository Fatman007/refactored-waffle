import { Link } from "@inertiajs/inertia-react"
import Locate from "../Locate"

export default function Promotion({ title, buttonName, buttonUrl, locate })
{
    return (
        <>
            <div className='2xl:container xl:container lg:container md:container sm:container mx-auto mb-40 relative'>
                <div className=' absolute -top-4 -left-5 z-50'>
                    <img src="/frontend/img/query-shape.svg" alt="" />
                </div>
                <div className='query-bg 2xl:px-20 xl:px-20 lg:px-10 md:px-10 py-16 rounded-xl relative'>
                    <div className=' 2xl:flex xl:flex lg:flex md:flex sm:flex xs:block items-center justify-between'>
                        <h2 className=' 2xl:w-1/2 xl:w-1/2 lg:w-3/5 md:w-3/5 sm:w-4/6 font-bold font-recoleta 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl xs:text-4xl 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 xs:mb-10'><Locate data={title} keygen={'promotion_title'} lang={locate} /></h2>
                        <div className=' absolute right-8'>
                            <img src="/frontend/img/contact-shape.svg" alt="" />
                        </div>
                        <Link href={buttonUrl} className=' bg-white px-12 py-4 rounded-lg font-medium text-xl relative'><Locate data={buttonName} keygen={'promotion_button_title'} lang={locate} /></Link>
                    </div>
                </div>
                <div className=' absolute 2xl:-bottom-5 xl:-bottom-7 lg:-bottom-7 md:-bottom-7 sm:-bottom-7 xs:-bottom-7 2xl:-right-10 xl:right-0 lg:right-0 md:right-0 sm:right-0 xs:right-0'>
                    <img src="/frontend/img/query-shape.svg" alt="" />
                </div>
            </div>
        </>
    )
}
