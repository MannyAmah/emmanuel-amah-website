import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

// This endpoint removes duplicate notes, keeping the most recently updated one
export async function POST() {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Get all public notes
        const { data: notes, error } = await supabase
            .from('notes')
            .select('*')
            .eq('is_public', true)
            .order('updated_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Group notes by normalized title
        const notesByTitle: Record<string, typeof notes> = {}

        for (const note of notes || []) {
            const normalizedTitle = note.title.toLowerCase().trim()
            if (!notesByTitle[normalizedTitle]) {
                notesByTitle[normalizedTitle] = []
            }
            notesByTitle[normalizedTitle].push(note)
        }

        // Find duplicates and delete older ones
        const deleted = []

        for (const [title, titleNotes] of Object.entries(notesByTitle)) {
            if (titleNotes.length > 1) {
                // Keep the first one (most recently updated), delete the rest
                const toKeep = titleNotes[0]
                const toDelete = titleNotes.slice(1)

                for (const note of toDelete) {
                    const { error: deleteError } = await supabase
                        .from('notes')
                        .delete()
                        .eq('id', note.id)

                    if (!deleteError) {
                        deleted.push({ id: note.id, title: note.title })
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            deleted,
            message: `Deleted ${deleted.length} duplicate notes`
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to cleanup notes' }, { status: 500 })
    }
}
