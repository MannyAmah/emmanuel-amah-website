import { getNoteById } from '@/lib/notes'
import { NoteView } from './note-view'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params
  const note = await getNoteById(slug)

  if (!note) {
    notFound()
  }

  return <NoteView note={note} />
}
