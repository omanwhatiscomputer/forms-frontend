/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

const SectionDivider = ({ content, className }) => {
    return (
        <p
            className={`pb-0 pt-2 mt-4 border-t-2 leading-[0.1em] border-slate-300 dark:border-gray-700 ${className}`}
        >
            <span className="absolute -translate-y-5 bg-background text-gray-400 text-sm cursor-default select-none">
                {content}&nbsp;
            </span>
        </p>
    );
};

export default SectionDivider;
