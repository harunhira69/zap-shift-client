// Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">

      {/* Floating blurred circles */}
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-[110px] opacity-40 -top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-[120px] opacity-40 bottom-10 right-10"></div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl flex flex-col items-center"
      >
        {/* Neon rotating ring */}
        <motion.div
          className="w-28 h-28 rounded-full border-4 border-transparent border-t-purple-400 border-l-indigo-400 shadow-[0_0_25px_#8b5cf6]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Text */}
        <motion.p
          className="mt-6 text-white text-xl font-semibold tracking-wider drop-shadow"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
