import React from 'react';
import { Users, Eye, Heart, Share2, Bell, MessageCircle, Radio } from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  streamer: string;
  streamerAvatar: string;
  thumbnail: string;
  category: string;
  viewers: string;
  duration: string;
  isLive: boolean;
  tags: string[];
  description: string;
}

const LivesSection: React.FC = () => {
  const liveStreams: LiveStream[] = [
    {
      id: '1',
      title: 'Building an AI SaaS from Scratch - Live Coding Session',
      streamer: 'TechFounder_AI',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Development',
      viewers: '2.4K',
      duration: '3:45:12',
      isLive: true,
      tags: ['React', 'OpenAI', 'SaaS'],
      description: 'Join me as I build a complete AI-powered SaaS application live!'
    },
    {
      id: '2',
      title: 'Investor Q&A: Pitching Your Startup Successfully',
      streamer: 'VCInsights',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Business',
      viewers: '1.8K',
      duration: '2:15:30',
      isLive: true,
      tags: ['Startup', 'Funding', 'Pitch'],
      description: 'Live Q&A with successful VCs about what they look for in startups'
    },
    {
      id: '3',
      title: 'Digital Marketing Strategies That Actually Work in 2024',
      streamer: 'MarketingGuru',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Marketing',
      viewers: '3.1K',
      duration: '1:22:45',
      isLive: true,
      tags: ['SEO', 'PPC', 'Content'],
      description: 'Real-time marketing strategy session with live campaign examples'
    },
    {
      id: '4',
      title: 'AI Tools Workshop: Automating Your Business Processes',
      streamer: 'AutomationPro',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Technology',
      viewers: '892',
      duration: '0:45:18',
      isLive: true,
      tags: ['Automation', 'AI', 'Workflow'],
      description: 'Hands-on workshop showing you the best AI automation tools'
    },
    {
      id: '5',
      title: 'Cryptocurrency & Blockchain for Business Leaders',
      streamer: 'BlockchainBiz',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Finance',
      viewers: '1.2K',
      duration: '2:08:33',
      isLive: false,
      tags: ['Crypto', 'Blockchain', 'DeFi'],
      description: 'Understanding blockchain technology for business applications'
    },
    {
      id: '6',
      title: 'UX/UI Design Critique & Live Redesign Session',
      streamer: 'DesignMaster',
      streamerAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      category: 'Design',
      viewers: '567',
      duration: '1:33:22',
      isLive: false,
      tags: ['UI/UX', 'Design', 'Figma'],
      description: 'Live design critique and redesign of submitted user interfaces'
    }
  ];

  const liveStreamsCount = liveStreams.filter(stream => stream.isLive).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="text-3xl font-bold text-white">Live Streams</h1>
        </div>
        <p className="text-white/70">{liveStreamsCount} streams currently live</p>
      </div>

      {/* Categories Bar */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Development
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Business
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Marketing
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Technology
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Finance
          </button>
          <button className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Design
          </button>
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveStreams.map((stream) => (
          <div key={stream.id} className="group cursor-pointer">
            {/* Stream Thumbnail */}
            <div className="relative aspect-video bg-secondary-light rounded-xl overflow-hidden mb-3">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-4xl text-white/20">📺</div>
              </div>

              {/* Live Badge */}
              {stream.isLive && (
                <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              )}

              {/* Viewer Count */}
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{stream.viewers}</span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                {stream.duration}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200">
                  <button className="bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-lg text-sm font-medium">
                    {stream.isLive ? 'Watch Live' : 'Watch VOD'}
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg" aria-label="Follow">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="space-y-3">
              {/* Streamer Info */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center border border-white/10">
                    <Users className="w-5 h-5 text-white/60" />
                  </div>
                  {stream.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-secondary-light"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {stream.title}
                  </h3>
                  <p className="text-white/60 text-xs mb-1">{stream.streamer}</p>
                  <p className="text-white/50 text-xs">{stream.category}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center flex-wrap gap-1">
                {stream.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="flex items-center space-x-1 text-white/60 hover:text-red-400 text-xs">
                  <Heart className="w-3 h-3" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1 text-white/60 hover:text-white text-xs">
                  <MessageCircle className="w-3 h-3" />
                  <span>Chat</span>
                </button>
                <button className="flex items-center space-x-1 text-white/60 hover:text-white text-xs">
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Live Section */}
      {liveStreamsCount > 0 && (
        <div className="mt-12 p-6 bg-secondary-light rounded-xl border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <Radio className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-white">Featured Live Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveStreams.filter(stream => stream.isLive).slice(0, 2).map((stream) => (
              <div key={`featured-${stream.id}`} className="flex space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="relative w-24 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-2xl text-white/20">📺</div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">{stream.title}</h3>
                  <p className="text-white/60 text-xs mb-2">{stream.streamer}</p>
                  <div className="flex items-center space-x-2 text-xs text-white/50">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{stream.viewers}</span>
                    </span>
                    <span>•</span>
                    <span>{stream.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivesSection; 