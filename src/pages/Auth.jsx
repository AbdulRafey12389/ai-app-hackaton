import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, Zap, HeartHandshake, ArrowRight, Mail, Lock, User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1); // 1: Email/Pass, 2: Role Selection (for signup)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' // 'need_help', 'can_help', 'both'
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Mock Login
      const user = { email: formData.email, isLogged: true, isOnboarded: true };
      localStorage.setItem('helplytics_user', JSON.stringify(user));
      navigate('/dashboard');
      window.dispatchEvent(new Event('auth-change'));
    } else {
      if (step === 1) {
        setStep(2);
      } else {
        // Finalize Signup
        const user = { 
          name: formData.name,
          email: formData.email,
          role: formData.role,
          isLogged: true,
          isOnboarded: false 
        };
        localStorage.setItem('helplytics_user', JSON.stringify(user));
        navigate('/onboarding');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-20"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-primary/20 opacity-30 blur-[100px]"></div>

      <div className="w-full max-w-md space-y-8 bg-background border border-border/50 p-8 rounded-3xl shadow-xl shadow-primary/5">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? 'Welcome back' : (step === 1 ? 'Create an account' : 'Choose your path')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : (step === 1 ? 'Start connecting with the community today' : 'How would you like to use Helplytics?')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(!isLogin && step === 2) ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('need_help')}
                className={`w-full flex items-start p-4 rounded-xl border-2 transition-all text-left ${formData.role === 'need_help' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <div className={`p-2 rounded-lg mr-4 ${formData.role === 'need_help' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">I need help</h4>
                  <p className="text-sm text-muted-foreground mt-1">I'm looking for guidance and support from the community.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('can_help')}
                className={`w-full flex items-start p-4 rounded-xl border-2 transition-all text-left ${formData.role === 'can_help' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <div className={`p-2 rounded-lg mr-4 ${formData.role === 'can_help' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">I can help</h4>
                  <p className="text-sm text-muted-foreground mt-1">I want to share my expertise and assist others.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('both')}
                className={`w-full flex items-start p-4 rounded-xl border-2 transition-all text-left ${formData.role === 'both' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              >
                <div className={`p-2 rounded-lg mr-4 ${formData.role === 'both' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Both</h4>
                  <p className="text-sm text-muted-foreground mt-1">I want to learn and help others at the same time.</p>
                </div>
              </button>

              <button
                type="submit"
                disabled={!formData.role}
                className="w-full flex justify-center items-center py-3 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Complete Signup <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-muted-foreground hover:text-foreground text-center mt-4 transition-colors"
              >
                Back
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 rounded-md shadow-sm">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-colors"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-colors"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-colors"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {isLogin ? 'Sign in' : 'Continue'}
              </button>
            </>
          )}
        </form>

        {step === 1 && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
