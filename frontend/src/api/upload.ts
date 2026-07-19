import api from "./endpoints";

export const uploadCompanyLogo = (formData: FormData) => {
  return api.post("/uploads/company-logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadProfileImage = (formData: FormData) => {
  return api.post("/uploads/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadResume = (formData: FormData) => {
  return api.post("/uploads/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};