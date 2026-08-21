import type { Answer, LegalCategory, Lawyer } from '@/types';
import { legalCategories } from '@/data/demoData';
import { lawyers } from '@/data/demoData';

export interface AnalysisResult {
  summary: string;
  categories: { category_id: string; name: string; relevance: 'High' | 'Medium' | 'Low'; weight: number }[];
}

export interface GuidanceResult {
  steps: { step: number; title: string; description: string }[];
}

class LegalNavigatorService {
  async analyzeProblem(answers: Answer[]): Promise<AnalysisResult> {
    await this.simulateDelay();

    const categoryWeights = new Map<string, number>();
    for (const answer of answers) {
      if (answer.category_id && answer.category_weight) {
        categoryWeights.set(
          answer.category_id,
          (categoryWeights.get(answer.category_id) || 0) + answer.category_weight
        );
      }
    }

    const sortedCategories = Array.from(categoryWeights.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([catId, weight]) => {
        const cat = legalCategories.find((c) => c.id === catId);
        const maxWeight = Math.max(...Array.from(categoryWeights.values()));
        const relevance: 'High' | 'Medium' | 'Low' = weight >= maxWeight * 0.7 ? 'High' : weight >= maxWeight * 0.4 ? 'Medium' : 'Low';
        return {
          category_id: catId,
          name: cat?.name || catId,
          relevance,
          weight,
        };
      });

    const firstAnswer = answers[0]?.answer as string;
    const summary = this.buildSummary(answers, sortedCategories, firstAnswer);

    return { summary, categories: sortedCategories };
  }

  private buildSummary(answers: Answer[], categories: AnalysisResult['categories'], firstAnswer: string): string {
    const mainCategory = categories[0]?.name || 'your situation';
    const lower = String(firstAnswer).toLowerCase();
    if (lower.includes('legal notice')) {
      return `You received a legal notice that appears to be related to ${mainCategory.toLowerCase()}. Based on your answers, this may require timely legal attention and a structured response.`;
    }
    if (lower.includes('police')) {
      return `You were contacted by the police in a matter that may relate to ${mainCategory.toLowerCase()}. It is important to understand your rights and the appropriate next steps.`;
    }
    if (lower.includes('threatened') || lower.includes('assaulted')) {
      return `You experienced a threat or assault that falls under ${mainCategory.toLowerCase()}. Your safety and proper legal action are the priorities.`;
    }
    if (lower.includes('online') || lower.includes('cyber')) {
      return `You experienced an online fraud or cyber crime related to ${mainCategory.toLowerCase()}. Preserving evidence and filing the right complaint are key next steps.`;
    }
    if (lower.includes('property') || lower.includes('land')) {
      return `You have a property or land dispute that relates to ${mainCategory.toLowerCase()}. Document review and legal consultation are recommended.`;
    }
    if (lower.includes('family') || lower.includes('marriage')) {
      return `You are facing a family or marriage-related problem under ${mainCategory.toLowerCase()}. A sensitive and structured legal approach is recommended.`;
    }
    if (lower.includes('workplace') || lower.includes('employment')) {
      return `You are facing a workplace issue related to ${mainCategory.toLowerCase()}. Understanding your employment rights is the first step.`;
    }
    return `Based on what you described, your situation appears to relate to ${mainCategory.toLowerCase()}. A qualified lawyer can help you understand your options and next steps.`;
  }

  async generateGuidance(categories: AnalysisResult['categories'], answers: Answer[]): Promise<GuidanceResult> {
    await this.simulateDelay();

    const topCat = categories[0]?.category_id;
    const hasDocuments = answers.some((a) => a.question_id === 'q14' && a.answer === 'Yes');

    const baseSteps = [
      { step: 1, title: 'Keep all related documents safe', description: 'Gather and safely store any notices, agreements, messages, or evidence related to your matter. Make copies and note important dates.' },
      { step: 2, title: 'Note the timeline of events', description: 'Write down what happened, when it happened, and any deadlines. This helps your lawyer understand your situation quickly.' },
      { step: 3, title: 'Collect relevant evidence', description: 'Save screenshots, emails, messages, bills, and any other evidence. Organize them chronologically for easy reference.' },
      { step: 4, title: 'Consult an appropriate lawyer', description: 'Connect with a lawyer who specializes in your type of matter. Share your documents and timeline for a productive consultation.' },
      { step: 5, title: 'Discuss your legal options', description: 'Ask the lawyer about your legal position, possible outcomes, and the recommended course of action. Understand the costs and timeline.' },
      { step: 6, title: 'Take informed action', description: 'Based on the lawyer\'s advice, decide on the next steps — whether that is sending a reply, filing a case, or negotiating a settlement.' },
    ];

    if (topCat === 'criminal') {
      baseSteps[4] = { step: 5, title: 'Understand your rights and options', description: 'Ask the lawyer about bail, FIR procedures, and your rights. If an FIR is involved, understand the charges and possible defenses.' };
    }
    if (topCat === 'cyber') {
      baseSteps[2] = { step: 3, title: 'Preserve all digital evidence', description: 'Take screenshots of fraudulent messages, save transaction IDs, note URLs, and do not delete any communications. Report to the cyber crime portal if applicable.' };
    }
    if (topCat === 'property') {
      baseSteps[0] = { step: 1, title: 'Gather all property documents', description: 'Collect sale deeds, title documents, tax receipts, encumbrance certificates, and any agreements related to the property.' };
    }
    if (topCat === 'family') {
      baseSteps[4] = { step: 5, title: 'Discuss options sensitively', description: 'Family matters can be emotionally challenging. Ask the lawyer about mediation, settlement, and amicable resolution options before litigation.' };
    }
    if (topCat === 'employment') {
      baseSteps[1] = { step: 2, title: 'Gather employment records', description: 'Collect your appointment letter, salary slips, employment contract, communication with HR, and any termination or disciplinary notices.' };
    }

    if (!hasDocuments) {
      baseSteps.splice(2, 0, { step: 3, title: 'Request relevant documents', description: 'If you do not have documents yet, identify what you need and request them from the relevant parties or authorities.' });
      baseSteps.forEach((s, i) => (s.step = i + 1));
    }

    return { steps: baseSteps };
  }

  async matchLawyers(categories: AnalysisResult['categories'], answers: Answer[]): Promise<Lawyer[]> {
    await this.simulateDelay();

    const topCat = categories[0]?.category_id;
    if (!topCat) return lawyers.slice(0, 6);

    const wantsLawyer = answers.some((a) => a.question_id === 'q15' && String(a.answer).includes('Yes'));

    const matched = lawyers
      .filter((l) => l.specialization_ids.includes(topCat) && l.verified)
      .sort((a, b) => b.rating - a.rating);

    if (matched.length < 3) {
      const others = lawyers.filter((l) => !matched.includes(l));
      return [...matched, ...others].slice(0, 6);
    }

    return matched.slice(0, 6);
  }

  async generateCaseSummary(answers: Answer[]): Promise<string> {
    await this.simulateDelay();
    const summary = answers
      .filter((a) => a.answer)
      .slice(0, 5)
      .map((a) => `• ${a.question}: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
      .join('\n');
    return summary || 'No case details available.';
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 600));
  }
}

export const legalNavigatorService = new LegalNavigatorService();
export { legalCategories };
