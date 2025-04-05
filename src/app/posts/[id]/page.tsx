'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: 'pending' | 'completed' | 'in-progress';
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDoc = doc(db, 'tasks', params.id);
        const taskSnapshot = await getDoc(taskDoc);

        if (!taskSnapshot.exists()) {
          setError(true);
          return;
        }

        const taskData = taskSnapshot.data();
        setTask({
          id: taskSnapshot.id,
          ...taskData,
          createdAt: taskData.createdAt?.toDate() || new Date(),
        } as Task);

      } catch (error) {
        console.error('Error fetching task:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-800 font-medium">Loading task details...</div>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-xl font-semibold text-gray-900">❌ 해당 포스트를 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="bg-white border-gray-200">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              ← 돌아가기
            </button>
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              task.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
              task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
              'bg-amber-100 text-amber-700 border border-amber-200'
            }`}>
              {task.status}
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {task.title}
          </CardTitle>
          <p className="text-sm font-medium text-gray-700">
            작성일: {task.createdAt.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </CardHeader>
        <CardContent>
          {task.description ? (
            <p className="text-gray-800 whitespace-pre-wrap">
              {task.description}
            </p>
          ) : (
            <p className="text-gray-600 italic">
              설명이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
  