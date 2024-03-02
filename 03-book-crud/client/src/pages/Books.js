import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8800/book")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    const fetchAllBooks = async () => {
      try {
        const res = await axios
          .get("http://localhost:8800/book")
          .then((res) => {
            console.log(res);
            setBooks(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const removeBook = async (id) => {
    const updateList = books.filter((book) => book.id !== id);
    setBooks(updateList);
    try {
      await axios.delete("http://localhost:8800/book/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex h-screen bg-blue-500 justify-center items-center">
        <div className="w-1/2 bg-white rounded p-3">
          <a
            href="/add"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add +
          </a>
          <div className="relative overflow-x-auto mt-5 fixed">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Cover</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((data) => (
                  <tr
                    key={data.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                      {data.title}
                    </td>
                    <td className="px-6 py-4">{data.description}</td>
                    <td className="px-6 py-4">
                      {data.cover && <img src={data.cover} alt={data.cover} />}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        to={`update/${data.id}`}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center rounded px-4 py-2 flex-1"
                        style={{ minHeight: "2.5rem" }}
                      >
                        Update
                      </Link>
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-center rounded px-4 py-2 flex-1"
                        style={{ minHeight: "2.5rem" }}
                        onClick={() => removeBook(data.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
