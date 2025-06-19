import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  BarChart3, 
  Star,
  TrendingUp,
  Filter,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Feedback {
  id: string;
  name?: string;
  email?: string;
  feedback: string;
  rating: number;
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  jobsCount: number;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [feedbacks] = useState<Feedback[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      feedback: 'JobWise helped me organize my job search and land my dream job at a tech startup. The analytics were incredibly helpful!',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      feedback: 'The best job tracking app I\'ve used. Clean interface, powerful features, and excellent customer support.',
      rating: 5,
      date: '2024-01-14'
    },
    {
      id: '3',
      feedback: 'Great app but could use more customization options for job status categories.',
      rating: 4,
      date: '2024-01-13'
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      feedback: 'Finally, a tool that makes job hunting less stressful. The dashboard gives me a clear view of my progress.',
      rating: 5,
      date: '2024-01-12'
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Admin',
      email: 'john@example.com',
      role: 'applicant',
      joinDate: '2024-01-10',
      jobsCount: 12
    },
    {
      id: '2',
      name: 'Jane S#h',
      email: 'jane@example.com',
      role: 'applicant',
      joinDate: '2024-01-08',
      jobsCount: 8
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@jobwise.com',
      role: 'admin',
      joinDate: '2024-01-01',
      jobsCount: 0
    }
  ]);

  const getStats = () => {
    const totalUsers = users.length;
    const totalJobs = users.reduce((sum, user) => sum + user.jobsCount, 0);
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;
    
    return { totalUsers, totalJobs, totalFeedbacks, averageRating };
  };

  const stats = getStats();

  const chartData = [
    { name: 'Jan 1-7', users: 12, jobs: 45, feedbacks: 8 },
    { name: 'Jan 8-14', users: 18, jobs: 67, feedbacks: 12 },
    { name: 'Jan 15-21', users: 25, jobs: 89, feedbacks: 15 },
    { name: 'Jan 22-28', users: 32, jobs: 112, feedbacks: 18 }
  ];

  const ratingDistribution = [
    { rating: '5 Star', count: feedbacks.filter(f => f.rating === 5).length },
    { rating: '4 Star', count: feedbacks.filter(f => f.rating === 4).length },
    { rating: '3 Star', count: feedbacks.filter(f => f.rating === 3).length },
    { rating: '2 Star', count: feedbacks.filter(f => f.rating === 2).length },
    { rating: '1 Star', count: feedbacks.filter(f => f.rating === 1).length }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage users, jobs, and feedback</p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Jobs</p>
                      <p className="text-2xl font-bold text-white">{stats.totalJobs}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Feedbacks</p>
                      <p className="text-2xl font-bold text-white">{stats.totalFeedbacks}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Average Rating</p>
                      <p className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                    Growth Analytics
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="jobs" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="feedbacks" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500" />
                    Rating Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ratingDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="rating" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="count" fill="#EAB308" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">User Management</h3>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Jobs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-700/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {user.jobsCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Feedbacks Tab */}
          {activeTab === 'feedbacks' && (
            <motion.div
              key="feedbacks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Feedback Management</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-400">
                          {new Date(feedback.date).toLocaleDateString()}
                        </span>
                      </div>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-gray-300 mb-4">{feedback.feedback}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        {feedback.name ? (
                          <p className="text-sm text-white font-medium">{feedback.name}</p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">Anonymous</p>
                        )}
                        {feedback.email && (
                          <p className="text-xs text-gray-500">{feedback.email}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold text-yellow-400">{feedback.rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;