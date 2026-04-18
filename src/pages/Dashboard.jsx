import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Clock, 
  MessageSquare, 
  PlusCircle, 
  Search, 
  TrendingUp, 
  ShieldCheck,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { requests, currentUser } = useApp();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      const savedUser = localStorage.getItem('helplytics_user');
      if (!savedUser) navigate('/auth');
    }
  }, [currentUser, navigate]);

  if (!user) return null;

  const userRequests = requests.filter(req => req.author.email === user.email);
  const activeRequestsCount = userRequests.filter(req => req.status !== 'Completed').length;
  const userContributions = currentUser?.contributions || 0;
  
  // Format timeAgo properly if it's an ISO string
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name?.split(' ')[0] || 'User'}</h1>
          <p className="text-muted-foreground mt-1">Here is what is happening with your requests today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/explore" className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors rounded-lg border border-border bg-background hover:bg-muted text-foreground">
            <Search className="w-4 h-4 mr-2" /> Browse
          </Link>
          <Link to="/create-request" className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
            <PlusCircle className="w-4 h-4 mr-2" /> New Request
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Total Contributions</h3>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold">{userContributions}</div>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="w-3 h-3 mr-1" /> +1 this week
          </p>
        </div>

        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Active Requests</h3>
            <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold">{activeRequestsCount}</div>
          <p className="text-sm text-muted-foreground mt-2">
            Waiting for resolution
          </p>
        </div>

        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Hours Volunteered</h3>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold">18.5</div>
          <p className="text-sm text-muted-foreground mt-2">
            Top 15% of community
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests List */}
        <div className="lg:col-span-2">
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-lg">Your Recent Activity</h2>
              <Link to="/explore" className="text-sm font-medium text-primary hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-border">
              {userRequests.length > 0 ? userRequests.slice(0, 5).map((request) => (
                <Link to={`/request/${request.id}`} key={request.id} className="block p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-3 sm:gap-0">
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors pr-2">{request.title}</h3>
                    <div className="flex items-center self-start">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3
                        ${request.status === 'Pending' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          request.status === 'In Progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {request.status}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3 mt-3">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" /> {formatTime(request.timeAgo)}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-3.5 h-3.5 mr-1" /> {request.helpers?.length || 0} helpers
                    </span>
                    <span className="flex items-center text-primary font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Trust Score: {request.trustScore}
                    </span>
                  </div>
                </Link>
              )) : (
                <div className="p-6 text-center text-muted-foreground">You haven't posted any requests yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/create-request" className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="flex items-center font-medium text-sm">
                  <PlusCircle className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" /> 
                  Post a Help Request
                </div>
              </Link>
              <Link to="/explore" className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="flex items-center font-medium text-sm">
                  <Search className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" /> 
                  Find Requests to Help
                </div>
              </Link>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="flex items-center font-medium text-sm">
                  <MessageSquare className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary" /> 
                  Check Messages
                </div>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">2</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-semibold text-lg">Trust Score</h2>
            </div>
            <div className="text-4xl font-bold text-foreground mb-2">{currentUser?.trustScore || 50}<span className="text-lg text-muted-foreground font-normal">/100</span></div>
            <p className="text-sm text-muted-foreground">
              Your trust score is excellent! Continue helping others to maintain your Top Contributor badge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
