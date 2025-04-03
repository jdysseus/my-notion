'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: string;
}

export default function Inbox() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksList = tasksSnapshot.docs.map(doc => ({
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
    return <div className="p-4">Loading tasks...</div>;
  }

  return (
    <div className="grid gap-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Inbox Tasks</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card 
            key={task.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTaskClick(task.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {task.createdAt.toLocaleDateString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 