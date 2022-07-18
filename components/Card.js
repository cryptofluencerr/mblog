import React from "react";

// This is a Card to render blog Title, Date & Time and Description preview

function Card({ timestamp, description, title, id }) {
  return (
    <div className="flex-wrap inline-block p-3 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description.slice(0, 50)}...
      </p>
      <p className="text-xs text-gray-700 dark:text-gray-400 ">{timestamp}</p>
    </div>
  );
}

export default Card;
