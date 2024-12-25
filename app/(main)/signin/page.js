import SignInFields from "@/app/(components)/SignInFields";

/* eslint-disable react/react-in-jsx-scope */
const SignIn = () => {
    return (
        <main className="main flex justify-center md:items-center w-full md:h-screen">
            <div className="min-w-96 mx-2 px-4 border-2 mt-4 md:px-8 md:py-8 lg:py-12 xl:py-16 border-foreground border-opacity-40 rounded-lg md:min-w-[32rem] lg:min-w-[40rem] xl:min-w-[50rem]">
                <div className="text-lg -translate-y-4 md:-translate-y-12 lg:-translate-y-16 xl:-translate-y-20 bg-background table pl-1 pr-2 xl:text-2xl lg:text-xl md:text-xl">
                    Sign In
                </div>
                <SignInFields />
            </div>
        </main>
    );
};

export default SignIn;
