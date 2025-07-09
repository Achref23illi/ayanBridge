import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Radio, 
  Target,
  DollarSign,
  Clock,
  Users,
  Star,
  ArrowUpRight,
  Eye,
  Play,
  Calendar,
  Bell,
  BarChart3,
  PieChart,
  Zap,
  Trophy,
  Activity,
  CheckCircle,
  ArrowRight,
  Plus,
  Heart,
  Download,
  MessageCircle,
  TrendingDown,
  Filter,
  Search,
  User,
  Flame
} from 'lucide-react';

interface OverviewStat {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: string;
}

interface RecentActivity {
  id: string;
  type: 'course' | 'investment' | 'live' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  status?: string;
}

interface Recommendation {
  id: string;
  type: 'course' | 'investment' | 'live' | 'formation';
  title: string;
  creator: string;
  rating: number;
  price: number;
  duration: string;
  thumbnail: string;
  reason: string;
}

const Home: React.FC = () => {
  const { user } = useAuth();

  const overviewStats: OverviewStat[] = [
    {
      id: '1',
      title: 'Learning Progress',
      value: '68%',
      change: +12,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-blue-400'
    },
    {
      id: '2',
      title: 'Total Investments',
      value: '$2,450',
      change: +18,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400'
    },
    {
      id: '3',
      title: 'Course Completions',
      value: '12',
      change: +3,
      icon: <Award className="w-5 h-5" />,
      color: 'text-orange-400'
    },
    {
      id: '4',
      title: 'Live Sessions Attended',
      value: '24',
      change: +5,
      icon: <Radio className="w-5 h-5" />,
      color: 'text-purple-400'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: <Play className="w-6 h-6" />,
      color: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      action: 'continue-learning'
    },
    {
      id: '2',
      title: 'Browse Marketplace',
      description: 'Discover new content',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-500/20 text-orange-400 border-orange-400/30',
      action: 'marketplace'
    },
    {
      id: '3',
      title: 'Join Live Session',
      description: 'Live AI workshop at 3 PM',
      icon: <Radio className="w-6 h-6" />,
      color: 'bg-red-500/20 text-red-400 border-red-400/30',
      action: 'live-session'
    },
    {
      id: '4',
      title: 'Investment Opportunities',
      description: 'View trending projects',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500/20 text-green-400 border-green-400/30',
      action: 'investments'
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'course',
      title: 'Completed: Introduction to Machine Learning',
      description: 'Earned 500 XP and certificate',
      time: '2 hours ago',
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      status: 'completed'
    },
    {
      id: '2',
      type: 'investment',
      title: 'Investment in AI Business Strategy Course',
      description: 'Invested $250 • Expected ROI: 22%',
      time: '5 hours ago',
      icon: <TrendingUp className="w-4 h-4 text-green-400" />
    },
    {
      id: '3',
      type: 'live',
      title: 'Attended Live Session: Marketing Automation',
      description: 'With Maria Rodriguez • 1h 30min',
      time: '1 day ago',
      icon: <Radio className="w-4 h-4 text-purple-400" />
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement Unlocked: Speed Learner',
      description: 'Completed 3 courses this week',
      time: '2 days ago',
      icon: <Trophy className="w-4 h-4 text-yellow-400" />
    },
    {
      id: '5',
      type: 'course',
      title: 'Started: Advanced Data Analytics',
      description: 'By Prof. David Chen • 4h 20min total',
      time: '3 days ago',
      icon: <BookOpen className="w-4 h-4 text-blue-400" />
    }
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'course',
      title: 'Advanced AI for Business Leaders',
      creator: 'Dr. Sarah Johnson',
      rating: 4.8,
      price: 199,
      duration: '6h 30min',
      thumbnail: '/placeholder-course1.jpg',
      reason: 'Based on your ML course completion'
    },
    {
      id: '2',
      type: 'investment',
      title: 'Startup Funding Masterclass',
      creator: 'Alex Turner',
      rating: 4.6,
      price: 299,
      duration: '8h 15min',
      thumbnail: '/placeholder-course2.jpg',
      reason: 'High ROI potential: 25%'
    },
    {
      id: '3',
      type: 'live',
      title: 'Weekly Tech Trends Analysis',
      creator: 'Maria Rodriguez',
      rating: 4.9,
      price: 49,
      duration: '1h 30min',
      thumbnail: '/placeholder-live1.jpg',
      reason: 'Live today at 3 PM'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'investment': return <TrendingUp className="w-4 h-4" />;
      case 'live': return <Radio className="w-4 h-4" />;
      case 'formation': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 bg-secondary min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-white/60">Here's what's happening in your learning journey</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary-light px-4 py-2 rounded-lg border border-white/10">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white font-medium">5 day streak</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary-light px-4 py-2 rounded-lg border border-white/10">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">18,450 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat) => (
          <div key={stat.id} className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/10 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <div 
                  key={action.id} 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-white/5 ${action.color}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {action.icon}
                    <h3 className="font-semibold">{action.title}</h3>
                  </div>
                  <p className="text-sm text-white/60">{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Progress */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Continue Learning</h2>
              <button className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl p-6 border border-primary/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">IN PROGRESS</span>
                  <h3 className="text-xl font-bold text-white mt-1">AI Business Strategy Implementation</h3>
                  <p className="text-white/60 text-sm mt-1">By Dr. Sarah Johnson</p>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">2h 30min left</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/80">Progress</span>
                  <span className="text-white font-medium">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Continue
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/20">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <button className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-white/10 rounded-lg flex-shrink-0 mt-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm">{activity.title}</h4>
                    <p className="text-white/60 text-sm mt-1">{activity.description}</p>
                  </div>
                  <span className="text-white/40 text-xs flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{user?.name || 'User'}</h3>
                <p className="text-white/60 text-sm">Premium Member</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-20 bg-white/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs text-white/60">85% complete</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-white/60">Certificates</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">4.8</div>
                <div className="text-xs text-white/60">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Upcoming</h3>
              <Calendar className="w-5 h-5 text-white/40" />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-xs font-medium uppercase">LIVE TODAY</span>
                </div>
                <h4 className="text-white font-medium text-sm">AI Workshop</h4>
                <p className="text-white/60 text-xs">3:00 PM - 4:30 PM</p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-medium uppercase">TOMORROW</span>
                </div>
                <h4 className="text-white font-medium text-sm">Assignment Due</h4>
                <p className="text-white/60 text-xs">ML Project Submission</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
                     <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-bold text-white">Recommended</h3>
               <button className="text-primary hover:text-primary/80" aria-label="View all recommendations">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>

            <div className="space-y-4">
              {recommendations.slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm mb-1">{rec.title}</h4>
                      <p className="text-white/60 text-xs mb-2">By {rec.creator}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-white/60">{rec.rating}</span>
                        </div>
                        <span className="text-primary text-sm font-medium">${rec.price}</span>
                      </div>
                      <p className="text-xs text-primary mt-1">{rec.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Study Time</span>
                <span className="text-white font-medium">12h 30m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">XP Earned</span>
                <span className="text-white font-medium">1,250 XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Investments</span>
                <span className="text-white font-medium">$350</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Returns</span>
                <span className="text-green-400 font-medium">+$42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 