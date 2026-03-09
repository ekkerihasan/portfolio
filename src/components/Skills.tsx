'use client';

import { motion } from 'framer-motion';
import { 
  SiNodedotjs, SiExpress, SiPython, SiJavascript, 
  SiPostgresql, SiMysql, SiJsonwebtokens,
  SiAuth0, SiDocker, SiSqlite
} from 'react-icons/si';

const skillGroups = [
  {
    category: "Architecture & Logic",
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
    ]
  },
  {
    category: "Data & Security",
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'JWT', icon: <SiJsonwebtokens /> },
      { name: 'Auth0', icon: <SiAuth0 /> },
    ]
  },
  {
    category: "DevOps & Core",
    skills: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'SQL', icon: <SiSqlite /> },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-brand-cream overflow-hidden">
      {/* FIXED: Using px-6 for mobile to prevent 'double padding' with your global class */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-ultra-wide text-brand-gold font-bold mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-7xl font-medium text-brand-ink tracking-tighter">
            Technical <span className="font-serif italic text-brand-gold">Stack.</span>
          </h2>
        </motion.div>

        {/* Categorized Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {skillGroups.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              {/* Category Label */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] uppercase tracking-ultra-wide font-bold text-brand-ink whitespace-nowrap">
                  {group.category}
                </h3>
                <div className="h-[1px] w-full bg-brand-gold/20" />
              </div>
              
              <div className="space-y-3">
                {group.skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-white/40 border border-black/[0.03] rounded-xl group hover:bg-white hover:border-brand-gold/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      {/* Unified Icon Style: All icons start gold/muted and pop on hover */}
                      <span className="text-xl text-brand-muted group-hover:text-brand-gold transition-colors duration-500">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-brand-muted group-hover:text-brand-ink tracking-tight transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Tiny detail: A minimalist arrow that appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-1 h-1 rounded-full bg-brand-gold" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}