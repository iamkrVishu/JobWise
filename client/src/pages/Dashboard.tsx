import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted';
  appliedDate: string;
  notes?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineer',
      status: 'interview',
      appliedDate: '2024-01-15',
      notes: 'Technical interview scheduled for next week'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Frontend Developer',
      status: 'applied',
      appliedDate: '2024-01-12',
      notes: 'Applied through LinkedIn'
    },
    {
      id: '3',
      company: 'Apple',
      position: 'Product Manager',
      status: 'offer',
      appliedDate: '2024-01-10',
      notes: 'Salary negotiation in progress'
    },
    {
      id: '4',
      company: 'Netflix',
      position: 'Data Scientist',
      status: 'rejected',
      appliedDate: '2024-01-08',
      notes: 'Not a good fit for current team needs'
    },
    {
      id: '5',
      company: 'Tesla',
      position: 'Full Stack Developer',
      status: 'accepted',
      appliedDate: '2024-01-05',
      notes: 'Start date: February 1st'
    }
  ]);

  const statusColors = {
    applied: 'bg-blue-500',
    interview: 'bg-yellow-500',
    offer: 'bg-green-500',
    rejected: 'bg-red-500',
    accepted: 'bg-purple-500'
  };

  const statusIcons = {
    applied: Clock,
    interview: Calendar,
    offer: Target,
    rejected: XCircle,
    accepted: CheckCircle
  };

  const getStats = () => {
    const total = jobs.length;
    const applied = jobs.filter(job => job.status === 'applied').length;
    const interviews = jobs.filter(job => job.status === 'interview').length;
    const offers = jobs.filter(job => job.status === 'offer').length;
    const accepted = jobs.filter(job => job.status === 'accepted').length;
    
    return { total, applied, interviews, offers, accepted };
  };

  const stats = getStats();

  const chartData = [
    { name: 'Applied', value: stats.applied, color: '#3B82F6' },
    { name: 'Interview', value: stats.interviews, color: '#EAB308' },
    { name: 'Offer', value: stats.offers, color: '#10B981' },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'rejected').length, color: '#EF4444' },
    { name: 'Accepted', value: stats.accepted, color: '#8B5CF6' }
  ];

  const recentJobs = jobs.slice(0, 5);

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
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400">Here's your job search overview</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          >
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Applications</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Applied</p>
                  <p className="text-2xl font-bold text-white">{stats.applied}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Interviews</p>
                  <p className="text-2xl font-bold text-white">{stats.interviews}</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Offers</p>
                  <p className="text-2xl font-bold text-white">{stats.offers}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Accepted</p>
                  <p className="text-2xl font-bold text-white">{stats.accepted}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
                Application Status
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
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
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent Applications */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Recent Applications</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentJobs.map((job) => {
                  const StatusIcon = statusIcons[job.status];
                  return (
                    <motion.div
                      key={job.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${statusColors[job.status]}`}></div>
                        <div>
                          <h4 className="font-medium text-white">{job.position}</h4>
                          <p className="text-gray-400 text-sm">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Applied</p>
                          <p className="text-sm text-white">{new Date(job.appliedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="w-5 h-5 text-gray-400" />
                          <span className="text-sm capitalize text-gray-300">{job.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;