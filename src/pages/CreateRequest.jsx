import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Plus, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { addRequest } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'P3'
  });
  
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const autoAnalyze = () => {
    if (!formData.title && !formData.description) return;
    setIsAiAnalyzing(true);
    
    setTimeout(() => {
      const text = `${formData.title} ${formData.description}`.toLowerCase();
      let suggestedCategory = formData.category || 'Development';
      let suggestedTags = [];
      let suggestedUrgency = 'P3';

      if (text.includes('urgent') || text.includes('asap') || text.includes('production') || text.includes('critical')) {
        suggestedUrgency = 'P1';
      } else if (text.includes('soon') || text.includes('help') || text.includes('tomorrow')) {
        suggestedUrgency = 'P2';
      }

      if (text.includes('react') || text.includes('component')) {
        suggestedCategory = 'Development';
        suggestedTags = ['React', 'Frontend', 'JavaScript'];
      } else if (text.includes('database') || text.includes('sql') || text.includes('mongo')) {
        suggestedCategory = 'Database';
        suggestedTags = ['Database', 'Backend', 'Optimization'];
      } else if (text.includes('design') || text.includes('figma') || text.includes('ux')) {
        suggestedCategory = 'Design';
        suggestedTags = ['UI/UX', 'Figma', 'Design Systems'];
      } else {
        suggestedTags = ['General', 'Mentorship', 'Advice'];
      }

      setFormData(prev => ({ ...prev, category: suggestedCategory, urgency: suggestedUrgency }));
      setTags(suggestedTags);
      setIsAiAnalyzing(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      urgency: formData.urgency,
      skills: tags
    });
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create a Request</h1>
        <p className="text-muted-foreground">Describe your problem clearly to get the best help from the community.</p>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={autoAnalyze}
              disabled={isAiAnalyzing || (!formData.title && !formData.description)}
              className="inline-flex items-center text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isAiAnalyzing ? 'Analyzing with AI...' : 'Auto-Categorize & Tag'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">Title</label>
              <input
                id="title"
                type="text"
                required
                placeholder="e.g., Need help optimizing a complex MongoDB aggregation"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                id="description"
                required
                rows="6"
                placeholder="Describe what you're trying to achieve, what you've tried so far, and where you're stuck."
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  id="category"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Career">Career Guidance</option>
                </select>
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-foreground mb-2">Urgency</label>
                <select
                  id="urgency"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                >
                  <option value="P3">P3 (Low - Within a few days)</option>
                  <option value="P2">P2 (Medium - Within 24 hours)</option>
                  <option value="P1">P1 (High - ASAP)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags (Skills needed)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="e.g. Node.js, Typescript"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(e) }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-primary/70">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
              {tags.length === 0 && (
                <p className="text-sm text-muted-foreground flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" /> Add tags manually or let AI suggest them.
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium"
              >
                Post Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
