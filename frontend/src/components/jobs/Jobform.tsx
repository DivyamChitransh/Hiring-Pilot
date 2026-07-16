import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Building2, Briefcase, MapPin, Wallet, Clock3, FileText, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getCompanies } from "@/api/company";
import { jobSchema, JobFormData, } from "@/validations/job";
import type { Company } from "@/types/Company";

interface JobFormProps {
    defaultValues?: Partial<JobFormData>;
    onSubmit: (data: JobFormData) => Promise<void>;
    submitText: string;
}

const employmentTypes = ["Full-time", "Part-time", "Internship"];
const workModes = ["On-site", "Remote", "Hybrid"];
const experienceYears = Array.from({ length: 21 }, (_, i) => i);
const JobForm = ({
    defaultValues,
    onSubmit,
    submitText,
}: JobFormProps) => {
    const [companies, setCompanies] = useState<Company[]>([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
        company_id: 0,
        title: "",
        description: "",
        location: "",
        employment_type: "",
        work_mode: undefined,
        experience_min: 0,
        experience_max: 0,
        salary_min: undefined,
        salary_max: undefined,
        openings: undefined,
        skills: "",
        application_deadline: "",
        ...defaultValues,
    },
});
    const fetchCompanies = async () => {
        try {
            const { data } = await getCompanies({
                page: 1,
                limit: 1000,
            });

            setCompanies(data.data);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to load companies"
            );
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {/* Company */}

            <div className="space-y-2">
                <Label>Company</Label>

                <Controller
                    control={control}
                    name="company_id"
                    render={({ field }) => (
                        <Select
                            value={
                                field.value
                                    ? String(field.value)
                                    : ""
                            }
                            onValueChange={(value) =>
                                field.onChange(Number(value))
                            }
                        >
                            <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Select Company" />
                            </SelectTrigger>

                            <SelectContent>
                                {companies.map((company) => (
                                    <SelectItem
                                        key={company.id}
                                        value={String(company.id)}
                                    >
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.company_id && (
                    <p className="text-sm text-red-500">
                        {errors.company_id.message}
                    </p>
                )}
            </div>

            {/* Title */}

            <div className="space-y-2">
                <Label>Job Title</Label>

                <div className="relative">
                    <Briefcase
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                        placeholder="Frontend Developer"
                        className="pl-11 h-12 rounded-xl"
                        {...register("title")}
                    />
                </div>

                {errors.title && (
                    <p className="text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Description */}

            <div className="space-y-2">
                <Label>Description</Label>

                <div className="relative">
                    <FileText
                        size={18}
                        className="absolute left-4 top-4 text-slate-400"
                    />

                    <Textarea
                        rows={5}
                        placeholder="Enter job description"
                        className="pl-11"
                        {...register("description")}
                    />
                </div>

                {errors.description && (
                    <p className="text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Location */}

            <div className="space-y-2">
                <Label>Location</Label>

                <div className="relative">
                    <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                        placeholder="Noida"
                        className="pl-11 h-12 rounded-xl"
                        {...register("location")}
                    />
                </div>
            </div>

            {/* Employment Type */}

            <div className="space-y-3">
                <Label>Employment Type</Label>

                <Controller
                    control={control}
                    name="employment_type"
                    render={({ field }) => {
                        const selected = (field.value ?? "").split(",").filter(Boolean);

                        return (
                            <div className="grid grid-cols-2 gap-3">
                                {employmentTypes.map((type) => (
                                    <div
                                        key={type}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            checked={selected.includes(type)}
                                            onCheckedChange={(checked) => {
                                                let updated = [...selected];

                                                if (checked) {
                                                    updated.push(type);
                                                } else {
                                                    updated = updated.filter(
                                                        (item) => item !== type
                                                    );
                                                }

                                                field.onChange(
                                                    updated.join(",")
                                                );
                                            }}
                                        />

                                        <Label>{type}</Label>
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                />

                {errors.employment_type && (
                    <p className="text-sm text-red-500">
                        {errors.employment_type.message}
                    </p>
                )}
            </div>
            {/* Work Mode */}

            <div className="space-y-2">
                <Label>Work Mode</Label>

                <Controller
                    control={control}
                    name="work_mode"
                    render={({ field }) => (
                        <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Select Work Mode" />
                            </SelectTrigger>

                            <SelectContent>
                                {workModes.map((mode) => (
                                    <SelectItem key={mode} value={mode}>
                                        {mode}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.work_mode && (
                    <p className="text-sm text-red-500">
                        {errors.work_mode.message}
                    </p>
                )}
            </div>

            {/* Experience */}

            {/* Experience */}

            <div className="grid grid-cols-2 gap-4">

                {/* Minimum Experience */}

                <div className="space-y-2">
                    <Label>Minimum Experience</Label>

                    <Controller
                        control={control}
                        name="experience_min"
                        render={({ field }) => (
                            <Select
                                value={String(field.value ?? "")}
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
                            >
                                <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue placeholder="Minimum" />
                                </SelectTrigger>

                                <SelectContent>
                                    {experienceYears.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={String(year)}
                                        >
                                            {year} Years
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.experience_min && (
                        <p className="text-sm text-red-500">
                            {errors.experience_min.message}
                        </p>
                    )}
                </div>

                {/* Maximum Experience */}

                <div className="space-y-2">
                    <Label>Maximum Experience</Label>

                    <Controller
                        control={control}
                        name="experience_max"
                        render={({ field }) => (
                            <Select
                                value={String(field.value ?? "")}
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
                            >
                                <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue placeholder="Maximum" />
                                </SelectTrigger>

                                <SelectContent>
                                    {experienceYears.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={String(year)}
                                        >
                                            {year} Years
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.experience_max && (
                        <p className="text-sm text-red-500">
                            {errors.experience_max.message}
                        </p>
                    )}
                </div>

            </div>

            {/* Salary */}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Minimum Salary</Label>

                    <div className="relative">
                        <Wallet
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <Input
                            type="number"
                            placeholder="500000"
                            className="pl-11 h-12 rounded-xl"
                            {...register("salary_min", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>

                    {errors.salary_min && (
                        <p className="text-sm text-red-500">
                            {errors.salary_min.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Maximum Salary</Label>

                    <div className="relative">
                        <Wallet
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <Input
                            type="number"
                            placeholder="1000000"
                            className="pl-11 h-12 rounded-xl"
                            {...register("salary_max", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>

                    {errors.salary_max && (
                        <p className="text-sm text-red-500">
                            {errors.salary_max.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Openings */}

            <div className="space-y-2">
                <Label>Openings</Label>

                <Input
                    type="number"
                    min={1}
                    className="h-12 rounded-xl"
                    {...register("openings", {
                        valueAsNumber: true,
                    })}
                />

                {errors.openings && (
                    <p className="text-sm text-red-500">
                        {errors.openings.message}
                    </p>
                )}
            </div>

            {/* Skills */}

            <div className="space-y-2">
                <Label>Skills</Label>

                <Input
                    placeholder="React, Node.js, TypeScript"
                    className="h-12 rounded-xl"
                    {...register("skills")}
                />
            </div>

            {/* Application Deadline */}

            <div className="space-y-2">
                <Label>Application Deadline</Label>

                <Controller
                    control={control}
                    name="application_deadline"
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger className="flex h-12 w-full items-center rounded-xl border px-4 text-left">
    {field.value
      ? new Date(field.value).toLocaleDateString()
      : "Select deadline"}
  </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single"
                                    selected={
                                        field.value
                                            ? new Date(field.value)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        field.onChange(date ? date.toISOString().split("T")[0] : "")
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
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

export default JobForm;