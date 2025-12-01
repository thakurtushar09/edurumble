"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Target, 
  Users, 
  Trophy, 
  Zap, 
  BarChart3,
  Shield,
  Rocket,
  Clock,
  BookOpen,
  TrendingUp,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const HowItWorks = () => {
  const features = [
    {
      icon: <Brain className="text-[#7F27FF]" size={28} />,
      title: "AI-Powered Quiz Generation",
      description: "Our advanced AI analyzes any topic or text and creates engaging, relevant quiz questions instantly.",
      color: "from-[#7F27FF]/20 to-[#7F27FF]/10"
    },
    {
      icon: <Target className="text-[#E4004B]" size={28} />,
      title: "Adaptive Difficulty Levels",
      description: "Choose from Easy, Medium, or Hard difficulty to match your learning level and challenge yourself.",
      color: "from-[#E4004B]/20 to-[#E4004B]/10"
    },
    {
      icon: <Users className="text-[#00C851]" size={28} />,
      title: "Competitive Learning",
      description: "Compete with friends or join public quizzes to make learning fun and engaging.",
      color: "from-[#00C851]/20 to-[#00C851]/10"
    },
    {
      icon: <BarChart3 className="text-[#FFC107]" size={28} />,
      title: "Detailed Analytics",
      description: "Get AI-powered insights into your strengths, weaknesses, and personalized study recommendations.",
      color: "from-[#FFC107]/20 to-[#FFC107]/10"
    }
  ];

  const steps = [
    {
      number: "01",
      icon: <BookOpen className="text-white" size={24} />,
      title: "Create or Choose a Quiz",
      description: "Either enter any topic/text or select from existing quizzes. Our AI instantly generates questions based on your content.",
      image: "/create-quiz.svg",
      color: "bg-gradient-to-r from-[#7F27FF] to-[#9D4EDD]"
    },
    {
      number: "02",
      icon: <Target className="text-white" size={24} />,
      title: "Attempt the Quiz",
      description: "Answer multiple-choice questions with real-time feedback. Your progress is tracked automatically.",
      image: "/attempt-quiz.svg",
      color: "bg-gradient-to-r from-[#E4004B] to-[#FF6B9D]"
    },
    {
      number: "03",
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Get AI Analysis",
      description: "Receive detailed performance reports with AI-generated insights, strengths, weaknesses, and study plans.",
      image: "/ai-analysis.svg",
      color: "bg-gradient-to-r from-[#00C851] to-[#4CD964]"
    },
    {
      number: "04",
      icon: <Trophy className="text-white" size={24} />,
      title: "Track Progress & Compete",
      description: "Monitor your learning journey, climb leaderboards, and compete with others in the community.",
      image: "/progress-tracking.svg",
      color: "bg-gradient-to-r from-[#FFC107] to-[#FFD54F]"
    }
  ];

  const useCases = [
    {
      title: "For Students",
      description: "Perfect for exam preparation, subject revision, and concept testing.",
      icon: <Lightbulb className="text-[#7F27FF]" size={24} />
    },
    {
      title: "For Educators",
      description: "Create custom quizzes for classes, track student performance, and identify learning gaps.",
      icon: <Users className="text-[#E4004B]" size={24} />
    },
    {
      title: "For Professionals",
      description: "Stay updated with industry knowledge, prepare for certifications, and skill assessments.",
      icon: <Shield className="text-[#00C851]" size={24} />
    },
    {
      title: "For Organizations",
      description: "Train employees, conduct assessments, and track team learning progress.",
      icon: <Rocket className="text-[#FFC107]" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0628] via-[#1E0B43] to-[#2A1458]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#7F27FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E4004B]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#251040]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#7965C1]/30 mb-6"
            >
              <Sparkles size={16} className="text-[#7F27FF]" />
              <span className="text-sm text-[#C4B5FD]">AI-Powered Learning Platform</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F27FF] to-[#E4004B]">EduRumble</span> Works
            </h1>
            
            <p className="text-xl text-[#C4B5FD] mb-10 max-w-3xl mx-auto">
              Transform any topic into an engaging learning experience with our AI-powered quiz platform. 
              Create, compete, and conquer knowledge!
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/create-quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl text-lg shadow-lg shadow-[#E4004B]/30"
              >
                <Zap size={20} />
                Start Creating Quizzes
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Why Choose <span className="text-[#7F27FF]">EduRumble</span>?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7965C1] to-[#E4004B] opacity-0 group-hover:opacity-20 blur transition duration-300 rounded-2xl"></div>
              <div className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-[#7965C1]/30 backdrop-blur-sm`}>
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#C4B5FD]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Process */}
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          The <span className="text-[#E4004B]">EduRumble</span> Process
        </motion.h2>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#7F27FF] to-[#E4004B] transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                {/* Step Card */}
                <div className="pt-12">
                  <div className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30 h-full">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                      {step.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-[#C4B5FD] mb-6">{step.description}</p>
                    
                    {/* Placeholder for step image */}
                    <div className="w-full h-40 bg-gradient-to-br from-[#2A1458] to-[#1E0B43] rounded-lg border border-[#7965C1]/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-[#7F27FF]/20 to-[#E4004B]/20 rounded-full flex items-center justify-center">
                          {step.icon}
                        </div>
                        <span className="text-[#C4B5FD] text-sm">Step {step.number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Who is <span className="text-[#00C851]">EduRumble</span> For?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#251040]/50 backdrop-blur-md rounded-2xl p-6 border border-[#7965C1]/30 hover:border-[#7965C1]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
              <p className="text-[#C4B5FD]">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#7F27FF] to-[#E4004B] rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/90">Quizzes Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white/90">Questions Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/90">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90">AI Analysis Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F27FF] to-[#E4004B]">Learning Journey</span>?
          </h2>
          <p className="text-xl text-[#C4B5FD] mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are transforming their study habits with AI-powered quizzes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#E4004B] to-[#7F27FF] text-white font-bold rounded-xl"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border border-white text-white rounded-xl"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Frequently Asked <span className="text-[#FFC107]">Questions</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "How does the AI generate quiz questions?",
              answer: "Our AI analyzes the text or topic you provide, understands key concepts, and creates relevant multiple-choice questions with appropriate difficulty levels and plausible distractors."
            },
            {
              question: "Can I use EduRumble for professional certifications?",
              answer: "Yes! Many professionals use EduRumble to prepare for certifications by creating quizzes from study materials and tracking their progress with detailed analytics."
            },
            {
              question: "Is there a limit to how many quizzes I can create?",
              answer: "Free users can create up to 10 quizzes per month. Premium users enjoy unlimited quiz creation and advanced features."
            },
            {
              question: "How accurate is the AI analysis?",
              answer: "Our AI provides highly accurate insights based on your performance patterns, question difficulty, and answer patterns to give personalized recommendations."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#251040]/50 backdrop-blur-md rounded-xl p-6 border border-[#7965C1]/30"
            >
              <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
              <p className="text-[#C4B5FD]">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;