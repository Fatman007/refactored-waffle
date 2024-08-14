import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status, logo }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <div className=' bg-slate-100 min-h-screen flex items-center justify-center'>
                <div className='bg-white w-1/2 p-16 rounded-2xl text-center'>
                    <svg className=' m-auto' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="60" height="60" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve"><g><linearGradient id="a" x1="256" x2="256" y1=".5" y2="511.5" gradientUnits="userSpaceOnUse"><stop stop-opacity="1" stop-color="#886bf4" offset="0"></stop><stop stop-opacity="1" stop-color="#886bf4" offset="0.062"></stop><stop stop-opacity="1" stop-color="#886bf4" offset="0.186"></stop><stop stop-opacity="1" stop-color="#886bf4" offset="0.265"></stop><stop stop-opacity="1" stop-color="#886bf4" offset="1"></stop></linearGradient><path fill="url(#a)" d="M503.267 202.311a7.386 7.386 0 0 0-3.178-6.067l-70.04-48.52v-44.061a7.38 7.38 0 0 0-2.163-5.22L332.075 2.662A7.38 7.38 0 0 0 326.856.5H113.479C96.078.5 81.92 14.657 81.92 32.059v115.689l-70.009 48.495a7.385 7.385 0 0 0-3.178 6.067c0 .191.02.379.034.568a7.457 7.457 0 0 0-.034.688v257.009c0 28.079 22.832 50.924 50.894 50.924h392.716c28.079 0 50.924-22.845 50.924-50.924V202.821c0-.094-.011-.186-.014-.279.002-.078.014-.153.014-.231zm-20.342.002-52.876 36.648v-73.277zM334.238 25.699l70.604 70.582h-58.83c-6.492 0-11.774-5.282-11.774-11.774zM81.92 165.709v73.24l-52.845-36.635zM59.627 496.736c-4.519 0-8.842-.842-12.833-2.365l191.977-158.975c8.601-7.119 26.723-6.597 35.917 1.043l190.498 157.932a35.967 35.967 0 0 1-12.843 2.365zm418.485-10.825-193.994-160.83c-14.636-12.167-40.738-12.67-54.762-1.055L33.872 485.904c-6.411-6.529-10.375-15.472-10.375-25.328V216.411l61.072 42.338c.329.276.686.52 1.061.736l104.362 72.348a7.343 7.343 0 0 0 4.2 1.316 7.382 7.382 0 0 0 4.212-13.448l-101.72-70.517V32.059c0-9.261 7.534-16.795 16.795-16.795h205.995v69.243c0 14.633 11.905 26.538 26.538 26.538h69.273v138.148L313.686 319.61a7.382 7.382 0 0 0 8.41 12.134l104.361-72.331a7.35 7.35 0 0 0 .867-.601l61.18-42.402v244.166c-.001 9.86-3.971 18.806-10.392 25.335zM178.837 185.248a7.382 7.382 0 0 1 7.382-7.382h139.532a7.382 7.382 0 1 1 0 14.764H186.219a7.381 7.381 0 0 1-7.382-7.382zm0 44.379a7.382 7.382 0 0 1 7.382-7.382h139.532a7.382 7.382 0 1 1 0 14.764H186.219a7.381 7.381 0 0 1-7.382-7.382zm146.914 51.731H186.219a7.382 7.382 0 1 1 0-14.764h139.532a7.382 7.382 0 1 1 0 14.764zM178.837 140.869a7.382 7.382 0 0 1 7.382-7.382h139.532a7.382 7.382 0 1 1 0 14.764H186.219a7.381 7.381 0 0 1-7.382-7.382z" data-original="url(#a)"></path></g></svg>
                    <h2 className=' text-2xl mt-5'>Verify Your Email Address</h2>
                    <p className=' mt-2 text-gray-500'>We have sent an email to verify your email address and active your account. This link in the email will expire in 24 hours. </p>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600 mt-4">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}
                    <form onSubmit={submit}>
                        <div className="mt-5 flex items-center justify-center">
                            <PrimaryButton processing={processing}>Resend Verification Email</PrimaryButton>
                        </div>
                    </form>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
                    >
                        Log Out
                    </Link>
                </div>
            </div>
        </>
    );
}
