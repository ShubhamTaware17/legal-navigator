import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, UserCheck, Calendar, MessageSquare, Upload, CheckCircle2, Circle } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Tabs';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { useApp } from '@/contexts/AppContext';
import { lawyers, legalCategories } from '@/data/demoData';
import { formatDate } from '@/utils/cn';

export function CustomerCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, documents, appointments } = useApp();
  const legalCase = cases.find((c) => c.id === id);

  if (!legalCase) {
    return (
      <div>
        <DashboardHeader title="Case Not Found" />
        <div className="p-8 text-center"><p className="text-navy-500">This case could not be found.</p><Button variant="primary" className="mt-4" onClick={() => navigate('/cases')}>Back to Cases</Button></div>
      </div>
    );
  }

  const caseDocs = documents.filter((d) => d.case_id === id);
  const caseAppt = appointments.find((a) => a.id === legalCase.appointment_id);
  const selectedLawyer = lawyers.find((l) => l.id === legalCase.selected_lawyer_id);

  return (
    <div>
      <DashboardHeader title={legalCase.title} subtitle={`Created ${formatDate(legalCase.created_at)}`} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <button onClick={() => navigate('/cases')} className="text-sm text-navy-500 hover:text-navy-700 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back to Cases</button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-navy-900">Problem Summary</h2>
                <StatusBadge status={legalCase.status} />
              </div>
              <p className="text-sm text-navy-600 leading-relaxed">{legalCase.summary}</p>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Possible Legal Areas</h2>
              <div className="space-y-2">
                {legalCase.categories.map((cat) => (
                  <div key={cat.category_id} className="flex items-center justify-between p-3 rounded-xl bg-navy-50">
                    <span className="font-semibold text-navy-900 text-sm">{cat.name}</span>
                    <Badge variant={cat.relevance === 'High' ? 'success' : 'info'}>{cat.relevance} relevance</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Your Answers</h2>
              <div className="space-y-2">
                {legalCase.answers.map((ans) => (
                  <Accordion key={ans.question_id} title={ans.question}>
                    <p className="text-navy-600">{Array.isArray(ans.answer) ? ans.answer.join(', ') : ans.answer}</p>
                  </Accordion>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Guidance</h2>
              <div className="space-y-3">
                {legalCase.guidance.map((g) => (
                  <div key={g.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-700 flex-shrink-0">{g.step}</div>
                    <div><h3 className="font-semibold text-navy-900 text-sm">{g.title}</h3><p className="text-xs text-navy-500 mt-0.5">{g.description}</p></div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Case Timeline</h2>
              <div className="space-y-3">
                {legalCase.timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {t.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <Circle className="w-5 h-5 text-navy-200 flex-shrink-0" />}
                    <div className="flex-1">
                      <span className={`text-sm ${t.done ? 'font-semibold text-navy-900' : 'text-navy-400'}`}>{t.status}</span>
                      {t.timestamp && <span className="text-xs text-navy-400 ml-2">{formatDate(t.timestamp)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            {selectedLawyer && (
              <Card className="p-5">
                <h2 className="font-bold text-navy-900 mb-3">Selected Lawyer</h2>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={selectedLawyer.avatar_url} name={selectedLawyer.name} size="md" />
                  <div><p className="font-semibold text-navy-900 text-sm">{selectedLawyer.name}</p><p className="text-xs text-navy-500">{selectedLawyer.city}</p></div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" fullWidth onClick={() => navigate(`/lawyer/${selectedLawyer.id}`)}>Profile</Button>
                  <Button variant="primary" size="sm" fullWidth onClick={() => navigate('/chat')}><MessageSquare className="w-4 h-4" /> Chat</Button>
                </div>
              </Card>
            )}

            {caseAppt && (
              <Card className="p-5">
                <h2 className="font-bold text-navy-900 mb-3">Consultation</h2>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-navy-600"><Calendar className="w-4 h-4 text-navy-400" /> {formatDate(caseAppt.date)} at {caseAppt.time}</p>
                  <p className="flex items-center gap-2 text-navy-600"><UserCheck className="w-4 h-4 text-navy-400" /> {caseAppt.duration} min · Video</p>
                </div>
                <Button variant="accent" size="sm" fullWidth className="mt-3" onClick={() => navigate(`/video-consultation/${caseAppt.id}`)}>Join Consultation</Button>
              </Card>
            )}

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-navy-900">Documents</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}><Upload className="w-3.5 h-3.5" /></Button>
              </div>
              {caseDocs.length === 0 ? (
                <p className="text-sm text-navy-400 text-center py-4">No documents uploaded yet.</p>
              ) : (
                <div className="space-y-2">
                  {caseDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 p-2 rounded-lg bg-navy-50">
                      <FileText className="w-4 h-4 text-navy-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-navy-700 truncate">{doc.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <DisclaimerBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
