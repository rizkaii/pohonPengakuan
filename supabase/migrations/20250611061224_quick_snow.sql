/*
  # Create confessions table for Pohon Pengakuan

  1. New Tables
    - `confessions`
      - `id` (uuid, primary key)
      - `content` (text, the confession content)
      - `created_at` (timestamp with timezone, creation time)
      - `is_active` (boolean, to allow soft deletion if needed)

  2. Security
    - Enable RLS on `confessions` table
    - Add policy for anyone to read confessions
    - Add policy for anyone to insert confessions (anonymous)
*/

CREATE TABLE IF NOT EXISTS confessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL CHECK (char_length(content) >= 10 AND char_length(content) <= 1000),
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE confessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active confessions
CREATE POLICY "Anyone can read active confessions"
  ON confessions
  FOR SELECT
  USING (is_active = true);

-- Allow anyone to insert confessions
CREATE POLICY "Anyone can insert confessions"
  ON confessions
  FOR INSERT
  WITH CHECK (true);

-- Create an index for better performance on random selection
CREATE INDEX IF NOT EXISTS idx_confessions_active_created 
  ON confessions (is_active, created_at DESC);