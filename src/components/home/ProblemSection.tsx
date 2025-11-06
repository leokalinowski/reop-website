import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding section-dark relative overflow-hidden py-12 md:py-16 lg:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 cosmic-grid opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter" style={{ color: '#f8fafc' }}>
            The Hardest Part Isn't Selling Homes —{' '}
            <span className="text-primary">It's Holding Everything Together.</span>
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left Side - Chaos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="image-placeholder rounded-2xl shadow-xl"
              data-image-slot="problem-chaos"
              style={{ aspectRatio: '4/3' }}
            />
            <p className="text-sm text-center mt-4 font-medium" style={{ color: '#cbd5e1' }}>
              Before: Overwhelmed & Scattered
            </p>
          </motion.div>

          {/* Right Side - Clarity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div 
              className="image-placeholder rounded-2xl shadow-xl"
              data-image-slot="problem-clarity"
              style={{ aspectRatio: '4/3' }}
            />
            <p className="text-sm text-center mt-4 font-medium" style={{ color: '#cbd5e1' }}>
              After: Organized & In Control
            </p>
          </motion.div>
        </div>

        {/* Body Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto space-y-6 text-center"
        >
          <p className="text-lg leading-relaxed" style={{ color: '#e2e8f0' }}>
            You started in real estate to help people move. But somewhere between chasing leads, juggling closings, and trying to "stay in touch," the joy got buried under the chaos.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#e2e8f0' }}>
            You don't need another course, app, or coach yelling "do more."
          </p>
          <p className="text-lg leading-relaxed font-medium" style={{ color: '#f8fafc' }}>
            You need <span className="text-primary">clarity</span>, <span className="text-primary">systems</span>, and <span className="text-primary">support</span> — the kind that brings your business back into alignment with your life.
          </p>
          <p className="text-base italic mt-8" style={{ color: '#cbd5e1' }}>
            Because burnout isn't a badge of honor. It's a signal that something needs to change.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
