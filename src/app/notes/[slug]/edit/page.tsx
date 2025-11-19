import { getNoteById } from '@/lib/notes'
import { NoteEditor } from './note-editor'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EditNotePage({ params }: PageProps) {
  const { slug } = await params
  const note = await getNoteById(slug)

  if (!note) {
    notFound()
  }

  return <NoteEditor note={note} />
}
