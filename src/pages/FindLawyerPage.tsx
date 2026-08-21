import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, MapPin, Briefcase, ShieldCheck, X, Globe, Video, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { NoResultsState } from '@/components/ui/States';
import { lawyers, legalCategories } from '@/data/demoData';
import { formatCurrency } from '@/utils/cn';
import { useApp } from '@/contexts/AppContext';
import { legalNavigatorService } from '@/services/legalNavigatorService';

export function FindLawyerPage() {
  const navigate = useNavigate();
  const { currentAnalysis } = useApp();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialization: '',
    city: '',
    language: '',
    minExperience: '',
    maxFee: '',
    onlineOnly: false,
    verifiedOnly: false,
  });
  const [matchedLawyers, setMatchedLawyers] = useState<typeof lawyers | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentAnalysis) {
      setLoading(true);
      legalNavigatorService.matchLawyers(currentAnalysis.categories, []).then((result) => {
        setMatchedLawyers(result);
        setLoading(false);
      });
    }
  }, [currentAnalysis]);

  const cities = useMemo(() => [...new Set(lawyers.map((l) => l.city))], []);
  const languages = useMemo(() => [...new Set(lawyers.flatMap((l) => l.languages))], []);

  const filteredLawyers = useMemo(() => {
    let result = matchedLawyers || lawyers;
    const lower = search.toLowerCase();
    if (lower) {
      result = result.filter((l) =>
        l.name.toLowerCase().includes(lower) ||
        l.specialization_ids.some((s) => legalCategories.find((c) => c.id === s)?.name.toLowerCase().includes(lower)) ||
        l.city.toLowerCase().includes(lower)
      );
    }
    if (filters.specialization) result = result.filter((l) => l.specialization_ids.includes(filters.specialization));
    if (filters.city) result = result.filter((l) => l.city === filters.city);
    if (filters.language) result = result.filter((l) => l.languages.includes(filters.language));
    if (filters.minExperience) result = result.filter((l) => l.experience_years >= parseInt(filters.minExperience));
    if (filters.maxFee) result = result.filter((l) => l.consultation_fee_30 <= parseInt(filters.maxFee));
    if (filters.onlineOnly) result = result.filter((l) => l.online_consultation);
    if (filters.verifiedOnly) result = result.filter((l) => l.verified);
    return result;
  }, [search, filters, matchedLawyers]);

  const clearFilters = () => {
    setFilters({ specialization: '', city: '', language: '', minExperience: '', maxFee: '', onlineOnly: false, verifiedOnly: false });
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-10">
        <div className="container-app">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Find a Lawyer</h1>
            <p className="mt-2 text-navy-300">Browse verified legal professionals or get matched based on your legal matter.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search lawyers by name, specialization, or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                  className="bg-white"
                />
              </div>
              <Button variant="secondary" size="lg" onClick={() => setShowFilters(!showFilters)} className="bg-white">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 flex-shrink-0">
              <Card className="p-5 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy-900">Filters</h3>
                  <button onClick={clearFilters} className="text-xs text-teal-600 hover:text-teal-700 font-semibold">Clear all</button>
                </div>
                <div className="space-y-4">
                  <Select label="Specialization" value={filters.specialization} onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}>
                    <option value="">All</option>
                    {legalCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                  <Select label="City" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
                    <option value="">All</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                  <Select label="Language" value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })}>
                    <option value="">All</option>
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </Select>
                  <Select label="Min Experience" value={filters.minExperience} onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}>
                    <option value="">Any</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                    <option value="15">15+ years</option>
                  </Select>
                  <Select label="Max Fee (30 min)" value={filters.maxFee} onChange={(e) => setFilters({ ...filters, maxFee: e.target.value })}>
                    <option value="">Any</option>
                    <option value="499">₹499 or less</option>
                    <option value="699">₹699 or less</option>
                    <option value="999">₹999 or less</option>
                  </Select>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
                      <input type="checkbox" checked={filters.onlineOnly} onChange={(e) => setFilters({ ...filters, onlineOnly: e.target.checked })} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" />
                      Online consultation only
                    </label>
                    <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
                      <input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" />
                      Verified lawyers only
                    </label>
                  </div>
                </div>
              </Card>
            </motion.aside>
          )}

          <div className="flex-1">
            {currentAnalysis && (
              <div className="mb-4">
                <Badge variant="accent"><Sparkles className="w-3 h-3" /> Recommended based on your analysis</Badge>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-navy-500">{filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''} found</p>
            </div>

            {filteredLawyers.length === 0 ? (
              <NoResultsState
                title="No Lawyers Found"
                description="No lawyers match your current filters. Try changing the specialization, location or consultation preferences."
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredLawyers.map((lawyer, i) => (
                  <motion.div key={lawyer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="p-5 h-full hover:shadow-elevated transition-all">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar src={lawyer.avatar_url} name={lawyer.name} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-navy-900 text-sm truncate">{lawyer.name}</h3>
                            {lawyer.verified && <ShieldCheck className="w-4 h-4 text-teal-500 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-navy-500 mt-0.5">
                            {lawyer.specialization_ids.map((s) => legalCategories.find((c) => c.id === s)?.name).filter(Boolean).join(', ')}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-semibold text-navy-700">{lawyer.rating}</span>
                            <span className="text-xs text-navy-400">({lawyer.review_count} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-navy-500 mb-4">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {lawyer.experience_years} yrs exp</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lawyer.city}</span>
                        <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {lawyer.languages.join(', ')}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lawyer.next_available}</span>
                      </div>
                      {lawyer.online_consultation && (
                        <div className="mb-3"><Badge variant="info"><Video className="w-3 h-3" /> Online Available</Badge></div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                        <div>
                          <p className="text-xs text-navy-400">From</p>
                          <p className="text-sm font-bold text-navy-900">{formatCurrency(lawyer.consultation_fee_15)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm" onClick={() => navigate(`/lawyer/${lawyer.id}`)}>View Profile</Button>
                          <Button variant="primary" size="sm" onClick={() => navigate(`/booking/${lawyer.id}`)}>Book</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

