import AOS from 'aos';
import 'aos/dist/aos.css';
import { Head, Link } from '@inertiajs/inertia-react';
import DOMPurify from 'dompurify';
import Hero from '../Components/frontend/Hero';
import Howitworks from '../Components/frontend/Howitworks';
import Features from '../Components/frontend/Features';
import Pricing from '../Components/frontend/Pricing';
import Testimonial from '../Components/frontend/Testimonial';
import Promotion from '../Components/frontend/Promotion';
import Footer from '../Layouts/partials/Footer';
import FrontendApp from '../Layouts/Frontentapp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/Carousel.css'
import Header from '../Layouts/partials/Header';
import Templates from '../Components/frontend/Templates';
import FaQ from '../Components/frontend/FaQ';
import Promotional from '../Components/frontend/Promotional';

export default function Welcome(props) {

    AOS.init();

    return (
        <>
            <FrontendApp locate={props.locate} settings={props.settings} menuitems={props.menuitems} hero={props.hero} footer_first_menuitems={props.footer_first_menuitems} footer_second_menuitems={props.footer_second_menuitems} footer_third_menuitems={props.footer_third_menuitems} footer_four_menuitems={props.footer_four_menuitems}>
                <Hero hero={props.hero} locate={props.locate} templates={props.templates?.filter((template, index) => index <= 5)} allTitles={props.allTitles} templatesCount={props.templatesCount} />
                {/* service area start */}
                <Features features={props.features} title={props.settings?.service_title} description={props.settings?.service_des} />
                {/* service area end */}
                {/* templates section start */}
                {/* <Templates categories={props.categories} title={props.settings.templates_title} /> */}
                {/* templates section end */}
                {/* pricing section area */}
                {/* <Pricing monthlyPlans={props.monthlyPlans} yearlyPlans={props.yearlyPlans} currency={props.currency} title={props.settings.plan_title} description={props.settings.plan_des} /> */}
                {/* pricing section end */}
                {/* testimonial section start */}
                {/* <Testimonial testimonials={props.testimonials} title={props.settings.testimonial_title} /> */}
                {/* testimonial section end */}
                {/* faq asked section start */}
                {/* <FaQ faqs={props.faqs} /> */}
                {/* faq asked section end */}
            </FrontendApp>
        </>

    );
}
