import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {Building2,Mail,Globe,Phone,MapPin,Briefcase,Image,FileText,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {companySchema,CompanyFormData} from "@/validations/company.validations";
import { uploadCompanyLogo } from "@/api/upload";

interface CompanyFormProps {
  defaultValues?: Partial<CompanyFormData>;
  onSubmit: (
    data: CompanyFormData
  ) => Promise<void>;
  submitText: string;
}

const CompanyForm = ({
  defaultValues,
  onSubmit,
  submitText,
}: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues,
  });

  const [logo, setLogo] = useState(defaultValues?.logo || "");
  const [preview, setPreview] = useState( defaultValues?.logo ? `${import.meta.env.VITE_API_URL}/${defaultValues.logo}`: "");
  const [uploading, setUploading] = useState(false);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    setUploading(true);
    const formData = new FormData();
    formData.append("logo", file);
    const { data } = await uploadCompanyLogo(formData);
    setLogo(data.imageUrl);
    setPreview(`${import.meta.env.VITE_SERVER_URL}/${data.imageUrl}`);
    toast.success(data.message);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Logo upload failed"
    );
  } finally {
    setUploading(false);
  }
};

  return (
    <form onSubmit={handleSubmit(async (data) => {await onSubmit({...data,logo})})}
    className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Company Name</Label>

        <div className="relative">
          <Building2
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="Enter company name"
            className="pl-11 h-12 rounded-xl"
            {...register("name")}
          />
        </div>

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Company Email</Label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            type="email"
            placeholder="Enter company email"
            className="pl-11 h-12 rounded-xl"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Website</Label>

        <div className="relative">
          <Globe
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="https://example.com"
            className="pl-11 h-12 rounded-xl"
            {...register("website")}
          />
        </div>

        {errors.website && (
          <p className="text-sm text-red-500">
            {errors.website.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>

        <div className="relative">
          <Phone
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="Enter phone number"
            className="pl-11 h-12 rounded-xl"
            {...register("phone")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="Enter company location"
            className="pl-11 h-12 rounded-xl"
            {...register("location")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Industry</Label>
        <div className="relative">
          <Briefcase
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            placeholder="Enter industry"
            className="pl-11 h-12 rounded-xl"
            {...register("industry")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Company Logo</Label>
        <Input type="file" accept="image/*" onChange={handleLogoChange}/>
          {uploading && (<p className="text-sm text-slate-500">Uploading logo...</p>)}
          {preview && (<img src={preview} alt="Company Logo" className="h-24 w-24 rounded-lg border object-cover"/>)}
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <div className="relative">
          <FileText
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />
          <Textarea
            rows={4}
            placeholder="Enter company description"
            className="pl-11"
            {...register("description")}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl"
      >
        {isSubmitting ? "Please wait..." : submitText}
      </Button>
    </form>
  );
};

export default CompanyForm;