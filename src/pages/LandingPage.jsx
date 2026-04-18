import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Users, Zap, Shield, MessageSquare, BarChart, HeartHandshake, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LandingPage = () => {
  const { currentUser } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', date: '' });

  const ctaText = currentUser ? "Go to Dashboard" : "Start for free";
  const ctaLink = currentUser ? "/dashboard" : "/auth";

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const existingDemos = JSON.parse(localStorage.getItem('demos') || '[]');
    localStorage.setItem('demos', JSON.stringify([...existingDemos, { ...demoForm, timestamp: new Date().toISOString() }]));
    
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setIsDemoModalOpen(false);
      setDemoForm({ name: '', email: '', date: '' });
    }, 2500);
  };
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Introducing Helplytics 2.0
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 max-w-4xl mx-auto">
            Support that scales with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">community</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The premium platform connecting those who need help with those who can provide it. 
            Resolve issues faster, build knowledge, and empower your community members.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ctaLink} className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium transition-all rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 w-full sm:w-auto">
              {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <button onClick={() => setIsDemoModalOpen(true)} className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium transition-all rounded-lg border border-border bg-background hover:bg-muted text-foreground hover:scale-105 active:scale-95 w-full sm:w-auto">
              Book a demo
            </button>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to support your users</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit designed for modern communities. Clean, fast, and remarkably powerful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Lightning Fast Routing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically route help requests to the most qualified community members based on their expertise and past helpfulness.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Assurance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built-in reputation systems and peer reviews ensure that the help provided meets your community's highest standards.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Seamless Discussions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Threaded conversations, code snippets, and rich media support make resolving complex issues feel effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Trusted by the fastest growing communities</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Numbers speak louder than words. See how Helplytics is transforming community support across the globe.
              </p>
              
              <ul className="space-y-4">
                {[
                  "99.9% uptime over the last 12 months",
                  "Average response time under 5 minutes",
                  "Over 1M+ issues resolved successfully"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-8 shadow-sm">
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <div className="text-4xl font-bold tracking-tight mb-1">500k+</div>
                  <div className="text-sm font-medium text-muted-foreground">Active Members</div>
                </div>
                
                <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-8 shadow-sm translate-y-4 lg:translate-y-8">
                  <BarChart className="h-8 w-8 text-primary mb-4" />
                  <div className="text-4xl font-bold tracking-tight mb-1">2.4M</div>
                  <div className="text-sm font-medium text-muted-foreground">Help Requests</div>
                </div>
                
                <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-8 shadow-sm -translate-y-4 lg:-translate-y-8">
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <div className="text-4xl font-bold tracking-tight mb-1">4.2m</div>
                  <div className="text-sm font-medium text-muted-foreground">Avg. Time to Resolve</div>
                </div>
                
                <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-8 shadow-sm">
                  <HeartHandshake className="h-8 w-8 text-primary mb-4" />
                  <div className="text-4xl font-bold tracking-tight mb-1">98%</div>
                  <div className="text-sm font-medium text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to empower your community?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of communities already using Helplytics AI to provide world-class support.
          </p>
          <Link to={ctaLink} className="inline-flex items-center justify-center h-14 px-10 text-base font-medium transition-all rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/25">
            {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              {demoSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Demo Scheduled!</h3>
                  <p className="text-muted-foreground">We've saved your request. Check your email shortly for calendar invites.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">Schedule a Demo</h3>
                  <p className="text-muted-foreground mb-6 text-sm">See how Helplytics can scale your community support in a personalized 30-minute session.</p>
                  
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Name</label>
                      <input 
                        type="text" 
                        required
                        value={demoForm.name}
                        onChange={e => setDemoForm({...demoForm, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                        placeholder="Jane Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={demoForm.email}
                        onChange={e => setDemoForm({...demoForm, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                        placeholder="jane@company.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        value={demoForm.date}
                        onChange={e => setDemoForm({...demoForm, date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                      />
                    </div>
                    <button type="submit" className="w-full h-12 mt-4 inline-flex items-center justify-center font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                      Confirm Booking
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
