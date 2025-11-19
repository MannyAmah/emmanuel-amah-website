import { supabase, Note, NoteInsert, NoteUpdate } from './supabase'

// Get all public notes
export async function getPublicNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_public', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notes:', error)
    return []
  }

  return data || []
}

// Get notes by session (for private notes)
export async function getNotesBySession(sessionId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('session_id', sessionId)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching session notes:', error)
    return []
  }

  return data || []
}

// Get a single note by ID
export async function getNoteById(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching note:', error)
    return null
  }

  return data
}

// Create a new note
export async function createNote(note: NoteInsert): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .insert(note)
    .select()
    .single()

  if (error) {
    console.error('Error creating note:', error)
    return null
  }

  return data
}

// Update a note
export async function updateNote(id: string, updates: NoteUpdate): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating note:', error)
    return null
  }

  return data
}

// Delete a note
export async function deleteNote(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting note:', error)
    return false
  }

  return true
}

// Toggle pin status
export async function togglePinNote(id: string, isPinned: boolean): Promise<Note | null> {
  return updateNote(id, { is_pinned: !isPinned })
}

// Get session ID from localStorage (client-side only)
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays <= 7) return '7 days'
  if (diffDays <= 30) return '30 days'
  return 'older'
}

// Group notes by relative time
export function groupNotesByTime(notes: Note[]): Record<string, Note[]> {
  const groups: Record<string, Note[]> = {
    'today': [],
    'yesterday': [],
    '7 days': [],
    '30 days': [],
    'older': [],
  }

  notes.forEach(note => {
    const category = formatRelativeTime(note.created_at)
    if (groups[category]) {
      groups[category].push(note)
    }
  })

  return groups
}
