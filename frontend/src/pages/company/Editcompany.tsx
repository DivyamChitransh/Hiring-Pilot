import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CompanyForm from "@/components/company/Companyform";
import {getCompanyById,updateCompany} from "@/api/company";
import type { CompanyFormData } from "@/validations/company.validations";
import type { Company } from "@/types/Company";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {fetchCompany()}, []);

  const fetchCompany = async () => {
    try {
      const { data } =
        await getCompanyById(Number(id));

      setCompany(data.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch company"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    formData: CompanyFormData
  ) => {
    try {
      const { data } =
        await updateCompany(
          Number(id),
          formData
        );

      toast.success(data.message);

      navigate("/companies");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Update failed"
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!company) return null;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Company
      </h1>

      <CompanyForm
        defaultValues={company}
        submitText="Update Company"
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditCompany;