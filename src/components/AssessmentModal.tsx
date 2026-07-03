/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Send, Check, Dumbbell, Flame, Sparkles, User, Phone } from 'lucide-react';
import { AssessmentData } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export default function AssessmentModal({ isOpen, onClose, whatsappNumber }: AssessmentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    name: '',
    phone: '',
    goal: 'emagrecimento',
    level: 'sedentario',
    frequency: '3-4x por semana',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validateStep1 = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome completo.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Por favor, insira um WhatsApp válido com DDD.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic phone formatting (e.g. (99) 99999-9999)
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 2) {
      formatted = `(${value.slice(0, 2)}) ` + value.slice(2);
    }
    if (value.length > 7) {
      formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
    
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
    if (errors.name) setErrors({ ...errors, name: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    // Format goals for readable WhatsApp message
    const goalLabels = {
      emagrecimento: 'Emagrecimento Saudável',
      hipertrofia: 'Hipertrofia & Força',
      envelhecimento_saudavel: 'Redução de Envelhecimento & Longevidade',
      outro: 'Evolução Real / Outro',
    };

    const levelLabels = {
      sedentario: 'Iniciante / Sedentário',
      moderado: 'Intermediário (Já treino às vezes)',
      avancado: 'Avançado (Treino constante)',
    };

    // Construct highly personalized, professional message
    const message = `Olá Coach Everton! Gostaria de agendar minha Avaliação Gratuita da Assessoria EJ.%0A%0A` +
      `*Meus Dados:*%0A` +
      `• *Nome:* ${formData.name}%0A` +
      `• *WhatsApp:* ${formData.phone}%0A%0A` +
      `*Perfil de Treino:*%0A` +
      `• *Objetivo Principal:* ${goalLabels[formData.goal]}%0A` +
      `• *Nível Atual:* ${levelLabels[formData.level]}%0A` +
      `• *Frequência pretendida:* ${formData.frequency}%0A%0A` +
      `Aguardo o retorno para darmos o próximo passo! 🏋️‍♂️💪`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  // Predefined options
  const goalOptions = [
    { id: 'emagrecimento', title: 'EMAGRECIMENTO', icon: Flame, desc: 'Foco em queima de gordura e definição corporal.' },
    { id: 'hipertrofia', title: 'HIPERTROFIA', icon: Dumbbell, desc: 'Ganho de massa muscular e aumento de força física.' },
    { id: 'envelhecimento_saudavel', title: 'LONGEVIDADE', icon: Sparkles, desc: 'Redução de envelhecimento e ganho de vitalidade.' },
    { id: 'outro', title: 'EVOLUÇÃO GERAL', icon: Check, desc: 'Condicionamento físico e acompanhamento direcionado.' },
  ] as const;

  const levelOptions = [
    { id: 'sedentario', label: 'Iniciante', desc: 'Estou parado ou voltando a treinar agora' },
    { id: 'moderado', label: 'Intermediário', desc: 'Treino de forma irregular e busco consistência' },
    { id: 'avancado', label: 'Avançado', desc: 'Treino regularmente com intensidade e técnica' },
  ] as const;

  const freqOptions = [
    '1 a 2 dias por semana',
    '3 a 4 dias por semana',
    '5 ou mais dias por semana',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#090909] border border-neutral-800/80 p-6 text-white shadow-2xl shadow-[#0FA34E]/10"
            id="modal-content"
          >
            {/* Header / Close Button */}
            <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4">
              <div>
                <h3 className="font-display font-black text-lg tracking-wider text-white uppercase">
                  AVALIAÇÃO <span className="text-[#0FA34E]">GRATUITA</span>
                </h3>
                <p className="text-xs text-[#BFC7D5]">Passo {step} de 4</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
                id="btn-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-neutral-900 h-1 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00582C] to-[#0FA34E]"
                initial={{ width: '25%' }}
                animate={{ width: `${step * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Dynamic Step Panels */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-3">
                      <p className="text-sm text-neutral-300 font-medium">
                        Vamos começar! Como podemos te chamar e entrar em contato?
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: João Silva"
                          value={formData.name}
                          onChange={handleNameChange}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#0FA34E] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                          id="input-name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone/WhatsApp input */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                        WhatsApp com DDD
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="tel"
                          required
                          placeholder="Ex: (48) 99999-9999"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#0FA34E] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                          id="input-phone"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-3"
                  >
                    <div className="text-center mb-2">
                      <p className="text-sm text-neutral-300 font-medium">
                        Qual é o seu objetivo físico principal?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {goalOptions.map((opt) => {
                        const IconComponent = opt.icon;
                        const isSelected = formData.goal === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setFormData({ ...formData, goal: opt.id })}
                            className={`flex items-start text-left p-3.5 rounded-xl border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0FA34E]/10 border-[#0FA34E] shadow-green-glow'
                                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                            }`}
                            id={`btn-goal-${opt.id}`}
                          >
                            <div className={`p-2 rounded-lg mr-3 ${
                              isSelected ? 'bg-[#0FA34E] text-white' : 'bg-neutral-900 text-[#0FA34E]'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {opt.title}
                              </h4>
                              <p className="text-[11px] text-[#BFC7D5] mt-0.5 leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-3"
                  >
                    <div className="text-center mb-2">
                      <p className="text-sm text-neutral-300 font-medium">
                        Qual é o seu nível de experiência atual com treino?
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {levelOptions.map((opt) => {
                        const isSelected = formData.level === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setFormData({ ...formData, level: opt.id })}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0FA34E]/10 border-[#0FA34E] shadow-green-glow'
                                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                            }`}
                            id={`btn-level-${opt.id}`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold tracking-wider text-white uppercase">
                                {opt.label}
                              </span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#0FA34E]" />
                              )}
                            </div>
                            <p className="text-[11px] text-[#BFC7D5] mt-1">
                              {opt.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <p className="text-sm text-neutral-300 font-medium mb-3">
                        Quantas vezes por semana você pretende treinar?
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {freqOptions.map((opt) => {
                        const isSelected = formData.frequency === opt;
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setFormData({ ...formData, frequency: opt })}
                            className={`w-full text-center py-3.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0FA34E] border-[#0FA34E] text-white shadow-green-solid-glow'
                                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-[#BFC7D5]'
                            }`}
                            id={`btn-freq-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl mt-4">
                      <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
                        Ao clicar em Enviar, seu perfil será formatado e você será direcionado para o WhatsApp do Everton John para receber sua resposta e dar o próximo passo!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-900 mt-6 gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white px-3 py-2.5 rounded-lg hover:bg-neutral-950 transition-colors"
                    id="btn-modal-prev"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#0FA34E] hover:bg-[#00582C] text-white px-5 py-2.5 rounded-xl ml-auto transition-all shadow-green-glow"
                    id="btn-modal-next"
                  >
                    Próximo <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#0FA34E] hover:bg-[#00582C] text-white px-6 py-2.5 rounded-xl ml-auto transition-all shadow-green-solid-glow animate-pulse"
                    id="btn-modal-submit"
                  >
                    Enviar No WhatsApp <Send className="w-3.5 h-3.5 ml-1" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
