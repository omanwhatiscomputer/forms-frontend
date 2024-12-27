/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
const Dashboard = () => {
    return (
        <main className="main">
            <p>Dashboard</p>
            <Link href={`/createform/${uuidv4()}`}>CreateForm</Link>
        </main>
    );
};

export default Dashboard;
