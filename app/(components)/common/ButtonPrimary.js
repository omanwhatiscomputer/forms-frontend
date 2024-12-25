/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
const ButtonPrimary = ({ children, handleClick, type }) => {
    return (
        <button
            className="rounded-md bg-primary py-2.5 px-5 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg focus:bg-red-900 focus:shadow-none active:bg-primary hover:bg-red-900 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 focus:ring-1 focus:ring-foreground"
            type={type}
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
