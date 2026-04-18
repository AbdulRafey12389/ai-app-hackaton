import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Dummy data for Explore feed
const MOCK_REQUESTS = [
  {
    id: 1,
    title: 'Need help optimizing React context for a large application',
    description: 'My app is suffering from unnecessary re-renders when context state changes. Looking for someone experienced in React performance optimization to pair program and help me structure my state better.',
    author: 'Alex Chen',
    location: 'San Francisco, CA (Remote ok)',
    category: 'Development',
    skills: ['React', 'Performance', 'JavaScript'],
    urgency: 'High',
    trustScore: 98,
    timeAgo: '2 hours ago',
    responses: 2
  },
  {
    id: 2,
    title: 'Review my UI/UX portfolio before applying for senior roles',
    description: 'I am transitioning from mid-level to senior product designer. I have 3 case studies ready but need critical feedback on the presentation and storytelling aspects.',
    author: 'Sarah Jenkins',
    location: 'London, UK (Remote ok)',
    category: 'Design',
    skills: ['Figma', 'UX Research', 'Portfolio'],
    urgency: 'Medium',
    trustScore: 85,
    timeAgo: '5 hours ago',
    responses: 5
  },
  {
    id: 3,
    title: 'MongoDB Aggregation Pipeline Optimization',
    description: 'I have a complex aggregation pipeline that takes over 5 seconds to run on a collection with 2 million documents. Need help creating the right compound indexes.',
    author: 'David Rodriguez',
    location: 'Remote',
    category: 'Database',
    skills: ['MongoDB', 'Backend', 'Performance'],
    urgency: 'High',
    trustScore: 92,
    timeAgo: '1 day ago',
    responses: 1
  },
  {
    id: 4,
    title: 'Need advice on negotiating my first tech startup offer',
    description: 'Just received an offer for a seed-stage startup as a founding engineer. Looking for someone who has navigated equity and base salary trade-offs before.',
    author: 'Mia Wong',
    location: 'New York, NY',
    category: 'Career',
    skills: ['Mentorship', 'Negotiation', 'Startups'],
    urgency: 'Low',
    trustScore: 78,
    timeAgo: '2 days ago',
    responses: 8
  }
];

const Explore = () => {
  const { requests } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || req.category === categoryFilter;
    const matchesUrgency = urgencyFilter === 'All' || req.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'P1': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'P3': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const hours = Math.floor((new Date() - date) / (1000 * 60 * 60));
      if (hours < 24) return `${hours || 1} hours ago`;
      return `${Math.floor(hours / 24)} days ago`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Requests</h1>
          <p className="text-muted-foreground">Find community members who need your expertise.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 font-semibold mb-4 pb-4 border-b border-border">
              <Filter className="w-4 h-4" /> Filters
            </div>
            
            <div className="space-y-5">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                <select 
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                  <option value="Career">Career Guidance</option>
                </select>
              </div>

              {/* Urgency Filter */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Urgency</label>
                <select 
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                >
                  <option value="All">Any Urgency</option>
                  <option value="P1">P1 (High)</option>
                  <option value="P2">P2 (Medium)</option>
                  <option value="P3">P3 (Low)</option>
                </select>
              </div>

              {/* Mock Location Filter */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Remote, San Francisco" 
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search by keywords, skills, or title..."
              className="block w-full pl-11 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Results Info */}
          <div className="text-sm text-muted-foreground flex justify-between items-center">
            <span>Showing {filteredRequests.length} results</span>
            <select className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer">
              <option>Most Recent</option>
              <option>Highest Trust Score</option>
              <option>Most Urgent</option>
            </select>
          </div>

          {/* Request Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <div key={req.id} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getUrgencyColor(req.urgency)}`}>
                          {req.urgency === 'P1' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {req.urgency} Urgency
                        </span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                          {req.category}
                        </span>
                      </div>
                      
                      <Link to={`/request/${req.id}`} className="text-xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer block">
                        {req.title}
                      </Link>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {req.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {req.skills.map(skill => (
                          <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/5 text-primary border border-primary/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta sidebar */}
                    <div className="md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-0 md:space-y-3">
                        <div className="flex items-center text-sm">
                          <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                          <span className="font-medium text-foreground mr-1">{req.trustScore}</span>
                          <span className="text-muted-foreground">Trust Score</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="truncate">{req.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatTime(req.timeAgo)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {req.helpers?.length || 0} responses
                        </div>
                      </div>

                      <button className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                        Offer Help <ArrowUpRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No requests found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setUrgencyFilter('All'); }}
                  className="mt-4 text-primary font-medium hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
