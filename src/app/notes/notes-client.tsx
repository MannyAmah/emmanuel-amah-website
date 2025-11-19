'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSwipeable } from 'react-swipeable'
import { Plus, Pin, Pencil, Trash2, ArrowLeft } from 'lucide-react'
import { Note } from '@/lib/supabase'
import { groupNotesByTime, getSessionId, createNote, deleteNote, togglePinNote, getNotesBySession } from '@/lib/notes'

interface NotesClientProps {
  initialNotes: Note[]
}

export function NotesClient({ initialNotes }: NotesClientProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [sessionNotes, setSessionNotes] = useState<Note[]>([])
  const [sessionId, setSessionId] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const sid = getSessionId()
    setSessionId(sid)

    // Fetch user's private notes
    getNotesBySession(sid).then(setSessionNotes)
  }, [])

  // Combine public notes with user's private notes
  const allNotes = [...notes, ...sessionNotes.filter(n => !n.is_public)]
  const groupedNotes = groupNotesByTime(allNotes)

  const handleCreateNote = async () => {
    const newNote = await createNote({
      title: 'New Note',
      emoji: '📝',
      content: '',
      is_public: false,
      session_id: sessionId,
    })

    if (newNote) {
      setSessionNotes([newNote, ...sessionNotes])
      // Navigate to edit the note
      window.location.href = `/notes/${newNote.id}`
    }
  }

  const handleDeleteNote = async (id: string) => {
    const success = await deleteNote(id)
    if (success) {
      setNotes(notes.filter(n => n.id !== id))
      setSessionNotes(sessionNotes.filter(n => n.id !== id))
    }
  }

  const handleTogglePin = async (note: Note) => {
    const updated = await togglePinNote(note.id, note.is_pinned)
    if (updated) {
      setNotes(notes.map(n => n.id === note.id ? updated : n))
      setSessionNotes(sessionNotes.map(n => n.id === note.id ? updated : n))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <button
              onClick={handleCreateNote}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              <span>New Note</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold">Notes</h1>
        </div>
      </header>

      {/* Notes Grid */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(groupedNotes).map(([category, categoryNotes]) => {
          if (categoryNotes.length === 0) return null

          return (
            <section key={category} className="mb-8">
              <h2 className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-4 uppercase tracking-wider">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    sessionId={sessionId}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            </section>
          )
        })}

        {allNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No notes yet</p>
            <button
              onClick={handleCreateNote}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              <span>Create your first note</span>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

interface NoteCardProps {
  note: Note
  sessionId: string
  onDelete: (id: string) => void
  onTogglePin: (note: Note) => void
}

function NoteCard({ note, sessionId, onDelete, onTogglePin }: NoteCardProps) {
  const [swiped, setSwiped] = useState<'left' | 'right' | null>(null)
  const isOwner = note.session_id === sessionId

  const handlers = useSwipeable({
    onSwipedLeft: () => isOwner && setSwiped('left'),
    onSwipedRight: () => isOwner && setSwiped('right'),
    onTap: () => setSwiped(null),
    trackMouse: false,
    trackTouch: true,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  // Get first line of content as preview
  const preview = note.content.split('\n').find(line => line.trim() && !line.startsWith('#')) || ''

  return (
    <div {...handlers} className="relative">
      {/* Swipe actions */}
      {swiped === 'left' && isOwner && (
        <div className="absolute inset-0 flex items-center justify-end gap-2 px-4 bg-red-500 rounded-lg">
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 text-white hover:bg-red-600 rounded"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}
      {swiped === 'right' && isOwner && (
        <div className="absolute inset-0 flex items-center justify-start gap-2 px-4 bg-blue-500 rounded-lg">
          <button
            onClick={() => onTogglePin(note)}
            className="p-2 text-white hover:bg-blue-600 rounded"
          >
            <Pin className={`h-5 w-5 ${note.is_pinned ? 'fill-current' : ''}`} />
          </button>
          <Link
            href={`/notes/${note.id}/edit`}
            className="p-2 text-white hover:bg-blue-600 rounded"
          >
            <Pencil className="h-5 w-5" />
          </Link>
        </div>
      )}

      {/* Note content */}
      <Link
        href={`/notes/${note.id}`}
        className={`block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
          swiped ? 'translate-x-full opacity-0' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl">{note.emoji}</span>
          <div className="flex items-center gap-2">
            {note.is_pinned && <Pin className="h-3 w-3 text-gray-400 fill-current" />}
            <span className="text-xs text-gray-500">{formatDate(note.created_at)}</span>
          </div>
        </div>
        <h3 className="font-medium mb-1">{note.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {preview.replace(/[#*`]/g, '').substring(0, 100)}
        </p>
        {!note.is_public && (
          <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
            Private
          </span>
        )}
      </Link>
    </div>
  )
}
