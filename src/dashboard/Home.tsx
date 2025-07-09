import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex gap-6 p-6 bg-secondary min-h-screen">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Featured Course Card */}
        <div className="bg-gradient-to-r from-secondary-light to-secondary rounded-xl p-8 text-white relative overflow-hidden border border-white/10">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border border-primary/20 rounded-full"></div>
            <div className="absolute bottom-10 right-20 w-24 h-24 border border-primary/20 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-2">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">COURSE</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Introduction to AI-Powered<br />
              Business Solutions
            </h2>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">⏱</span>
                </div>
                <span>2 hr 30 min</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Keep Making Progress
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/20">
                <span>🎯</span>
                Practice
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-sm text-white/80">
                Part of the track <span className="text-primary">AI Business Strategy & Implementation</span>
              </p>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">Review</h3>
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium">3</span>
            </div>
            <button className="text-primary hover:text-primary/80 font-medium">
              View All Practices
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
              <div className="mb-3">
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">PRACTICE</span>
              </div>
              <h4 className="font-semibold text-white mb-3">
                Building AI Models for Market Analysis
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">⚡</span>
                <span className="font-medium text-white/80">350 XP</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
              <div className="mb-3">
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">PRACTICE</span>
              </div>
              <h4 className="font-semibold text-white mb-3">
                Data Integration Fundamentals
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">⚡</span>
                <span className="font-medium text-white/80">350 XP</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
              <div className="mb-3">
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">PRACTICE</span>
              </div>
              <h4 className="font-semibold text-white mb-3">
                AI Solution Architecture
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary">⚡</span>
                <span className="font-medium text-white/80">350 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Studio Section */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white">🤖 AI Studio</h3>
              <span className="text-primary text-sm">↗</span>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Create Project
            </button>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">Project: AI-Powered Customer Analytics</h4>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span>👤</span>
                  <span>Achref Arabi</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>⚠️</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* User Profile */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xl">👤</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">Hey, {user?.name || 'User'}! 👋</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 bg-white/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-sm text-white/60">Profile 70% complete</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Daily Streak</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-2xl font-bold text-white">0 days</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Total XP</div>
              <div className="text-2xl font-bold text-white">17097 XP</div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Leaderboard 🏆</h3>
            <button className="text-primary hover:text-primary/80">
              <span className="text-sm">→</span>
            </button>
          </div>
          <div className="text-center">
            <div className="text-sm text-primary font-medium mb-2">5 DAYS LEFT TO JOIN</div>
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h4 className="font-bold text-white mb-2">Gain 250XP to enter this week's<br />AI Challenge</h4>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="text-sm text-white/60">0 / 250 XP</div>
          </div>
        </div>

        {/* Track Progress */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="mb-4">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">TRACK</span>
          </div>
          <h3 className="font-bold text-white mb-2">AI Business Fundamentals</h3>
          <div className="text-sm text-white/80 mb-4">26 hours</div>
          <button className="text-primary hover:text-primary/80 font-medium">
            View Details
          </button>
        </div>

        {/* Podcast Section */}
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">PODCAST</span>
            <span className="text-lg">🎧</span>
          </div>
          <h3 className="font-bold text-white mb-2">
            What AI Innovation Can Tell Us About the Future of Business
          </h3>
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-sm text-white">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 