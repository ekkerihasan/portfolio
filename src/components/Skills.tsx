'use client';

import { motion } from 'framer-motion';
import { 
  SiNodedotjs, SiExpress, SiJavascript, SiPython, 
  SiMysql, SiPostgresql, SiJsonwebtokens,
  SiAuth0, SiDocker, SiSqlite
} from 'react-icons/si';

const skillGroups = [
  {
    category: "Architecture & Logic",
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: 'Express.js', icon: <SiExpress className="text-brand-ink" /> },
      { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
    ]
  },
  {
    category: "Data & Security",
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
      { name: 'JWT', icon: <SiJsonwebtokens className="text-[#d63aff]" /> },
      { name: 'Auth0', icon: <SiAuth0 className="text-[#EB5424]" /> },
    ]
  },
  {
    category: "DevOps & Core",
    skills: [
      { name: 'Docker', icon: <SiDocker className="text-[#2496ED]" /> },
      { name: 'SQL', icon: <SiSqlite className="text-[#003B57]" /> },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold text-brand-ink tracking-tight">
            Technical <span className="text-brand-gold italic font-medium">Stack.</span>
          </h2>
        </motion.div>

        {/* Categorized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {skillGroups.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-ink/40 whitespace-nowrap">
                  {group.category}
                </h3>
                <div className="h-px w-full bg-brand-gold/20" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {group.skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-4 bg-white/50 backdrop-blur-sm border border-brand-gold/10 rounded-2xl group hover:bg-white hover:border-brand-gold/40 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-cream border border-brand-gold/5 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                        {skill.icon}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-brand-muted group-hover:text-brand-ink tracking-tight transition-colors">
                      {skill.name}
                    </span>
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