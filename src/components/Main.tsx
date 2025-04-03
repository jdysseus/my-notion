// src/components/Main.tsx
export default function Main({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">🏠 메인 화면</h1>
        <div className="p-6 bg-white shadow-md rounded">{children}</div>
      </div>
    );
  }
  