// ─────────────────────────────────────────────────────────────
// SetterCloser — Shared TypeScript Types
// Mirror Prisma models for frontend use + composite utilities
// ─────────────────────────────────────────────────────────────

// ──────────────── Enums ────────────────

export enum UserRole {
  TALENT = "TALENT",
  COMPANY = "COMPANY",
  ADMIN = "ADMIN",
}

export enum TalentRoleType {
  SETTER = "SETTER",
  CLOSER = "CLOSER",
  BOTH = "BOTH",
}

export enum CompensationType {
  COMMISSION_ONLY = "COMMISSION_ONLY",
  BASE_PLUS_COMMISSION = "BASE_PLUS_COMMISSION",
  PER_MEETING = "PER_MEETING",
  SALARY = "SALARY",
}

export enum EarningType {
  MEETING_BOOKED = "MEETING_BOOKED",
  FORM_FILLED = "FORM_FILLED",
  DEAL_CLOSED = "DEAL_CLOSED",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DISPUTED = "DISPUTED",
  REJECTED = "REJECTED",
}

export enum JobStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  FILLED = "FILLED",
  CLOSED = "CLOSED",
}

export enum ApplicationStatus {
  APPLIED = "APPLIED",
  SCREENING = "SCREENING",
  INTERVIEWING = "INTERVIEWING",
  OFFERED = "OFFERED",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

export enum AIAgentTemplate {
  COLD_OUTBOUND = "COLD_OUTBOUND",
  INBOUND_QUALIFIER = "INBOUND_QUALIFIER",
  MEETING_BOOKER = "MEETING_BOOKER",
  FULL_CYCLE = "FULL_CYCLE",
}

export enum AIAgentStatus {
  SETUP = "SETUP",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  ARCHIVED = "ARCHIVED",
}

export enum ContractStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  TERMINATED = "TERMINATED",
}

// ──────────────── Base Model Types ────────────────

export interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TalentProfile {
  id: string;
  userId: string;
  roleType: TalentRoleType;
  headline: string | null;
  bio: string | null;
  industries: string[];
  salesFrameworks: string[];
  compensationPreference: CompensationType;
  timezone: string;
  availableFrom: Date | null;
  isAvailable: boolean;
  trustScore: number;
  totalMeetingsBooked: number;
  totalDealsClosed: number;
  totalEarnings: number;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  videoIntroUrl: string | null;
  yearsExperience: number | null;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  website: string | null;
  logoUrl: string | null;
  description: string | null;
  teamSize: number | null;
  icpDefinition: Record<string, unknown> | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPosting {
  id: string;
  companyId: string;
  title: string;
  description: string;
  roleType: TalentRoleType;
  compensationType: CompensationType;
  compensationDetails: CompensationDetails | null;
  industries: string[];
  requiredFrameworks: string[];
  location: string | null;
  isRemote: boolean;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifiedEarning {
  id: string;
  talentId: string;
  companyId: string;
  type: EarningType;
  amount: number;
  currency: string;
  description: string | null;
  evidence: EarningEvidence | null;
  verificationStatus: VerificationStatus;
  verifiedAt: Date | null;
  disputeReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAgent {
  id: string;
  companyId: string;
  name: string;
  template: AIAgentTemplate;
  composioConfig: Record<string, unknown> | null;
  icpConfig: Record<string, unknown> | null;
  messagingConfig: Record<string, unknown> | null;
  operatingHours: Record<string, unknown> | null;
  dailyOutreachLimit: number;
  isHumanInLoop: boolean;
  status: AIAgentStatus;
  totalMeetingsBooked: number;
  totalLeadsContacted: number;
  totalRepliesReceived: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAgentActivity {
  id: string;
  agentId: string;
  type: string;
  data: Record<string, unknown>;
  createdAt: Date;
}

export interface Application {
  id: string;
  talentId: string;
  jobId: string;
  status: ApplicationStatus;
  coverNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Contract {
  id: string;
  talentId: string;
  companyId: string;
  title: string;
  terms: ContractTerms;
  status: ContractStatus;
  startDate: Date | null;
  endDate: Date | null;
  stripePaymentIntentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ──────────────── Json Field Types ────────────────

/** Structured compensation details stored as JSON on JobPosting */
export interface CompensationDetails {
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  commissionPercentage?: number;
  perMeetingRate?: number;
  oteCeiling?: number;
  currency?: string;
  paymentFrequency?: "weekly" | "biweekly" | "monthly";
}

/** Evidence attached to a VerifiedEarning */
export interface EarningEvidence {
  calendarEventUrl?: string;
  crmScreenshotUrls?: string[];
  invoiceUrl?: string;
  notes?: string;
}

/** Structured contract terms stored as JSON on Contract */
export interface ContractTerms {
  compensationType: CompensationType;
  compensationDetails: CompensationDetails;
  durationWeeks?: number;
  deliverables?: string[];
  cancellationNoticeDays?: number;
  notes?: string;
}

// ──────────────── Composite / Utility Types ────────────────

/** User without sensitive fields — safe for client responses */
export type PublicUser = Omit<User, "passwordHash">;

/** Talent profile with its parent user attached */
export type TalentProfileWithUser = TalentProfile & {
  user: PublicUser;
};

/** Company profile with its parent user attached */
export type CompanyProfileWithUser = CompanyProfile & {
  user: PublicUser;
};

/** Job posting with the hiring company expanded */
export type JobPostingWithCompany = JobPosting & {
  company: CompanyProfile;
};

/** Full job detail view including company + application count */
export type JobPostingDetail = JobPostingWithCompany & {
  _count?: { applications: number };
};

/** Application with both talent and job expanded */
export type ApplicationWithDetails = Application & {
  talent: TalentProfileWithUser;
  job: JobPostingWithCompany;
};

/** Application from the talent's perspective (job expanded) */
export type ApplicationWithJob = Application & {
  job: JobPostingWithCompany;
};

/** Application from the company's perspective (talent expanded) */
export type ApplicationWithTalent = Application & {
  talent: TalentProfileWithUser;
};

/** Verified earning with both parties expanded */
export type VerifiedEarningWithParties = VerifiedEarning & {
  talent: TalentProfile;
  company: CompanyProfile;
};

/** Review with reviewer and reviewee user info */
export type ReviewWithUsers = Review & {
  reviewer: PublicUser;
  reviewee: PublicUser;
};

/** Message with sender and receiver info */
export type MessageWithUsers = Message & {
  sender: PublicUser;
  receiver: PublicUser;
};

/** AI Agent with its activity feed */
export type AIAgentWithActivities = AIAgent & {
  activities: AIAgentActivity[];
};

/** AI Agent with company info (for admin views) */
export type AIAgentWithCompany = AIAgent & {
  company: CompanyProfile;
};

/** Contract with both parties expanded */
export type ContractWithParties = Contract & {
  talent: TalentProfileWithUser;
  company: CompanyProfileWithUser;
};

/** Talent card shown in marketplace search results */
export type TalentCard = Pick<
  TalentProfile,
  | "id"
  | "roleType"
  | "headline"
  | "industries"
  | "compensationPreference"
  | "trustScore"
  | "totalMeetingsBooked"
  | "totalDealsClosed"
  | "isVerified"
  | "isFeatured"
  | "yearsExperience"
  | "isAvailable"
> & {
  user: Pick<PublicUser, "id" | "name" | "avatarUrl">;
};

/** Conversation thread summary for the inbox */
export interface ConversationThread {
  otherUser: Pick<PublicUser, "id" | "name" | "avatarUrl">;
  lastMessage: Pick<Message, "content" | "createdAt" | "isRead">;
  unreadCount: number;
}

// ──────────────── API Request / Filter Types ────────────────

export interface TalentSearchFilters {
  roleType?: TalentRoleType;
  industries?: string[];
  compensationPreference?: CompensationType;
  minTrustScore?: number;
  isAvailable?: boolean;
  isVerified?: boolean;
  minYearsExperience?: number;
  search?: string; // full-text on headline / bio
}

export interface JobSearchFilters {
  roleType?: TalentRoleType;
  compensationType?: CompensationType;
  industries?: string[];
  isRemote?: boolean;
  status?: JobStatus;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
