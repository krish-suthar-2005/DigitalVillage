import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useVillage } from '@/context/VillageContext';

export function Footer() {
  const { selectedVillage } = useVillage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Landmark className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Gram Panchayat</h3>
                <p className="text-xs text-muted-foreground">Digital Village Portal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering villages with digital governance. Access government schemes, track development, 
              and participate in local administration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/schemes', label: 'Government Schemes' },
                { to: '/complaints', label: 'File Complaint' },
                { to: '/gram-sabha', label: 'Gram Sabha' },
                { to: '/development', label: 'Development Works' },
                { to: '/services', label: 'Service Links' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors no-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Important Links</h4>
            <ul className="space-y-2">
              {[
                { href: 'https://panchayat.gov.in/', label: 'Ministry of Panchayati Raj' },
                { href: 'https://egramswaraj.gov.in/', label: 'eGramSwaraj' },
                { href: 'https://nrega.nic.in/', label: 'MGNREGA Portal' },
                { href: 'https://pmayg.nic.in/', label: 'PMAY-G Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 no-highlight"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            {selectedVillage ? (
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                  <span>
                    {selectedVillage.name}, {selectedVillage.taluka_name}, {selectedVillage.district}, {selectedVillage.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 79 XXXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contact@{selectedVillage.slug}.grampanchayat.in</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a village to see contact information.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Gram Panchayat Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors no-highlight">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors no-highlight">
              Terms of Use
            </Link>
            <Link to="/sitemap" className="hover:text-foreground transition-colors no-highlight">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
