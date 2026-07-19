import multer from "multer";
import path from "path";

const createUpload = (destination: string,prefix: string,allowedTypes: string[],fileSize: number) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${prefix}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype) || (allowedTypes.includes("image/*") && file.mimetype.startsWith("image/"))) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  };

  return multer({storage,fileFilter,limits: {fileSize}});
};

export const uploadCompanyLogo = createUpload("uploads/company-logos","company",["image/*"],5 * 1024 * 1024);

export const uploadProfileImage = createUpload("uploads/profile-images","profile",["image/*"],2 * 1024 * 1024);

export const uploadResume = createUpload("uploads/resumes","resume",["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],10 * 1024 * 1024);