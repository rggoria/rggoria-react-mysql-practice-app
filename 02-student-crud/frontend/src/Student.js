import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

function Student() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/student/" + id);
      // window.location.reload();
      const updateList = student.filter((user) => user.id !== id);
      setStudent(updateList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to={"/create"} className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Email:</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <Link to={`update/${data.id}`} className="btn btn-primary">
                      Update
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;