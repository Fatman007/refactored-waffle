import Locate from "../Locate";

export default function Howitworks({ howitworks, settings, locate })
{

    return (
        <>
            <div id="howitworks" className='2xl:mt-500 xl:mt-500 lg:mt-500 md:mt-500 sm:mt-500 xs:mt-400 2xl:mb-56 xl:mb-56 lg:mb-32 md:mb-32 sm:mb-32 xs:mb-20 w-full'>
                <div className='relative 2xl:mx-10 xl:mx-5'>
                    <div className='w-full mx-auto'>
                        <div className='text-center mt-36 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-4/5 mx-auto'>
                            <h2 className='font-recoleta font-bold mb-3 2xl:text-6xl xl:text-6xl lg:text-6xl md:text-6xl sm:text-6xl xs:text-5xl'><Locate data={settings.how_it_works_title} keygen={'how_it_works_title'} lang={locate} /></h2>
                            <p className=' font-medium 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-lg xs:text-base leading-tight text-gray-500 '><Locate data={settings.how_it_works_des} keygen={'how_it_works_des'} lang={locate} /></p>
                        </div>
                        <div className='2xl:flex xl:flex lg:block items-center mt-14 relative 2xl:space-x-5 xl:space-x-5 lg:space-x-5'>
                            <div className=' 2xl:w-45p xl:w-45p lg:w-4/5 2xl:m-0 xl:m-0 lg:m-auto'>
                                <div className='flex'>
                                    <div className='mr-5 text-center'>
                                        <h2 className='hero-instruction-bg rounded-full 2xl:w-24 xl:w-18 lg:w-24 md:w-24 sm:w-24 xs:w-20 2xl:h-24 xl:h-18 lg:h-24 md:h-24 sm:h-24 xs:h-20 flex items-center justify-center 2xl:text-42px xl:text-42px lg:text-42px md:text-42px sm:text-42px xs:text-3xl font-medium mb-3'>01</h2>
                                        <img className=' mx-auto' src="/frontend/img/vector-howitworks.png" alt="" />
                                    </div>
                                    <div className=' mt-4'>
                                        <h2 className=' font-recoleta font-semibold 2xl:text-42px xl:text-4xl lg:text-42px md:text-42px sm:text-42px xs:text-3xl 2xl:mb-3 xl:mb-3 lg:mb-3 md:mb-3 sm:mb-3 xs:mb-0'><Locate data={howitworks.step1_title} keygen={'step1_title'} lang={locate} /></h2>
                                        <p className=' font-normal 2xl:text-19px xl:text-lg lg:text-19px md:text-19px sm:text-19px xs:text-sm text-gray-400 leading-tight'><Locate data={howitworks.step1_des} keygen={'step1_des'} lang={locate} /></p>
                                    </div>
                                </div>
                                <div className='flex mt-3'>
                                    <div className='mr-5 text-center'>
                                        <h2 className='hero-instruction-bg rounded-full 2xl:w-24 xl:w-24 lg:w-24 md:w-24 sm:w-24 xs:w-20 2xl:h-24 xl:h-24 lg:h-24 md:h-24 sm:h-24 xs:h-20 flex items-center justify-center 2xl:text-42px xl:text-42px lg:text-42px md:text-42px sm:text-42px xs:text-3xl font-medium mb-3'>02</h2>
                                        <img className=' mx-auto' src="/frontend/img/vector-howitworks.png" alt="" />
                                    </div>
                                    <div className=' mt-4'>
                                        <h2 className=' font-recoleta font-semibold 2xl:text-42px xl:text-4xl lg:text-42px md:text-42px sm:text-42px xs:text-3xl 2xl:mb-3 xl:mb-3 lg:mb-3 md:mb-3 sm:mb-3 xs:mb-0'><Locate data={howitworks.step2_title} keygen={'step2_title'} lang={locate} /></h2>
                                        <p className=' font-normal 2xl:text-19px xl:text-lg lg:text-19px md:text-19px sm:text-19px xs:text-sm text-gray-400 leading-tight'><Locate data={howitworks.step2_des} keygen={'step2_des'} lang={locate} /></p>
                                    </div>
                                </div>
                                <div className='flex mt-3 2xl:mb-auto xl:mb-auto xs:mb-5'>
                                    <div className='mr-5 text-center'>
                                        <h2 className='hero-instruction-bg rounded-full 2xl:w-24 xl:w-24 lg:w-24 md:w-24 sm:w-24 xs:w-20 2xl:h-24 xl:h-24 lg:h-24 md:h-24 sm:h-24 xs:h-20 flex items-center justify-center 2xl:text-42px xl:text-42px lg:text-42px md:text-42px sm:text-42px xs:text-3xl font-medium mb-3'>03</h2>
                                    </div>
                                    <div className=' mt-4'>
                                        <h2 className=' font-recoleta font-semibold 2xl:text-42px xl:text-4xl lg:text-42px md:text-42px sm:text-42px xs:text-3xl 2xl:mb-3 xl:mb-3 lg:mb-3 md:mb-3 sm:mb-3 xs:mb-0'><Locate data={howitworks.step3_title} keygen={'step3_title'} lang={locate} /></h2>
                                        <p className=' font-normal 2xl:text-19px xl:text-lg lg:text-19px md:text-19px sm:text-19px xs:text-sm text-gray-400 leading-tight'><Locate data={howitworks.step3_des} keygen={'step3_des'} lang={locate} /></p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white shadow-lg p-5 rounded-xl h-fit 2xl:w-55p xl:w-55p lg:w-4/5 2xl:m-0 xl:m-auto lg:margin-auto'>
                                <img className='object-contain border border-slate-100 rounded-lg' src={settings.howimg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
