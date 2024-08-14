import { Inertia } from "@inertiajs/inertia"
import { Link } from "@inertiajs/inertia-react"

export default function Sidebar()
{

    const handleLogout = () => {
        Inertia.get('/logout');
    }

    return (
        <div className="2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/3 xs:w-full mb-12">
            <div className=" border px-8 py-8 rounded-lg">
                <ul>
                    <li className="py-3 text-base text-gray-600 font-medium"><Link href="/user/account"><span className="flex items-center"><i className="ri-user-line mr-2 text-base"></i> <span>Edit Profile</span></span></Link></li>
                    <li className="py-3 text-base text-gray-600 font-medium"><Link href="/user/plan"><span className=" flex items-center"><i className="ri-file-list-3-line mr-2"></i> <span>Select Plan</span></span></Link></li>
                    <li className="py-3 text-base text-gray-600 font-medium"><Link href="/user/payment/history"><span className="flex items-center"><i className="ri-bank-card-line mr-2"></i><span>Payment History</span></span></Link></li>
                    <li className="py-3 text-base text-gray-600 font-medium cursor-pointer"><a onClick={handleLogout}><span className=" flex items-center"><i className="ri-logout-box-line mr-2"></i> <span>Logout</span></span></a></li>
                </ul>
            </div>
        </div>
    )
}
