/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

const TextInput = ({ type, name, placeholder, className }) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={`border-[2px] caret-primary focus:border-primary bg-background w-full rounded-2xl leading-10 pl-4 mb-4 focus:outline-none focus:ring-0 ${className}`}
        />
    );
};

export default TextInput;
