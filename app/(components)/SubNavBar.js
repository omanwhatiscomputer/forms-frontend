/* eslint-disable react/prop-types */
"use client";
import { selectAuthorId } from "@/lib/features/form/formSlice";
import { selectUserId } from "@/lib/features/general/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const SubNavBar = ({ formId }) => {
    const pathname = usePathname();
    const authorId = useSelector((state) => selectAuthorId(state, formId));
    const userId = useSelector((state) => selectUserId(state));
    const styles = `hover:underline hover:text-red-800`;
    return (
        <div className="flex items-center justify-center">
            <div className="flex justify-between items-center w-[240px]">
                {authorId && authorId === userId && (
                    <>
                        <div>
                            <Link
                                className={`${styles} ${
                                    pathname.split("/")[3] === "details"
                                        ? "text-primary"
                                        : "text-sky-400"
                                }`}
                                href={`/formdet/${formId}/details`}
                            >
                                Details
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`${styles} ${
                                    pathname.split("/")[3] === "responses"
                                        ? "text-primary"
                                        : "text-sky-400"
                                }`}
                                href={`/formdet/${formId}/responses`}
                            >
                                Responses
                            </Link>
                        </div>
                        <div>
                            <Link
                                className={`${styles} ${
                                    pathname.split("/")[3] === "summary"
                                        ? "text-primary"
                                        : "text-sky-400"
                                }`}
                                href={`/formdet/${formId}/summary`}
                            >
                                Summary
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubNavBar;
