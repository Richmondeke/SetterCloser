import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole, TalentRoleType, CompensationType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { email, name, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required." },
        { status: 400 }
      );
    }

    const mappedRole = role.toUpperCase() === "COMPANY" ? UserRole.COMPANY : UserRole.TALENT;

    // 1. Upsert User
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { name: name || email.split("@")[0] },
      create: {
        email: email.toLowerCase().trim(),
        name: name || email.split("@")[0],
        role: mappedRole,
      },
    });

    // 2. Ensure profile exists
    let onboardingComplete = false;
    let talentProfile = null;
    let companyProfile = null;

    if (mappedRole === UserRole.TALENT) {
      talentProfile = await prisma.talentProfile.findUnique({
        where: { userId: user.id },
      });

      if (!talentProfile) {
        talentProfile = await prisma.talentProfile.create({
          data: {
            userId: user.id,
            roleType: TalentRoleType.SETTER,
            compensationPreference: CompensationType.COMMISSION_ONLY,
            timezone: "UTC",
          },
        });
      } else {
        // Simple heuristic: if headline or bio is set, onboarding is complete
        if (talentProfile.headline || talentProfile.bio) {
          onboardingComplete = true;
        }
      }
    } else if (mappedRole === UserRole.COMPANY) {
      companyProfile = await prisma.companyProfile.findUnique({
        where: { userId: user.id },
      });

      if (!companyProfile) {
        companyProfile = await prisma.companyProfile.create({
          data: {
            userId: user.id,
            companyName: name ? `${name}'s Company` : "New Company",
            industry: "Other",
          },
        });
      } else {
        // Heuristic: if website or location is set, onboarding is complete
        if (companyProfile.website || companyProfile.location) {
          onboardingComplete = true;
        }
      }
    }

    return NextResponse.json({
      user,
      talentProfile,
      companyProfile,
      onboardingComplete,
    });
  } catch (error: any) {
    console.error("Auth sync error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync auth state." },
      { status: 500 }
    );
  }
}
