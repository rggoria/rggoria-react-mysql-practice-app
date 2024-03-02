import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.description || !book.cover) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios
        .put("http://localhost:8800/book/" + bookId, book)
        .then((res) => {
          console.log(res);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 justify-center items-center">
      <div className="w-1/2 bg-white rounded p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Selected Book</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 block w-full rounded-md border border-gray-700 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter Title..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 p-2 block w-full rounded-md border border-gray-700 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter Description..."
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cover"
              className="block text-sm font-medium text-gray-700"
            >
              Cover
            </label>
            <input
              type="text"
              id="cover"
              name="cover"
              className="mt-1 p-2 block w-full rounded-md border border-gray-700 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter Cover..."
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
