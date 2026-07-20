import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { getUser, removeAuth } from "@/utils/auth";
import {adminMenu,candidateMenu,recruiterMenu} from "../constants/Sidebar";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const menuItems = user?.role === "candidate" ? candidateMenu : user?.role === "recruiter" ? recruiterMenu : adminMenu;
  const handleLogout = () => {
    removeAuth();
    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-blue-600">Hiring Pilot</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <div className="mb-4 rounded-xl bg-slate-100 p-4">
          <p className="font-semibold text-slate-800">{user?.name}</p>
          <p className="text-sm capitalize text-slate-500">{user?.role}</p>
        </div>

        <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />Logout</Button>
      </div>
    </aside>
  );
};

export default Sidebar;