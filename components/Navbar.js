import React, { useEffect, useState } from "react";
import Link from "next/link";
import getAccounts from "./web3Func";

const Navbar = () => {
  const [account, updateAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      (async () => {
        if (!account) {
          if (await window.ethereum._metamask.isUnlocked()) {
            updateAccount(await getAccounts());
          } else updateAccount(null);
        }
      })();

      window.ethereum._metamask.isUnlocked().then(async (bool) => {
        window.ethereum.on("accountsChanged", async () => {
          if (await window.ethereum._metamask.isUnlocked()) {
            updateAccount(await getAccounts());
          } else updateAccount(null);
        });
      });
    }
  }, [account]);

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
              <img className="w-9 h-9" src="/images/logo.png" alt="" />

              <span className="ml-3 text-xl">MBLOG</span>
            </a>
          </Link>

          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link href="/dashboard">
              <a className="mr-5 hover:text-white">Dashboard</a>
            </Link>
            <Link href="/create">
              <a className="mr-5 hover:text-white">Create Blog</a>
            </Link>
            {/* <a className="mr-5 hover:text-white">Third Link</a>
            <a className="mr-5 hover:text-white">Fourth Link</a> */}
          </nav>
          {!account ? (
            <button
              onClick={async () => updateAccount(await getAccounts())}
              className="inline-flex items-center max-w-lg bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            >
              <img
                src="/images/metamaskLogo.svg"
                className="mr-2"
                alt="Metamask Logo"
                height="15"
                width="25"
              />
              Connect
            </button>
          ) : (
            <div>Address: {account}</div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
