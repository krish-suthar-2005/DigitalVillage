import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, LogOut, FileText, MessageSquare, Bell, Settings } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { useVillage } from '@/context/VillageContext';

// Mock user data (in real app, this would come from auth context)
const mockUser = {
  name: 'Ramesh Kumar Patel',
  email: 'ramesh.patel@example.com',
  phone: '9876543210',
  village: 'Modhera',
  joinDate: '2024-01-15',
  complaints: 5,
  resolved: 3,
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { selectedVillage } = useVillage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: t('profileUpdated'),
      description: t('profileUpdateSuccess'),
    });
  };

  return (
    <MainLayout>
      <main id="main-content" className="page-container">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <header className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                />
                <button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90"
                  aria-label={t('changePhoto')}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <MapPin className="w-4 h-4" />
                  {selectedVillage?.name || mockUser.village}
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {t('memberSince')}: {new Date(mockUser.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? t('cancel') : t('editProfile')}
                </Button>
                <Button variant="destructive" size="sm" asChild>
                  <Link to="/login">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="md:col-span-1 space-y-4">
              <section className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{t('yourActivity')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{t('complaints')}</span>
                    </div>
                    <span className="font-bold text-foreground">{mockUser.complaints}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-success" />
                      <span className="text-foreground">{t('resolved')}</span>
                    </div>
                    <span className="font-bold text-success">{mockUser.resolved}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-warning" />
                      <span className="text-foreground">{t('pending')}</span>
                    </div>
                    <span className="font-bold text-warning">{mockUser.complaints - mockUser.resolved}</span>
                  </div>
                </div>
              </section>

              <section className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{t('quickLinks')}</h2>
                <div className="space-y-2">
                  <Link to="/complaints" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t('myComplaints')}</span>
                  </Link>
                  <Link to="/schemes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t('appliedSchemes')}</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t('settings')}</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Profile Form */}
            <section className="md:col-span-2 bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">{t('personalInformation')}</h2>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="form-label">{t('fullName')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="form-label">{t('email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="form-label">{t('phoneNumber')}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="village" className="form-label">{t('villageName')}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="village"
                        type="text"
                        value={selectedVillage?.name || mockUser.village}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      {t('cancel')}
                    </Button>
                    <Button onClick={handleSave}>
                      {t('saveChanges')}
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
