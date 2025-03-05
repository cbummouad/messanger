import React from 'react';
import { Menu, Search, Settings, Users, MessageSquare, LogOut } from 'lucide-react';

const ChatLayout = () => {
  // Dummy data for demonstration
  const messages = [
    {
      id: 1,
      content: "Hey, how are you?",
      sender: "John Doe",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      content: "I'm doing great! How about you?",
      sender: "You",
      timestamp: "10:31 AM",
      isOwn: true
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                i === 1 ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center">
                <img
                  src={`https://source.unsplash.com/100x100/?portrait${i}`}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">User {i}</h3>
                    <span className="text-xs text-gray-500">3m ago</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    Latest message preview...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-around p-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Users className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt="Current Chat"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] ${
                  message.isOwn
                    ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                    : 'bg-white text-gray-800 rounded-r-lg rounded-bl-lg'
                } p-3 shadow-sm`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
