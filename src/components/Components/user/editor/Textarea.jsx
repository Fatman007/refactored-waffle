export default function Textarea({ label, name, placeholder, value, className, onHandleChange }){
    return (
        <>
            <label className=" text-slate-700 text-base font-normal">{label}</label>
            <textarea name={name} value={value} onChange={(e) => onHandleChange(e)} cols="30" rows="6" placeholder={placeholder} className={`w-full rounded-lg mt-1 border border-gray-300 py-3 px-4 text-black`+ className}></textarea>
        </>
    )
}
