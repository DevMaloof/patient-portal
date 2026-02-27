import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);
export default MenuItem;
