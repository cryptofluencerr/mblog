import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-900 w-full body-font flex flex-wrap  md:flex-row">
      <div className="  flex flex-wrap  w-full p-5 flex-col text-gray-400 bg-gray-900 body-font md:flex-row items-center  sticky bottom-0">
        <Link href="/">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <img className="w-9 h-9" src="/images/logo.png" alt="" />

            <span className="ml-3 text-xl">MBLOG</span>
          </a>
        </Link>

        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2020 MBLOG —
          <a
            href="https://www.instagram.com/cryptofluencerr"
            target="_blank"
            className="text-gray-500 ml-1"
            rel="noopener noreferrer"
          >
            @cryptofluencerr
          </a>
        </p>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-end sm:justify-around">
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
      </div>
    </footer>
  );
}

export default Footer;
