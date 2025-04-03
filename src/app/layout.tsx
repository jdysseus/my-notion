// src/app/layout.tsx
import "./globals.css"; // ✅ Tailwind가 동작하려면 필수!
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex h-screen">
        <div className="flex w-full h-full">
          <Sidebar />
          <Main>{children}</Main>
        </div>
      </body>
    </html>
  );
}
