import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, logo }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-violet-50">
            <div>
                <Link href="/">
                    <img className=' h-10' src={logo} alt="" />
                </Link>
            </div>

            <div className="w-1/3 mt-6 px-8 py-14 bg-white overflow-hidden sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
