import Sidebar from "@/Components/user/account/Sidebar";
import App from "./layouts/App";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import CheckoutForm from "@/Components/user/payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "@/Components/Spinner";
import { useTranslation } from "react-i18next";

export default function SelectPayment(props) {
    const [status, setStatus] = useState(props.gatewayId);
    const [stripe, setStripe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [charge, setCharge] = useState(props.paypal_charge);
    const [clientSecret, setClientSecret] = useState("");
    const [tax, setTax] = useState(Math.round(props.tax * 100) / 100);

    const stripePromise = loadStripe(props.STRIPE_PUBLISHABLE_KEY);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        const total = props.plan.price + props.stripe_charge + props.tax;
        const roundedTotal = Math.round(total * 100) / 100; // Round to two decimal places
        // Create PaymentIntent as soon as the page loads
        fetch(`/user/stripe/checkout/${roundedTotal}`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const total = props.plan.price + charge + tax;
        setTotal(Math.round(total * 100) / 100);
    }, [status]);

    const appearance = {
        theme: "stripe"
    };
    const options = {
        clientSecret,
        appearance
    };

    const { t } = useTranslation("global");

    return (
        <>
            <Head>
                <title>{t("Select Payment")}</title>
            </Head>
            <App logo={props.logo} auth={props.auth.user}>
                <div className="2xl:container xl:container lg:container md:container mx-auto my-20">
                    {status === null ? (
                        <div className="flex space-x-12">
                            <div className="w-3/4 mx-auto">
                                <div className=" border rounded-lg py-12 px-8"></div>
                                <div className="  border-slate-200 w-full h-64 flex items-center justify-center">
                                    <h2 className=" text-xl text-slate-500">
                                        {t("No Payment Gateway Found.")}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex space-x-12">
                            <div className="2xl:w-3/4 xl:w-3/4 lg:w-3/4 md:w-3/4 mx-auto">
                                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-3xl">
                                    <div className="rounded-3xl bg-white py-12 px-8">
                                        <div className=" flex items-center justify-center space-x-8 border-b pb-12">
                                            {props.gateways.map(
                                                (gateway, index) => (
                                                    <div key={index}>
                                                        {gateway.status ==
                                                            "approved" && (
                                                            <div
                                                                onClick={() => {
                                                                    setStatus(
                                                                        gateway.id
                                                                    );
                                                                    setCharge(
                                                                        gateway.charge
                                                                    );
                                                                }}
                                                                className={
                                                                    status ===
                                                                    gateway.id
                                                                        ? "border rounded-lg cursor-pointer"
                                                                        : " cursor-pointer"
                                                                }
                                                            >
                                                                <img
                                                                    className=" w-40 h-28 object-contain p-5"
                                                                    src={
                                                                        gateway.logo
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div>
                                            <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl mt-5">
                                                <table className="text-left w-full">
                                                    <thead className="text-slate-700 font-normal table-bg">
                                                        <tr className=" font-medium">
                                                            <td className="px-8 py-5 text-center">
                                                                {t("Name")}
                                                            </td>
                                                            <td className="px-8 py-5 text-center">
                                                                {t("Amount")}
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                            <td className="px-8 py-4 text-gray-600 font-medium font-mono text-center">
                                                                {
                                                                    props.plan
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="px-8 py-4  text-gray-600 font-medium font-mono text-center">
                                                                {props.currency}
                                                                {
                                                                    props.plan
                                                                        .price
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                            <td className="px-8 py-4 text-gray-600 font-medium font-mono text-center">
                                                                {t("Charge")}
                                                            </td>
                                                            <td className="px-8 py-4  text-gray-600 font-medium font-mono text-center">
                                                                {props.currency}
                                                                {charge}
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                            <td className="px-8 py-4 text-gray-600 font-medium font-mono text-center">
                                                                {t("Tax")}(
                                                                {
                                                                    props.tax_percentage
                                                                }
                                                                %)
                                                            </td>
                                                            <td className="px-8 py-4  text-gray-600 font-medium font-mono text-center">
                                                                {props.currency}
                                                                {tax}
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                            <td className="px-8 py-4 text-gray-600 font-medium font-mono text-center">
                                                                {t("Total")}
                                                            </td>
                                                            <td className="px-8 py-4  text-gray-600 font-medium font-mono text-center">
                                                                {props.currency}
                                                                {total}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {loading ? (
                                            <div className=" flex items-center justify-center h-60 mt-10">
                                                <Spinner
                                                    size={20}
                                                    width={20}
                                                    strokeWidth={1}
                                                    strokeColor={
                                                        "stroke-slate-400"
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className=" text-center pt-5">
                                                {props.gateways.map(
                                                    (gateway, index) =>
                                                        status ===
                                                            gateway.id && (
                                                            <div
                                                                key={index}
                                                                className="payment-select flex justify-center w-3/4 m-auto"
                                                            >
                                                                {status === 2 &&
                                                                    gateway.status ==
                                                                        "approved" &&
                                                                    clientSecret && (
                                                                        <Elements
                                                                            options={
                                                                                options
                                                                            }
                                                                            stripe={
                                                                                stripePromise
                                                                            }
                                                                        >
                                                                            <CheckoutForm
                                                                                url={
                                                                                    props.url
                                                                                }
                                                                            />
                                                                        </Elements>
                                                                    )}
                                                                {status === 1 &&
                                                                    gateway.status ==
                                                                        "approved" && (
                                                                        <PayPalScriptProvider
                                                                            className="w-full"
                                                                            options={{
                                                                                "client-id":
                                                                                    props
                                                                                        .data
                                                                                        .PAYPAL_CLIENT_ID
                                                                            }}
                                                                        >
                                                                            <PayPalButtons
                                                                                createOrder={(
                                                                                    data,
                                                                                    actions
                                                                                ) => {
                                                                                    const total =
                                                                                        props
                                                                                            .plan
                                                                                            .price +
                                                                                        props.paypal_charge +
                                                                                        props.tax;
                                                                                    const roundedTotal =
                                                                                        Math.round(
                                                                                            total *
                                                                                                100
                                                                                        ) /
                                                                                        100; // Round to two decimal places

                                                                                    return actions.order.create(
                                                                                        {
                                                                                            purchase_units:
                                                                                                [
                                                                                                    {
                                                                                                        amount: {
                                                                                                            value: roundedTotal
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                        }
                                                                                    );
                                                                                }}
                                                                                onApprove={(
                                                                                    data,
                                                                                    actions
                                                                                ) => {
                                                                                    return actions.order
                                                                                        .capture()
                                                                                        .then(
                                                                                            (
                                                                                                details
                                                                                            ) => {
                                                                                                const name =
                                                                                                    details
                                                                                                        .payer
                                                                                                        .name
                                                                                                        .given_name;
                                                                                                Inertia.get(
                                                                                                    props
                                                                                                        .data
                                                                                                        .url +
                                                                                                        "user/payment/success?status=true&method=paypal"
                                                                                                );
                                                                                            }
                                                                                        );
                                                                                }}
                                                                            />
                                                                        </PayPalScriptProvider>
                                                                    )}
                                                            </div>
                                                        )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </App>
        </>
    );
}
