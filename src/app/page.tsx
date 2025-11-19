import Link from "next/link";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

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

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm text-gray-600 dark:text-gray-400">
          <a
            href="mailto:emmanuel@livemoreai.com"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>email</span>
          </a>
          <a
            href="https://x.com/EmmanuelAmah10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>x</span>
          </a>
          <a
            href="https://github.com/MannyAmah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/emmanuelamah/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>linkedin</span>
          </a>
        </div>

        <nav className="flex gap-4 justify-center mb-12">
          <Link
            href="/notes"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Read Notes
          </Link>
        </nav>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Building products. Sharing insights on life and health.</p>
        </div>
      </main>
    </div>
  );
}
