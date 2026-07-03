/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AssessmentData {
  name: string;
  phone: string;
  goal: 'emagrecimento' | 'hipertrofia' | 'envelhecimento_saudavel' | 'outro';
  level: 'sedentario' | 'moderado' | 'avancado';
  frequency: string;
}

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconName: 'globe' | 'clipboard' | 'whatsapp' | 'instagram' | 'facebook';
  isHighlighted?: boolean;
}
