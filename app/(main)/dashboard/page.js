/* eslint-disable react/react-in-jsx-scope */

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
const Dashboard = () => {
    return (
        <main className="main">
            <p>Dashboard</p>
            <Link href={`/myforms/createform/${uuidv4()}`}>
                CreateForm
            </Link>{" "}
            <br />
            <Link
                href={`/myforms/updateform/${"13049658-3810-4fdf-aba6-c8e8d3961fc4"}`}
            >
                UpdateSpecificForm
            </Link>
        </main>
    );
};

export default Dashboard;
