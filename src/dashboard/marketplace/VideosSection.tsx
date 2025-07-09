import React from 'react';
import { Play, Clock, Eye, ThumbsUp, Share2, MoreVertical, User } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadTime: string;
  description: string;
  likes: string;
  verified: boolean;
}

const VideosSection: React.FC = () => {
  const videos: Video[] = [
    {
      id: '1',
      title: 'Complete AI Business Strategy Guide - Transform Your Company in 2024',
      channel: 'AyanBridge Academy',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '15:32',
      views: '124K',
      uploadTime: '2 days ago',
      description: 'Learn how to implement AI strategies that will revolutionize your business operations...',
      likes: '3.2K',
      verified: true
    },
    {
      id: '2',
      title: 'Machine Learning for Startups: Real-World Applications',
      channel: 'Tech Entrepreneurs',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '22:45',
      views: '89K',
      uploadTime: '5 days ago',
      description: 'Discover practical machine learning applications that can boost your startup growth...',
      likes: '2.8K',
      verified: false
    },
    {
      id: '3',
      title: 'Digital Marketing with AI Tools - Complete Masterclass',
      channel: 'Marketing Mastery',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '45:18',
      views: '256K',
      uploadTime: '1 week ago',
      description: 'Master AI-powered marketing tools and strategies to scale your business effectively...',
      likes: '5.1K',
      verified: true
    },
    {
      id: '4',
      title: 'Building Your First AI-Powered App: Step by Step Tutorial',
      channel: 'Code & Create',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '38:27',
      views: '178K',
      uploadTime: '3 days ago',
      description: 'Build a complete AI application from scratch using modern technologies...',
      likes: '4.7K',
      verified: false
    },
    {
      id: '5',
      title: 'Investor Pitch Deck Secrets: How to Raise $1M+',
      channel: 'Funding Experts',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '28:14',
      views: '98K',
      uploadTime: '4 days ago',
      description: 'Learn the exact strategies successful entrepreneurs use to secure funding...',
      likes: '3.9K',
      verified: true
    },
    {
      id: '6',
      title: 'Automation Tools Every Business Owner Should Know',
      channel: 'Business Boost',
      channelAvatar: '/api/placeholder/40/40',
      thumbnail: '/api/placeholder/320/180',
      duration: '19:56',
      views: '67K',
      uploadTime: '6 days ago',
      description: 'Discover the top automation tools that can save you hours every week...',
      likes: '2.3K',
      verified: false
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Video Library</h1>
        <p className="text-white/70">Learn from expert tutorials and masterclasses</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by category">
            <option>All Categories</option>
            <option>Business Strategy</option>
            <option>AI & Technology</option>
            <option>Marketing</option>
            <option>Development</option>
            <option>Entrepreneurship</option>
          </select>
          <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Filter by duration">
            <option>Any Duration</option>
            <option>Under 10 minutes</option>
            <option>10-30 minutes</option>
            <option>30+ minutes</option>
          </select>
          <select className="bg-secondary-light border border-white/20 rounded-lg px-4 py-2 text-white text-sm" aria-label="Sort videos">
            <option>Newest</option>
            <option>Most Popular</option>
            <option>Most Liked</option>
            <option>Trending</option>
          </select>
        </div>
        <div className="text-white/60 text-sm">
          {videos.length} videos
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-secondary-light rounded-xl overflow-hidden mb-3">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-4xl text-white/20">🎥</div>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
                  <Play className="w-6 h-6 text-secondary ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                {video.duration}
              </div>

              {/* Progress Bar (for watched videos) */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-primary w-1/3"></div>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex space-x-3">
              {/* Channel Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center border border-white/10">
                  <User className="w-5 h-5 text-white/60" />
                </div>
              </div>

              {/* Video Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-white/60 text-xs">{video.channel}</span>
                  {video.verified && (
                    <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1 text-white/50 text-xs">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadTime}</span>
                </div>
              </div>

              {/* More Options */}
              <button 
                className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons (appear on hover) */}
            <div className="mt-3 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="flex items-center space-x-1 text-white/60 hover:text-white text-xs">
                <ThumbsUp className="w-3 h-3" />
                <span>{video.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-white/60 hover:text-white text-xs">
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 text-white/60 hover:text-white text-xs">
                <Clock className="w-3 h-3" />
                <span>Watch Later</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Load More Videos
        </button>
      </div>
    </div>
  );
};

export default VideosSection; 