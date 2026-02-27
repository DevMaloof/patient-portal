// /pages/api/auth/user/upload.ts - FIXED
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Define session type
interface SessionUser {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  id?: string | null;
  verified?: boolean | null;
}

interface CustomSession {
  user?: SessionUser;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check authentication with proper typing
  const session = await getServerSession(req, res, authOptions) as CustomSession | null;

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Initialize formidable (v2+)
  const form = formidable({
    keepExtensions: true,
    multiples: false,
  });

  try {
    // Parse the incoming request
    const data: { fields: formidable.Fields; files: formidable.Files } =
      await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

    const uploaded = data.files.file;
    if (!uploaded) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

    // ✅ Ensure it is an image
    if (!file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ error: "Only image files are allowed" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "user_profiles",
      overwrite: true,
    });

    // Delete temporary local file
    fs.unlink(file.filepath, () => { });

    // Save the Cloudinary URL to the user using native MongoDB
    const db = await connectDB();
    const usersCollection = db.collection("users");

    await usersCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          image: result.secure_url,
          updatedAt: new Date()
        }
      }
    );

    return res.status(200).json({ message: "Upload successful", path: result.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
}