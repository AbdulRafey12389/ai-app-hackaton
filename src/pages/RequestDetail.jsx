import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  UserPlus,
  MessageSquare,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const RequestDetail = () => {
  const { id } = useParams();
  const { requests, currentUser, updateRequestStatus, offerHelp } = useApp();
  
  const request = requests.find(r => r.id === Number(id));
  const hasOfferedHelp = request?.helpers?.includes(currentUser?.email);

  if (!request) return <div className="text-center py-20">Request not found.</div>;

  const handleOfferHelp = () => {
    offerHelp(request.id);
  };

  const handleMarkAsSolved = () => {
    updateRequestStatus(request.id, 'Completed');
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'P1': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'P2': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'P3': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending': return <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-semibold border border-green-200 dark:border-green-800">Pending</span>;
      case 'In Progress': return <span className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-sm font-semibold border border-orange-200 dark:border-orange-800">In Progress</span>;
      case 'Completed': return <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full text-sm font-semibold border border-gray-200 dark:border-gray-700">Completed</span>;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* Main Content (Left) */}
        <div className="flex-1 space-y-6">
          <div className="bg-background border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {getStatusBadge(request.status)}
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(request.urgency)}`}>
                {request.urgency === 'P1' && <AlertCircle className="w-3 h-3 mr-1" />}
                {request.urgency} Urgency
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {request.category}
              </span>
              <span className="text-sm text-muted-foreground ml-auto flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {request.timeAgo}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {request.title}
            </h1>

            {/* AI Summary Section */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-8 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-primary mb-2 flex items-center ml-2">
                AI Summary
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed ml-2">
                The user is experiencing severe performance issues in a large React application caused by unnecessary re-renders tied to Context API state updates. They are seeking architectural advice to either optimize the existing Context structure (using useMemo/useCallback) or migrate to a dedicated state management library like Zustand or Redux.
              </p>
            </div>

            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/90 whitespace-pre-line">
              {request.description}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Required Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {request.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-secondary text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {currentUser?.email !== request.author.email && !hasOfferedHelp && request.status !== 'Completed' && (
                <button 
                  onClick={handleOfferHelp}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  I Can Help
                </button>
              )}
              
              {currentUser?.email === request.author.email && request.status !== 'Completed' && (
                <button 
                  onClick={handleMarkAsSolved}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Solved
                </button>
              )}
              
              {request.status === 'Completed' && (
                <div className="w-full sm:w-auto inline-flex items-center px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium border border-border">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  This request has been resolved
                </div>
              )}
              
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-lg border border-border bg-background hover:bg-muted text-foreground">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discuss
              </button>
              
              <button className="w-full sm:w-auto inline-flex items-center justify-center p-3 text-sm font-medium transition-colors rounded-lg border border-border bg-background hover:bg-muted text-foreground sm:ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Author Card */}
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Requested by</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
                {request.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{request.author.name}</h4>
                <p className="text-sm text-muted-foreground">{request.author.email}</p>
                <div className="flex items-center mt-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-500 mr-1" />
                  <span className="font-medium">{request.trustScore}</span>
                  <span className="text-muted-foreground ml-1">Trust Score</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span className="truncate">{request.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Helpers List */}
          <div className="bg-gradient-to-b from-primary/5 to-background border border-primary/20 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Active Helpers</h3>
            </div>
            
            {request.helpers.length > 0 ? (
              <div className="space-y-4">
                {request.helpers.map((email, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {email.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium">{email}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No helpers yet. Be the first to offer help!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestDetail;
