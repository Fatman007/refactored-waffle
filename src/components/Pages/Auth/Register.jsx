import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register({ logo, global, isShowAgree }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if(localStorage.getItem('email'))
        {
            setData('email', localStorage.getItem('email'))
        }

        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className=' 2xl:flex xl:flex lg:block'>
                <div className='2xl:w-1/2 xl:w-1/2 flex items-center justify-center min-h-screen my-10'>

                    <div className="2xl:px-40 xl:px-40 lg:px-80 md:px-20 w-full sm:px-20 xs:px-5">
                        <div className=' mb-8'>
                            <Link href='/'>
                                <img className=' h-10' src={logo} alt="" />
                            </Link>
                        </div>
                        <div className='mb-8'>
                            <h2 className=' font-sans text-3xl text-slate-600 font-medium'>Create New Account </h2>
                            <p className=' text-gray-400 font-light my-1'>Please faster you fill up, the faster you will go to dashboard.</p>
                        </div>
                        <div className=' grid grid-cols-2 gap-4 my-5 mb-0'>
                            {
                                global.google && (
                                    <a href='/auth/login/google' className=''>
                                        <div className='text-center flex items-start justify-center border border-slate-100 rounded-lg py-3.5 font-medium mb-3'>
                                            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="22" height="22" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve"><g><path fill="#167ee6" d="M472.4 213.9H281.9c-8.4 0-15.2 6.8-15.2 15.2V290c0 8.4 6.8 15.2 15.2 15.2h107.3c-11.7 30.5-33.7 56-61.6 72.2l45.7 79.2C446.6 414.2 490 339.7 490 256.4c0-11.9-.9-20.4-2.6-29.9-1.4-7.3-7.7-12.6-15-12.6z" data-original="#167ee6"></path><path fill="#12b347" d="M256.5 396.6c-52.5 0-98.3-28.7-122.9-71.1l-79.2 45.6C94.7 441 170.2 488 256.5 488c42.4 0 82.3-11.4 116.8-31.3v-.1l-45.7-79.2c-21 12.2-45.2 19.2-71.1 19.2z" data-original="#12b347"></path><path fill="#0f993e" d="M373.2 456.7v-.1l-45.7-79.2c-20.9 12.1-45.1 19.2-71 19.2V488c42.4 0 82.3-11.4 116.7-31.3z" data-original="#0f993e"></path><path fill="#ffd500" d="M114.4 254.5c0-25.9 7.1-50.1 19.2-71l-79.2-45.6C34.4 172.2 23 212 23 254.5s11.4 82.3 31.4 116.6l79.2-45.6c-12.2-20.9-19.2-45.1-19.2-71z" data-original="#ffd500" class=""></path><path fill="#ff4b26" d="M256.5 112.4c34.2 0 65.7 12.2 90.2 32.4 6.1 5 14.9 4.6 20.4-.9l43.1-43.1c6.3-6.3 5.8-16.6-.9-22.4C368.2 42.6 314.7 21 256.5 21 170.2 21 94.7 68 54.4 137.9l79.2 45.6c24.6-42.4 70.4-71.1 122.9-71.1z" data-original="#ff4b26"></path><path fill="#d93f21" d="M346.7 144.8c6.1 5 14.9 4.6 20.4-.9l43.1-43.1c6.3-6.3 5.8-16.6-.9-22.4C368.2 42.6 314.7 21 256.5 21v91.4c34.2 0 65.7 12.1 90.2 32.4z" data-original="#d93f21"></path></g></svg> <span className=' text-base text-slate-600'>Google</span>
                                        </div>
                                    </a>
                                )
                            }
                            {
                                global.facebook && (
                                    <a href='/auth/login/facebook' className=''>
                                        <div className='text-center flex items-start justify-center border border-slate-100 rounded-lg py-3.5 font-medium mb-3'>
                                            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="22" height="22" x="0" y="0" viewBox="0 0 512 512"  xml:space="preserve"><g><path fill="#1877f2" d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z" data-original="#1877f2" class=""></path><path fill="#ffffff" d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z" data-original="#ffffff" class=""></path></g></svg> <span className='  text-base text-slate-600'>Facebook</span>
                                        </div>
                                    </a>
                                )
                            }
                            {
                                global.github && (
                                    <a href='/auth/login/github' className=''>
                                        <div className='text-center flex items-start justify-center border border-slate-100 rounded-lg py-3.5 font-medium mb-3'>
                                            <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="22" height="22" x="0" y="0" viewBox="0 0 24 24"  xml:space="preserve"><g><path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" fill="#000000" data-original="#000000" class=""></path></g></svg> <span className='  text-base text-slate-600'>Github</span>
                                        </div>
                                    </a>
                                )
                            }

                        </div>
                        <div className='flex items-center justify-between my-5 mb-3'>
                            <span className=' w-full border-b border-slate-100'></span>
                            <span className=' mx-5 text-slate-400'>OR</span>
                            <span className=' w-full border-b border-slate-100'></span>
                        </div>
                        <form onSubmit={submit} className=''>
                            <div className=' mb-4'>
                                <label className=' block text-left text-slate-500 mb-1 text-base' htmlFor="name">Name</label>
                                <input onChange={(e) => onHandleChange(e)} className=' w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5' type="text" name="name" id='name' />
                                <InputError message={errors.name} className="mt-1 text-left" />
                            </div>
                            <div className=' mb-4'>
                                <label className=' block text-left text-slate-500 mb-1 text-base' htmlFor="email">Email Address</label>
                                <input onChange={(e) => onHandleChange(e)} className=' w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5' type="email" name="email" id='email' defaultValue={data.email} />
                                <InputError message={errors.email} className="mt-1 text-left" />
                            </div>
                            <div className=' mb-4'>
                                <label className=' block text-left text-slate-500 mb-1 text-base' htmlFor="password">Password</label>
                                <input className=' w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5' type="password" onChange={(e) => onHandleChange(e)}  name="password" id='password' />
                                <InputError message={errors.password} className="mt-1 text-left" />
                            </div>
                            <div className=' mb-4'>
                                <label className=' block text-left text-slate-500 mb-1 text-base' htmlFor="password_confirmation">Confirm Password</label>
                                <input className=' w-full border border-slate-100 rounded-lg focus:ring-0 focus:border px-5 py-2.5' type="password" onChange={(e) => onHandleChange(e)}  name="password_confirmation" id='password_confirmation' />
                                <InputError message={errors.password_confirmation} className="mt-1 text-left" />
                            </div>
                            {
                                isShowAgree && (
                                    <div className="flex items-center mb-1.5">
                                        <input required checked id="default-checkbox" type="checkbox" name="agree" className="w-4 h-4 text-slate-600 font-medium bg-white border-gray-300 rounded"/>
                                        <label htmlFor="default-checkbox" className="ml-2 text-base font-normal text-slate-500">I agree to <Link href='/terms/condition' className=' text-slate-600 font-medium'>Terms & Condition.</Link></label>
                                    </div>
                                )
                            }
                            <button type='submit' className=' mt-2 py-3 rounded-lg bg-gradient text-white w-full mb-2'>Register</button>
                            <p className=' text-gray-500 font-light text-sm text-center'>Already Have An Account? <Link className='text-slate-600 font-medium' href='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
                <div className=' w-1/2 bg-gradient min-h-screen 2xl:block xl:block xs:hidden'>
                    <div className='flex items-center justify-center h-full'>
                        <img className=' mx-auto h-fit px-12' src="/frontend/img/login.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}
