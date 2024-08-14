export default function InputArea({ label, type, name, value, placeholder, defaultValue, className, onHandleChange }){
    return (
        <>
            <label className=" text-slate-700 text-base font-normal">{label}</label>
            <input type={type ? type : 'text'} name={name} defaultValue={defaultValue} onChange={(e) => onHandleChange(e)} value={value} placeholder={placeholder} className={`w-full rounded-lg mt-1 border border-gray-300 py-3 px-4 text-black h-14`+ className} />
        </>
    )
}
