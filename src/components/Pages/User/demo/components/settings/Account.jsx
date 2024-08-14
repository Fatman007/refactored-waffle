import InputArea from "@/Components/user/editor/Inputarea";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Account()
{

    const [ name, setName ] = useState()
    const [ email, setEmail ] = useState()
    const [ currentPassword, setCurrentPassword ] = useState()
    const [ password, setPassword ] = useState()
    const [ confirmPassword, setConfirmPassword ] = useState()
    const [ error, setError ] = useState({
        param: '',
        msg: ''
    })

    const {t} = useTranslation('global')

    // useEffect(() => {
    //     setName(props.user.name)
    //     setEmail(props.user.email)

    // }, [props.user])


    const handleSubmit = (e) => {
        e.preventDefault();

        setError({
            param: '',
            msg: ''
        })

        if(!name)
        {
            return setError({
                param: 'name',
                msg: t('The Name Field Is Required')
            })
        }

        if(!email)
        {
            return setError({
                param: 'email',
                msg: t('The Email Field Is Required')
            })
        }

        if(currentPassword)
        {
            if(!currentPassword)
            {
                return setError({
                    param: 'currentPassword',
                    msg: t('The Current Password Field Is Required')
                })
            }

            if(!password)
            {
                return setError({
                    param: 'password',
                    msg: t('The Password Field Is Required')
                })
            }

            if(!confirmPassword)
            {
                return setError({
                    param: 'confirmPassword',
                    msg: t('The Confirm Password Field Is Required')
                })
            }

            if(password != confirmPassword)
            {
                return setError({
                    param: 'password',
                    msg: t("The Confirm Password doesn't match.")
                })
            }
        }

        Inertia.visit('/user/account', {
            method: 'post',
            data: {
                name: name,
                email: email,
                currentPassword: currentPassword,
                password: password,
                confirmPassword: confirmPassword
            },
            onSuccess: page => {
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully Updated!'
                })
            },
            onError: errors => {
                Toast.fire({
                    icon: 'error',
                    title: errors.currentPassword
                })
            },
          })
    }



    return (
        <>
            <div className="2xl:flex lg:flex md:flex sm:block 2xl:space-x-12 xl:space-x-12 lg:space-x-12 md:space-x-12">
                <div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full">
                    <h1 className=" text-slate-600 text-2xl font-medium">{t('Edit Profile Information')}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-8">
                            <InputArea label={t('Name')} onHandleChange={(e) => setName(e.target.value)} />
                            {
                                error && error.param === 'name' && (
                                    <span className=" text-red-500 text-sm">{error.msg}</span>
                                )
                            }
                        </div>
                        <div className="mt-5">
                            <InputArea label={'Email'} type='email' onHandleChange={(e) => setEmail(e.target.value)} />
                            {
                                error && error.param === 'email' && (
                                    <span className=" text-red-500 text-sm">{error.msg}</span>
                                )
                            }
                        </div>
                        <div className=" mt-12">
                            <h5 className="text-slate-600 text-2xl font-medium">{t('Change Your Password')}</h5>
                            <div className="mt-5">
                                <InputArea label={'Current Password'} type={'password'} onHandleChange={(e) => setCurrentPassword(e.target.value)} />
                                {
                                    error && error.param === 'currentPassword' && (
                                        <span className=" text-red-500 text-sm">{error.msg}</span>
                                    )
                                }
                            </div>
                            <div className="mt-5">
                                <InputArea label={t('Password')} type={'password'} onHandleChange={(e) => setPassword(e.target.value)}  />
                                {
                                    error && error.param === 'password' && (
                                        <span className=" text-red-500 text-sm">{error.msg}</span>
                                    )
                                }
                            </div>
                            <div className="mt-5">
                                <InputArea label={t('Confirmation Password')} type={'password'} onHandleChange={(e) => setConfirmPassword(e.target.value)} />
                                {
                                    error && error.param === 'confirmPassword' && (
                                        <span className=" text-red-500 text-sm">{error.msg}</span>
                                    )
                                }
                            </div>
                            <div className=" mt-5 float-right mb-20">
                                <button type="submit" className=" bg-indigo-500 py-3 px-12 text-white text-base rounded-md">{t('Update')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
