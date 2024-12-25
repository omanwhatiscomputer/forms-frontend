/* eslint-disable react/prop-types */
import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const NavBarToggler = ({ isToggled, setIsToggled, setSearchIsToggled }) => {
    const handleToggle = (e) => {
        const checked = e.target.checked;
        setIsToggled(checked);
        setSearchIsToggled(false);
    };

    return (
        <div className="mr-4 md:hidden">
            <input
                id="toggler"
                type="checkbox"
                value="toggled"
                className="hidden"
                checked={isToggled}
                onChange={handleToggle}
            />
            <label htmlFor="toggler" className="cursor-pointer">
                <HiOutlineMenuAlt1
                    className={`text-xl hover:text-primary ${
                        isToggled ? "text-primary" : "text-foreground"
                    }`}
                />
            </label>
        </div>
    );
};

export default NavBarToggler;
