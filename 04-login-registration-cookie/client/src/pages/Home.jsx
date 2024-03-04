import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8800")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          // navigate("/login");
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  });

  const handleDelete = () => {
    axios
      .get("http://localhost:8800/logout")
      .then(() => {
        // location.reload(true);
        setAuth(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
          Welcome to the platform
        </h5>
        {auth ? (
          <>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center">
              You are authorized <span>{name}</span>
            </h3>

            <button
              type="submit"
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleDelete}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center">
              You are not authorized {message}
            </h3>

            <Link
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              to={"/login"}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
