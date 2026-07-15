import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import CreateCompany from "@/pages/company/Createcompany";
import Companies from "@/pages/company/Companies";
import EditCompany from "@/pages/company/Editcompany";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/companies"
          element={<Companies />}
        />
        <Route
          path="/companies/create"
          element={<CreateCompany />}
        />
        <Route
          path="/companies/edit/:id"
          element={<EditCompany />}
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;