import Sidebar from "@/Components/user/account/Sidebar";
import App from "./layouts/App";
import { Head } from "@inertiajs/inertia-react";
import moment from "moment/moment";
import Menubar from "./demo/components/settings/Menubar";
import { useTranslation } from "react-i18next";

export default function Billing({ transactions, currency, logo, auth }) {
    const { t } = useTranslation("global");

    return (
        <>
            <Head>
                <title>{t("Payment History")}</title>
            </Head>
            <App auth={auth.user} logo={logo}>
                <Menubar />
                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] h-fit m-5 rounded-xl">
                    <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl">
                        <table className="w-full text-left">
                            <thead className="text-slate-700 font-normal table-bg">
                                <tr className=" font-medium">
                                    <td className="px-8 py-5">{t("Date")}</td>
                                    <td className="px-8 py-5">{t("Trx Id")}</td>
                                    <td className="px-8 py-5">
                                        {t("Payment Method")}
                                    </td>
                                    <td className="px-8 py-5">{t("Price")}</td>
                                    <td className="px-8 py-5">{t("Status")}</td>
                                    <td className="px-8 py-5">
                                        {t("Invoice")}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.data.map((value, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50"
                                    >
                                        <td className="px-8 py-7 text-sm text-gray-500 ">
                                            {moment(value.created_at).format(
                                                "LL"
                                            )}
                                        </td>
                                        <td className="px-8 py-7 text-sm text-gray-500 ">
                                            {value.trx_id}
                                        </td>
                                        <td className="px-8 py-7 text-sm text-gray-500 ">
                                            {value.payment_method}
                                        </td>
                                        <td className="px-8 py-7 text-sm text-gray-500 ">
                                            {currency}
                                            {value.amount}
                                        </td>
                                        <td className="px-8 py-7 text-sm text-gray-500 ">
                                            {value.status === "approved" ? (
                                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                                    {t("Paid")}{" "}
                                                </span>
                                            ) : (
                                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                                    {t("Failed")}{" "}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-7">
                                            <a
                                                href={`/admin/download-invoice/${value.id}`}
                                                className="bg-gradient text-white px-8 py-3 rounded-lg text-base"
                                            >
                                                {t("Download")}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </App>
        </>
    );
}
