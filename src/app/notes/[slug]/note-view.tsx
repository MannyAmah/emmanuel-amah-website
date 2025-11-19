'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Pencil, Share2, Check } from 'lucide-react'
import { Note } from '@/lib/supabase'
import { getSessionId } from '@/lib/notes'
import { useState, useEffect } from 'react'

interface NoteViewProps {
  note: Note
}

export function NoteView({ note }: NoteViewProps) {
  const [sessionId, setSessionId] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSessionId(getSessionId())
  }, [])

  const isOwner = note.session_id === sessionId

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleShare = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </>
                )}
              </button>
              {isOwner && (
                <Link
                  href={`/notes/${note.id}/edit`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-4xl">{note.emoji}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
          <p className="text-sm text-gray-500">{formatDate(note.created_at)}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
}
