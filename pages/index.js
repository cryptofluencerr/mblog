import Head from "next/head";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import moment from "moment";
import Card from "../components/Card";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // get the collection which is named as todos
    const collectionRef = collection(db, "mblog");

    // Now we query the collection and order it by the timestamp
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    /* Setting the state i.e putting fetched data into a state 
    so we can fetch it all over the page
    */
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
    <div className="bg-black h-full  overflow-auto ">
      <Head>
        <title>MBLOG</title>
        <meta
          name="MBLOG"
          content="MBLOG, is a decentralised blogging platform which uses metamask as authentication"
        />
      </Head>
      <section className="justify-center m-2  ">
        <div className="p-5  flex flex-wrap gap-3">
          {blogs.map((blog) => (
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
          ))}
        </div>
      </section>
    </div>
  );
}
