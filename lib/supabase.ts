import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbqqjjgffmcariknijud.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicXFqamdmZm1jYXJpa25panVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODQ1NDcsImV4cCI6MjA3ODM2MDU0N30.4DPudOMBG-fHHpC_2J1njvJ1tXDmQHkLnKywbVjuIVQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);