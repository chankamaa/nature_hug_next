import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();
        const body = await req.json();

        console.log("📌 Received Data:", JSON.stringify(body, null, 2)); // Debugging log

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = body;

        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Title, description, media, category, price, and expense are required", { status: 400 });
        }

        if (!Array.isArray(collections)) {
            console.error("❌ Collections is not an array:", collections);
            return new NextResponse("Collections must be an array", { status: 400 });
        }



        const collectionIds = collections.map(id => new mongoose.Types.ObjectId(id));





        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collection: collectionIds, // ✅ Using hardcoded test ID
            tags,
            sizes,
            colors,
            price,
            expense
        });

        await newProduct.save();


        return NextResponse.json(newProduct, { status: 201 });

    } catch (error) {


        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
    }

};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const products = await Product.find().sort({ createdAt: "desc" }).populate({ path: "collections", model: Collection});

        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        console.error("[products_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });

    }
};
