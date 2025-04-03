"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); // 현재 경로 가져오기

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold">📌 Sidebar</h2>
      <ul className="mt-4">
        <li>
          <Link
            href="/"
            className={`py-2 px-3 rounded cursor-pointer block ${
              pathname === "/" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            🏠 홈
          </Link>
        </li>
        <li>
          <Link
            href="/notes"
            className={`py-2 px-3 rounded cursor-pointer block ${
              pathname === "/notes" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            📝 노트
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`py-2 px-3 rounded cursor-pointer block ${
              pathname === "/settings" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            ⚙️ 설정
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`py-2 px-3 rounded cursor-pointer block ${
              pathname === "/about" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            📄 About
          </Link>
        </li>
      </ul>
    </div>
  );
}
