import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { getCompanies,deleteCompany } from "@/api/company";
import type { Company } from "@/types/Company";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pagination, setPagination] = useState({page: 1,limit: 10,total: 0,totalPages: 1});

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await getCompanies({page,limit});
      setCompanies(data.data);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch companies"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm("Are you sure you want to delete this company?");
  if (!confirmed) return;
  try {
    const { data } = await deleteCompany(id);
    toast.success(data.message);
    fetchCompanies();
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to delete company"
    );
  }
};

  useEffect(() => {fetchCompanies()}, [page]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>
        <p className="text-sm text-slate-500">
            Total Companies: {pagination.total}
        </p>
        <Link to="/companies/create">
          <Button>Create Company</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="rounded-xl border p-5"
          >
            <h2 className="text-xl font-semibold">
              {company.name}
            </h2>
            <p>{company.email}</p>
            <p>{company.website}</p>
            <div className="mt-4 flex gap-3">
              <Button variant="outline">
                View
              </Button>
              <Link to={`/company/edit/${company.id}`}>
                <Button variant="outline">
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(company.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Previous</Button>
        <span className="text-sm text-slate-500">Page {pagination.page} of {pagination.totalPages}</span>
        <Button disabled={page >= pagination.totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
    </div>
  );
};

export default Companies;