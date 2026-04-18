import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Sparkles, Plus, X, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('helplytics_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setFormData(prev => ({ ...prev, name: parsed.name || '' }));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (item) => {
    setInterests(interests.filter(i => i !== item));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (item) => {
    setSkills(skills.filter(s => s !== item));
  };

  const addAiSuggestion = (suggestion) => {
    if (!skills.includes(suggestion)) {
      setSkills([...skills, suggestion]);
    }
    setAiSuggestions(aiSuggestions.filter(s => s !== suggestion));
  };

  const generateAiSuggestions = () => {
    setIsGenerating(true);
    // Mock AI delay
    setTimeout(() => {
      const newSuggestions = [];
      const lowerInterests = interests.map(i => i.toLowerCase());
      
      if (lowerInterests.some(i => i.includes('react') || i.includes('web'))) {
        newSuggestions.push('Frontend Development', 'JavaScript', 'CSS');
      }
      if (lowerInterests.some(i => i.includes('node') || i.includes('backend'))) {
        newSuggestions.push('API Design', 'Database Management');
      }
      if (lowerInterests.some(i => i.includes('design') || i.includes('ui'))) {
        newSuggestions.push('Figma', 'User Research');
      }
      
      // Default suggestions if no specific matches
      if (newSuggestions.length === 0) {
        newSuggestions.push('Technical Writing', 'Mentorship', 'Project Management');
      }

      // Filter out already added skills
      const filtered = newSuggestions.filter(s => !skills.includes(s));
      setAiSuggestions(filtered);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name,
      location: formData.location,
      interests,
      skills,
      isOnboarded: true
    };
    localStorage.setItem('helplytics_user', JSON.stringify(updatedUser));
    // Redirect to home/dashboard
    navigate('/dashboard');
    // Trigger custom event so Navbar can update
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-background border border-border/50 p-8 sm:p-10 rounded-3xl shadow-xl shadow-primary/5">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Complete your profile</h2>
          <p className="mt-2 text-muted-foreground">
            Tell us a bit more about yourself so we can connect you with the right people.
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Display Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  id="location"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              What are you interested in learning or getting help with?
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. React, UI Design, Marketing..."
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddInterest(e) }}
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                  {item}
                  <button type="button" onClick={() => handleRemoveInterest(item)} className="ml-2 hover:text-foreground">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-foreground">
                What skills can you offer to others?
              </label>
              <button
                type="button"
                onClick={generateAiSuggestions}
                disabled={isGenerating || interests.length === 0}
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 disabled:opacity-50 transition-colors"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {isGenerating ? 'Analyzing...' : 'AI Suggestion'}
              </button>
            </div>
            
            {aiSuggestions.length > 0 && (
              <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-primary uppercase tracking-wider mr-2 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> Suggested:
                </span>
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addAiSuggestion(suggestion)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="w-3 h-3 mr-1" /> {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. JavaScript, Mentorship, Writing..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(e) }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  {item}
                  <button type="button" onClick={() => handleRemoveSkill(item)} className="ml-2 hover:text-primary/70">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
