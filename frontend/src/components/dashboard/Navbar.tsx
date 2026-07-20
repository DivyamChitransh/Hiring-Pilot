import { Bell } from "lucide-react";
import { getUser } from "@/utils/auth";
const Navbar = () => {
  const user = getUser();
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-full p-2 transition hover:bg-slate-100">
          <Bell size={20} className="text-slate-600"/>
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{user?.name}</p>
            <p className="text-sm capitalize text-slate-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;