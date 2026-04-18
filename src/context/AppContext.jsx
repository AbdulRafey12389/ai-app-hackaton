import { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const INITIAL_REQUESTS = [
  {
    id: 1,
    title: 'Need help optimizing React context for a large application',
    description: "My app is suffering from unnecessary re-renders when context state changes. Looking for someone experienced in React performance optimization to pair program and help me structure my state better.",
    author: { name: 'Alex Chen', email: 'alex@example.com' },
    location: 'San Francisco, CA',
    category: 'Development',
    skills: ['React', 'Performance', 'JavaScript'],
    urgency: 'P1',
    status: 'Pending',
    timeAgo: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    trustScore: 98,
    helpers: []
  },
  {
    id: 2,
    title: 'Review my UI/UX portfolio before applying for senior roles',
    description: 'I am transitioning from mid-level to senior product designer. I have 3 case studies ready but need critical feedback on the presentation and storytelling aspects.',
    author: { name: 'Sarah Jenkins', email: 'sarah@example.com' },
    location: 'London, UK',
    category: 'Design',
    skills: ['Figma', 'UX Research', 'Portfolio'],
    urgency: 'P2',
    status: 'Pending',
    timeAgo: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    trustScore: 85,
    helpers: []
  },
  {
    id: 3,
    title: 'MongoDB Aggregation Pipeline Optimization',
    description: 'I have a complex aggregation pipeline that takes over 5 seconds to run. Need help creating the right compound indexes.',
    author: { name: 'David Rodriguez', email: 'david@example.com' },
    location: 'Remote',
    category: 'Database',
    skills: ['MongoDB', 'Backend', 'Performance'],
    urgency: 'P1',
    status: 'Completed',
    timeAgo: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    trustScore: 92,
    helpers: ['alex@example.com'] // Mock email of a helper
  }
];

const INITIAL_USERS = [
  { name: 'Dan Abramov', email: 'dan@example.com', contributions: 125, trustScore: 100 },
  { name: 'Sarah Drasner', email: 'sarah.d@example.com', contributions: 112, trustScore: 99 },
  { name: 'Mark Erikson', email: 'mark@example.com', contributions: 98, trustScore: 97 },
];

export const AppProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('helplytics_requests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      setRequests(INITIAL_REQUESTS);
      localStorage.setItem('helplytics_requests', JSON.stringify(INITIAL_REQUESTS));
    }

    const savedUsers = localStorage.getItem('helplytics_all_users');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      setAllUsers(INITIAL_USERS);
      localStorage.setItem('helplytics_all_users', JSON.stringify(INITIAL_USERS));
    }

    const savedUser = localStorage.getItem('helplytics_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      
      // Ensure current user is in allUsers
      if (!INITIAL_USERS.find(u => u.email === parsed.email)) {
        const usersList = savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
        if (!usersList.find(u => u.email === parsed.email)) {
          const updatedUsers = [...usersList, { ...parsed, contributions: 0, trustScore: 50 }];
          setAllUsers(updatedUsers);
          localStorage.setItem('helplytics_all_users', JSON.stringify(updatedUsers));
        }
      }
    }

    const handleAuthChange = () => {
      const u = localStorage.getItem('helplytics_user');
      setCurrentUser(u ? JSON.parse(u) : null);
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const addRequest = (newRequest) => {
    const request = {
      ...newRequest,
      id: Date.now(),
      status: 'Pending',
      timeAgo: new Date().toISOString(),
      helpers: [],
      author: {
        name: currentUser?.name || 'Anonymous',
        email: currentUser?.email || 'anon@example.com'
      },
      location: currentUser?.location || 'Remote',
      trustScore: calculateTrustScore(currentUser?.email)
    };
    
    const updated = [request, ...requests];
    setRequests(updated);
    localStorage.setItem('helplytics_requests', JSON.stringify(updated));
  };

  const updateRequestStatus = (id, newStatus) => {
    const updated = requests.map(req => {
      if (req.id === Number(id)) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    setRequests(updated);
    localStorage.setItem('helplytics_requests', JSON.stringify(updated));
    
    // Update user contributions if marked as Completed
    if (newStatus === 'Completed') {
      const req = requests.find(r => r.id === Number(id));
      if (req && req.helpers.length > 0) {
        updateContributions(req.helpers);
      }
    }
  };

  const offerHelp = (id) => {
    if (!currentUser) return;
    const updated = requests.map(req => {
      if (req.id === Number(id)) {
        // Add current user to helpers if not already there
        const helpers = req.helpers.includes(currentUser.email) 
          ? req.helpers 
          : [...req.helpers, currentUser.email];
        return { ...req, helpers, status: 'In Progress' };
      }
      return req;
    });
    setRequests(updated);
    localStorage.setItem('helplytics_requests', JSON.stringify(updated));
  };

  const updateContributions = (helperEmails) => {
    const updatedUsers = allUsers.map(u => {
      if (helperEmails.includes(u.email)) {
        return { ...u, contributions: (u.contributions || 0) + 1 };
      }
      return u;
    });
    setAllUsers(updatedUsers);
    localStorage.setItem('helplytics_all_users', JSON.stringify(updatedUsers));
  };

  const calculateTrustScore = (email) => {
    if (!email) return 50;
    const userStats = allUsers.find(u => u.email === email);
    if (userStats) return userStats.trustScore || Math.min(100, 50 + (userStats.contributions || 0) * 2);
    
    // Fallback recalculation
    const userCompleted = requests.filter(r => r.status === 'Completed' && r.helpers.includes(email));
    return Math.min(100, 50 + userCompleted.length * 5); // Base 50, +5 per completion
  };

  return (
    <AppContext.Provider value={{
      requests,
      allUsers,
      currentUser,
      addRequest,
      updateRequestStatus,
      offerHelp,
      calculateTrustScore
    }}>
      {children}
    </AppContext.Provider>
  );
};
