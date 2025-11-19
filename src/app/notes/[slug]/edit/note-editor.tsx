'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2, Eye, Globe, Lock, Check } from 'lucide-react'
import { Note } from '@/lib/supabase'
import { updateNote, deleteNote, getSessionId } from '@/lib/notes'

interface NoteEditorProps {
  note: Note
}

const EMOJI_OPTIONS = ['📝', '💡', '🔬', '📚', '🎯', '⚡', '🌟', '🔗', '👋', '🚀', '💻', '🎨', '📊', '🧪', '🌍', '❤️', '✍️']

export function NoteEditor({ note }: NoteEditorProps) {
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string>('')
  const [title, setTitle] = useState(note.title)
  const [emoji, setEmoji] = useState(note.emoji)
  const [content, setContent] = useState(note.content)
  const [isPublic, setIsPublic] = useState(note.is_public)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setSessionId(getSessionId())
  }, [])

  // Track changes
  useEffect(() => {
    const changed =
      title !== note.title ||
      emoji !== note.emoji ||
      content !== note.content ||
      isPublic !== note.is_public
    setHasChanges(changed)
  }, [title, emoji, content, isPublic, note])

  // Auto-save with debounce
  const autoSave = useCallback(async () => {
    if (!hasChanges) return

    setSaving(true)
    const updated = await updateNote(note.id, {
      title,
      emoji,
      content,
      is_public: isPublic,
    })

    if (updated) {
      setSaved(true)
      setHasChanges(false)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }, [note.id, title, emoji, content, isPublic, hasChanges])

  // Auto-save after 2 seconds of inactivity
  useEffect(() => {
    if (!hasChanges) return

    const timer = setTimeout(() => {
      autoSave()
    }, 2000)

    return () => clearTimeout(timer)
  }, [title, emoji, content, isPublic, autoSave, hasChanges])

  // Save on Cmd+S / Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        autoSave()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [autoSave])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      const success = await deleteNote(note.id)
      if (success) {
        router.push('/notes')
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/notes/${note.id}`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              {/* Save status */}
              <span className="text-xs text-gray-500">
                {saving ? 'Saving...' : saved ? (
                  <span className="inline-flex items-center gap-1 text-green-500">
                    <Check className="h-3 w-3" />
                    Saved
                  </span>
                ) : hasChanges ? 'Unsaved changes' : ''}
              </span>

              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-900 rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
              <Link
                href={`/notes/${note.id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview</span>
              </Link>
              <button
                onClick={autoSave}
                disabled={saving || !hasChanges}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emoji & Title */}
        <div className="mb-6">
          <div className="relative inline-block mb-4">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-4xl hover:bg-gray-100 dark:hover:bg-gray-900 p-2 rounded-lg"
            >
              {emoji}
            </button>
            {showEmojiPicker && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg grid grid-cols-4 gap-2 z-20">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => {
                      setEmoji(e)
                      setShowEmojiPicker(false)
                    }}
                    className="text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>

        {/* Visibility Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border ${
              isPublic
                ? 'border-green-200 dark:border-green-900 text-green-600 dark:text-green-400'
                : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {isPublic ? (
              <>
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Private</span>
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note in Markdown..."
          className="w-full min-h-[400px] bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg p-4 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none font-mono text-sm"
        />

        <p className="mt-4 text-xs text-gray-500">
          Auto-saves after 2 seconds. Press ⌘S to save manually. Supports Markdown.
        </p>
      </main>
    </div>
  )
}
