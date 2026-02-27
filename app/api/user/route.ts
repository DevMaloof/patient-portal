// /app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import type { Session } from "next-auth";

async function getSession(req: NextRequest): Promise<Session | null> {
  return (await getServerSession({ req, ...authOptions })) as Session | null;
}

export async function GET(req: NextRequest) {
  try {
    console.log("🔄 /api/user GET started...");

    const session = await getSession(req);
    console.log("📧 Session email:", session?.user?.email);

    if (!session?.user?.email) {
      console.log("❌ No session email found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Connect to DB and use the collection directly
    const db = await connectDB();
    console.log("✅ DB connected");

    // Use the native MongoDB collection to avoid TypeScript issues
    const usersCollection = db.collection('users');

    // ✅ Find user with timeout protection
    const user = await usersCollection.findOne(
      { email: session.user.email },
      {
        maxTimeMS: 15000,
        projection: { password: 0 } // Exclude password
      }
    );

    console.log("✅ User query completed, found:", user ? "yes" : "no");

    if (!user) {
      console.log("❌ User not found in database");

      // ✅ Create user if not found (for Google OAuth users)
      console.log("🔄 Creating new user...");
      const newUser = {
        email: session.user.email,
        name: session.user.name || "",
        image: session.user.image || "",
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);
      const createdUser = { ...newUser, _id: result.insertedId };

      console.log("✅ New user created with ID:", result.insertedId);
      return NextResponse.json(createdUser);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ /api/user GET error:", error);

    // Specific error handling
    if (error instanceof Error) {
      if (error.name.includes('Mongo') || error.name.includes('Timeout')) {
        return NextResponse.json(
          { error: "Database operation timeout" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("🔄 /api/user PATCH started...");

    const session = await getSession(req);
    console.log("📧 Session email:", session?.user?.email);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("📝 Update data:", body);

    // ✅ Connect to DB and use the collection directly
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const updated = await usersCollection.findOneAndUpdate(
      { email: session.user.email },
      { $set: { ...body, updatedAt: new Date() } },
      {
        returnDocument: 'after', // equivalent to {new: true} in Mongoose
        maxTimeMS: 15000,
        projection: { password: 0 } // Exclude password
      }
    );

    if (!updated || !updated.value) {
      console.log("❌ User not found for update");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User updated successfully");
    return NextResponse.json({ message: "User updated", user: updated.value });
  } catch (err) {
    console.error("❌ /api/user PATCH error:", err);

    if (err instanceof Error) {
      if (err.name.includes('Mongo') || err.name.includes('Timeout')) {
        return NextResponse.json(
          { error: "Database operation timeout" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}