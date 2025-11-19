'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Home, FileText, Plus, Search, Moon, Sun } from 'lucide-react'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const router = useRouter()

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark')
    }

    const down = (e: KeyboardEvent) => {
      // Open command menu with Cmd+K or Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      // Vim-style shortcuts (only when command menu is closed)
      if (!open) {
        // Go to home with 'gh'
        if (e.key === 'h' && !e.metaKey && !e.ctrlKey) {
          // Check if previous key was 'g'
        }

        // Go to notes with 'gn'
        if (e.key === 'n' && e.altKey) {
          e.preventDefault()
          router.push('/notes')
        }

        // New note with 'c'
        if (e.key === 'c' && !e.metaKey && !e.ctrlKey) {
          const target = e.target as HTMLElement | null

          if (
            target &&
            target.tagName !== 'INPUT' &&
            target.tagName !== 'TEXTAREA'
          ) {
            e.preventDefault()
            // Create new note logic would go here
          }
        }
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, router])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', newTheme)
    setOpen(false)
  }

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg">
        <Command className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Command.Input
            placeholder="Type a command or search..."
            className="w-full px-4 py-3 text-sm bg-transparent border-b border-gray-200 dark:border-gray-800 outline-none placeholder-gray-400"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs text-gray-500 px-2 py-1">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/'))}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
              >
                <Home className="h-4 w-4" />
                <span>Go to Home</span>
                <kbd className="ml-auto text-xs text-gray-400">gh</kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/notes'))}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
              >
                <FileText className="h-4 w-4" />
                <span>Go to Notes</span>
                <kbd className="ml-auto text-xs text-gray-400">gn</kbd>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-xs text-gray-500 px-2 py-1 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/notes'))}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Note</span>
                <kbd className="ml-auto text-xs text-gray-400">c</kbd>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Preferences" className="text-xs text-gray-500 px-2 py-1 mt-2">
              <Command.Item
                onSelect={toggleTheme}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span>Toggle Theme</span>
                <kbd className="ml-auto text-xs text-gray-400">t</kbd>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-800">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">⌘K</kbd> to open
          </div>
        </Command>
      </div>
    </div>
  )
}
