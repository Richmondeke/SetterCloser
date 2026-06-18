"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "talent" | "company" | null;

interface TalentData {
  roleType: string | null;
  industries: string[];
  frameworks: string[];
  compensationPreference: string | null;
  yearsExperience: number | null;
  headline: string;
  bio: string;
  linkedinUrl: string;
  portfolioUrl: string;
  videoIntroUrl: string;
  timezone: string;
}

interface CompanyData {
  companyName: string;
  industry: string;
  website: string;
  teamSize: string;
  location: string;
  description: string;
  lookingFor: string[];
  compensationModel: string | null;
}

interface UserContextType {
  // Auth state
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userEmail: string;
  userInitials: string;

  // Profile data
  talentData: TalentData;
  companyData: CompanyData;

  // Actions
  signUp: (name: string, email: string, role: UserRole) => void;
  signIn: (email: string, role: UserRole) => void;
  signOut: () => void;
  updateTalentData: (data: Partial<TalentData>) => void;
  updateCompanyData: (data: Partial<CompanyData>) => void;
  completeOnboarding: () => void;

  // Onboarding state
  onboardingComplete: boolean;
}

const defaultTalentData: TalentData = {
  roleType: null,
  industries: [],
  frameworks: [],
  compensationPreference: null,
  yearsExperience: null,
  headline: "",
  bio: "",
  linkedinUrl: "",
  portfolioUrl: "",
  videoIntroUrl: "",
  timezone: "",
};

const defaultCompanyData: CompanyData = {
  companyName: "",
  industry: "",
  website: "",
  teamSize: "",
  location: "",
  description: "",
  lookingFor: [],
  compensationModel: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [talentData, setTalentData] = useState<TalentData>(defaultTalentData);
  const [companyData, setCompanyData] = useState<CompanyData>(defaultCompanyData);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const userInitials = userName
    ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const signUp = (name: string, email: string, role: UserRole) => {
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const signIn = (email: string, role: UserRole) => {
    setUserEmail(email);
    setUserRole(role);
    setUserName(role === "company" ? "ScaleUp.io" : "Jane Smith");
    setIsAuthenticated(true);
    setOnboardingComplete(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName("");
    setUserEmail("");
    setTalentData(defaultTalentData);
    setCompanyData(defaultCompanyData);
    setOnboardingComplete(false);
  };

  const updateTalentData = (data: Partial<TalentData>) => {
    setTalentData(prev => ({ ...prev, ...data }));
  };

  const updateCompanyData = (data: Partial<CompanyData>) => {
    setCompanyData(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    setOnboardingComplete(true);
  };

  return (
    <UserContext.Provider value={{
      isAuthenticated, userRole, userName, userEmail, userInitials,
      talentData, companyData,
      signUp, signIn, signOut, updateTalentData, updateCompanyData, completeOnboarding,
      onboardingComplete,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
