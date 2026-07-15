import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CompanyForm from "@/components/company/Companyform";
import { createCompany } from "@/api/company";
import type { CompanyFormData } from "@/validations/company.validations";

const CreateCompany = () => {
  const navigate = useNavigate();
  const handleCreate = async (data: CompanyFormData) => {
    try {
      const { data: response } = await createCompany(data);
      toast.success(response.message);
      navigate("/companies");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create company"
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Company
        </h1>
        <p className="mt-2 text-slate-500">
          Add your company details.
        </p>
      </div>
      <CompanyForm
        submitText="Create Company"
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default CreateCompany;