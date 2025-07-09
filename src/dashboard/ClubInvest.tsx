import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Target, 
  Clock, 
  Users, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Shield,
  Award,
  Calendar,
  Wallet,
  Plus,
  Filter,
  Search,
  Info,
  BookOpen,
  Radio
} from 'lucide-react';

interface InvestmentOpportunity {
  id: string;
  title: string;
  type: 'course' | 'ebook' | 'live' | 'formation';
  creator: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  minInvestment: number;
  expectedROI: number;
  timeframe: string;
  risk: 'Low' | 'Medium' | 'High';
  investors: number;
  category: string;
  fundingDeadline: string;
  projectedRevenue: number;
  creatorShare: number;
  investorShare: number;
  status: 'active' | 'funded' | 'closed';
  featured: boolean;
}

interface Portfolio {
  id: string;
  productTitle: string;
  type: string;
  investedAmount: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'pending';
  nextPayout: string;
}

interface Transaction {
  id: string;
  type: 'investment' | 'return' | 'withdrawal';
  productTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const ClubInvest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'portfolio' | 'analytics' | 'transactions'>('opportunities');

  const investmentOpportunities: InvestmentOpportunity[] = [
    {
      id: '1',
      title: 'AI Business Strategy Masterclass 2024',
      type: 'course',
      creator: 'Dr. Sarah Johnson',
      description: 'Comprehensive course on integrating AI into business strategy with real-world case studies.',
      targetAmount: 50000,
      currentAmount: 32500,
      minInvestment: 100,
      expectedROI: 25,
      timeframe: '12 months',
      risk: 'Medium',
      investors: 45,
      category: 'Business Strategy',
      fundingDeadline: '2024-02-15',
      projectedRevenue: 125000,
      creatorShare: 60,
      investorShare: 40,
      status: 'active',
      featured: true
    },
    {
      id: '2',
      title: 'Machine Learning for Entrepreneurs eBook Series',
      type: 'ebook',
      creator: 'Prof. David Chen',
      description: 'Complete eBook series covering practical ML applications for business leaders.',
      targetAmount: 25000,
      currentAmount: 25000,
      minInvestment: 50,
      expectedROI: 18,
      timeframe: '8 months',
      risk: 'Low',
      investors: 67,
      category: 'Technology',
      fundingDeadline: '2024-01-20',
      projectedRevenue: 60000,
      creatorShare: 70,
      investorShare: 30,
      status: 'funded',
      featured: false
    },
    {
      id: '3',
      title: 'Weekly Marketing Automation Live Sessions',
      type: 'live',
      creator: 'Maria Rodriguez',
      description: 'Interactive live sessions teaching advanced marketing automation techniques.',
      targetAmount: 15000,
      currentAmount: 8750,
      minInvestment: 75,
      expectedROI: 30,
      timeframe: '6 months',
      risk: 'High',
      investors: 28,
      category: 'Marketing',
      fundingDeadline: '2024-02-01',
      projectedRevenue: 45000,
      creatorShare: 55,
      investorShare: 45,
      status: 'active',
      featured: true
    },
    {
      id: '4',
      title: 'Complete Startup Funding Formation',
      type: 'formation',
      creator: 'Alex Turner',
      description: 'Comprehensive training program on startup funding from idea to Series A.',
      targetAmount: 40000,
      currentAmount: 12000,
      minInvestment: 200,
      expectedROI: 22,
      timeframe: '10 months',
      risk: 'Medium',
      investors: 18,
      category: 'Entrepreneurship',
      fundingDeadline: '2024-03-01',
      projectedRevenue: 95000,
      creatorShare: 65,
      investorShare: 35,
      status: 'active',
      featured: false
    }
  ];

  const portfolio: Portfolio[] = [
    {
      id: '1',
      productTitle: 'Digital Marketing Fundamentals',
      type: 'Course',
      investedAmount: 500,
      currentValue: 650,
      returns: 150,
      returnsPercentage: 30,
      investmentDate: '2023-10-15',
      status: 'active',
      nextPayout: '2024-01-15'
    },
    {
      id: '2',
      productTitle: 'AI Tools eBook Collection',
      type: 'eBook',
      investedAmount: 250,
      currentValue: 295,
      returns: 45,
      returnsPercentage: 18,
      investmentDate: '2023-11-20',
      status: 'active',
      nextPayout: '2024-01-20'
    },
    {
      id: '3',
      productTitle: 'Business Intelligence Workshop',
      type: 'Formation',
      investedAmount: 800,
      currentValue: 920,
      returns: 120,
      returnsPercentage: 15,
      investmentDate: '2023-09-10',
      status: 'completed',
      nextPayout: 'Completed'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'investment',
      productTitle: 'AI Business Strategy Masterclass',
      amount: 300,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: '2',
      type: 'return',
      productTitle: 'Digital Marketing Fundamentals',
      amount: 50,
      date: '2024-01-08',
      status: 'completed'
    },
    {
      id: '3',
      type: 'investment',
      productTitle: 'Machine Learning eBook Series',
      amount: 150,
      date: '2024-01-05',
      status: 'pending'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-5 h-5 text-primary" />;
      case 'ebook':
        return <Award className="w-5 h-5 text-primary" />;
      case 'live':
        return <Radio className="w-5 h-5 text-primary" />;
      case 'formation':
        return <Target className="w-5 h-5 text-primary" />;
      default:
        return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-400 bg-green-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'High':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const OpportunitiesTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search investment opportunities..."
              className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by type">
          <option>All Types</option>
          <option>Courses</option>
          <option>eBooks</option>
          <option>Live Sessions</option>
          <option>Formations</option>
        </select>
        <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by risk">
          <option>All Risk Levels</option>
          <option>Low Risk</option>
          <option>Medium Risk</option>
          <option>High Risk</option>
        </select>
      </div>

      {/* Featured Opportunities */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Featured Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investmentOpportunities.filter(opp => opp.featured).map((opportunity) => (
            <div key={opportunity.id} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    {getTypeIcon(opportunity.type)}
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium uppercase">{opportunity.type}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(opportunity.risk)}`}>
                        {opportunity.risk} Risk
                      </span>
                      <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full font-medium">
                        {opportunity.expectedROI}% ROI
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors" aria-label="Add to watchlist">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {opportunity.title}
              </h4>
              
              <p className="text-sm text-white/60 mb-1">by {opportunity.creator}</p>
              <p className="text-sm text-white/70 mb-4 line-clamp-2">{opportunity.description}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                    <span>Funding Progress</span>
                    <span>${opportunity.currentAmount.toLocaleString()} / ${opportunity.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(opportunity.currentAmount / opportunity.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                  <div>
                    <span className="block">Min. Investment</span>
                    <span className="text-white font-medium">${opportunity.minInvestment}</span>
                  </div>
                  <div>
                    <span className="block">Investors</span>
                    <span className="text-white font-medium">{opportunity.investors}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors">
                  Invest Now
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="View details">
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Opportunities */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">All Investment Opportunities</h3>
        <div className="space-y-4">
          {investmentOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                {getTypeIcon(opportunity.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-white">{opportunity.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(opportunity.risk)}`}>
                    {opportunity.risk}
                  </span>
                  {opportunity.status === 'funded' && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                      Funded
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/60 mb-2">by {opportunity.creator} • {opportunity.category}</p>
                <div className="flex items-center space-x-4 text-sm text-white/50">
                  <span>${opportunity.currentAmount.toLocaleString()} / ${opportunity.targetAmount.toLocaleString()}</span>
                  <span>{opportunity.expectedROI}% ROI</span>
                  <span>{opportunity.investors} investors</span>
                  <span>Min. ${opportunity.minInvestment}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-white mb-1">{opportunity.expectedROI}%</div>
                <div className="text-sm text-white/60">{opportunity.timeframe}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PortfolioTab = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total Invested</h3>
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-white">$1,550</div>
          <p className="text-sm text-white/60">Across {portfolio.length} investments</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Current Value</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">$1,865</div>
          <div className="flex items-center space-x-1">
            <ArrowUpRight className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">+20.3%</span>
          </div>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Total Returns</h3>
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">$315</div>
          <p className="text-sm text-white/60">+$45 this month</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Investments</h3>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{portfolio.filter(p => p.status === 'active').length}</div>
          <p className="text-sm text-white/60">Generating returns</p>
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Your Investments</h3>
        <div className="space-y-4">
          {portfolio.map((investment) => (
            <div key={investment.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-white">{investment.productTitle}</h4>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                    {investment.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    investment.status === 'active' ? 'text-green-400 bg-green-400/20' :
                    investment.status === 'completed' ? 'text-blue-400 bg-blue-400/20' :
                    'text-yellow-400 bg-yellow-400/20'
                  }`}>
                    {investment.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/50">
                  <span>Invested: ${investment.investedAmount}</span>
                  <span>Current: ${investment.currentValue}</span>
                  <span>Returns: ${investment.returns}</span>
                  <span>Next Payout: {investment.nextPayout}</span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold mb-1 ${
                  investment.returnsPercentage > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {investment.returnsPercentage > 0 ? '+' : ''}{investment.returnsPercentage}%
                </div>
                <div className="text-sm text-white/60">
                  Since {new Date(investment.investmentDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Portfolio Performance</h3>
          <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Performance chart visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Investment Distribution</h3>
          <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">Distribution pie chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Investment Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <p className="text-sm text-white/60">Success Rate</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">22.5%</div>
            <p className="text-sm text-white/60">Avg. ROI</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">8.5</div>
            <p className="text-sm text-white/60">Avg. Months</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6">
      {/* Transaction History */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center p-4 bg-white/5 rounded-lg">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                transaction.type === 'investment' ? 'bg-blue-500/20' :
                transaction.type === 'return' ? 'bg-green-500/20' :
                'bg-yellow-500/20'
              }`}>
                {transaction.type === 'investment' && <ArrowUpRight className="w-5 h-5 text-blue-400" />}
                {transaction.type === 'return' && <ArrowDownRight className="w-5 h-5 text-green-400" />}
                {transaction.type === 'withdrawal' && <DollarSign className="w-5 h-5 text-yellow-400" />}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">
                  {transaction.type === 'investment' ? 'Investment' :
                   transaction.type === 'return' ? 'Return Payment' : 'Withdrawal'}
                </h4>
                <p className="text-sm text-white/60">{transaction.productTitle}</p>
                <p className="text-xs text-white/50">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>

              <div className="text-right">
                <div className={`font-bold ${
                  transaction.type === 'investment' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transaction.type === 'investment' ? '-' : '+'}${transaction.amount}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  transaction.status === 'completed' ? 'text-green-400 bg-green-400/20' :
                  transaction.status === 'pending' ? 'text-yellow-400 bg-yellow-400/20' :
                  'text-red-400 bg-red-400/20'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: DollarSign }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Club Invest</h1>
        <p className="text-white/70">Invest in digital products and share in future profits</p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-secondary-light rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'transactions' && <TransactionsTab />}
      </div>
    </div>
  );
};

export default ClubInvest; 