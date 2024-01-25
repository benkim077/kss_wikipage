import { createClient } from "@supabase/supabase-js";
import { Database } from "@/interface/supabase";

export default function createDatabaseClient() {
  // TODO: url, key는 원래 환경 변수로 빼야한다.
  // 제출용도로 남겨둬야하는지 결정해야 한다.
  const supabaseUrl = "https://mywzayzepbfaahgayxty.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3pheXplcGJmYWFoZ2F5eHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODA3MzcsImV4cCI6MjAyMTY1NjczN30.5dismLpTWMzMuTa7ra5tpAA83oOMV7fgktf06hJNf3w";
  return createClient<Database>(supabaseUrl, supabaseKey);
}
