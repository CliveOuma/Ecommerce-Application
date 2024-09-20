"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone } from 'react-icons/fi';

const Banner = () => {
  return (
    <div className="bg-gray-800 text-white text-center p-2 overflow-hidden">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10,
          ease: "linear"
        }}
        className="inline-block sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap"
      >
        <FiPhone className="inline mr-1" size={24} />
        <span>+254740719423&nbsp;&nbsp;&nbsp;Free Delivery within Nairobi!</span>
      </motion.div>
    </div>
  );
};

export default Banner;
