'use client';

import { useState, useEffect } from 'react';
import { CheckSquare, Plus, Calendar, Clock, User, X, Loader2 } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    assignee: string;
    status: 'Pending' | 'Done';
    dueDate: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [assignee, setAssignee] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setTasks(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Pending' ? 'Done' : 'Pending';
        const originalTasks = [...tasks];
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus as any } : t));

        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error(error);
            setTasks(originalTasks);
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask) return;

        const payload = {
            title: newTask,
            assignee: assignee || 'Unassigned',
            status: 'Pending',
            dueDate: date || new Date().toISOString().split('T')[0]
        };

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                await fetchTasks();
                setNewTask('');
                setAssignee('');
                setDate('');
            }
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    const activeTasks = tasks.filter(t => t.status === 'Pending');
    const completedTasks = tasks.filter(t => t.status === 'Done');

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">Task Board</h1>
                <p className="text-slate-500">Minimalist task tracking for your team.</p>
            </div>

            {/* Add Task Form */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <form onSubmit={addTask} className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Assignee (Name)"
                        className="md:w-48 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />
                    <input
                        type="date"
                        className="md:w-40 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-slate-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors whitespace-nowrap">
                        Add Task
                    </button>
                </form>
            </div>

            {/* Active Tasks */}
            <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Pending ({activeTasks.length})
                </h3>
                <div className="space-y-2">
                    {activeTasks.map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start sm:items-center justify-between gap-4 group">
                            <div className="flex items-start gap-4">
                                <button
                                    onClick={() => toggleStatus(task.id, task.status)}
                                    className="mt-1 sm:mt-0 w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center text-transparent hover:border-blue-500 group-hover:block transition-colors"
                                >
                                </button>
                                <div>
                                    <p className="font-medium text-slate-900">{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                        <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
                                            <User className="w-3 h-3" /> {task.assignee}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {task.dueDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {activeTasks.length === 0 && (
                        <p className="text-sm text-slate-400 italic pl-2">No pending tasks.</p>
                    )}
                </div>
            </div>

            {/* Completed Tasks */}
            <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 opacity-50">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Completed ({completedTasks.length})
                </h3>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                    {completedTasks.map(task => (
                        <div key={task.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleStatus(task.id, task.status)}
                                    className="w-5 h-5 rounded border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center text-white"
                                >
                                    <CheckSquare className="w-3.5 h-3.5" />
                                </button>
                                <div>
                                    <p className="font-medium text-slate-700 line-through">{task.title}</p>
                                    <p className="text-xs text-slate-400">Completed by {task.assignee}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
