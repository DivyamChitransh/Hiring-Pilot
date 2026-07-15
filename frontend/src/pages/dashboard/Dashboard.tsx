import { useEffect, useState } from "react";
import { getProfile } from "@/api/auth";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();

      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name}
      </h1>

      <p>{user?.email}</p>

      <p>{user?.role}</p>
    </div>
  );
};

export default Dashboard;