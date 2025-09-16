-- Add UPDATE and DELETE policies for journal entries
CREATE POLICY "Anyone can update journal entries"
ON public.journal_entries
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete journal entries"
ON public.journal_entries
FOR DELETE
USING (true);