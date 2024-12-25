/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
const CustomPlaceholder = ({ children, isFocused, className }) => (
    <div
        className={className}
        style={{
            opacity: isFocused ? 0.0 : 0.6,
            pointerEvents: "none",
            userSelect: "none",
            color: "gray",
        }}
    >
        {children}
    </div>
);

export default CustomPlaceholder;
