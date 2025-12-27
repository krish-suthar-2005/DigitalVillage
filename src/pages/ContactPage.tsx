import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { useVillage } from '@/context/VillageContext';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().regex(/^[0-9]{10}$/, { message: "Phone must be 10 digits" }),
  subject: z.string().trim().min(5, { message: "Subject must be at least 5 characters" }).max(200),
  message: z.string().trim().min(20, { message: "Message must be at least 20 characters" }).max(1000),
});

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { selectedVillage } = useVillage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('messageSent'),
        description: t('messageSuccessDesc'),
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <MainLayout>
      <main id="main-content" className="page-container">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('contactUs')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('contactSubtitle')}</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t('contactInfo')}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t('address')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedVillage?.name || 'Village'} Gram Panchayat,<br />
                      Taluka, District, Gujarat - 380001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t('phoneNumber')}</h3>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">+91 02712 123456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t('email')}</h3>
                    <p className="text-sm text-muted-foreground">grampanchayat@gujarat.gov.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t('officeHours')}</h3>
                    <p className="text-sm text-muted-foreground">{t('mondayToFriday')}: 10:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">{t('saturday')}: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-xl text-primary-foreground">
              <MessageSquare className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('needHelp')}</h3>
              <p className="text-sm opacity-90 mb-4">{t('needHelpDesc')}</p>
              <Button variant="secondary" size="sm" className="w-full">
                {t('callNow')}
              </Button>
            </div>
          </aside>

          {/* Contact Form */}
          <section className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border shadow-lg">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t('sendMessage')}</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="form-label">{t('yourName')}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('enterFullName')}
                    required
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="form-label">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('enterEmail')}
                    required
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="form-label">{t('phoneNumber')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('enterPhone')}
                    required
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="subject" className="form-label">{t('subject')}</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('enterSubject')}
                    required
                  />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="form-label">{t('message')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('enterMessage')}
                    rows={5}
                    required
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>
              </div>

              <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={isLoading}>
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? t('sending') : t('sendMessage')}
              </Button>
            </form>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
