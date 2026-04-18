import { 
  Sparkles, 
  TrendingUp, 
  BarChart2, 
  AlertTriangle, 
  Lightbulb, 
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AICenter = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
          <BrainCircuit className="w-8 h-8 text-primary mr-3" />
          AI Insights Center
        </h1>
        <p className="text-muted-foreground">Real-time analysis of community trends, needs, and opportunities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights Panel */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Insight */}
          <div className="bg-gradient-to-br from-primary to-purple-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Sparkles className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> High Priority Insight
              </div>
              <h2 className="text-2xl font-bold mb-4 leading-tight">Critical shortage of Database Experts!</h2>
              <p className="text-white/80 mb-6 max-w-lg leading-relaxed">
                Over the last 48 hours, there has been a 300% spike in requests tagged with <span className="font-semibold text-white">MongoDB</span> and <span className="font-semibold text-white">PostgreSQL</span>. 
                Currently, 80% of these requests remain unanswered. If you have DB skills, the community needs you now.
              </p>
              <button className="bg-white text-primary px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors shadow-sm">
                View Database Requests
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trend Card 1 */}
            <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded flex items-center">
                  +42% <TrendingUp className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">React Server Components</h3>
              <p className="text-sm text-muted-foreground">
                Trending topic this week. Many users are migrating to Next.js App Router and need architectural guidance.
              </p>
            </div>

            {/* Trend Card 2 */}
            <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-red-500 bg-red-500/10 px-2 py-0.5 rounded flex items-center">
                  Slow
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">UI/UX Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Average resolution time for design feedback is currently 3 days. We need more active designers to balance the load.
              </p>
            </div>
          </div>

          {/* Simple Chart visualization mock */}
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-muted-foreground" /> Most Requested Skills
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'React', val: 85, color: 'bg-blue-500' },
                { name: 'Node.js', val: 65, color: 'bg-green-500' },
                { name: 'MongoDB', val: 50, color: 'bg-emerald-500' },
                { name: 'Figma', val: 40, color: 'bg-purple-500' },
                { name: 'AWS', val: 25, color: 'bg-orange-500' },
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.val} requests</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${skill.color} h-2 rounded-full`} style={{ width: `${skill.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" /> Recommendations for You
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold text-sm mb-1">Update your skills</h4>
                <p className="text-xs text-muted-foreground mb-3">Adding "Typescript" to your profile would match you with 15 new active requests.</p>
                <Link to="/profile" className="text-xs font-medium text-primary hover:underline flex items-center">
                  Go to Profile <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold text-sm mb-1">You're close to a badge!</h4>
                <p className="text-xs text-muted-foreground mb-3">Help 2 more people this week to unlock the "Active Mentor" badge.</p>
                <Link to="/explore" className="text-xs font-medium text-primary hover:underline flex items-center">
                  Find requests <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">How AI powers Helplytics</h3>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                <p><strong>Auto-Routing:</strong> Matches requests with the most qualified available users.</p>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                <p><strong>Trust Scoring:</strong> Analyzes interactions to detect genuinely helpful behavior.</p>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                <p><strong>Summarization:</strong> Boils down long problem descriptions into 2-sentence actionable briefs.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICenter;
