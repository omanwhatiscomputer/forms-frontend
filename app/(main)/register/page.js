/* eslint-disable react/react-in-jsx-scope */

import RegistrationFields from "@/app/(components)/RegistrationFields";

const Register = () => {
    return (
        <main className="main flex justify-center md:items-center w-full md:h-screen">
            <div className="min-w-96 mx-2 px-4 border-2 mt-4 md:px-8 md:py-4 border-foreground border-opacity-40 rounded-lg md:min-w-[32rem] lg:min-w-[40rem] xl:min-w-[50rem]">
                <div className="text-lg -translate-y-4 md:-translate-y-8 bg-background table pl-1 pr-2 xl:text-2xl lg:text-xl md:text-xl">
                    Register
                </div>
                <RegistrationFields />
            </div>
        </main>
    );
};

export default Register;
