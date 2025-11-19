import { getPublicNotes } from '@/lib/notes'
import { NotesClient } from './notes-client'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function NotesPage() {
  const notes = await getPublicNotes()

  return <NotesClient initialNotes={notes} />
}
