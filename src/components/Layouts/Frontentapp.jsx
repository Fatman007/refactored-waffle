import Footer from "./partials/Footer";
import Header from "./partials/Header";

export default function FrontendApp({ children, settings, menuitems, footer_first_menuitems, footer_second_menuitems, footer_third_menuitems, footer_four_menuitems, locate })
{
    return (
        <>
            <div className="homepage-bg">
                <Header settings={settings} menuitems={menuitems} locate={locate}  />
                { children }
                <Footer locate={locate} settings={settings} footer_first_menuitems={footer_first_menuitems} footer_second_menuitems={footer_second_menuitems} footer_third_menuitems={footer_third_menuitems} footer_four_menuitems={footer_four_menuitems} />
            </div>
        </>
    )
}
