import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis"

export default function Header() {
    const { authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();
    const [address, setAddress] = useState<any>("");

    useEffect(() => {
        if (isAuthenticated) {
            setAddress(user?.get("ethAddress"));
        }
    }, [isAuthenticated, user]);

    const handleConnect = async () => {
        if (!isAuthenticated) {
            await authenticate({signingMessage: "Connect to DAO using Metamask"})
            .then((user) => {
                console.log("User: ", user);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }
    }

    const handleLogout = async () => {
        if (!isAuthenticating) {
            await logout()
        }
    }

    return (
        <header className='flex flex-row justify-end items-center px-36 py-12'>
            {isAuthenticated && (
                <h1 className='text-xl font-mono w-48 truncate'>
                    {address}
                </h1>
            )}
            <button onClick={isAuthenticated ? handleLogout : handleConnect} className='text-xl font-mono border border-black rounded-lg px-4 py-2 ml-2'>
                {isAuthenticated ? "Sign out" : "Connect with Metamask"}
            </button>
        </header>
    )
}