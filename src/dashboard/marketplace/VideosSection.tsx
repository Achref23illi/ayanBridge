import React, { useState } from 'react';
import { Play, Clock, Eye, ThumbsUp, Share2, MoreVertical, User, Monitor } from 'lucide-react';
import VideoPreviewModal from '../../components/VideoPreviewModal';
import { assets } from '../../config/assets';

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
  videoUrl?: string;
}

const VideosSection: React.FC = () => {
  const [videoPreview, setVideoPreview] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
    channel: string;
    duration: string;
    views: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
    channel: '',
    duration: '',
    views: ''
  });

  const openVideoPreview = (videoUrl: string, title: string, channel: string, duration: string, views: string) => {
    setVideoPreview({
      isOpen: true,
      videoUrl,
      title,
      channel,
      duration,
      views
    });
  };

  const closeVideoPreview = () => {
    setVideoPreview({
      isOpen: false,
      videoUrl: '',
      title: '',
      channel: '',
      duration: '',
      views: ''
    });
  };

  const videos: Video[] = [
    {
      id: '1',
      title: 'Complete AI Business Strategy Guide - Transform Your Company in 2024',
      channel: 'AyanBridge Academy',
      channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=480&h=270&fit=crop',
      duration: '15:32',
      views: '124K',
      uploadTime: '2 days ago',
      description: 'Learn how to implement AI strategies that will revolutionize your business operations...',
      likes: '3.2K',
      verified: true,
      videoUrl: assets.video1
    },
    {
      id: '2',
      title: 'Machine Learning for Startups: Real-World Applications',
      channel: 'Tech Entrepreneurs',
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=480&h=270&fit=crop',
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
      channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=270&fit=crop',
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
      channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=270&fit=crop',
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
      channelAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
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
      channelAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=480&h=270&fit=crop',
      duration: '19:56',
      views: '67K',
      uploadTime: '6 days ago',
      description: 'Discover the top automation tools that can save you hours every week...',
      likes: '2.3K',
      verified: false
    },
    {
      id: '7',
      title: 'Blockchain Development Crash Course 2024',
      channel: 'CryptoDevs',
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&h=270&fit=crop',
      duration: '52:18',
      views: '312K',
      uploadTime: '1 week ago',
      description: 'Learn blockchain development from scratch with hands-on examples...',
      likes: '8.1K',
      verified: true
    },
    {
      id: '8',
      title: 'UX Design Principles That Convert Users',
      channel: 'Design Masters',
      channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=480&h=270&fit=crop',
      duration: '33:42',
      views: '189K',
      uploadTime: '3 days ago',
      description: 'Master UX design principles that drive user engagement and conversions...',
      likes: '5.7K',
      verified: true
    },
    {
      id: '9',
      title: 'Remote Team Management: Leadership in the Digital Age',
      channel: 'Leadership Lab',
      channelAvatar: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=270&fit=crop',
      duration: '26:35',
      views: '145K',
      uploadTime: '5 days ago',
      description: 'Effective strategies for managing and leading remote teams successfully...',
      likes: '4.2K',
      verified: false
    },
    {
      id: '10',
      title: 'E-commerce Growth Hacking Strategies 2024',
      channel: 'Growth Hackers',
      channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=270&fit=crop',
      duration: '41:23',
      views: '267K',
      uploadTime: '2 days ago',
      description: 'Proven growth hacking strategies to scale your e-commerce business rapidly...',
      likes: '6.8K',
      verified: true
    },
    {
      id: '11',
      title: 'Cybersecurity Best Practices for Small Business',
      channel: 'SecureWorks',
      channelAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=480&h=270&fit=crop',
      duration: '29:17',
      views: '98K',
      uploadTime: '1 week ago',
      description: 'Essential cybersecurity practices every small business owner must know...',
      likes: '3.5K',
      verified: false
    },
    {
      id: '12',
      title: 'Data Analytics for Business Intelligence',
      channel: 'Data Driven',
      channelAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
      duration: '48:56',
      views: '156K',
      uploadTime: '4 days ago',
      description: 'Transform your business with data analytics and business intelligence tools...',
      likes: '4.9K',
      verified: true
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
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" fill="%23374151"><rect width="320" height="180" fill="%23374151"/><text x="160" y="90" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="24">🎥</text></svg>';
                }}
              />
              
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
                <img 
                  src={video.channelAvatar} 
                  alt={video.channel}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="%23374151"><circle cx="20" cy="20" r="20" fill="%23374151"/><text x="20" y="26" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="16">👤</text></svg>';
                  }}
                />
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
              {video.videoUrl && (
                <button 
                  onClick={() => openVideoPreview(video.videoUrl!, video.title, video.channel, video.duration, video.views)}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 text-xs font-medium"
                >
                  <Monitor className="w-3 h-3" />
                  <span>Preview</span>
                </button>
              )}
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

      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={videoPreview.isOpen}
        onClose={closeVideoPreview}
        videoUrl={videoPreview.videoUrl}
        title={videoPreview.title}
        channel={videoPreview.channel}
        duration={videoPreview.duration}
        views={videoPreview.views}
      />
    </div>
  );
};

export default VideosSection; 