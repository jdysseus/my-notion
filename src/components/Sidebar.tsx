"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">📌 My Notion</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`flex items-center py-2 px-3 rounded transition-colors ${
                pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl mr-3">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/inbox"
              className={`flex items-center py-2 px-3 rounded transition-colors ${
                pathname === "/inbox" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl mr-3">📥</span>
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              href="/notes"
              className={`flex items-center py-2 px-3 rounded transition-colors ${
                pathname === "/notes" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl mr-3">📝</span>
              <span>Notes</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`flex items-center py-2 px-3 rounded transition-colors ${
                pathname === "/settings" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl mr-3">⚙️</span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
