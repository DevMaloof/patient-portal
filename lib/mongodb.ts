// /lib/mongodb.ts
import mongoose, { Connection } from "mongoose";
import { MongoClient } from "mongodb";

// MongoDB connection options - Fixed version
const mongooseOptions = {
  bufferCommands: false, // Disable buffering
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

/* -------------------- CustomerInfo DB (Restaurant) -------------------- */
const restaurantUri = process.env.MONGODB_URI_RESTAURANT!;
if (!restaurantUri) throw new Error("❌ MONGODB_URI_RESTAURANT is missing in .env");

type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

declare global {
  var mongooseRestaurant: MongooseCache | undefined;
}

let cachedRestaurant: MongooseCache = global.mongooseRestaurant ?? { conn: null, promise: null };
if (!global.mongooseRestaurant) global.mongooseRestaurant = cachedRestaurant;

export async function connectDB(): Promise<Connection> {
  if (cachedRestaurant.conn) {
    console.log("✅ Using cached Restaurant DB connection");
    return cachedRestaurant.conn;
  }

  if (!cachedRestaurant.promise) {
    console.log("🔄 Creating new Restaurant DB connection...");

    const conn = mongoose.createConnection(restaurantUri, mongooseOptions);

    conn.on('connected', () => {
      console.log('✅ Mongoose connected to Restaurant DB');
    });

    conn.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    conn.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from Restaurant DB');
    });

    cachedRestaurant.promise = conn.asPromise().then(() => {
      console.log("✅ Restaurant DB connected successfully");
      return conn;
    }).catch((error) => {
      console.error("❌ Restaurant DB connection failed:", error);
      cachedRestaurant.promise = null;
      throw error;
    });
  }

  try {
    cachedRestaurant.conn = await cachedRestaurant.promise;
    return cachedRestaurant.conn;
  } catch (error) {
    cachedRestaurant.promise = null;
    throw error;
  }
}

/* -------------------- Dashboard DB (Optional) -------------------- */
const dashboardUri = process.env.MONGODB_URI_DASHBOARD;

type DashboardCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

declare global {
  var mongooseDashboard: DashboardCache | undefined;
}

let cachedDashboard: DashboardCache = global.mongooseDashboard ?? { conn: null, promise: null };
if (!global.mongooseDashboard) global.mongooseDashboard = cachedDashboard;

export async function connectDashboardDB(): Promise<Connection> {
  if (!dashboardUri) throw new Error("⚠️ MONGODB_URI_DASHBOARD not set");
  if (cachedDashboard.conn) {
    console.log("✅ Using cached Dashboard DB connection");
    return cachedDashboard.conn;
  }

  if (!cachedDashboard.promise) {
    console.log("🔄 Creating new Dashboard DB connection...");
    const conn = mongoose.createConnection(dashboardUri, {
      ...mongooseOptions,
      dbName: "StaffInfo"
    });

    conn.on('connected', () => {
      console.log('✅ Mongoose connected to Dashboard DB');
    });

    conn.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    cachedDashboard.promise = conn.asPromise().then(() => {
      console.log("✅ Dashboard DB connected successfully");
      return conn;
    }).catch((error) => {
      console.error("❌ Dashboard DB connection failed:", error);
      cachedDashboard.promise = null;
      throw error;
    });
  }

  try {
    cachedDashboard.conn = await cachedDashboard.promise;
    return cachedDashboard.conn;
  } catch (error) {
    cachedDashboard.promise = null;
    throw error;
  }
}

/* -------------------- MongoClient (For NextAuth Adapter) -------------------- */
export const clientPromise = MongoClient.connect(restaurantUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
});

// ✅ Export a function to get models from the correct connection
export async function getUserModel() {
  const db = await connectDB();

  // Check if User model already exists on this connection
  if (db.models.User) {
    return db.models.User;
  }

  // If not, create it
  const userSchema = new mongoose.Schema(
    {
      name: { type: String },
      email: { type: String, unique: true, required: true },
      image: { type: String },
      password: { type: String, required: false, default: null },
      verified: { type: Boolean, default: false },
      verifyToken: { type: String, default: null },
    },
    { collection: "users", timestamps: true }
  );

  return db.model("User", userSchema);
}