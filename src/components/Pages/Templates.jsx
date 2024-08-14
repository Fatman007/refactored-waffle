import React, { useRef, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import FrontendApp from "@/Layouts/Frontentapp";
import { useTranslation } from 'react-i18next';
import TemplatesComponents from '@/Components/frontend/Templates';
import FaQ from "@/Components/frontend/FaQ";

const Templates = (props) => {

    const [planType, setPlanType] = useState('monthly')
    const { t } = useTranslation('global');

    return (
        <>
            <Head>
                <title>Templates</title>
            </Head>
            <FrontendApp locate={props.locate} settings={props.settings} menuitems={props.menuitems} hero={props.hero} footer_first_menuitems={props.footer_first_menuitems} footer_second_menuitems={props.footer_second_menuitems} footer_third_menuitems={props.footer_third_menuitems} footer_four_menuitems={props.footer_four_menuitems}>
                {/* breadcrumb area start */}
                <div className=" py-12 secondary-bg">
                    <div className="text-left container mx-auto relative">
                        <img className='absolute -top-40 blur-3xl -right-0 z-1 sm:block xs:hidden' src="/frontend/img/header/hello1.png" alt="" />
                        <div className=" flex sm:flex xs:block items-center sm:justify-between xs:justify-center">
                            <div className=" sm:text-left xs:text-center">
                                <h2 className=" 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl font-bold text-white">{t('All')} <span className="text-gradient">{t('Templates')}</span></h2>
                                <nav className="flex sm:justify-start xs:justify-center py-3 text-gray-700 rounded-lg" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                        <li>
                                        <div className="flex items-center">
                                            <Link href="/" className="ml-1 text-lg font-normal text-slate-200 md:ml-2">{t('Home')}</Link>
                                        </div>
                                        </li>
                                        <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg aria-hidden="true" className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            <span className="ml-1 text-lg font-normal text-slate-400 md:ml-2">{t('All Templates')}</span>
                                        </div>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="sm:block xs:hidden">
                                <img className="h-56 right-10" src="/frontend/img/custom-shape1.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* breadcrumb area end */}
                <div className="mt-36 container mx-auto">
                    <TemplatesComponents categories={props.categories} title={props.settings.templates_title} />
                </div>
                {/* faq asked section start */}
                <FaQ faqs={props.faqs} />
                {/* faq asked section end */}
            </FrontendApp>
        </>

    );
};


export default Templates;
