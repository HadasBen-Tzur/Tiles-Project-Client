import { Route, Routes } from "react-router-dom";
import App from "./App";
import { AdminPage } from "./components/AdminPage/AdminPage";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SinUp/SignUp";
import { Tiles } from "./components/Tiles/Tiles";

export const Router = () => {
  const isLoggedIn = true;
  return (
    <Routes>
      {isLoggedIn && (
        <Route path="/" element={<App />}>
          <Route index element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/tiles" element={<Tiles />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Route>
      )}
    </Routes>
  );
};
