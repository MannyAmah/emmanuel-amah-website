import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-4">
      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
          Emmanuel Amah
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Healthcare Provider, Data Scientist and Founder.
        </p>
        
        <nav className="flex gap-4 justify-center mb-12">
          <Link
            href="/notes"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Read Notes
          </Link>
          <a
            href="https://x.com/EmmanuelAmah10"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg font-semibold hover:border-gray-600 dark:hover:border-gray-400 transition-colors"
          >
            X
          </a>
        </nav>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Building products, sharing insights in life and health.</p>
        </div>
      </main>
    </div>
  );
}
