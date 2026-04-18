import { Link } from 'react-router-dom';
import { HeartHandshake, MessageCircle, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Helplytics <span className="text-primary">AI</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              The premium community support platform. Connecting those who need help with those who can provide it, efficiently and elegantly.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Discord</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Guidelines</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Ambassadors</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Helplytics AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
