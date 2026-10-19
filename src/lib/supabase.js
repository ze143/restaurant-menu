import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eylweihqdcijvyirhnds.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bHdlaWhxZGNpanZ5aXJobmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MzI1NTksImV4cCI6MjEwODAwODU1OX0.Jnt2rzU3F71kdBWeI-0jmkQ2C1Rk8d1LyhrN3Yox-sA"
export const supabase = createClient(supabaseUrl, supabaseKey);