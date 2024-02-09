import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseUtills";
import { useState, useEffect } from "react";
import "../dashboard/Dashboard.css";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
export const Dashboard = ({ logout }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emp, setEmp] = useState([]);
  const empCollectionRef = collection(db, "employees");
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState([]);

  const handleSignOut = () => {
    // localStorage.clear();
    signOut(auth)
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateEmp = async () => {
    console.log("update runnig ..");
    const empDoc = doc(db, "employees", selectedData.id);
    const newFields = { name: selectedData.name, email: selectedData.email };
    await updateDoc(empDoc, newFields);
    getEmployees();
    console.log("empDoc --- ", empDoc, "new fields ----  ", newFields);
  };
  const addNewEmp = async () => {
    const res = await addDoc(empCollectionRef, { name: name, email: email });
    console.log("res--------->", res);
    if (res.id) {
      getEmployees();
    }
  };

  const handleDelete = async (id) => {
    const empDoc = doc(db, "employees", id);
    const newFields = { name: name, email: email };
    console.log("handle delete running.. ");
    await deleteDoc(empDoc, newFields);
    getEmployees();
  };

  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    const data = await getDocs(empCollectionRef);

    setEmp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
      <div>
        <div className="out-dash">
          <h1>
            <Link className="link" to={""}>
              Login
            </Link>
          </h1>
          <h1>
            <Link className="link" to={"/register"}>
              Register
            </Link>
          </h1>
          <button className="btn-dash" onClick={handleSignOut}>
            LogOut{" "}
          </button>
        </div>
        <div className="head">
          <h1>List Of Employees</h1>
        </div>
        <div className="out2">
          {/* <button className="btn-dash">Add employees</button> */}

          <div className="input1">
            <input
              type="text"
              placeholder="Please Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input1">
            <input
              type="text"
              placeholder="Please Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button onClick={addNewEmp} className="btn-dash blue">
              Add New Employee
            </button>
          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th colSpan={2}>Actions</th>
            </tr>
            {emp.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      className="btn-dash green"
                      onClick={() => setSelectedData(e)}
                    >
                      Update
                    </button>

                    <button
                      className="btn-dash"
                      onClick={() => {
                        handleDelete(e.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
<div className="last">
        <div className="input1">
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={selectedData.name}
            onChange={(e) =>
              setSelectedData({ ...selectedData, name: e.target.value })
            }
          />

          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            value={selectedData.email}
            onChange={(e) =>
              setSelectedData({
                ...selectedData,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        className="btn-dash blue"
        onClick={() => {
          updateEmp();
        }}
      >
        Confirm Update
      </button>
      </div>
    </>
  );
};
