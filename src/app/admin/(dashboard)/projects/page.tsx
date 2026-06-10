'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectStage } from '@/types/admin';
import { Plus, Search, Calendar, BarChart2, MoreVertical, X, Clock, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({ progress: 0, stage: 'Design' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setProjects(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStageColor = (stage: ProjectStage) => {
        switch (stage) {
            case 'Design': return 'bg-purple-100 text-purple-700';
            case 'Approval': return 'bg-blue-100 text-blue-700';
            case 'Execution': return 'bg-blue-100 text-blue-700';
            case 'Handover': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.name || !newProject.clientName) return;

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });

            if (res.ok) {
                await fetchProjects();
                setIsModalOpen(false);
                setNewProject({ progress: 0, stage: 'Design' });
            }
        } catch (error) {
            console.error('Failed to create project', error);
        }
    };

    const updateProgress = async (id: string, progress: number) => {
        const originalProjects = [...projects];
        setProjects(projects.map(p => p.id === id ? { ...p, progress } : p));

        try {
            await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress }),
            });
        } catch (error) {
            setProjects(originalProjects);
        }
    };

    const updateStage = async (id: string, stage: ProjectStage) => {
        const originalProjects = [...projects];
        setProjects(projects.map(p => p.id === id ? { ...p, stage } : p));

        try {
            await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage }),
            });
        } catch (error) {
            setProjects(originalProjects);
        }
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                    <p className="text-slate-500">Track execution delay and progress.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Project
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Design', 'Approval', 'Execution', 'Handover'].map((stage) => {
                    const count = projects.filter(p => p.stage === stage).length;
                    return (
                        <div key={stage} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 font-semibold uppercase">{stage}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{count}</p>
                        </div>
                    )
                })}
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{project.name}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                    {project.clientName}
                                </p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStageColor(project.stage)}`}>
                                {project.stage}
                            </span>
                        </div>

                        <div className="p-5 flex-1 space-y-4">
                            {/* Progress Bar */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500 font-medium">Progress</span>
                                    <span className="text-slate-900 font-bold">{project.progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative group cursor-pointer">
                                    <div
                                        className="h-full bg-slate-900 rounded-full transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                    {/* Slider simulation on hover for demo */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={project.progress}
                                        onChange={(e) => updateProgress(project.id, Number(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        title="Slide to update progress"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 text-right">Drag bar to update</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Start Date
                                    </p>
                                    <p className="font-medium text-slate-700">{project.startDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                                        <BarChart2 className="w-3 h-3" /> Budget
                                    </p>
                                    <p className="font-medium text-slate-700">₹ {(project.budget / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-100 flex justify-between items-center">
                            <select
                                value={project.stage}
                                onChange={(e) => updateStage(project.id, e.target.value as ProjectStage)}
                                className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-slate-400 cursor-pointer"
                            >
                                <option value="Design">Design Phase</option>
                                <option value="Approval">Approval</option>
                                <option value="Execution">Execution</option>
                                <option value="Handover">Handover</option>
                            </select>
                            <button className="text-xs text-slate-500 hover:text-slate-900 font-medium hover:underline">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Start New Project</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProject} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Project Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newProject.name || ''}
                                    onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Client Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newProject.clientName || ''}
                                    onChange={e => setNewProject({ ...newProject, clientName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Stage</label>
                                    <select
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all bg-white"
                                        value={newProject.stage || 'Design'}
                                        onChange={e => setNewProject({ ...newProject, stage: e.target.value as ProjectStage })}
                                    >
                                        <option value="Design">Design</option>
                                        <option value="Approval">Approval</option>
                                        <option value="Execution">Execution</option>
                                        <option value="Handover">Handover</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Review Budget (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                        value={newProject.budget || ''}
                                        onChange={e => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newProject.startDate || ''}
                                    onChange={e => setNewProject({ ...newProject, startDate: e.target.value })}
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
