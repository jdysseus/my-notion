// components/Inbox.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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

export default function Inbox() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(tasksQuery);
        
        const tasksList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Task[];
        
        setTasks(tasksList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId: string) => {
    router.push(`/posts/${taskId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-800 font-medium">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">📥 Inbox</h1>
        <span className="text-sm font-medium text-gray-700">{tasks.length} tasks</span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-800 font-medium">No tasks yet. Start adding some!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card 
              key={task.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white border-gray-200 hover:border-gray-300 hover:-translate-y-0.5"
              onClick={() => handleTaskClick(task.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {task.description && (
                  <p className="text-sm text-gray-800 mb-4 line-clamp-3 font-normal">
                    {task.description}
                  </p>
                )}
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="text-gray-700 font-medium">
                    {task.createdAt.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full font-semibold ${
                    task.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
