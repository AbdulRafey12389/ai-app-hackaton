import { Trophy, Medal, Star, ShieldCheck, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Leaderboard = () => {
  const { allUsers } = useApp();

  const sortedLeaders = [...allUsers]
    .sort((a, b) => (b.contributions || 0) - (a.contributions || 0))
    .map((user, index) => {
      const trust = user.trustScore || 50;
      return {
        id: index,
        name: user.name || 'Anonymous',
        score: (user.contributions || 0) * 50,
        trust,
        badge: trust >= 95 ? 'Gold' : trust >= 80 ? 'Silver' : 'Bronze',
        rank: index + 1,
        avatar: (user.name || 'U').charAt(0).toUpperCase(),
        trend: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'same' : 'down'
      };
    });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            Community Leaderboard
          </h1>
          <p className="text-muted-foreground">Recognizing our most helpful and trusted community members.</p>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
          <button className="px-4 py-1.5 text-sm font-medium bg-background shadow-sm rounded-md border border-border">This Week</button>
          <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">All Time</button>
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto pb-2">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4 text-center">Badge</th>
                <th className="px-6 py-4">Trust Score</th>
                <th className="px-6 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedLeaders.map((leader, index) => (
                <tr key={leader.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold w-6 text-center ${index < 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {leader.rank}
                      </span>
                      {leader.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {leader.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                      {leader.trend === 'same' && <div className="w-4 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-sm
                        ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-primary'}`}>
                        {leader.avatar}
                      </div>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                        {leader.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {leader.badge === 'Gold' && <Medal className="w-6 h-6 text-yellow-500 drop-shadow-sm" />}
                      {leader.badge === 'Silver' && <Medal className="w-6 h-6 text-gray-400 drop-shadow-sm" />}
                      {leader.badge === 'Bronze' && <Medal className="w-6 h-6 text-amber-700 drop-shadow-sm" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <ShieldCheck className="w-4 h-4 text-green-500 mr-2" />
                      <span className="font-medium">{leader.trust}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end font-bold text-primary">
                      {leader.score.toLocaleString()} <Star className="w-4 h-4 ml-1 opacity-50" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
