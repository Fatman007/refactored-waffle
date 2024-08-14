export default function Select({ label, name, value, className, onHandleChange, children }){
    return (
        <>
            <label className=" text-slate-700 text-base font-normal">{ label }</label>
            <select name={name} value={value} onChange={(e) => onHandleChange(e)} className={`w-full rounded-lg h-12 mt-2 border border-gray-300 px-5 text-md`+ className}>
                { children }
            </select>
        </>
    )
}
