'use client';

import { useState, useEffect } from 'react';
import { FileImage, FileText, UploadCloud, Search, CheckCircle2, MoreVertical, History, AlertCircle, Loader2, X } from 'lucide-react';

type FileType = '2D' | '3D' | 'PDF';
type ApprovalStatus = 'Approved' | 'Pending' | 'Rejected';

interface DesignFile {
    id: string;
    name: string;
    projectName: string;
    type: FileType;
    version: string;
    size: string;
    uploadedBy: string;
    date: string;
    status: ApprovalStatus;
}

export default function DesignsPage() {
    const [files, setFiles] = useState<DesignFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Simple mock upload state
    const [newFile, setNewFile] = useState<Partial<DesignFile>>({ type: '2D', status: 'Pending' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const res = await fetch('/api/designs');
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
                setFiles(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch designs', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: ApprovalStatus) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const updateStatus = async (id: string, newStatus: ApprovalStatus) => {
        const originalFiles = [...files];
        setFiles(files.map(f => f.id === id ? { ...f, status: newStatus } : f));

        try {
            await fetch(`/api/designs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            setFiles(originalFiles);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFile.name || !selectedFile) {
            alert("Please select a file and provide a name.");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('name', newFile.name);
            formData.append('category', newFile.type || '2D');
            formData.append('description', newFile.projectName || ''); // We are using 'projectName' as description for now or we should add a description field. 
            // The API expects 'description' and 'category'. The frontend has 'projectName' and 'type'.
            // Let's map 'type' to 'category' and 'projectName' to 'description' or just update API to match. 
            // For now, mapping to keep it simple as per previous API update.

            const res = await fetch('/api/designs', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                await fetchDesigns();
                setIsModalOpen(false);
                setNewFile({ type: '2D', status: 'Pending' });
                setSelectedFile(null);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error('Failed to upload file', error);
        } finally {
            setUploading(false);
        }
    }

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Designs & Files</h1>
                    <p className="text-slate-500">Central repository for all project assets.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload New File
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search files or projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                        <option>All Projects</option>
                        {/* Ideally fetching projects to populate this */}
                    </select>
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                        <option>All Types</option>
                        <option>2D Drawings</option>
                        <option>3D Renders</option>
                        <option>PDFs</option>
                    </select>
                </div>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFiles.map((file) => (
                    <div key={file.id} className="bg-white rounded-xl border border-slate-200 shadow-sm group hover:shadow-md transition-all">
                        {/* Preview Stub */}
                        <div className="h-40 bg-slate-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                            {file.type === '3D' ? (
                                <FileImage className="w-12 h-12 text-slate-400" />
                            ) : (
                                <FileText className="w-12 h-12 text-slate-400" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100">View</button>
                                <button className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100">Download</button>
                            </div>
                            <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                                {file.type}
                            </span>
                        </div>

                        <div className="p-4 space-y-3">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-slate-900 truncate pr-2" title={file.name}>{file.name}</h3>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{file.version}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{file.projectName}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <select
                                        value={file.status}
                                        onChange={(e) => updateStatus(file.id, e.target.value as ApprovalStatus)}
                                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(file.status)} focus:ring-0`}
                                    >
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <span className="text-[10px] text-slate-400">{file.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Upload Design</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">File Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newFile.name || ''}
                                    onChange={e => setNewFile({ ...newFile, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Project Name *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all"
                                    value={newFile.projectName || ''}
                                    onChange={e => setNewFile({ ...newFile, projectName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">File Type</label>
                                <select
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 outline-none transition-all bg-white"
                                    value={newFile.type || '2D'}
                                    onChange={e => setNewFile({ ...newFile, type: e.target.value as FileType })}
                                >
                                    <option value="2D">2D Drawing</option>
                                    <option value="3D">3D Render</option>
                                    <option value="PDF">PDF Document</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Select File *</label>
                                <input
                                    type="file"
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
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
                                    disabled={uploading}
                                    className="flex-1 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
