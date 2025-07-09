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
      streamerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=270&fit=crop',
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
      streamerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
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
      streamerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=270&fit=crop',
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
      streamerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=480&h=270&fit=crop',
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
      streamerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&h=270&fit=crop',
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
      streamerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=480&h=270&fit=crop',
      category: 'Design',
      viewers: '567',
      duration: '1:33:22',
      isLive: false,
      tags: ['UI/UX', 'Design', 'Figma'],
      description: 'Live design critique and redesign of submitted user interfaces'
    },
    {
      id: '7',
      title: 'E-commerce Growth Hacking Live Workshop',
      streamer: 'EcomGrowth',
      streamerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=270&fit=crop',
      category: 'E-commerce',
      viewers: '1.5K',
      duration: '1:12:34',
      isLive: true,
      tags: ['Growth', 'Sales', 'Conversion'],
      description: 'Real-time e-commerce optimization strategies and case studies'
    },
    {
      id: '8',
      title: 'Cybersecurity Incident Response Training',
      streamer: 'CyberSec_Pro',
      streamerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=480&h=270&fit=crop',
      category: 'Security',
      viewers: '743',
      duration: '0:58:45',
      isLive: true,
      tags: ['Security', 'Response', 'Protection'],
      description: 'Live cybersecurity training session with real incident scenarios'
    },
    {
      id: '9',
      title: 'Data Science Model Building Marathon',
      streamer: 'DataScientist_Live',
      streamerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
      category: 'Data Science',
      viewers: '2.1K',
      duration: '4:23:17',
      isLive: true,
      tags: ['Python', 'ML', 'Analytics'],
      description: 'Building predictive models from scratch with real-world datasets'
    },
    {
      id: '10',
      title: 'Mobile App Development with React Native',
      streamer: 'AppDev_Master',
      streamerAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&h=270&fit=crop',
      category: 'Mobile Dev',
      viewers: '1.3K',
      duration: '2:45:52',
      isLive: false,
      tags: ['React Native', 'Mobile', 'iOS'],
      description: 'Complete mobile app development tutorial from concept to deployment'
    },
    {
      id: '11',
      title: 'Product Management Best Practices Live',
      streamer: 'PM_Insights',
      streamerAvatar: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&h=270&fit=crop',
      category: 'Product',
      viewers: '987',
      duration: '1:34:28',
      isLive: false,
      tags: ['Product', 'Strategy', 'Agile'],
      description: 'Product management strategies for successful product launches'
    },
    {
      id: '12',
      title: 'Cloud Architecture Design Workshop',
      streamer: 'CloudArchitect',
      streamerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop',
      category: 'Cloud',
      viewers: '654',
      duration: '2:17:43',
      isLive: false,
      tags: ['AWS', 'Azure', 'Architecture'],
      description: 'Designing scalable cloud architectures for modern applications'
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
              <img 
                src={stream.thumbnail} 
                alt={stream.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" fill="%23374151"><rect width="320" height="180" fill="%23374151"/><text x="160" y="90" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="24">📺</text></svg>';
                }}
              />

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
                  <img 
                    src={stream.streamerAvatar} 
                    alt={stream.streamer}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="%23374151"><circle cx="20" cy="20" r="20" fill="%23374151"/><text x="20" y="26" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="16">👤</text></svg>';
                    }}
                  />
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