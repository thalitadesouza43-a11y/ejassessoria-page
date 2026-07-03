/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Share2, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import Logo from './components/Logo';
import AssessmentModal from './components/AssessmentModal';

// Configurations - easy to edit for the client
const BRAND_CONFIG = {
  whatsappNumber: '5548999999999', // Phone format: CountryCode + DDD + Number (no spaces or dashes)
  instagramUrl: 'https://www.instagram.com/evertonjohn.assessoria/',
  facebookUrl: 'https://www.facebook.com/evertonjohn.assessoria/',
  websiteUrl: 'https://evertonjohn.com.br/',
};

export default function App() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Handle sharing the link tree
  const handleShare = async () => {
    const shareData = {
      title: 'Everton John Assessoria',
      text: 'Confira os links e agende sua avaliação gratuita na Everton John Assessoria!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 2500);
      }
    } catch (err) {
      // Fallback: Copy to clipboard if user cancels or it fails
      await navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    }
  };

  // Custom high-fidelity brand SVG icons
  const WhatsAppIcon = () => (
    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-between font-sans relative overflow-x-hidden selection:bg-[#0FA34E] selection:text-white">
      
      {/* 1. Atmospheric Premium Background Orbs and Tech Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Futury Technical Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(#0FA34E 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        
        {/* Animated Green Organic Light Source 1 (Top Left) */}
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[50%] rounded-full bg-[#0FA34E] opacity-[0.06] blur-[120px] pointer-events-none" />
        
        {/* Animated Green Organic Light Source 2 (Bottom Right) */}
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[50%] rounded-full bg-[#00582C] opacity-[0.08] blur-[120px] pointer-events-none" />
      </div>

      {/* Elegant Toast Alert for Shared Link */}
      {showShareNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 z-50 flex items-center gap-2 bg-[#0FA34E] text-white px-5 py-3 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider"
          id="toast-share"
        >
          <Check className="w-4 h-4" /> Link Copiado com Sucesso!
        </motion.div>
      )}

      {/* Main Content Column */}
      <main className="w-full max-w-md px-6 flex-1 flex flex-col justify-center items-center pt-8 pb-6 z-10">
        
        {/* 1. Header / Topo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-8"
          id="header-section"
        >
          {/* Logo */}
          <Logo className="mb-10" />

          {/* Slogan */}
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-wider text-white uppercase italic skew-x-[-5deg] leading-tight mt-6 mb-4 px-2 select-none">
            DÊ O PRÓXIMO PASSO <br />
            PARA A SUA <span className="text-[#0FA34E] relative inline-block drop-shadow-[0_0_12px_rgba(15,163,78,0.35)] font-black">
              TRANSFORMAÇÃO
              <span className="absolute bottom-[-2px] left-0 right-0 h-[1.5px] bg-[#0FA34E] rounded-full shadow-[0_1px_4px_rgba(15,163,78,0.4)]" />
            </span>
          </h2>

          {/* Subtitle description */}
          <p className="text-xs md:text-sm text-[#BFC7D5] mt-4 font-normal max-w-xs mx-auto leading-relaxed">
            Treino com direção, método e acompanhamento profissional para quem busca evolução real.
          </p>
        </motion.div>

        {/* 2. Core Links Buttons Panel */}
        <div className="w-full space-y-3 mb-8" id="links-container">
          
          {/* SITE OFICIAL LINK */}
          <motion.a
            href="https://ejassessoriaoficial-yhpy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="w-full text-center py-2.5 px-6 rounded-xl bg-[#141414] border border-[#0FA34E]/10 hover:border-[#0FA34E]/30 hover:bg-[#1c1c1c] shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-green-glow-hover transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group"
            id="link-site-oficial"
          >
            <span className="font-display font-black tracking-[0.1em] text-xs text-white uppercase group-hover:text-[#0FA34E] transition-colors">
              SITE OFICIAL
            </span>
            <span className="text-[10px] text-neutral-500 font-medium mt-0.5">Conheça nossa infraestrutura e programas</span>
          </motion.a>

          {/* QUERO UMA AVALIAÇÃO GRATUITA (Main Highlight, Solid Green!) */}
          <motion.a
            href="https://api.whatsapp.com/send?phone=554799547252&text=Ol%C3%A1%21%20Quero%20conhecer%20os%20planos%20da%20EJ%20e%20entender%20qual%20faz%20mais%20sentido%20para%20o%20meu%20momento%20agora..."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-center py-3 px-6 rounded-xl bg-[#0FA34E] hover:bg-[#12b357] text-white shadow-[0_8px_20px_rgba(15,163,78,0.25)] hover:shadow-green-solid-glow-hover transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group"
            id="link-avaliacao-gratuita"
          >
            <span className="font-display font-black tracking-[0.1em] text-xs text-white uppercase flex items-center justify-center gap-1.5">
              AVALIAÇÃO GRATUITA
              <span className="text-[8px] font-black tracking-wider uppercase bg-black/20 text-white px-1.5 py-0.5 rounded">GRÁTIS</span>
            </span>
            <span className="text-[10px] text-emerald-100/90 font-medium mt-0.5">Seu treino atual avaliado por nós.</span>
          </motion.a>

          {/* WHATSAPP LINK */}
          <motion.a
            href="https://api.whatsapp.com/send?phone=554799547252&text=Ol%C3%A1%21%20Quero%20conhecer%20os%20planos%20da%20EJ%20e%20entender%20qual%20faz%20mais%20sentido%20para%20o%20meu%20momento%20agora..."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="w-full text-center py-2.5 px-6 rounded-xl bg-[#141414] border border-[#0FA34E]/10 hover:border-[#0FA34E]/30 hover:bg-[#1c1c1c] shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-green-glow-hover transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group"
            id="link-whatsapp"
          >
            <span className="font-display font-black tracking-[0.1em] text-xs text-white uppercase group-hover:text-[#25D366] transition-colors">
              WHATSAPP
            </span>
            <span className="text-[10px] text-neutral-500 font-medium mt-0.5">Converse direto com nossa equipe de suporte</span>
          </motion.a>

        </div>

        {/* Professional License / CREF (White as requested) */}
        <div className="text-center mb-8" id="cref-section">
          <p className="text-[11px] font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
            CREF 037846-G/SC
          </p>
        </div>

        {/* 3. Specialties Section / Especialidades */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full border-t border-neutral-900/80 pt-10 pb-8 flex flex-col items-center justify-center text-center"
          id="specialties-section"
        >
          {/* Header with visual detail */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-1 h-4 rounded bg-[#0FA34E]" />
            <h3 className="font-display font-black text-xs tracking-[0.2em] text-white uppercase">
              ESPECIALIDADES
            </h3>
          </div>

          {/* List with styled spacing */}
          <div className="space-y-3" id="specialties-list">
            <div className="text-xs font-light tracking-[0.35em] text-[#BFC7D5] uppercase transition-colors hover:text-[#0FA34E] duration-200">
              EMAGRECIMENTO
            </div>
            <div className="text-xs font-light tracking-[0.35em] text-[#BFC7D5] uppercase transition-colors hover:text-[#0FA34E] duration-200">
              HIPERTROFIA
            </div>
            <div className="text-xs font-light tracking-[0.35em] text-[#BFC7D5] uppercase transition-colors hover:text-[#0FA34E] duration-200">
              REJUVENESCIMENTO
            </div>
          </div>
        </motion.div>

      </main>

      {/* 4. Footer Section / Frase Final e Rodapé */}
      <footer className="w-full bg-[#030303] border-t border-neutral-900/60 py-6 px-6 text-center z-10">
        <div className="max-w-md mx-auto">
          {/* Direitos Autorais */}
          <p className="text-[9px] text-neutral-600 font-medium tracking-wider">
            &copy; 2026 Everton John Assessoria. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Embedded High-Converting Assessment Form Modal */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        whatsappNumber={BRAND_CONFIG.whatsappNumber}
      />
      
    </div>
  );
}
