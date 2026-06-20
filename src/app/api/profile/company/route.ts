import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email parameter is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { companyProfile: true },
    });

    if (!user || !user.companyProfile) {
      return NextResponse.json({ error: "Company profile not found." }, { status: 404 });
    }

    return NextResponse.json(user.companyProfile);
  } catch (error: any) {
    console.error("GET company profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, ...data } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // teamSize might be a string in the frontend, convert to int for DB if possible
    let teamSizeNum: number | undefined = undefined;
    if (data.teamSize) {
      const match = data.teamSize.match(/\d+/);
      if (match) {
        teamSizeNum = parseInt(match[0]);
      }
    }

    const profile = await prisma.companyProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: data.companyName ?? undefined,
        industry: data.industry ?? undefined,
        website: data.website ?? undefined,
        teamSize: teamSizeNum,
        location: data.location ?? undefined,
        description: data.description ?? undefined,
        icpDefinition: data.lookingFor ? { lookingFor: data.lookingFor, compensationModel: data.compensationModel } : undefined,
      },
      create: {
        userId: user.id,
        companyName: data.companyName || "New Company",
        industry: data.industry || "Other",
        website: data.website || "",
        teamSize: teamSizeNum || 1,
        location: data.location || "",
        description: data.description || "",
        icpDefinition: data.lookingFor ? { lookingFor: data.lookingFor, compensationModel: data.compensationModel } : {},
      },
    });

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error("POST company profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
