'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSwipeable } from 'react-swipeable'
import { Pin, ArrowLeft } from 'lucide-react'
import { Note } from '@/lib/supabase'
import { groupNotesByTime } from '@/lib/notes'

interface NotesClientProps {
  initialNotes: Note[]
}

export function NotesClient({ initialNotes }: NotesClientProps) {
  const [notes] = useState<Note[]>(initialNotes)
  const groupedNotes = groupNotesByTime(notes)

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
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </section>
          )
        })}

        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No notes yet</p>
          </div>
        )}
      </main>
    </div>
  )
}

interface NoteCardProps {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  // Get first line of content as preview
  const preview = note.content.split('\n').find(line => line.trim() && !line.startsWith('#')) || ''

  return (
    <Link
      href={`/notes/${note.slug || note.id}`}
      className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
    </Link>
  )
}
