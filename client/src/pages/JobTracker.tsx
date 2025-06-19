import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Calendar,
  Building,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted';
  appliedDate: string;
  notes?: string;
}

const JobTracker: React.FC = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied' as Job['status'],
    appliedDate: '',
    notes: ''
  });

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.position || !formData.appliedDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...formData }
          : job
      ));
      toast.success('Job application updated successfully!');
    } else {
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData
      };
      setJobs([newJob, ...jobs]);
      toast.success('Job application added successfully!');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      status: 'applied',
      appliedDate: '',
      notes: ''
    });
    setEditingJob(null);
    setShowModal(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      position: job.position,
      status: job.status,
      appliedDate: job.appliedDate,
      notes: job.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast.success('Job application deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job Applications</h1>
            <p className="text-gray-400">Track and manage your job applications</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Job</span>
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredJobs.map((job) => {
              const StatusIcon = statusIcons[job.status];
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${statusColors[job.status]}`}></div>
                      <div>
                        <h3 className="font-semibold text-white">{job.position}</h3>
                        <p className="text-gray-400 text-sm flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(job)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(job.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300 capitalize">{job.status}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {job.notes && (
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">{job.notes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No applications found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Add your first job application to get started'
              }
            </p>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingJob ? 'Edit Application' : 'Add New Application'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter position title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Applied Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.appliedDate}
                      onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Add any notes or comments..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                      {editingJob ? 'Update' : 'Add'} Application
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobTracker;