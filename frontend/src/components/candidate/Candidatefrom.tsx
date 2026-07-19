import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {User,FileText,Briefcase,GraduationCap,MapPin,Wallet,Link as LinkIcon,Upload,Plus,Trash2,Calendar} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {candidateSchema,CandidateFormData} from "@/validations/candidate";
import {uploadProfileImage,uploadResume} from "@/api/upload";

interface CandidateFormProps {
  defaultValues?: Partial<CandidateFormData>;
  onSubmit: (data: CandidateFormData) => Promise<void>;
  submitText: string;
}

const CandidateForm = ({defaultValues,onSubmit,submitText,}: CandidateFormProps) => {
  const {register,handleSubmit,formState: { errors, isSubmitting },setValue,watch,control} = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      headline: "",
      bio: "",
      profile_image: "",
      resume: "",
      skills: "",
      degree: "",
      education: "",
      education_timeline: "",
      work_history: [],
      experience: 0,
      current_company: "",
      current_ctc: undefined,
      expected_ctc: undefined,
      notice_period: undefined,
      current_location: "",
      preferred_location: "",
      portfolio_url: "",
      linkedin_url: "",
      github_url: "",
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_history",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const profileImage = watch("profile_image");
  const resume = watch("resume");
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("profile_image", file);
      const { data } = await uploadProfileImage(formData);
      setValue("profile_image", data.imageUrl);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload profile image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingResume(true);
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await uploadResume(formData);
      setValue("resume", data.resumeUrl);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Headline</Label>
        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input placeholder="Senior Full Stack Developer" className="pl-11 h-12 rounded-xl"{...register("headline")}/>
        </div>
        {errors.headline && (<p className="text-sm text-red-500">{errors.headline.message}</p>)}
      </div>
      <div className="space-y-2">
        <Label>Bio</Label>
        <div className="relative">
          <FileText size={18} className="absolute left-4 top-4 text-slate-400"/>
          <Textarea rows={4} placeholder="Tell recruiters about yourself..." className="pl-11" {...register("bio")}/>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Profile Image</Label>
        <Input type="file" accept="image/*" className="h-12 rounded-xl" onChange={handleProfileImageUpload}/>
        {uploadingImage && (<p className="text-sm text-slate-500">Uploading profile image...</p>)}
        {profileImage && (<img src={`${import.meta.env.VITE_SERVER_URL}/${profileImage}`} alt="Profile" className="h-24 w-24 rounded-full object-cover border"/>)}
      </div>
      <div className="space-y-2">
        <Label>Resume</Label>
        <Input type="file" accept=".pdf,.doc,.docx" className="h-12 rounded-xl" onChange={handleResumeUpload}/>
        {uploadingResume && (<p className="text-sm text-slate-500">Uploading resume...</p>)}
        {resume && (<a href={`${import.meta.env.VITE_SERVER_URL}/${resume}`} target="_blank" rel="noreferrer"className="text-sm text-blue-600 underline">
            View Uploaded Resume</a>)}
        {errors.resume && (<p className="text-sm text-red-500">{errors.resume.message}</p>)}
      </div>
      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="relative">
          <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="React, Node.js, TypeScript" className="pl-11 h-12 rounded-xl" {...register("skills")}/>
        </div>
        {errors.skills && (<p className="text-sm text-red-500"> {errors.skills.message}</p>)}
      </div>

      <div className="space-y-2">
        <Label>Degree</Label>
        <div className="relative">
          <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="B.Tech in Computer Science" className="pl-11 h-12 rounded-xl" {...register("degree")}/>
        </div>
      </div>

      <div className="space-y-2">
        <Label>University / Institution</Label>
        <div className="relative">
          <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="Galgotias University" className="pl-11 h-12 rounded-xl" {...register("education")}/>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Education Timeline</Label>
        <div className="relative">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="2020 - 2024" className="pl-11 h-12 rounded-xl" {...register("education_timeline")}/>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Previous Work Experience</Label>
            <p className="text-sm text-slate-500">Add company, role, location and timeline</p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2 rounded-xl"
            onClick={() =>
              append({
                company: "",
                location: "",
                role: "",
                start_date: "",
                end_date: "",
              })
            }
          >
            <Plus size={16} />
            Add Experience
          </Button>
        </div>

        {fields.length === 0 && (
          <p className="text-sm text-slate-500">No previous experience added yet.</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-700">Experience {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600"
                onClick={() => remove(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Company</Label>
                <Input placeholder="Google" className="h-11 rounded-xl" {...register(`work_history.${index}.company`)}/>
                {errors.work_history?.[index]?.company && (
                  <p className="text-sm text-red-500">{errors.work_history[index]?.company?.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Role</Label>
                <Input placeholder="Full Stack Developer" className="h-11 rounded-xl" {...register(`work_history.${index}.role`)}/>
                {errors.work_history?.[index]?.role && (
                  <p className="text-sm text-red-500">{errors.work_history[index]?.role?.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label>Location</Label>
              <Input placeholder="Ahmedabad, Gujarat" className="h-11 rounded-xl" {...register(`work_history.${index}.location`)}/>
              {errors.work_history?.[index]?.location && (
                <p className="text-sm text-red-500">{errors.work_history[index]?.location?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Start Date</Label>
                <Input placeholder="Jan 2022" className="h-11 rounded-xl" {...register(`work_history.${index}.start_date`)}/>
                {errors.work_history?.[index]?.start_date && (
                  <p className="text-sm text-red-500">{errors.work_history[index]?.start_date?.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>End Date</Label>
                <Input placeholder="Dec 2023 or Present" className="h-11 rounded-xl" {...register(`work_history.${index}.end_date`)}/>
                {errors.work_history?.[index]?.end_date && (
                  <p className="text-sm text-red-500">{errors.work_history[index]?.end_date?.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Experience (Years)</Label>
        <Input type="number" min={0} className="h-12 rounded-xl" {...register("experience", {valueAsNumber: true,})}/>
        {errors.experience && (<p className="text-sm text-red-500">{errors.experience.message}</p>)}
      </div>
      <div className="space-y-2">
        <Label>Current Company</Label>
        <div className="relative">
          <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="Google" className="pl-11 h-12 rounded-xl" {...register("current_company")}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Current CTC</Label>
          <div className="relative">
            <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <Input type="number" placeholder=""className="pl-11 h-12 rounded-xl"{...register("current_ctc", {valueAsNumber: true})}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Expected CTC</Label>
          <div className="relative">
            <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <Input type="number" placeholder="" className="pl-11 h-12 rounded-xl" {...register("expected_ctc", {valueAsNumber: true})}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Notice Period (Days)</Label>
          <Input type="number" placeholder="" className="h-12 rounded-xl" {...register("notice_period", {valueAsNumber: true})}/>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Current Location</Label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <Input placeholder="" className="pl-11 h-12 rounded-xl" {...register("current_location")}/>
          </div>
          {errors.current_location && (<p className="text-sm text-red-500">{errors.current_location.message}</p>)}
        </div>
        <div className="space-y-2">
          <Label>Preferred Location</Label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <Input placeholder="" className="pl-11 h-12 rounded-xl" {...register("preferred_location")}/>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Portfolio URL</Label>
        <div className="relative">
          <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="" className="pl-11 h-12 rounded-xl" {...register("portfolio_url")}/>
        </div>
      </div>
      <div className="space-y-2">
        <Label>LinkedIn URL</Label>
        <div className="relative">
          <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="" className="pl-11 h-12 rounded-xl"{...register("linkedin_url")}/>
        </div>
      </div>
      <div className="space-y-2">
        <Label>GitHub URL</Label>
        <div className="relative">
          <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <Input placeholder="" className="pl-11 h-12 rounded-xl" {...register("github_url")}/>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl"> {isSubmitting ? "Please wait..." : submitText}</Button>
    </form>
  );
};

export default CandidateForm;