import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Login, Register } from "./screens";
import { useState } from "react";
import { AuthProvider } from "./firebaseUtills";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const login = () => {
    setIsAuth(!isAuth);
  };
  // useEffect(() => {
  //   getlocalData();
  // }, []);
  // const getlocalData = async () => {
  //   let localData = await localStorage.getItem("USER");
  //   localData = JSON.parse(localData);
  //   console.log("app useEffect", localData);
  //   if (localData) {
  //     console.log("auth true");
  //     setIsAuth(true);
  //   } else {
  //     console.log("auth false");
  //     setIsAuth(false);
  //   }
  // };
  // <Route element={<ProtectedState user={user} />}>
  //   <Route path="dashboard" element={<Dashboard />} />
  //   <Route path="profile" element={<Profile />} />
  // </Route>;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="" element={<Login signIn={login} />} />
          <Route element={<AuthProvider auth={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard logout={login} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
