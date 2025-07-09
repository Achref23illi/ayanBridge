import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Users, 
  Play, 
  CheckCircle, 
  Calendar, 
  Target, 
  Star,
  Trophy,
  Radio,
  PlusCircle,
  Filter,
  Search
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  enrolled: number;
  progress: number;
  category: string;
  instructor: string;
  rating: number;
  certificate: boolean;
  nextModule: string;
  skills: string[];
}

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  category: string;
  isLive: boolean;
  isRegistered: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  pathId: string;
  score: number;
  skills: string[];
  verified: boolean;
}

const LearnHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'paths' | 'sessions' | 'certificates'>('overview');

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'AI Business Strategy Fundamentals',
      description: 'Master the essential concepts of integrating AI into business strategy and operations.',
      difficulty: 'Beginner',
      duration: '12 weeks',
      modules: 8,
      enrolled: 2847,
      progress: 65,
      category: 'Business Strategy',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      certificate: true,
      nextModule: 'AI Implementation Planning',
      skills: ['Strategy', 'AI Integration', 'Business Planning']
    },
    {
      id: '2',
      title: 'Machine Learning for Business Leaders',
      description: 'Comprehensive path covering ML applications in business without deep technical requirements.',
      difficulty: 'Intermediate',
      duration: '16 weeks',
      modules: 12,
      enrolled: 1923,
      progress: 30,
      category: 'Technology',
      instructor: 'Prof. David Chen',
      rating: 4.7,
      certificate: true,
      nextModule: 'Data Analytics Fundamentals',
      skills: ['Machine Learning', 'Data Science', 'Analytics']
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Complete digital marketing curriculum with AI-powered tools and automation strategies.',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      modules: 10,
      enrolled: 3156,
      progress: 0,
      category: 'Marketing',
      instructor: 'Maria Rodriguez',
      rating: 4.9,
      certificate: true,
      nextModule: 'Getting Started with Digital Marketing',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics']
    }
  ];

  const liveSessions: LiveSession[] = [
    {
      id: '1',
      title: 'AI Strategy Workshop: Real-World Case Studies',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '14:00',
      duration: '2 hours',
      participants: 45,
      maxParticipants: 50,
      category: 'Business Strategy',
      isLive: false,
      isRegistered: true
    },
    {
      id: '2',
      title: 'Machine Learning Q&A Session',
      instructor: 'Prof. David Chen',
      date: '2024-01-12',
      time: '16:00',
      duration: '1.5 hours',
      participants: 32,
      maxParticipants: 40,
      category: 'Technology',
      isLive: true,
      isRegistered: false
    },
    {
      id: '3',
      title: 'Digital Marketing Trends 2024',
      instructor: 'Maria Rodriguez',
      date: '2024-01-18',
      time: '10:00',
      duration: '1 hour',
      participants: 28,
      maxParticipants: 60,
      category: 'Marketing',
      isLive: false,
      isRegistered: false
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Business Intelligence Fundamentals',
      issueDate: '2023-12-15',
      pathId: '1',
      score: 92,
      skills: ['BI', 'Analytics', 'Data Visualization'],
      verified: true
    },
    {
      id: '2',
      title: 'Project Management Essentials',
      issueDate: '2023-11-20',
      pathId: '2',
      score: 88,
      skills: ['Project Management', 'Leadership', 'Planning'],
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-white/20'
        }`}
      />
    ));
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">65%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-sm text-white/60">Average across all paths</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Certificates Earned</h3>
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{certificates.length}</div>
          <p className="text-sm text-white/60">Total achievements</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Study Time</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">47h</div>
          <p className="text-sm text-white/60">This month</p>
        </div>
      </div>

      {/* Current Learning Paths */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Continue Learning</h3>
        <div className="space-y-4">
          {learningPaths.filter(path => path.progress > 0).map((path) => (
            <div key={path.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{path.title}</h4>
                <p className="text-sm text-white/60 mb-2">Next: {path.nextModule}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${path.progress}%` }}></div>
                  </div>
                  <span className="text-sm text-white/60">{path.progress}%</span>
                </div>
              </div>
              <button className="ml-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Upcoming Live Sessions</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {liveSessions.slice(0, 2).map((session) => (
            <div key={session.id} className="flex items-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                <Radio className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60">{session.instructor}</p>
                <div className="flex items-center space-x-4 text-sm text-white/50 mt-1">
                  <span>{session.date}</span>
                  <span>{session.time}</span>
                  <span>{session.duration}</span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                session.isRegistered 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}>
                {session.isRegistered ? 'Registered' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PathsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search learning paths..."
              className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white hover:bg-white/5">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <div key={path.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-primary font-medium">{path.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                </div>
                {path.certificate && (
                  <Award className="w-5 h-5 text-yellow-400" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              
              <p className="text-sm text-white/70 mb-4 line-clamp-2">
                {path.description}
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(path.rating)}
                </div>
                <span className="text-sm text-white/60">{path.rating}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{path.modules} modules</span>
                  <span>{path.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{path.enrolled.toLocaleString()} enrolled</span>
                  <span>by {path.instructor}</span>
                </div>
              </div>

              {path.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${path.progress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {path.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors">
                {path.progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Path */}
      <div className="bg-secondary-light rounded-xl border border-white/10 border-dashed p-8 text-center hover:border-white/20 transition-colors cursor-pointer">
        <PlusCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Explore More Paths</h3>
        <p className="text-white/60 mb-4">Discover new learning opportunities tailored to your goals</p>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Browse Catalog
        </button>
      </div>
    </div>
  );

  const SessionsTab = () => (
    <div className="space-y-6">
      {/* Live Now */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-white">Live Now</h3>
        </div>
        {liveSessions.filter(session => session.isLive).map((session) => (
          <div key={session.id} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60">{session.instructor}</p>
                <div className="flex items-center space-x-2 text-sm text-white/50 mt-1">
                  <Users className="w-4 h-4" />
                  <span>{session.participants}/{session.maxParticipants} participants</span>
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h3>
        <div className="space-y-4">
          {liveSessions.filter(session => !session.isLive).map((session) => (
            <div key={session.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60 mb-1">{session.instructor}</p>
                <div className="flex items-center space-x-4 text-sm text-white/50">
                  <span>{session.date}</span>
                  <span>{session.time}</span>
                  <span>{session.duration}</span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{session.participants}/{session.maxParticipants}</span>
                  </span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                session.isRegistered 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}>
                {session.isRegistered ? 'Registered' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CertificatesTab = () => (
    <div className="space-y-6">
      {/* Achievements Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{certificates.length}</div>
          <p className="text-sm text-white/60">Certificates Earned</p>
        </div>
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">92%</div>
          <p className="text-sm text-white/60">Average Score</p>
        </div>
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">15</div>
          <p className="text-sm text-white/60">Skills Mastered</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  {cert.verified && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-2xl font-bold text-white">{cert.score}%</span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-sm text-white/60 mb-4">
                Issued on {new Date(cert.issueDate).toLocaleDateString()}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors">
                  View Certificate
                </button>
                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Share certificate">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'paths', label: 'Learning Paths', icon: BookOpen },
    { id: 'sessions', label: 'Live Sessions', icon: Radio },
    { id: 'certificates', label: 'Certificates', icon: Award }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn Hub</h1>
        <p className="text-white/70">Your personalized learning journey with structured paths and live sessions</p>
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
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'paths' && <PathsTab />}
        {activeTab === 'sessions' && <SessionsTab />}
        {activeTab === 'certificates' && <CertificatesTab />}
      </div>
    </div>
  );
};

export default LearnHub; 