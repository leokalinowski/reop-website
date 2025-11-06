import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding section-dark cosmic-grid relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-glow"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 space-y-4 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-4xl mx-auto">
            The Hardest Part Isn't Selling Homes —{' '}
            <span className="text-primary">It's Holding Everything Together.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Side - Chaos Image Placeholder */}
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
            <p className="text-xs sm:text-sm text-center mt-3 sm:mt-4 font-medium">
              Before: Overwhelmed & Scattered
            </p>
          </motion.div>

          {/* Right Side - Clarity Image Placeholder */}
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
            <p className="text-xs sm:text-sm text-center mt-3 sm:mt-4 font-medium">
              After: Organized & In Control
            </p>
          </motion.div>
        </div>

        {/* Body Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 max-w-3xl mx-auto space-y-4 sm:space-y-6 text-center px-4"
        >
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            You started in real estate to help people move. But somewhere between chasing leads, juggling closings, and trying to "stay in touch," the joy got buried under the chaos.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            You don't need another course, app, or coach yelling "do more."
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed font-medium">
            You need <span className="text-primary">clarity</span>, <span className="text-primary">systems</span>, and <span className="text-primary">support</span> — the kind that brings your business back into alignment with your life.
          </p>
          <p className="text-sm sm:text-base italic mt-6 sm:mt-8 opacity-80">
            Because burnout isn't a badge of honor. It's a signal that something needs to change.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;