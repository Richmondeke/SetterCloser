-- ═══════════════════════════════════════════════════════════════
-- SetterCloser — Initial Schema Migration
-- Generated from Prisma schema for Supabase
-- ═══════════════════════════════════════════════════════════════

-- ──────────────── Extensions ────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────── Custom Types (ENUMs) ────────────────

CREATE TYPE user_role AS ENUM ('TALENT', 'COMPANY', 'ADMIN');
CREATE TYPE talent_role_type AS ENUM ('SETTER', 'CLOSER', 'BOTH');
CREATE TYPE compensation_type AS ENUM ('COMMISSION_ONLY', 'BASE_PLUS_COMMISSION', 'PER_MEETING', 'SALARY');
CREATE TYPE earning_type AS ENUM ('MEETING_BOOKED', 'FORM_FILLED', 'DEAL_CLOSED');
CREATE TYPE verification_status AS ENUM ('PENDING', 'CONFIRMED', 'DISPUTED', 'REJECTED');
CREATE TYPE job_status AS ENUM ('ACTIVE', 'PAUSED', 'FILLED', 'CLOSED');
CREATE TYPE application_status AS ENUM ('APPLIED', 'SCREENING', 'INTERVIEWING', 'OFFERED', 'HIRED', 'REJECTED', 'WITHDRAWN');
CREATE TYPE ai_agent_template AS ENUM ('COLD_OUTBOUND', 'INBOUND_QUALIFIER', 'MEETING_BOOKER', 'FULL_CYCLE');
CREATE TYPE ai_agent_status AS ENUM ('SETUP', 'ACTIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE contract_status AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'TERMINATED');

-- ──────────────── Tables ────────────────

-- 1. Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Talent Profiles
CREATE TABLE talent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,

  role_type talent_role_type NOT NULL,
  headline TEXT,
  bio TEXT,
  industries TEXT[] NOT NULL DEFAULT '{}',
  sales_frameworks TEXT[] NOT NULL DEFAULT '{}',
  compensation_preference compensation_type NOT NULL,
  timezone TEXT NOT NULL,
  available_from TIMESTAMPTZ,
  is_available BOOLEAN NOT NULL DEFAULT true,

  -- Aggregated stats (denormalized for fast reads)
  trust_score FLOAT NOT NULL DEFAULT 0,
  total_meetings_booked INT NOT NULL DEFAULT 0,
  total_deals_closed INT NOT NULL DEFAULT 0,
  total_earnings FLOAT NOT NULL DEFAULT 0,

  -- Profile links
  linkedin_url TEXT,
  portfolio_url TEXT,
  video_intro_url TEXT,

  years_experience INT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_verified BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Company Profiles
CREATE TABLE company_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,

  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  team_size INT,
  icp_definition JSONB,
  location TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Job Postings
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  role_type talent_role_type NOT NULL,
  compensation_type compensation_type NOT NULL,
  compensation_details JSONB,
  industries TEXT[] NOT NULL DEFAULT '{}',
  required_frameworks TEXT[] NOT NULL DEFAULT '{}',
  location TEXT,
  is_remote BOOLEAN NOT NULL DEFAULT true,
  status job_status NOT NULL DEFAULT 'ACTIVE',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Verified Earnings
CREATE TABLE verified_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,

  type earning_type NOT NULL,
  amount FLOAT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  description TEXT,
  evidence JSONB,
  verification_status verification_status NOT NULL DEFAULT 'PENDING',
  verified_at TIMESTAMPTZ,
  dispute_reason TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. AI Agents
CREATE TABLE ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  template ai_agent_template NOT NULL,
  composio_config JSONB,
  icp_config JSONB,
  messaging_config JSONB,
  operating_hours JSONB,

  daily_outreach_limit INT NOT NULL DEFAULT 50,
  is_human_in_loop BOOLEAN NOT NULL DEFAULT true,
  status ai_agent_status NOT NULL DEFAULT 'SETUP',

  -- Aggregated stats
  total_meetings_booked INT NOT NULL DEFAULT 0,
  total_leads_contacted INT NOT NULL DEFAULT 0,
  total_replies_received INT NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. AI Agent Activities
CREATE TABLE ai_agent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,

  type TEXT NOT NULL,
  data JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,

  status application_status NOT NULL DEFAULT 'APPLIED',
  cover_note TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(talent_id, job_id)
);

-- 9. Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  rating INT NOT NULL,
  comment TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Contracts
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_id UUID NOT NULL REFERENCES talent_profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  terms JSONB NOT NULL,
  status contract_status NOT NULL DEFAULT 'DRAFT',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  stripe_payment_intent_id TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Autopilot Configs (NEW — for the autopilot feature)
CREATE TABLE autopilot_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  role_type talent_role_type NOT NULL,
  industries TEXT[] DEFAULT '{}',
  min_trust_score FLOAT DEFAULT 0,
  compensation_type compensation_type,
  max_budget TEXT,
  min_experience INT DEFAULT 0,
  auto_invite BOOLEAN DEFAULT true,
  auto_schedule BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id)
);

-- ──────────────── Indexes ────────────────

-- Talent Profiles
CREATE INDEX idx_talent_profiles_role_type ON talent_profiles(role_type);
CREATE INDEX idx_talent_profiles_industries ON talent_profiles USING GIN(industries);
CREATE INDEX idx_talent_profiles_is_available ON talent_profiles(is_available);
CREATE INDEX idx_talent_profiles_trust_score ON talent_profiles(trust_score);
CREATE INDEX idx_talent_profiles_featured_available ON talent_profiles(is_featured, is_available);

-- Job Postings
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_role_type ON job_postings(role_type);
CREATE INDEX idx_job_postings_company_id ON job_postings(company_id);
CREATE INDEX idx_job_postings_status_role_type ON job_postings(status, role_type);

-- Verified Earnings
CREATE INDEX idx_verified_earnings_talent_id ON verified_earnings(talent_id);
CREATE INDEX idx_verified_earnings_company_id ON verified_earnings(company_id);
CREATE INDEX idx_verified_earnings_verification_status ON verified_earnings(verification_status);
CREATE INDEX idx_verified_earnings_talent_verification ON verified_earnings(talent_id, verification_status);

-- Applications
CREATE INDEX idx_applications_talent_id ON applications(talent_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_talent_status ON applications(talent_id, status);

-- Messages
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_receiver_is_read ON messages(receiver_id, is_read);
CREATE INDEX idx_messages_sender_receiver ON messages(sender_id, receiver_id);

-- AI Agents
CREATE INDEX idx_ai_agents_company_id ON ai_agents(company_id);
CREATE INDEX idx_ai_agents_status ON ai_agents(status);
CREATE INDEX idx_ai_agents_company_status ON ai_agents(company_id, status);

-- AI Agent Activities
CREATE INDEX idx_ai_agent_activities_agent_id ON ai_agent_activities(agent_id);
CREATE INDEX idx_ai_agent_activities_agent_type ON ai_agent_activities(agent_id, type);
CREATE INDEX idx_ai_agent_activities_created_at ON ai_agent_activities(created_at);

-- Reviews
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_reviews_reviewee_rating ON reviews(reviewee_id, rating);

-- Contracts
CREATE INDEX idx_contracts_talent_id ON contracts(talent_id);
CREATE INDEX idx_contracts_company_id ON contracts(company_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_talent_status ON contracts(talent_id, status);

-- ──────────────── Row Level Security (RLS) ────────────────

-- Users: can read own row, can update own row
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Talent Profiles: public read, owner write
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view talent profiles"
  ON talent_profiles FOR SELECT
  USING (true);

CREATE POLICY "Owner can update talent profile"
  ON talent_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owner can insert talent profile"
  ON talent_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can delete talent profile"
  ON talent_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Company Profiles: public read, owner write
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view company profiles"
  ON company_profiles FOR SELECT
  USING (true);

CREATE POLICY "Owner can update company profile"
  ON company_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owner can insert company profile"
  ON company_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can delete company profile"
  ON company_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Job Postings: public read, company owner write
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active job postings"
  ON job_postings FOR SELECT
  USING (true);

CREATE POLICY "Company owner can insert job postings"
  ON job_postings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can update job postings"
  ON job_postings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can delete job postings"
  ON job_postings FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- Verified Earnings: talent can insert, company can update verification, public read
ALTER TABLE verified_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view verified earnings"
  ON verified_earnings FOR SELECT
  USING (true);

CREATE POLICY "Talent can insert own earnings"
  ON verified_earnings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can update earnings verification"
  ON verified_earnings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- AI Agents: company owner CRUD
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company owner can view own agents"
  ON ai_agents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can insert agents"
  ON ai_agents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can update agents"
  ON ai_agents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can delete agents"
  ON ai_agents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- AI Agent Activities: company owner via agent ownership
ALTER TABLE ai_agent_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company owner can view agent activities"
  ON ai_agent_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ai_agents
      JOIN company_profiles ON company_profiles.id = ai_agents.company_id
      WHERE ai_agents.id = agent_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can insert agent activities"
  ON ai_agent_activities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_agents
      JOIN company_profiles ON company_profiles.id = ai_agents.company_id
      WHERE ai_agents.id = agent_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- Applications: talent can insert/view own, company can view for their jobs
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Talent can view own applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can view applications for their jobs"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM job_postings
      JOIN company_profiles ON company_profiles.id = job_postings.company_id
      WHERE job_postings.id = job_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Talent can insert applications"
  ON applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Talent can update own applications"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can update applications for their jobs"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM job_postings
      JOIN company_profiles ON company_profiles.id = job_postings.company_id
      WHERE job_postings.id = job_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- Reviews: public read, authenticated users can insert
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Reviewer can update own review"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Reviewer can delete own review"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- Messages: sender/receiver can view
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Receiver can update message read status"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- Contracts: talent and company can view their own
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Talent can view own contracts"
  ON contracts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can view own contracts"
  ON contracts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can insert contracts"
  ON contracts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company can update own contracts"
  ON contracts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Talent can update own contracts"
  ON contracts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM talent_profiles
      WHERE talent_profiles.id = talent_id
        AND talent_profiles.user_id = auth.uid()
    )
  );

-- Autopilot Configs: company owner CRUD
ALTER TABLE autopilot_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company owner can view autopilot config"
  ON autopilot_configs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can insert autopilot config"
  ON autopilot_configs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can update autopilot config"
  ON autopilot_configs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owner can delete autopilot config"
  ON autopilot_configs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM company_profiles
      WHERE company_profiles.id = company_id
        AND company_profiles.user_id = auth.uid()
    )
  );

-- ──────────────── Triggers: updated_at ────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_talent_profiles
  BEFORE UPDATE ON talent_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_company_profiles
  BEFORE UPDATE ON company_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_job_postings
  BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_verified_earnings
  BEFORE UPDATE ON verified_earnings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_ai_agents
  BEFORE UPDATE ON ai_agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_applications
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_contracts
  BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_autopilot_configs
  BEFORE UPDATE ON autopilot_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────── Supabase Auth Integration ────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, name, role, email_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'TALENT'),
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
