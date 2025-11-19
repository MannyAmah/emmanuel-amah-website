'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Pin } from 'lucide-react'
import { Note } from '@/lib/supabase'
import { getPublicNotes, createNote, deleteNote, togglePinNote } from '@/lib/notes'

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check')
      if (res.ok) {
        setAuthenticated(true)
        loadNotes()
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const loadNotes = async () => {
    const allNotes = await getPublicNotes()
    setNotes(allNotes)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      setAuthenticated(true)
      loadNotes()
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setAuthenticated(false)
    setPassword('')
  }

  const handleCreateNote = async () => {
    const newNote = await createNote({
      title: 'New Note',
      emoji: '📝',
      content: '# New Note\n\nStart writing here...',
      is_public: true,
    })

    if (newNote) {
      router.push(`/notes/${newNote.id}/edit`)
    }
  }

  const handleDeleteNote = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      const success = await deleteNote(id)
      if (success) {
        setNotes(notes.filter(n => n.id !== id))
      }
    }
  }

  const handleTogglePin = async (note: Note) => {
    const updated = await togglePinNote(note.id, note.is_pinned)
    if (updated) {
      setNotes(notes.map(n => n.id === note.id ? updated : n))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-transparent text-black dark:text-white"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90"
            >
              Login
            </button>
          </form>
          <Link href="/" className="block text-center mt-4 text-sm text-gray-500 hover:text-gray-700">
            ← Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateNote}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                New Note
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{note.emoji}</span>
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(note.updated_at).toLocaleDateString()}
                    {note.is_pinned && ' • Pinned'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleTogglePin(note)}
                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${note.is_pinned ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <Pin className={`h-4 w-4 ${note.is_pinned ? 'fill-current' : ''}`} />
                </button>
                <Link
                  href={`/notes/${note.id}/edit`}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDeleteNote(note.id, note.title)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No notes yet</p>
              <button
                onClick={handleCreateNote}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Create your first note
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
