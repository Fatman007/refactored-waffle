import { Head } from "@inertiajs/inertia-react";
import Menubar from "./demo/components/settings/Menubar";
import Subscription from "./demo/components/settings/Subscription";
import App from "./layouts/App";
import { useTranslation } from "react-i18next";

export default function Plan(props)
{

    const {t} = useTranslation('global')

    return (
        <>
            <Head>
                <title>{t('Subscription')}</title>
            </Head>
            <App auth={props.auth.user} logo={props.logo}>
                <Menubar />
                <Subscription currency={props.currency} appName={props.appName} monthlyPlans={props.monthlyPlans} yearlyPlans={props.yearlyPlans} user={props.user} />
            </App>
        </>
    )
}
