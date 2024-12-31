/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
    addAuthorizedUser,
    removeAuthorizedUser,
    selectFromAuthorizedUsers,
    updateFormAccessControl,
} from "@/lib/features/form/formSlice";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import SectionDivider from "../../common/SectionDivider";
import { makeClientGetAllUsersAutocompleteRequest } from "@/app/utils/client.api.utils";
import {
    selectUserEmail,
    selectUserFullName,
    selectUserId,
} from "@/lib/features/general/authSlice";

//selectFormtemplateAuthorizedUsers
//selectuserEmail
//selectUserNormalizedname
//handleSuggestionClick
//handleRemoveUserFromFormAuth

const FormAccessModal = ({
    className,
    formId,
    setOpenModal,
    openModal,
    title,
    value,
}) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const authorEmail = useSelector(selectUserEmail);
    const authorNormalizedName = useSelector(selectUserFullName);
    const authorId = useSelector(selectUserId);
    const authorizedUsers = useSelector((state) =>
        selectFromAuthorizedUsers(state, formId)
    );

    const handleRemoveUserFromFormAuthGroup = ({ email }) => {
        dispatch(removeAuthorizedUser({ id: formId, email: email }));
    };

    const handleSuggestionClick = ({ userId, normalizedName, email }) => {
        dispatch(
            addAuthorizedUser({
                au: {
                    UserId: userId,
                    NormalizedName: normalizedName,
                    Email: email,
                    FormTemplateId: formId,
                    AuthorId: authorId,
                    AuthorNormalizedName: authorNormalizedName,
                    AuthorEmail: authorEmail,
                },
            })
        );
        setIsFocused(false);
        setSearchTerm("");
    };

    useEffect(() => {
        const getUsers = async () => {
            const { status, body } =
                await makeClientGetAllUsersAutocompleteRequest(searchTerm);
            if (status < 300) {
                setUsers(
                    body.filter(
                        (u) =>
                            u.email !== authorEmail &&
                            !authorizedUsers
                                .map((au) => au.Email)
                                .includes(u.email)
                    )
                );
            }
        };
        if (searchTerm.length > 2) {
            getUsers();
        } else {
            setUsers([]);
        }
    }, [isFocused, searchTerm]);

    return (
        <Modal
            show={openModal}
            size="md"
            onClose={() => {
                setOpenModal(false);
                setSearchTerm("");
            }}
        >
            <Modal.Header className="bg-slate-200 dark:bg-background">
                {title}
            </Modal.Header>
            <Modal.Body className="bg-background">
                <div className="space-y-6 p-6">
                    <div className="flex">
                        <div className="text-sm translate-y-[13px] translate-x-[18px] w-0 h-0 overflow-visible z-10 pointer-events-none cursor-default">
                            Access:
                        </div>
                        <select
                            value={value}
                            onChange={(e) =>
                                dispatch(
                                    updateFormAccessControl({
                                        accessControl: e.target.value,
                                        id: formId,
                                    })
                                )
                            }
                            name="access"
                            id="access"
                            className={` w-full font-semibold rounded-lg py-3 bg-background pl-20 bg-opacity-50 text-sm border-[1px] focus:ring-0 border-slate-500 dark:border-gray-600 dark:focus:border-primary focus:border-primary hover:text-primary ${className}`}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <div>
                            <SectionDivider
                                content={"Add users"}
                                className={"mb-2"}
                            />
                        </div>
                        <input
                            onFocus={() => setIsFocused(true)}
                            // onBlur={() => setIsFocused(false)}
                            className="w-full focus:ring-0 outline-none border-[2px] border-foreground text-sm dark:border-gray-600 caret-primary dark:focus:border-primary rounded-lg focus:border-primary text-foreground bg-background"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Add user (e.g. Mike Lowe, or john@doe.com)"
                        />
                        {isFocused && users.length > 0 && (
                            <div className="absolute w-full px-1 z-10 rounded-md">
                                {users.map((u) => (
                                    <button
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onClick={() =>
                                            handleSuggestionClick({
                                                userId: u.userId,
                                                normalizedName:
                                                    u.normalizedName,
                                                email: u.email,
                                            })
                                        }
                                        key={u.email}
                                        className="w-[310px] text-left pl-4 border-b-[1px] last:border-b-0 border-gray-500 bg-slate-100  dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white first:rounded-t-md last:rounded-b-md"
                                    >
                                        <span className="font-semibold">
                                            {u.normalizedName}
                                        </span>
                                        <br />
                                        <span className="text-sm">
                                            {u.email}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {authorizedUsers.length > 0 && (
                            <div
                                className="mt-2 border-[2px] rounded-md max-h-56 overflow-y-auto"
                                id="scroll-shadows"
                            >
                                {authorizedUsers.map((au) => (
                                    <div
                                        key={au.UserId}
                                        className="overflow-x-hidden hover:bg-slate-300 dark:hover:bg-gray-800 flex justify-between items-center px-4 py-2 first:rounded-t-md last:rounded-b-md border-b-[1px] border-dashed border-gray-400 last:border-background"
                                    >
                                        <div>{au.NormalizedName}</div>
                                        <div>
                                            <button
                                                type="button"
                                                className="hover:text-primary text-xl"
                                                onClick={() =>
                                                    handleRemoveUserFromFormAuthGroup(
                                                        { email: au.Email }
                                                    )
                                                }
                                            >
                                                <IoMdCloseCircle />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end bg-slate-200 dark:bg-background">
                <Button
                    className="focus:outline-primary focus:ring-primary"
                    color="gray"
                    onClick={() => {
                        setSearchTerm("");
                        setOpenModal(false);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormAccessModal;
