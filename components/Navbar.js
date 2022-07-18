import React, { useEffect, useState } from "react";
import Link from "next/link";
import getAccounts from "./web3Func";

const Navbar = () => {
  const [account, updateAccount] = useState(null);
  const [copyText, setCopytext] = useState("COPY");

  useEffect(() => {
    // Here I am checking whether Metamask is installed
    if (window.ethereum) {
      (async () => {
        // Whether account address is there or not
        if (!account) {
          // Check whether metamask is unlocked
          if (await window.ethereum._metamask.isUnlocked()) {
            /* Using getAccounts function that I have stored in Web3func.js inside components
              to get the address[0] */
            updateAccount(await getAccounts());
          } else updateAccount(null);
        }
      })();

      // Metamask function check the if the account has been changed
      window.ethereum.on("accountsChanged", async () => {
        if (await window.ethereum._metamask.isUnlocked()) {
          updateAccount(await getAccounts());
        } else updateAccount(null);
      });
    }
  }, [account]);

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
              <img className="w-9 h-9" src="/images/logo.png" alt="" />

              <span className="ml-3 text-2xl">MBLOG</span>
            </a>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link href="/dashboard">
              <a className="mr-5 hover:text-white">Dashboard</a>
            </Link>
            <Link href="/create">
              <a className="mr-5 hover:text-white">Create Blog</a>
            </Link>

            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-end sm:justify-around ">
              <a
                className="ml-3 text-gray-400"
                href="https://www.twitter.com/cryptofluencerr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                className="ml-3 text-gray-400"
                href="https://www.instagram.com/cryptofluencerr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a
                className="ml-3 text-gray-400"
                href="https://www.linkedin.com/in/karan-singh-chauhan-68305112a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </nav>

          {!account ? (
            /** If address is not there show Metamask Connect button icon */

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
            /** If address is there the render the address */
            <div className="mt-2 my-0 justify-center items-center">
              Address: {account.slice(0, 20).toUpperCase()}...
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  setCopytext("Copied");
                  setTimeout(() => setCopytext("Copy"), 300);
                }}
                className="ml-3  text-sm border w-15  border-gray-500 rounded p-2 transition"
              >
                {copyText}
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
