import { addDoc, serverTimestamp, collection } from "@firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getAccounts from "../components/web3Func";
import { toast } from "react-toastify";

const Create = () => {
  const [account, updateAccount] = useState(null);
  const [detail, setDetail] = useState({ title: "", description: "" });
  let router = useRouter();

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

  const onSubmit = async () => {
    if (window.ethereum) {
      if (account) {
        const collectionRef = collection(db, "mblog");
        await addDoc(collectionRef, {
          ...detail,
          address: account.toLowerCase(),
          timestamp: serverTimestamp(),
        });
        toast.success(`${detail.title} is added successfully`);
        setDetail({ title: "", description: "" });
        router.push("/");
      } else {
        toast.warning("Connect Wallet");
        return;
      }
    } else {
      updateAccount(await getAccounts());
      return;
    }
  };

  return (
    <div className="p-10 h-screen bg-black">
      <div>
        <div className="max-w-xl justify-start">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          <input
            autoComplete="off"
            label="title"
            value={detail.title}
            onChange={(e) => setDetail({ ...detail, title: e.target.value })}
            type="text"
            id="small-input"
            placeholder="Enter Title..."
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="py-5 max-w-2xl">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            autoComplete="off"
            label="description"
            value={detail.description}
            onChange={(e) =>
              setDetail({ ...detail, description: e.target.value })
            }
            id="message"
            rows={11}
            className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your Blog..."
            defaultValue={""}
          />
        </div>
        <button
          onClick={onSubmit}
          className="object-right inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-purple-500 group-hover:from-purple-400 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-500"
        >
          <span className="object-right px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
      </div>
    </div>
  );
};

export default Create;
