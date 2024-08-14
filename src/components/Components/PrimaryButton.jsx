export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center justify-center px-8 py-3.5 w-full text-center mx-auto bg-gradient border-none border border-transparent rounded-md text-base text-white tracking-widest  active:bg-gray-900 focus:outline-none focus:ring-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
