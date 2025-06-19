import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Shield, 
  Users, 
  Zap, 
  ArrowRight, 
  Star,
  TrendingUp,
  Target,
  Clock,
  Award
} from 'lucide-react';

const Home: React.FC = () => {
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

  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track your application progress with detailed analytics and insights that help you understand your job search patterns.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure with enterprise-grade security. We never share your personal information.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and get feedback from your network. Perfect for career coaches and job search groups.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed with modern technology stack. Update applications instantly and access your data anywhere.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "JobWise helped me organize my job search and land my dream job at a tech startup. The analytics were incredibly helpful!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The best job tracking app I've used. Clean interface, powerful features, and excellent customer support.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "Finally, a tool that makes job hunting less stressful. The dashboard gives me a clear view of my progress.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Users", value: "500+", icon: Users },
    { label: "Jobs Tracked", value: "10K+", icon: Target },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Average Rating", value: "4.9", icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <Zap className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">The Smart Way to Track Jobs</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                JobWise
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              The intelligent job application tracker that transforms your job search. 
              Organize, analyze, and succeed with powerful analytics and intuitive design.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/feedback">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 rounded-lg text-white font-semibold hover:bg-gray-800 transition-all duration-200"
                >
                  Share Feedback
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400 mr-2" />
                    <span className="text-3xl font-bold text-blue-400">{stat.value}</span>
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-24 bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose JobWise?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage your job search effectively and land your dream job.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-24 bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of successful job seekers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-gray-700/50 rounded-xl border border-gray-600"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Job Search?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of job seekers who have successfully managed their applications 
            with JobWise. Start your journey to career success today.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-sm opacity-75 flex items-center justify-center"
          >
            <Clock className="w-4 h-4 mr-2" />
            Free forever • No credit card required • 2-minute setup
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;