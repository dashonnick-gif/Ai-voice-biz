import React, { useState } from 'react';
import { X, Phone, Mail, User, Building2, Send, CheckCircle } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'demo' | 'trial' | 'support' | 'general';
  planName?: string;
}

export default function LeadCaptureModal({ isOpen, onClose, context = 'general', planName }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = context === 'demo'
      ? 'Requesting Live Demo'
      : context === 'trial'
      ? `Sign up for ${planName || 'Pro'} Trial`
      : context === 'support'
      ? 'Support Request'
      : 'New Lead from VoxLocal Website';

    const body = `Hi VoxLocal Team,%0D%0A%0D%0A` +
      `I would like to get in touch regarding: ${subject}%0D%0A%0D%0A` +
      `Business Name: ${formData.businessName}%0D%0A` +
      `Contact Name: ${formData.contactName}%0D%0A` +
      `Email: ${formData.email}%0D%0A` +
      `Phone: ${formData.phone}%0D%0A%0D%0A` +
      `Please reach out to discuss next steps.%0D%0A%0D%0A` +
      `Best regards,%0D%0A${formData.contactName}`;

    const to = context === 'support' ? 'support@voxlocal.ai' : 'demo@voxlocal.ai';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const title = context === 'demo'
    ? 'Book a Live Demo'
    : context === 'trial'
    ? `Start Your ${planName || ''} Free Trial`
    : context === 'support'
    ? 'Contact Support'
    : 'Get in Touch';

  const description = context === 'demo'
    ? 'Fill out your details and our team will reach out to schedule a personalized demo.'
    : context === 'trial'
    ? 'Enter your information below and we will set up your free trial account.'
    : context === 'support'
    ? 'Let us know how we can help and our support team will get back to you shortly.'
    : 'Tell us about your business and we will get back to you within 24 hours.';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-slate-400 text-sm mt-1">{description}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Thank You!</h4>
              <p className="text-slate-500 text-sm mb-6">
                Your email client should open with your details pre-filled. Send the message and our team will reach out within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Business Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Acme Dental Clinic"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.businessName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-50 text-sm outline-none transition-all focus:ring-4`}
                  />
                </div>
                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Contact Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleChange('contactName', e.target.value)}
                    placeholder="John Smith"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.contactName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-50 text-sm outline-none transition-all focus:ring-4`}
                  />
                </div>
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@acmedental.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-50 text-sm outline-none transition-all focus:ring-4`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-50 text-sm outline-none transition-all focus:ring-4`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>

              <p className="text-center text-xs text-slate-400">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
