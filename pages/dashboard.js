import {
  collection,
  onSnapshot,
  query,
  doc,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import moment from "moment";
import Card from "../components/Card";
import getAccounts from "../components/web3Func";
import Link from "next/link";

function Dashboard() {
  const [account, updateAccount] = useState(null);
  const [blogs, setBlogs] = useState([]);

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

    // get the collection which is named as todos
    const collectionRef = collection(db, "mblog");

    // Now we query the collection and order it by the timestamp
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      setBlogs(
        QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <div className=" overflow-auto bg-black h-screen p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {account ? (
        blogs.map(
          (blog) =>
            blog.address == account.toLowerCase() && (
              <div key={blog.id}>
                <Link href="/blog/[id]" as={`/blog/${blog.id}`}>
                  <a>
                    <Card
                      timestamp={moment(blog.timestamp).format(
                        "MMM Do YY, h:mm:ss a"
                      )}
                      description={blog.description}
                      title={blog.title}
                      id={blog.id}
                    ></Card>
                  </a>
                </Link>
              </div>
            )
        )
      ) : (
        <div className="justify-start items-center">
          <button
            type="button"
            onClick={async () => {
              updateAccount(await getAccounts());
            }}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            <img
              className="w-6 h-5 mr-2 -ml-1"
              src="/images/metamaskLogo.svg"
              alt="Metamask Logo"
            />
            Connect with MetaMask
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
