import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Menu, LogOut, User, Bell, BrainCircuit, Trophy, CheckCircle2, X } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    const savedUser = localStorage.getItem('helplytics_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    // Add a simple interval fallback or listen to storage event (works across tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('auth-change', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('helplytics_user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Helplytics <span className="text-primary">AI</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
                  <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
                  <Link to="/leaderboard" className="hover:text-foreground transition-colors flex items-center"><Trophy className="w-3.5 h-3.5 mr-1"/> Rank</Link>
                  <Link to="/ai-center" className="hover:text-primary transition-colors flex items-center text-primary/80"><BrainCircuit className="w-3.5 h-3.5 mr-1"/> AI Insights</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-foreground transition-colors">Platform</Link>
                  <Link to="/" className="hover:text-foreground transition-colors">Solutions</Link>
                  <Link to="/" className="hover:text-foreground transition-colors">Community</Link>
                  <Link to="/" className="hover:text-foreground transition-colors">Pricing</Link>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4 relative">
              {user ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifs(!showNotifs)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors relative"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
                    </button>
                    
                    {showNotifs && (
                      <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-muted/30">
                          <h3 className="font-semibold text-sm">Notifications</h3>
                          <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          <div className="p-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer bg-primary/5">
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4"/></div>
                              <div>
                                <p className="text-sm text-foreground"><span className="font-semibold">Sarah</span> offered to help with your request</p>
                                <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                              <div>
                                <p className="text-sm text-foreground">Your request <span className="font-medium">"MongoDB Aggregation"</span> was marked as solved</p>
                                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 text-center border-t border-border bg-muted/10">
                          <Link to="/dashboard" onClick={() => setShowNotifs(false)} className="text-xs font-medium text-primary hover:underline">View all</Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link to="/profile" className="flex items-center gap-2 text-sm font-medium border-l border-r border-border px-4 mx-1 hover:text-primary transition-colors">
                    <div className="bg-primary/10 text-primary p-1.5 rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{user.name || 'User'}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="text-sm font-medium hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                  <Link to="/auth" className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
              </button>
            )}
            <button 
              className="text-muted-foreground hover:text-foreground p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-[80%] max-w-sm h-full bg-background border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-lg">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-6 text-lg font-medium">
              {user ? (
                <>
                  <div className="pb-4 border-b border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="text-base font-bold">{user.name || 'User'}</div>
                      <div className="text-sm text-muted-foreground font-normal">{user.email}</div>
                    </div>
                  </div>
                  
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-primary transition-colors">
                    Explore Feed
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-primary transition-colors">
                    My Profile
                  </Link>
                  <Link to="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
                  </Link>
                  <Link to="/ai-center" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <BrainCircuit className="w-5 h-5 text-primary" /> AI Insights
                  </Link>
                  
                  <div className="mt-auto pt-6 border-t border-border">
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">Platform</Link>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">Solutions</Link>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">Community</Link>
                  <div className="mt-auto flex flex-col gap-4">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full h-12 flex items-center justify-center text-base font-medium rounded-lg border border-border">
                      Sign In
                    </Link>
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full h-12 flex items-center justify-center text-base font-medium rounded-lg bg-primary text-primary-foreground">
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
