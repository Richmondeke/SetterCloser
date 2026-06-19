-- ═══════════════════════════════════════════════════════════════
-- SetterCloser — Confirmation System Migration
-- ═══════════════════════════════════════════════════════════════

-- New enums
CREATE TYPE form_status AS ENUM ('DRAFT', 'SENT', 'OPENED', 'FILLED', 'MEETING_CONFIRMED', 'DEAL_CLOSED');
CREATE TYPE meeting_outcome AS ENUM ('PENDING', 'NO_SHOW', 'INTERESTED', 'FOLLOW_UP', 'CLOSED_WON', 'CLOSED_LOST');

-- Confirmation Forms table
CREATE TABLE confirmation_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setter_id UUID NOT NULL,
  job_id UUID,
  company_id UUID,
  
  -- Form config
  form_slug TEXT NOT NULL UNIQUE,
  form_title TEXT NOT NULL DEFAULT 'Meeting Confirmation',
  custom_message TEXT,
  
  -- Prospect data (filled by prospect)
  prospect_name TEXT,
  prospect_email TEXT,
  prospect_company TEXT,
  prospect_phone TEXT,
  
  -- Meeting data
  meeting_link TEXT,
  meeting_datetime TIMESTAMPTZ,
  meeting_duration_minutes INT DEFAULT 30,
  
  -- Status tracking
  status form_status NOT NULL DEFAULT 'DRAFT',
  filled_at TIMESTAMPTZ,
  meeting_confirmed_at TIMESTAMPTZ,
  deal_closed_at TIMESTAMPTZ,
  
  -- AI recorder
  recorder_scheduled BOOLEAN NOT NULL DEFAULT false,
  recorder_joined BOOLEAN NOT NULL DEFAULT false,
  
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Meeting Recordings table
CREATE TABLE meeting_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES confirmation_forms(id) ON DELETE CASCADE,
  
  -- Recording data
  recording_url TEXT,
  transcript TEXT,
  summary TEXT,
  key_moments JSONB DEFAULT '[]',
  
  -- AI analysis
  outcome meeting_outcome NOT NULL DEFAULT 'PENDING',
  deal_signals JSONB DEFAULT '[]',
  sentiment_score DECIMAL(3,2),
  deal_value DECIMAL(12,2),
  
  -- Timestamps
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  analyzed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_confirmation_forms_setter ON confirmation_forms(setter_id);
CREATE INDEX idx_confirmation_forms_slug ON confirmation_forms(form_slug);
CREATE INDEX idx_confirmation_forms_status ON confirmation_forms(status);
CREATE INDEX idx_meeting_recordings_form ON meeting_recordings(form_id);

-- RLS Policies
ALTER TABLE confirmation_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_recordings ENABLE ROW LEVEL SECURITY;

-- Forms: setters can manage their own, public can fill (via anon)
CREATE POLICY "Setters manage own forms" ON confirmation_forms
  FOR ALL USING (auth.uid()::uuid = setter_id);

CREATE POLICY "Public can fill forms" ON confirmation_forms
  FOR UPDATE USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read forms by slug" ON confirmation_forms
  FOR SELECT USING (true);

-- Recordings: accessible by form owner
CREATE POLICY "Form owner reads recordings" ON meeting_recordings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM confirmation_forms cf
      WHERE cf.id = meeting_recordings.form_id
      AND cf.setter_id = auth.uid()::uuid
    )
  );
