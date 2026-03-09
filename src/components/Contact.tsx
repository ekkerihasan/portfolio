'use client';

import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Send, User, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Replace with your actual key from web3forms.com
  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY!);
    formData.append("subject", `[${formData.get("project_type")}] New Message from ${formData.get("name")}`);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setIsSubmitting(false);
      setIsSent(true);
      e.currentTarget.reset();
      setTimeout(() => setIsSent(false), 6000);
    } else {
      setIsSubmitting(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <section id="contact" className="w-full relative py-20 md:py-32 bg-brand-cream border-t border-black/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10 px-6">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
             <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
             <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-black">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-semibold text-brand-ink tracking-tighter leading-none">
            Have a project in mind? <br className="hidden md:block" /> 
            <span className="text-brand-gold italic font-medium">Drop your thoughts.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MAIN CHAT BENTO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-brand-ink p-1 flex flex-col md:flex-row transition-all duration-700 shadow-2xl"
          >
            {/* Left side: The "Hook" */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-6">
                <h4 className="text-2xl md:text-3xl font-medium text-brand-cream leading-tight">
                  Wanna build <br/> <span className="text-brand-gold opacity-80 italic text-3xl">something solid?</span>
                </h4>
                <p className="text-brand-cream/40 text-sm leading-relaxed max-w-[240px]">
                  I usually respond within a few hours to discuss architecture and design.
                </p>
              </div>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText('hassanekkeri2@gmail.com');
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-cream border border-white/10 font-bold text-[10px] uppercase tracking-widest transition-all group/btn w-full sm:w-fit mt-12"
              >
                <Mail className="w-3.5 h-3.5 text-brand-gold" />
                <span>{copied ? 'Email Copied' : 'hassanekkeri2@gmail.com'}</span>
              </button>
            </div>

            {/* Right side: The Functional Form */}
            <div className="flex-1 bg-white m-2 rounded-[2rem] p-6 md:p-8 relative">
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10">
                    <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center"><Check size={28} /></div>
                    <p className="text-brand-ink font-bold">Inquiry Sent!</p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted ml-2">Name</label>
                        <input name="name" required placeholder="Your Name" className="w-full bg-brand-cream/30 border-none py-3 px-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted ml-2">Project</label>
                        <div className="relative">
                          <select name="project_type" className="w-full bg-brand-cream/30 border-none py-3 pl-4 pr-8 rounded-xl text-sm focus:ring-1 focus:ring-brand-gold outline-none appearance-none cursor-pointer font-medium text-brand-ink transition-all">
                            <option value="Backend">Backend</option>
                            <option value="Full Stack">Full Stack</option>
                            <option value="Security">Security</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none" size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted ml-2">Email</label>
                      <input name="email" required type="email" placeholder="email@work.com" className="w-full bg-brand-cream/30 border-none py-3 px-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-gold outline-none transition-all" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brand-muted ml-2">Message</label>
                      <textarea name="message" required rows={3} placeholder="Wanna build something?" className="w-full bg-brand-cream/30 border-none py-3 px-4 rounded-xl text-sm focus:ring-1 focus:ring-brand-gold outline-none transition-all resize-none" />
                    </div>
                    <button disabled={isSubmitting} className="w-full py-4 bg-brand-ink text-brand-cream rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] hover:bg-brand-gold hover:text-brand-ink transition-all active:scale-95 group shadow-lg">
                      {isSubmitting ? "Dispatching..." : "Send Inquiry"}
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* SIDE STACK: LINKS & STATUS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             
             {/* Live Status Card */}
             <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 flex flex-col justify-between hover:border-brand-gold/30 transition-all shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center border border-brand-gold/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                  </div>
                  <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-widest">Live Now</span>
                </div>
                <div className="mt-6">
                  <h5 className="text-[10px] uppercase tracking-widest font-black text-brand-gold mb-1 text-left">Availability</h5>
                  <p className="text-xl font-bold text-brand-ink text-left">Currently coding & <br/> taking on roles</p>
                </div>
             </div>

             {/* Github Link */}
             <a href="https://github.com/ekkerihasan" target="_blank" className="rounded-[2rem] bg-brand-paper/50 border border-black/5 p-6 group hover:bg-white transition-all flex items-center justify-between">
                <div className="flex items-center gap-4 text-left">
                   <div className="w-12 h-12 rounded-xl bg-brand-ink flex items-center justify-center text-white group-hover:bg-brand-gold transition-colors"><Github size={20}/></div>
                   <div><p className="text-xs font-bold text-brand-ink">GitHub</p><p className="text-[10px] text-brand-muted">Architectures</p></div>
                </div>
                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-gold transition-colors" />
             </a>

             {/* LinkedIn Link */}
             <a href="https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/" target="_blank" className="rounded-[2rem] bg-brand-paper/50 border border-black/5 p-6 group hover:bg-white transition-all flex items-center justify-between">
                <div className="flex items-center gap-4 text-left">
                   <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center text-white"><Linkedin size={20}/></div>
                   <div><p className="text-xs font-bold text-brand-ink">LinkedIn</p><p className="text-[10px] text-brand-muted">Professional Network</p></div>
                </div>
                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-gold transition-colors" />
             </a>
          </div>

        </div>
      </div>
    </section>
  );
}