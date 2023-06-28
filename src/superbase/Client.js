import { createClient } from "@supabase/supabase-js";

const projectURL = "https://iqfkjhlklsjgalerevxx.supabase.co";
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZmtqaGxrbHNqZ2FsZXJldnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MTc2NjQsImV4cCI6MjAwMzQ5MzY2NH0.ICMFfXkV-UH1gu-FLQKaesQID8VX4ccrNfmtsvVzKks"

export const supabase = createClient(projectURL, projectKey);