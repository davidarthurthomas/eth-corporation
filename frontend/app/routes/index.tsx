import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Header from '~/components/header';

export default function Index() {

  const { Moralis, isInitialized, authenticate, isAuthenticated, isAuthenticating, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {

    }
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Log in using Moralis",
      })
      .then(function (user) {
        console.log("Logged in as ", user);
        console.log(user!.get("ethAddress"));
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("Logged out");
  }

  return (
    <Header />
  );
}
