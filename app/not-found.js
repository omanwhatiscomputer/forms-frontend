/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="main flex flex-col justify-center items-center">
            <h2 className="pt-20 font-bold">
                <span className="text-xl">404| </span>Not Found
            </h2>
            <p>Could not find requested resource</p>
            <Link className="text-primary" href="/">
                Return Home
            </Link>
        </main>
    );
}
