import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Note {
  id: string
  title: string
  emoji: string
  content: string
  is_public: boolean
  is_pinned: boolean
  session_id: string | null
  created_at: string
  updated_at: string
}

export interface NoteInsert {
  title: string
  emoji?: string
  content?: string
  is_public?: boolean
  is_pinned?: boolean
  session_id?: string | null
}

export interface NoteUpdate {
  title?: string
  emoji?: string
  content?: string
  is_public?: boolean
  is_pinned?: boolean
  updated_at?: string
}
