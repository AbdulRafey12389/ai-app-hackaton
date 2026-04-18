import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Award, 
  Star, 
  Activity,
  Edit
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { requests, currentUser, calculateTrustScore } = useApp();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('helplytics_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  if (!user) return null;

  const userRequests = requests.filter(r => r.author.email === user.email);
  const solvedCount = userRequests.filter(r => r.status === 'Completed').length;
  
  const trustScore = calculateTrustScore(user.email);
  const contributions = currentUser?.contributions || 0;
  const points = contributions * 50 + solvedCount * 10;
  const badge = trustScore >= 95 ? 'Gold' : trustScore >= 80 ? 'Silver' : 'Bronze';

  const stats = {
    trustScore,
    contributions,
    points,
    badge
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-purple-500/20"></div>
            
            <div className="relative pt-12 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-lg flex items-center justify-center mb-4">
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-foreground">{user.name || 'Anonymous User'}</h1>
              <p className="text-sm text-muted-foreground mb-4">{user.role === 'both' ? 'Learner & Helper' : user.role === 'can_help' ? 'Helper' : 'Learner'}</p>
              
              <div className="flex flex-col gap-2 w-full text-sm text-muted-foreground mt-2">
                {user.location && (
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" /> {user.location}
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" /> {user.email}
                  </div>
                )}
              </div>

              <button className="w-full mt-6 flex justify-center items-center py-2 px-4 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                <Edit className="w-4 h-4 mr-2" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-6 shadow-sm text-center">
            <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-full mb-3 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg mb-1">Trust Score</h2>
            <div className="text-5xl font-extrabold text-foreground mb-2 break-words">{stats.trustScore}<span className="text-xl text-muted-foreground font-normal">/100</span></div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on {stats.contributions} successful interactions and peer reviews.
            </p>
          </div>
        </div>

        {/* Right Column: Skills & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2 font-medium">
                <Activity className="w-5 h-5 text-blue-500" /> Contributions
              </div>
              <div className="text-3xl font-bold">{stats.contributions}</div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2 font-medium">
                <Star className="w-5 h-5 text-yellow-500" /> Total Points
              </div>
              <div className="text-3xl font-bold">{stats.points}</div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2 font-medium">
                <Award className="w-5 h-5 text-gray-400" /> Current Badge
              </div>
              <div className="text-3xl font-bold">{stats.badge}</div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Skills & Expertise</h2>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            )}
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Interests & Learning Goals</h2>
            {user.interests && user.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border">
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No interests added yet.</p>
            )}
          </div>

          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <h2 className="text-lg font-bold p-6 pb-4">Recent Activity</h2>
            <div className="divide-y divide-border">
              <div className="p-6 hover:bg-muted/30 transition-colors">
                <p className="text-sm text-foreground"><span className="font-medium">You</span> answered a request: <span className="text-primary cursor-pointer hover:underline">"How to use React Context effectively?"</span></p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago • Earned +50 points</p>
              </div>
              <div className="p-6 hover:bg-muted/30 transition-colors">
                <p className="text-sm text-foreground"><span className="font-medium">You</span> posted a request: <span className="text-primary cursor-pointer hover:underline">"Review my portfolio"</span></p>
                <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
