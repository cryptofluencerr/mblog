import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import moment from "moment";
import { toast } from "react-toastify";
import getAccounts from "../../components/web3Func";

// id being fetched with SSR Server Side Rendering
function Blog({ id }) {
  const [account, updateAccount] = useState(null);
  const [detail, setDetail] = useState({
    title: "",
    description: "",
    timestamp: "",
    id: "",
  });
  let router = useRouter();

  useEffect(() => {
    (async () => {
      // Fetching data from DB with the help of id
      const docRef = doc(db, "mblog", id);
      try {
        const docSnap = await getDoc(docRef);
        // If data exists then set the State
        if (docSnap.exists()) {
          setDetail({
            ...detail,
            title: docSnap.data().title,
            description: docSnap.data().description,
            timestamp: docSnap.data().timestamp?.toDate().getTime(),
            address: docSnap.data().address,
            id: id,
          });
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    })();

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

  /* If the blog owner have posted an update 
  the blog gets updated and the owner is routed to the homepage 
  */
  const onSubmit = async () => {
    if (detail?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "mblog", id);

      // Updating the Blog in DB
      await updateDoc(docRef, { ...detail, timestamp: serverTimestamp() });

      toast.success(`Successfully updated ${detail.title}`);

      setDetail({
        title: "",
        description: "",
        timestamp: "",
        id: "",
        address: "",
      });

      // User being redirected to the homepage
      setTimeout(() => router.push("/"), 3000);
    } else {
      const collectionRef = doc(db, "mblog");
      // const blogUpdated = ;
      const docRef = await addDoc(collectionRef, {
        ...detail,
        timestamp: serverTimestamp(),
        address: account,
      });

      setDetail({
        title: "",
        description: "",
        timestamp: "",
        id: "",
        address: "",
      });
      router.push("/");
    }
  };

  /* If the blog owner deletes the blog,
  it gets deleted and the owner is redirected to the homepage 
  */
  const deleteBlog = async () => {
    const docRef = doc(db, "mblog", id);
    // Deleting the Blog from DB
    await deleteDoc(docRef);
    toast.success(`Deleted ${detail.title}`);
    router.push("/");
  };

  return (
    <div className=" h-screen bg-black">
      {
        <div className=" justify-center p-5 m-2">
          <div className="max-w-xl">
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>

            <input
              label="title"
              value={detail.title}
              onChange={(e) => setDetail({ ...detail, title: e.target.value })}
              type="text"
              id="small-input"
              placeholder="Enter Title..."
              className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="text-white mt-5 truncate">By: {detail.address}</div>

          <div className="text-white mt-5 truncate">
            Last Updated:{" "}
            {moment(detail.timestamp.seconds).format("MMM Do YY, h:mm:ss a")}
          </div>
          <div className="py-5 max-w-2xl">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              label="description"
              value={detail.description}
              onChange={(e) =>
                setDetail({ ...detail, description: e.target.value })
              }
              id="message"
              rows={11}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Blog..."
              defaultValue={""}
            />
          </div>

          {account && detail.address === account && (
            /* If an account is there the account is equal to the address who have
            posted this blog then only button shows up,
            so this requires Metamask
            */
            <div>
              <button
                onClick={onSubmit}
                className="object-right inline-flex items-center justify-center p-0.5 mb-2 mr-2  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-purple-500 group-hover:from-purple-400 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-500"
              >
                <span className="object-right px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {detail?.hasOwnProperty("timestamp") ? "Update" : "Add"}
                </span>
              </button>
              <button
                onClick={deleteBlog}
                className="object-right inline-flex items-center justify-center p-0.5 mb-2 mr-2  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-400 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-400 dark:focus:ring-red-500"
              >
                <span className="object-right px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default Blog;

// Server Side rendering in next.js
Blog.getInitialProps = ({ query }) => {
  return {
    id: query.id,
  };
};
