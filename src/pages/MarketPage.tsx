import React, { useState } from 'react';
import { ShoppingBag, MapPin, Clock, Phone, Search, Filter, Leaf, Wheat, Milk, Hammer } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

interface MarketItem {
  id: number;
  name: string;
  category: string;
  seller: string;
  price: string;
  unit: string;
  image: string;
  available: boolean;
  contact: string;
}

const mockMarketItems: MarketItem[] = [
  { id: 1, name: 'Fresh Vegetables', category: 'vegetables', seller: 'Ramesh Patel', price: '40', unit: 'kg', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', available: true, contact: '9876543210' },
  { id: 2, name: 'Organic Rice', category: 'grains', seller: 'Suresh Farmer', price: '60', unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', available: true, contact: '9876543211' },
  { id: 3, name: 'Fresh Milk', category: 'dairy', seller: 'Gaushala', price: '50', unit: 'L', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', available: true, contact: '9876543212' },
  { id: 4, name: 'Wheat Flour', category: 'grains', seller: 'Mill Owner', price: '35', unit: 'kg', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', available: true, contact: '9876543213' },
  { id: 5, name: 'Handmade Pottery', category: 'handicrafts', seller: 'Artisan Coop', price: '200', unit: 'piece', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400', available: true, contact: '9876543214' },
  { id: 6, name: 'Ghee (Pure)', category: 'dairy', seller: 'Dairy Farm', price: '500', unit: 'kg', image: 'https://images.unsplash.com/photo-1631477076114-9ec39a85b7c9?w=400', available: false, contact: '9876543215' },
  { id: 7, name: 'Fresh Fruits', category: 'vegetables', seller: 'Orchard Owner', price: '80', unit: 'kg', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', available: true, contact: '9876543216' },
  { id: 8, name: 'Bamboo Crafts', category: 'handicrafts', seller: 'Village Artisans', price: '150', unit: 'piece', image: 'https://images.unsplash.com/photo-1547036346-9057e8fcd90b?w=400', available: true, contact: '9876543217' },
];

const categories = [
  { id: 'all', icon: ShoppingBag, label: 'all' },
  { id: 'vegetables', icon: Leaf, label: 'vegetables' },
  { id: 'grains', icon: Wheat, label: 'grains' },
  { id: 'dairy', icon: Milk, label: 'dairy' },
  { id: 'handicrafts', icon: Hammer, label: 'handicrafts' },
];

export default function MarketPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = mockMarketItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <main id="main-content" className="page-container">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('villageMarket')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('marketSubtitle')}</p>
        </header>

        {/* Market Info */}
        <section className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{t('marketLocation')}</p>
                <p className="text-sm text-muted-foreground">{t('villageChowk')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{t('marketTiming')}</p>
                <p className="text-sm text-muted-foreground">6:00 AM - 12:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{t('helplineNumber')}</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchProducts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <cat.icon className="w-4 h-4" />
                {cat.id === 'all' ? t('all') : cat.id === 'vegetables' ? t('vegetables') : cat.id === 'grains' ? t('grains') : cat.id === 'dairy' ? t('dairy') : t('handicrafts')}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <article key={item.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {t('outOfStock')}
                    </span>
                  </div>
                )}
                {item.available && (
                  <span className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {t('available')}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('soldBy')}: {item.seller}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    ₹{item.price}<span className="text-sm font-normal text-muted-foreground">/{item.unit}</span>
                  </p>
                  <a 
                    href={`tel:${item.contact}`}
                    className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                    aria-label={`${t('call')} ${item.seller}`}
                  >
                    <Phone className="w-4 h-4 text-primary" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('noProductsFound')}</p>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
