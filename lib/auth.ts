// /lib/auth.ts (Restaurant) - UPDATED
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "./mongodb";
import bcrypt from "bcryptjs";

export const authOptions: any = {
  adapter: MongoDBAdapter(clientPromise),

  cookies: {
    sessionToken: {
      name: "maloof_restaurant_session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // true in production, false in development
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // ✅ ADDED: Allow account linking
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          // ✅ Use the native MongoDB client instead of Mongoose model
          const client = await clientPromise;
          const db = client.db(); // This uses the database from your connection string
          const usersCollection = db.collection("users");

          // ✅ Find user by email
          const user = await usersCollection.findOne({
            email: credentials.email
          });

          if (!user || !user.password) return null;

          // ✅ Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || undefined,
            image: user.image || undefined,
            verified: user.verified || false
          };
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user, account }: any) {
      // ✅ Pass user info to token on sign in
      if (user) {
        token.id = user.id;
        token.verified = user.verified;

        // ✅ For Google OAuth, we can mark as verified
        if (account?.provider === "google") {
          token.verified = true;
        }
      }

      // ✅ Ensure we have the latest user data from database
      try {
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        const dbUser = await usersCollection.findOne({ email: token.email });
        if (dbUser) {
          token.verified = dbUser.verified || false;
          token.id = dbUser._id.toString();
        }
      } catch (error) {
        console.error("JWT callback error:", error);
      }

      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.verified = token.verified;
      }
      return session;
    },

    // ✅ Handle Google OAuth sign in to ensure user exists in DB with account linking
    async signIn({ user, account, profile }: any) {
      try {
        if (account?.provider === "google") {
          const client = await clientPromise;
          const db = client.db();
          const usersCollection = db.collection("users");

          // ✅ Check if user exists with email/password
          const existingUser = await usersCollection.findOne({ email: user.email });

          if (existingUser) {
            // ✅ Link accounts by updating the existing user with Google data
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                  updatedAt: new Date(),
                  // Keep existing verified status, or set to true if not verified
                  verified: existingUser.verified ? true : true
                }
              }
            );
            console.log("✅ Linked Google OAuth to existing account:", user.email);
          } else {
            // ✅ Create new user for Google OAuth
            await usersCollection.insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              verified: true, // Google users are automatically verified
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            console.log("✅ Created new Google OAuth user:", user.email);
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // ✅ ADDED: Redirect OAuth errors to login page
  },

  // ✅ Add debug logging in development
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);