import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import CandidateDashboard from "@/pages/dashboard/Candidatedashboard";
import Companies from "@/pages/company/Companies";
import CreateCompany from "@/pages/company/Createcompany"
import EditCompany from "@/pages/company/Editcompany"
import Jobs from "@/pages/jobs/jobs"
import CreateJob from "@/pages/jobs/Createjob"
import EditJob from "@/pages/jobs/Editjob";
import JobDetails from "@/pages/jobs/Jobdetails";
import CandidateProfile from "@/pages/candidate/Getcandidate";
import CreateCandidate from "@/pages/candidate/Createcandidate";
import EditCandidate from "@/pages/candidate/Editcandidate";

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
        <Route element={<DashboardLayout />}>
          <Route
            path="/candidate/dashboard"
            element={<CandidateDashboard />}
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
            path="/jobs"
            element={<Jobs />}
          />
          <Route
            path="/jobs/create"
            element={<CreateJob />}
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;