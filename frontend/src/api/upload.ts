import api from "./endpoints";

export const uploadCompanyLogo = (formData: FormData) => {
  return api.post("/uploads/company-logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};