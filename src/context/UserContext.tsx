"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "talent" | "company" | null;
type ViewMode = "admin" | "hiring" | "setter" | "closer";

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
  availability: string;
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
  isAdmin: boolean;

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

  // Demo mode
  demoMode: boolean;
  toggleDemoMode: () => void;

  // View mode (role switcher)
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Hydration
  hydrated: boolean;
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
  availability: "",
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

// Admin email whitelist — these users auto-get admin viewMode
const ADMIN_EMAILS = [
  "ekerichmond@gmail.com",
  "troyhodinni@gmail.com",
];

const isAdminEmail = (email: string) =>
  ADMIN_EMAILS.includes(email.toLowerCase().trim());

// ── localStorage helpers ──
const STORAGE_KEY = "settercloser_user";

interface PersistedState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userEmail: string;
  talentData: TalentData;
  companyData: CompanyData;
  onboardingComplete: boolean;
  demoMode: boolean;
  viewMode: ViewMode;
}

function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

function clearState() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [talentData, setTalentData] = useState<TalentData>(defaultTalentData);
  const [companyData, setCompanyData] = useState<CompanyData>(defaultCompanyData);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("setter");

  // ── Hydrate from localStorage on mount ──
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setIsAuthenticated(saved.isAuthenticated);
      setUserRole(saved.userRole);
      setUserName(saved.userName);
      setUserEmail(saved.userEmail);
      setTalentData({ ...defaultTalentData, ...saved.talentData });
      setCompanyData({ ...defaultCompanyData, ...saved.companyData });
      setOnboardingComplete(saved.onboardingComplete);
      setDemoMode(saved.demoMode);
      setViewMode(saved.viewMode);
    }
    setHydrated(true);
  }, []);

  // ── Persist to localStorage on every state change ──
  useEffect(() => {
    if (!hydrated) return;
    saveState({
      isAuthenticated,
      userRole,
      userName,
      userEmail,
      talentData,
      companyData,
      onboardingComplete,
      demoMode,
      viewMode,
    });
  }, [hydrated, isAuthenticated, userRole, userName, userEmail, talentData, companyData, onboardingComplete, demoMode, viewMode]);

  const toggleDemoMode = () => setDemoMode((prev) => !prev);

  const userInitials = userName
    ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const isAdmin = isAdminEmail(userEmail);

  const signUp = (name: string, email: string, role: UserRole) => {
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setIsAuthenticated(true);
    // Admin emails get admin mode automatically
    if (isAdminEmail(email)) {
      setViewMode("admin");
    } else if (role === "company") {
      setViewMode("hiring");
    } else {
      setViewMode("setter");
    }
  };

  const signIn = (email: string, role: UserRole) => {
    setUserEmail(email);
    setUserRole(role);
    setUserName(role === "company" ? "ScaleUp.io" : "Jane Smith");
    setIsAuthenticated(true);
    setOnboardingComplete(true);
    // Admin emails get admin mode automatically
    if (isAdminEmail(email)) {
      setViewMode("admin");
    } else if (role === "company") {
      setViewMode("hiring");
    } else {
      setViewMode("setter");
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName("");
    setUserEmail("");
    setTalentData(defaultTalentData);
    setCompanyData(defaultCompanyData);
    setOnboardingComplete(false);
    setViewMode("setter");
    clearState();
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
      isAuthenticated, userRole, userName, userEmail, userInitials, isAdmin,
      talentData, companyData,
      signUp, signIn, signOut, updateTalentData, updateCompanyData, completeOnboarding,
      onboardingComplete,
      demoMode, toggleDemoMode,
      viewMode, setViewMode,
      hydrated,
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
