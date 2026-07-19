import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import CreateCompany from "@/pages/company/Createcompany";
import Companies from "@/pages/company/Companies";
import EditCompany from "@/pages/company/Editcompany";
import CreateJob from "@/pages/jobs/Createjob";
import EditJob from "@/pages/jobs/Editjob";
import Jobs from "@/pages/jobs/jobs";
import JobDetails from "@/pages/jobs/Jobdetails";
import CreateCandidate from "@/pages/candidate/Createcandidate"
import EditCandidate from "@/pages/candidate/Editcandidate"
import CandidateProfile from "@/pages/candidate/Getcandidate"

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
        <Route
          path="/jobs/create"
          element={<CreateJob/>}
        />
        <Route
          path="/jobs"
          element={<Jobs />}
        />
        <Route
          path="/jobs/edit/:id"
          element={<EditJob />}
        />
        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />
        <Route 
          path="/candidate" 
          element={<CandidateProfile />} 
        />
        <Route
          path="/candidate/create"
          element={<CreateCandidate />}
        />
        <Route
          path="/candidate/edit"
          element={<EditCandidate />}
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;