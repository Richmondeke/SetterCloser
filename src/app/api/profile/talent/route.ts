import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TalentRoleType, CompensationType } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email parameter is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { talentProfile: true },
    });

    if (!user || !user.talentProfile) {
      return NextResponse.json({ error: "Talent profile not found." }, { status: 404 });
    }

    return NextResponse.json(user.talentProfile);
  } catch (error: any) {
    console.error("GET talent profile error:", error);
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

    // Map frontend string to database Enum values
    const roleMap: Record<string, TalentRoleType> = {
      "Setter": TalentRoleType.SETTER,
      "Closer": TalentRoleType.CLOSER,
      "Both": TalentRoleType.BOTH,
    };

    const compMap: Record<string, CompensationType> = {
      "Commission Only": CompensationType.COMMISSION_ONLY,
      "Base + Commission": CompensationType.BASE_PLUS_COMMISSION,
      "Per Meeting": CompensationType.PER_MEETING,
      "Salary": CompensationType.SALARY,
    };

    const roleType = data.roleType ? (roleMap[data.roleType] || TalentRoleType.SETTER) : undefined;
    const compensationPreference = data.compensationPreference ? (compMap[data.compensationPreference] || CompensationType.COMMISSION_ONLY) : undefined;

    const profile = await prisma.talentProfile.upsert({
      where: { userId: user.id },
      update: {
        roleType,
        headline: data.headline ?? undefined,
        bio: data.bio ?? undefined,
        industries: data.industries ?? undefined,
        salesFrameworks: data.frameworks ?? undefined,
        compensationPreference,
        timezone: data.timezone ?? undefined,
        linkedinUrl: data.linkedinUrl ?? undefined,
        portfolioUrl: data.portfolioUrl ?? undefined,
        videoIntroUrl: data.videoIntroUrl ?? undefined,
        yearsExperience: data.yearsExperience !== undefined ? Number(data.yearsExperience) : undefined,
      },
      create: {
        userId: user.id,
        roleType: roleType || TalentRoleType.SETTER,
        headline: data.headline || "",
        bio: data.bio || "",
        industries: data.industries || [],
        salesFrameworks: data.frameworks || [],
        compensationPreference: compensationPreference || CompensationType.COMMISSION_ONLY,
        timezone: data.timezone || "UTC",
        linkedinUrl: data.linkedinUrl || "",
        portfolioUrl: data.portfolioUrl || "",
        videoIntroUrl: data.videoIntroUrl || "",
        yearsExperience: data.yearsExperience !== undefined ? Number(data.yearsExperience) : 0,
      },
    });

    return NextResponse.json(profile);
  } catch (error: any) {
    console.error("POST talent profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
