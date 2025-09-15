-- Create journal_entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Policies for public access (no auth in app yet)
DROP POLICY IF EXISTS "Anyone can view journal entries" ON public.journal_entries;
CREATE POLICY "Anyone can view journal entries"
ON public.journal_entries
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Anyone can insert journal entries" ON public.journal_entries;
CREATE POLICY "Anyone can insert journal entries"
ON public.journal_entries
FOR INSERT
WITH CHECK (true);

-- Timestamp update trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic updated_at on updates
DROP TRIGGER IF EXISTS tr_journal_entries_updated_at ON public.journal_entries;
CREATE TRIGGER tr_journal_entries_updated_at
BEFORE UPDATE ON public.journal_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime on this table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'journal_entries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.journal_entries;
  END IF;
END $$;