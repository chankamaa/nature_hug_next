
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
    try {
        const {userId} = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await connectToDB();

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();
        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Title, description, media, category, price and expense are required", { status: 400 });
        }

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense
        });
        await newProduct.save();

        return NextResponse.json(newProduct, { status: 201 });
        
    } catch (error) {
        console.log("[products_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
        
    }
}
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const products = await Product.find()
            .sort({ createdAt: "desc" })
            .populate({ path: "collection", model: "Collection" }); // ✅ Use lowercase `collection`

        return NextResponse.json(products, { status: 200 });

    } catch (err) {
        console.log("[products_GET]", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

  