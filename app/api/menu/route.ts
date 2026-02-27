import { NextResponse } from "next/server";
import { connectDashboardDB } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";

export async function GET(request: Request) {
    try {
        // ✅ Connect to Dashboard DB
        const db = await connectDashboardDB();

        // ✅ Attach model to the connection to avoid conflicts
        const MenuItemModel = db.models.MenuItem || db.model("MenuItem", MenuItem.schema);

        // ✅ Get category from query string
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        const query = category ? { category } : {};

        // ✅ Fetch menu items from Dashboard DB
        const menuItems = await MenuItemModel.find(query).lean();

        return NextResponse.json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return NextResponse.json(
            { message: "Failed to fetch menu items" },
            { status: 500 }
        );
    }
}
