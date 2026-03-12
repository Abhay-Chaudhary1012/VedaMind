// Features Page
import React from 'react';
import { Brain, Book, Sparkles } from "lucide-react"
import { motion } from 'framer-motion';
import { FeatureCard } from '../components/FeatureCard';

const ALL_FEATURES = [
  { icon: Book, title: 'Multi-Level Notes', description: 'ELI10 for beginners, Grade Level for standard study, Advanced for deeper understanding. One topic, three perspectives.', tier: 0 },
  { icon: Brain, title: 'AI Quiz Generator', description: '2 MCQs + 2 short answers + 1 challenge problem per quiz. AI generates questions tailored to difficulty.', tier: 0 },
  { icon: Sparkles, title: 'Instant AI Feedback', description: 'Submit any answer and get a grade (0–100), mistake analysis, corrected steps, and 2 suggested practice problems.', tier: 0 },
  { icon: Brain, title: 'Response Time Tracking', description: 'We record how long you spend on each question to help identify where you struggle most.', tier: 0 },
  { icon: Brain, title: 'Accuracy Trends', description: 'See how your scores improve over time, per topic. Visualize your learning curve.', tier: 1 },
  { icon: Book, title: 'Session History', description: 'Every learning session is logged — topic, duration, score. Your full learning timeline.', tier: 1 },
  { icon: Sparkles, title: 'Topic Mastery Map', description: 'Which topics have you aced? Which need revision? At a glance.', tier: 1 },
  { icon: Brain, title: 'Career Hint Generator', description: 'Based on your learning patterns, topics, and scores — discover exciting careers that match your strengths.', tier: 2 },
  { icon: Sparkles, title: 'Advanced Tutor Mode', description: 'Deeper explanations, Socratic questioning, and personalized study plans. Powered by GPT-4o.', tier: 2 },
];

export function FeaturesPage() {
  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="section-title text-4xl mb-3">Features</h1>
          <p className="text-slate-400 max-w-xl mx-auto">VedaMind adapts to your learning journey — more features unlock as you study more.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
        </div>
      </div>
    </div>
  );
}

// How It Works Page
export function HowItWorksPage() {
  const steps = [
    { num: '01', title: 'Enter a Topic', desc: 'Type any topic you\'re studying — from Photosynthesis to Quadratic Equations to the French Revolution.' },
    { num: '02', title: 'Choose Your Level', desc: 'Pick ELI10 (super simple), Grade Level (standard), or Advanced. The same topic, explained differently.' },
    { num: '03', title: 'Generate AI Notes', desc: 'VedaMind creates a structured note: summary, key points, 2 worked examples, and 3 practice problems.' },
    { num: '04', title: 'Take the Quiz', desc: 'Test yourself with 5 AI-generated questions: MCQs, short answers, and a challenge problem.' },
    { num: '05', title: 'Get AI Feedback', desc: 'Submit your answers and instantly receive a score, mistake analysis, and suggested practice problems.' },
    { num: '06', title: 'Build Your Profile', desc: 'Every session adds to your learning profile. Unlock analytics at 10h and career hints at 29h.' },
  ];

  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <h1 className="section-title text-4xl mb-3">How It Works</h1>
          <p className="text-slate-400">Six simple steps to smarter learning.</p>
        </motion.div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 flex gap-5 items-start">
              <div className="text-3xl font-display font-bold text-violet-500/40 min-w-[3rem]">{step.num}</div>
              <div>
                <h3 className="font-display font-semibold text-slate-100 text-lg mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Page
export function AboutPage() {
  const team = [
    { name: 'Abhigya Chand Singh', role: 'Full Stack Developer', bio: 'Architect of the VedaMind system — backend APIs, database design, and deployment.' },
    { name: 'Abhay Chaudhary', role: 'AI/ML Engineer', bio: 'LLM integration, prompt engineering, and evaluation pipeline for quiz feedback.' },
    { name: 'Aryan Sharma', role: 'UI/UX Designer', bio: 'Visual design, design system, Framer Motion animations, and user experience.' },
    { name: 'Abhinav Pratap Singh', role: 'Backend Engineer', bio: 'API architecture, data models, unlock logic, and security considerations.' },
  ];

  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="section-title text-4xl mb-3">About VedaMind</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            VedaMind is a student project built to show how AI can make education more personalized, accessible, and effective for every student.
          </p>
        </motion.div>
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h2 className="font-display font-bold text-xl text-slate-100 mb-3">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed text-lg italic mb-4">
            "Students should not fit the education system — the education system should adapt to the student."
          </p>
          <p className="text-slate-400 leading-relaxed">
            We built VedaMind as a prototype to demonstrate that AI can deliver truly adaptive learning — generating content at the right level, testing understanding intelligently, and guiding students toward their potential. This is the future of education.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-slate-100 text-lg">{member.name}</h3>
              <p className="text-violet-400 text-sm mb-2">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
              <div className="flex gap-3 mt-3">
                {/* Replace https://xyz.com with real links */}
                <a href="https://xyz.com" target="_blank" rel="noopener noreferrer" className="text-xs text-violet-400 hover:text-violet-300">LinkedIn ↗</a>
                <a href="https://xyz.com" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-200">GitHub ↗</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Students Page
export function StudentsPage() {
  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="section-title text-4xl mb-3">For Students</h1>
          <p className="text-slate-400">VedaMind is your AI tutor, quiz master, and learning tracker all in one.</p>
        </motion.div>
        <div className="grid gap-4">
          {[
            { emoji: '🎯', title: 'Study Any Topic, At Your Level', desc: 'From Class 6 basics to Class 10 advanced — VedaMind meets you where you are.' },
            { emoji: '⚡', title: 'Instant Feedback, Not Just Marks', desc: 'Know exactly what you got wrong, why, and how to fix it — not just a percentage.' },
            { emoji: '📈', title: 'See Yourself Improve', desc: 'Your dashboard shows exactly how you\'re getting better over time. Nothing is more motivating.' },
            { emoji: '🔓', title: 'Unlock More As You Learn', desc: 'The more you study, the more features unlock — analytics, career hints, and advanced tutoring.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex gap-4 items-start">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="font-display font-semibold text-slate-100 mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mentors Page
export function MentorsPage() {
  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="section-title text-4xl mb-3">For Mentors & Teachers</h1>
          <p className="text-slate-400">VedaMind is a tool to extend your reach — not replace your expertise.</p>
        </motion.div>
        <div className="grid gap-4">
          {[
            { emoji: '🏫', title: 'Assign Topics, Track Progress', desc: 'Guide students to topics you\'re teaching. Their dashboard tracks exactly what they\'ve studied.' },
            { emoji: '🔍', title: 'Identify Weak Areas Early', desc: 'Quiz results and mistake patterns surface which concepts students struggle with most.' },
            { emoji: '🤝', title: 'Complement Your Teaching', desc: 'VedaMind handles repetitive Q&A and note generation — you focus on discussion and mentoring.' },
            { emoji: '📋', title: 'Privacy-Safe', desc: 'No images, no video, no personally identifying data beyond names. Opt-in logging only.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex gap-4 items-start">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="font-display font-semibold text-slate-100 mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Page
export function ContactPage() {
  return (
    <div className="min-h-screen mesh-bg pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="section-title text-4xl mb-3">Contact</h1>
          <p className="text-slate-400">Questions, feedback, or collaboration? Reach out to the team.</p>
        </motion.div>
        <div className="glass-card rounded-2xl p-8 text-center space-y-4">
          <p className="text-slate-300">This is a student project — find us on LinkedIn and GitHub.</p>
          {['Abhigya Chand Singh', 'Abhay Chaudhary', 'Aryan Sharma', 'Abhinav Pratap Singh'].map(name => (
            <div key={name} className="flex items-center justify-between glass-card rounded-xl px-4 py-3">
              <span className="text-slate-200 text-sm">{name}</span>
              <div className="flex gap-3">
                {/* Replace https://xyz.com with actual links */}
                <a href="https://xyz.com" className="text-violet-400 text-xs hover:text-violet-300">LinkedIn ↗</a>
                <a href="https://xyz.com" className="text-slate-400 text-xs hover:text-slate-200">GitHub ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
