import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import { User } from '../types/User';
import { AppPage } from '../App';
import { Brain } from 'lucide-react';
import { authService } from '../services/authService';
import LoadingSpinner from './LoadingSpinner';
import e from 'express';
import { GEMINI_API } from './config';

interface AIReportPageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const GEMINI_API_KEY = GEMINI_API;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const AIReportPage: React.FC<AIReportPageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAIReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateReport = async () => {
  setIsGenerating(true);
  setError(null);
  setAIReport(null);
  try {
    const [income, expenses] = await Promise.all([
      authService.getIncome(),
      authService.getExpenses()
    ]);

    const totalIncome = income.reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalExpense = expenses.reduce((sum, t) => sum + (t.amount || 0), 0);
    const balance = totalIncome - totalExpense;

    const prompt = `You are a financial advisor AI. Analyze the following user's financial data and provide a detailed, actionable report with insights, warnings, and recommendations.\n\nIncome Records: ${JSON.stringify(income)}\n\nExpense Records: ${JSON.stringify(expenses)}\n\nSummary: Total Income: ${formatCurrency(totalIncome)}, Total Expense: ${formatCurrency(totalExpense)}, Net Balance: ${formatCurrency(balance)}.\n\nPlease include:\n- Key insights (positive, warning, neutral)\n- Spending patterns\n- Savings rate\n- Suggestions for improvement\n- Any risks or opportunities\n- Use clear, friendly language and bullet points where helpful.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    if (data?.candidates?.[0]?.content?.parts) {
      setAIReport(data.candidates[0].content.parts.map((p: any) => p.text).join('\n'));
    } else {
      setError('Failed to generate report. No valid response from Gemini.');
    }
  } catch (e) {
    console.error('Error generating report:', e);
    setError(`Failed to generate report. Please try again.  ${e} ${GEMINI_API_KEY}`);
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onMenuClick={() => setIsPanelOpen(true)} 
        onLogout={onLogout}
      />
      <SlidingPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onNavigate={onNavigate}
        currentPage="ai-report"
      />
      <div className="pt-16 px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span>AI Financial Report</span>
              </h1>
              <p className="text-gray-600">Personalized insights and recommendations powered by AI</p>
            </div>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>{isGenerating ? 'Generating...' : aiReport ? 'Regenerate Report' : 'Generate Report'}</span>
            </button>
          </div>
          {/* Loader */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16">
              <LoadingSpinner size="large" text="Generating your AI report..." />
              <p className="text-gray-500 mt-4">This may take a few seconds...</p>
            </div>
          )}
          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6 text-center font-medium">{error}</div>
          )}
          {/* AI Report */}
          {aiReport && !isGenerating && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Financial Report</h2>
              <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed">{aiReport}</pre>
            </div>
          )}
          {/* Initial message */}
          {!aiReport && !isGenerating && !error && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 text-center text-gray-500">
              Click <span className="font-semibold text-purple-600">Generate Report</span> to get your personalized AI-powered financial analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReportPage;