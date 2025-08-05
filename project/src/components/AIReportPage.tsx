import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import { User, mockFinancialData } from '../types/User';
import { AppPage } from '../App';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, Lightbulb, Star, ArrowRight } from 'lucide-react';

interface AIReportPageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const AIReportPage: React.FC<AIReportPageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateReport = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  // Mock AI insights
  const insights = [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Excellent Savings Rate',
      description: 'Your savings rate of 53.8% is significantly above the recommended 20%. This puts you on track for strong financial security.',
      recommendation: 'Consider investing a portion of your savings in diversified portfolios for better long-term growth.'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Entertainment Spending Spike',
      description: 'Your entertainment expenses have increased by 45% compared to last month, totaling ₹8,000.',
      recommendation: 'Set a monthly entertainment budget of ₹6,000 to maintain your excellent savings rate.'
    },
    {
      type: 'neutral',
      icon: Target,
      title: 'Consistent Income Pattern',
      description: 'Your income shows steady growth with multiple sources including salary, freelance, and investments.',
      recommendation: 'Continue diversifying income streams. Consider increasing freelance rates by 10-15%.'
    }
  ];

  const predictions = [
    {
      metric: 'Next Month Expenses',
      value: '₹42,000',
      trend: 'up',
      confidence: 85,
      description: 'Based on seasonal patterns and current spending trends'
    },
    {
      metric: 'Year-end Savings',
      value: '₹5,40,000',
      trend: 'up',
      confidence: 92,
      description: 'Projected savings if current patterns continue'
    },
    {
      metric: 'Budget Variance',
      value: '-8%',
      trend: 'neutral',
      confidence: 78,
      description: 'Expected difference from your planned budget'
    }
  ];

  const recommendations = [
    {
      category: 'Savings',
      title: 'Emergency Fund Complete',
      description: 'You have 6+ months of expenses saved. Consider investing excess in mutual funds.',
      priority: 'high',
      impact: 'High return potential'
    },
    {
      category: 'Expenses',
      title: 'Optimize Subscription Services',
      description: 'Review recurring subscriptions. Potential savings of ₹2,000/month identified.',
      priority: 'medium',
      impact: 'Monthly savings'
    },
    {
      category: 'Income',
      title: 'Freelance Rate Optimization',
      description: 'Market analysis suggests you can increase freelance rates by 20%.',
      priority: 'high',
      impact: 'Income boost'
    },
    {
      category: 'Investment',
      title: 'Tax-saving Instruments',
      description: 'Maximize 80C deductions with ELSS investments before March.',
      priority: 'medium',
      impact: 'Tax savings'
    }
  ];

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
        <div className="max-w-7xl mx-auto">
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
              <span>{isGenerating ? 'Generating...' : 'Regenerate Report'}</span>
            </button>
          </div>

          {/* AI Insights */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                const colors = {
                  positive: 'from-green-500 to-green-600 text-green-600 bg-green-50',
                  warning: 'from-yellow-500 to-yellow-600 text-yellow-600 bg-yellow-50',
                  neutral: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50'
                };

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-r ${colors[insight.type].split(' ')[0]} ${colors[insight.type].split(' ')[1]}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{insight.description}</p>
                    <div className={`p-3 rounded-lg ${colors[insight.type].split(' ').slice(2).join(' ')}`}>
                      <p className={`text-sm font-medium ${colors[insight.type].split(' ')[2]}`}>
                        💡 {insight.recommendation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Predictions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{prediction.metric}</h3>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${prediction.trend === 'up' ? 'bg-green-500' : prediction.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-500">{prediction.confidence}% confident</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{prediction.value}</p>
                  <p className="text-sm text-gray-500">{prediction.description}</p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personalized Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.priority === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-500">{rec.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-400">AI Pick</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{rec.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">{rec.impact}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Health Score */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Financial Health Score</h2>
                <p className="text-purple-100">Based on your spending patterns, savings rate, and financial goals</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-2">8.7</div>
                <div className="text-purple-100">out of 10</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">53.8%</div>
                <div className="text-purple-100 text-sm">Savings Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-purple-100 text-sm">Budget Adherence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">6.2</div>
                <div className="text-purple-100 text-sm">Months Emergency Fund</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Low</div>
                <div className="text-purple-100 text-sm">Financial Risk</div>
              </div>
            </div>

            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-white/90 text-sm leading-relaxed">
                🎉 <strong>Excellent financial health!</strong> You're saving well above average and maintaining good spending discipline. 
                Focus on optimizing your investments and consider increasing your income streams for even better results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReportPage;