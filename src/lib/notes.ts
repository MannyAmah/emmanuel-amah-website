import { supabase, Note, NoteInsert, NoteUpdate } from './supabase'

// Priority order for pinned notes (lower number = higher priority)
const PINNED_PRIORITY: Record<string, number> = {
  'about me': 1,
  'now': 2,
  'projects': 3,
  'links': 4,
  'ideas': 5,
  'tech stack': 6,
  'principles': 7,
  'reading list': 8,
}

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

  // Custom sort: pinned notes by priority order, then by date
  const notes = data || []
  return notes.sort((a, b) => {
    // Both pinned: sort by priority
    if (a.is_pinned && b.is_pinned) {
      const priorityA = PINNED_PRIORITY[a.title.toLowerCase()] || 100
      const priorityB = PINNED_PRIORITY[b.title.toLowerCase()] || 100
      return priorityA - priorityB
    }
    // Pinned first
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    // Both unpinned: sort by date (newest first)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
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

// Get a single note by ID or slug
export async function getNoteById(idOrSlug: string): Promise<Note | null> {
  // First try by ID
  let { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', idOrSlug)
    .single()

  // If not found by ID, try by slug
  if (error || !data) {
    const slugResult = await supabase
      .from('notes')
      .select('*')
      .eq('slug', idOrSlug)
      .single()

    if (!slugResult.error && slugResult.data) {
      return slugResult.data
    }
  }

  if (error && !data) {
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
