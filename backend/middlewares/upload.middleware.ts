import multer from "multer";
import path from "path";

const storage = multer.diskStorage({destination: (req, file, cb) => {
    cb(null, "uploads/company-logos");
  },
  filename: (req, file, cb) => {
    const uniqueName =`company-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req,file,cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

export const uploadCompanyLogo = multer({storage,fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});