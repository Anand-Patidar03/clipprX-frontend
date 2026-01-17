import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({
  videoId,
  thumbnail,
  title,
  channelName,
  ownerAvatar,
  views,
  likes,
  uploadedAt,
  duration,
  type = "vertical" // "vertical" | "horizontal"
}) => {
  if (type === "horizontal") {
    return (
      <div className="group flex flex-row gap-3 bg-gray-800/20 rounded-lg overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/40">
        {/* 1. Thumbnail Area (Smaller, Fixed Width) */}
        <Link to={`/videos/${videoId}`} className="block relative w-40 min-w-[160px] aspect-video overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>

          {/* Duration Badge */}
          <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[9px] font-bold text-white">
            {duration}
          </div>
        </Link>

        {/* 2. Content Area */}
        <div className="flex-1 py-1 pr-2 min-w-0 flex flex-col justify-start">
          {/* Title */}
          <Link to={`/videos/${videoId}`} className="block group/title">
            <h3 className="text-sm font-bold text-white leading-tight group-hover/title:text-purple-400 transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
          </Link>

          {/* Channel Name */}
          <Link to={`/channel/${channelName}`} className="text-xs text-gray-400 hover:text-white transition-colors mb-1 truncate block">
            {channelName}
          </Link>

          {/* Meta Info */}
          <div className="flex items-center text-[10px] text-gray-500 gap-1.5 mt-auto">
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Vertical Layout
  return (
    <div className="group bg-gray-800/40 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:-translate-y-1">
      {/* 1. Thumbnail Area - Links to Video */}
      <Link to={`/videos/${videoId}`} className="block relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>

        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[10px] font-bold text-white">
          {duration}
        </div>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </Link>

      {/* 2. Content Area */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            {/* Title - Links to Video */}
            <Link to={`/videos/${videoId}`} className="block group/title">
              <h3 className="text-sm font-bold text-white leading-tight group-hover/title:text-purple-400 transition-colors line-clamp-2 mb-1">
                {title}
              </h3>
            </Link>

            {/* Channel Info with Avatar */}
            <div className="flex items-center gap-2 mb-2">
              <Link to={`/channel/${channelName}`} className="block flex-shrink-0">
                <img
                  src={ownerAvatar || "https://ui-avatars.com/api/?name=" + channelName}
                  alt={channelName}
                  className="w-6 h-6 rounded-full object-cover border border-gray-700"
                />
              </Link>
              <Link to={`/channel/${channelName}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                <span>{channelName}</span>
                <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </Link>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                {views}
              </span>

              <span>{uploadedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
