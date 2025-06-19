import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, MessageSquare, User, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.feedback.trim()) {
      toast.error('Please provide your feedback');
      return;
    }

    if (formData.rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitting(false);
    toast.success('Thank you for your feedback!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      feedback: '',
      rating: 0
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Share Your Feedback</h1>
            <p className="text-xl text-gray-400">
              Help us improve JobWise by sharing your experience and suggestions
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRatingChange(star)}
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600 hover:text-yellow-300'
                      } transition-colors duration-200`}
                    >
                      <Star className="w-full h-full" />
                    </motion.button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="ml-3 text-gray-400">
                      {formData.rating} out of 5 stars
                    </span>
                  )}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  required
                  rows={6}
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Please share your experience with JobWise. What features do you love? What could be improved? Any suggestions for new features?"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {submitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">
                <strong>Privacy Notice:</strong> Your feedback helps us improve JobWise. 
                Personal information is optional and will only be used to follow up on your feedback if needed.
                We never share your information with third parties.
              </p>
            </div>
          </motion.div>

          {/* Features Highlight */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Anonymous Option</h3>
              <p className="text-gray-400 text-sm">
                Share feedback without providing personal information
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Rate Your Experience</h3>
              <p className="text-gray-400 text-sm">
                Help others discover JobWise with your honest rating
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Direct Impact</h3>
              <p className="text-gray-400 text-sm">
                Your suggestions directly influence our development roadmap
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm;