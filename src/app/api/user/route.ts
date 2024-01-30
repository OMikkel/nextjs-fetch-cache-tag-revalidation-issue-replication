import { promises } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const file = await promises.readFile(process.cwd() + "/src/app/user.json", "utf-8");
    if (!file) return NextResponse.json({ name: "", email: "" })
    const data = JSON.parse(file);

    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    await promises.writeFile(process.cwd() + "/src/app/user.json", JSON.stringify(body), "utf-8");
    return NextResponse.json(body)
}