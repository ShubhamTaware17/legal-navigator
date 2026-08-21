import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatFileSize, formatDate } from '@/utils/cn';
import { motion } from 'framer-motion';
import { FileText, Download, Eye } from 'lucide-react';

export function LawyerDocuments() {
  const { documents, lawyerRequests } = useApp();
  const clients = lawyerRequests.filter((r) => r.status === 'Accepted');

  return (
    <div>
      <DashboardHeader title="Documents" subtitle="View and manage client documents" />
      <div className="p-4 sm:p-6 lg:p-8">
        {documents.length === 0 ? (
          <EmptyState icon={<FileText className="w-8 h-8" />} title="No documents" description="Documents shared by your clients will appear here." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 flex-shrink-0"><FileText className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{doc.name}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{formatFileSize(doc.size)} · {formatDate(doc.uploaded_at)}</p>
                      <Badge variant="default" className="mt-2">{doc.category}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-navy-100">
                    <Button variant="secondary" size="sm" fullWidth><Eye className="w-3.5 h-3.5" /> View</Button>
                    <Button variant="secondary" size="sm" fullWidth><Download className="w-3.5 h-3.5" /> Download</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
