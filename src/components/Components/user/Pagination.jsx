import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Pagination({ links }) {

    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-indigo-500 hover:text-white focus:border-primary focus:text-primary bg-indigo-500 text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-indigo-500 hover:text-white focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                        link.url === null ?
                                (<div
                                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></div>) :

                                (<Link
                                            className={getClassName(link.active)}
                                            href={ link.url }
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        ></Link>)
                                ))}
                </div>
            </div>
        )
    );
}
