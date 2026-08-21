import { useState, useRef, type DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, X, File, Image, FileCheck } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatFileSize, formatDate } from '@/utils/cn';
import type { Document } from '@/types';

const docCategories = ['Legal Notice', 'Court Notice', 'Summons', 'Police Notice', 'Agreements', 'Property Documents', 'Bills', 'Emails', 'WhatsApp Screenshots', 'Images', 'PDF', 'Audio', 'Video'];

export function CustomerDocuments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { documents, addDocument, deleteDocument } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Legal Notice');
  const [selectedCase, setSelectedCase] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cases } = useApp();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) handleUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) handleUpload(files);
  };

  const handleUpload = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 20) {
      setUploadProgress(i);
      await new Promise((r) => setTimeout(r, 100));
    }
    files.forEach((file) => {
      const doc: Document = {
        id: `doc-${Date.now()}-${Math.random()}`,
        user_id: user?.id || 'demo-customer',
        case_id: selectedCase || undefined,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        category: selectedCategory,
        uploaded_at: new Date().toISOString(),
      };
      addDocument(doc);
    });
    setUploading(false);
    setUploadProgress(0);
    setShowUploadModal(false);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('audio/')) return File;
    if (type.startsWith('video/')) return File;
    return FileText;
  };

  return (
    <div>
      <DashboardHeader title="My Documents" subtitle="Upload and manage your legal documents" action={<Button variant="primary" size="sm" onClick={() => setShowUploadModal(true)}><Upload className="w-4 h-4" /> Upload</Button>} />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-6 ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-navy-200 hover:border-navy-300 hover:bg-navy-50'}`}
        >
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
          {uploading ? (
            <div>
              <div className="w-12 h-12 rounded-full border-4 border-navy-200 border-t-teal-500 animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-navy-700">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-navy-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-navy-700">Drag & drop files here, or click to browse</p>
              <p className="text-xs text-navy-400 mt-1">PDF, Images, Audio, Video — up to 10MB each</p>
            </>
          )}
        </div>

        {documents.length === 0 ? (
          <EmptyState icon={<FileText className="w-8 h-8" />} title="No documents yet" description="Upload legal notices, agreements, court documents, or any legal paperwork." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {documents.map((doc) => {
                const Icon = getFileIcon(doc.type);
                return (
                  <motion.div key={doc.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-navy-900 truncate">{doc.name}</p>
                          <p className="text-xs text-navy-400 mt-0.5">{formatFileSize(doc.size)} · {formatDate(doc.uploaded_at)}</p>
                          <Badge variant="default" className="mt-2">{doc.category}</Badge>
                        </div>
                        <button onClick={() => deleteDocument(doc.id)} className="p-1.5 rounded-lg text-navy-400 hover:bg-error-50 hover:text-error-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-elevated max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy-900">Upload Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <Select label="Document Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {docCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select label="Link to Case (optional)" value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
                <option value="">None</option>
                {cases.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </Select>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-navy-200 hover:border-navy-300'}`}
              >
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
                <FileCheck className="w-8 h-8 text-navy-300 mx-auto mb-2" />
                <p className="text-sm text-navy-600">Click to browse or drag files here</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
