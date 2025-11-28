import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  total_workouts: number;
  total_hours: number;
  total_calories: number;
  created_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  name: string;
  duration: number;
  calories: number;
  type: string;
  completed_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  name: string;
  description: string;
  icon: string;
  unlocked_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  likes: number;
  comments: number;
  image_url?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  goal: number;
  current_progress: number;
  reward_xp: number;
  expires_at: string;
}
