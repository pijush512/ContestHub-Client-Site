import React, { useEffect, useState } from 'react';
import { FaTrophy, FaUsers, FaFire, FaDollarSign } from 'react-icons/fa';

const StatsSection = () => {
  const [counts, setCounts] = useState({ totalUsers: 0, totalContests: 0, totalParticipation: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resContests = await fetch('http://localhost:3000/contest');
        const contests = await resContests.json();

        const resUsers = await fetch('http://localhost:3000/users');
        const users = await resUsers.json();

        const totalParticipants = contests.reduce((acc, curr) => acc + (curr.participantsCount || 0), 0);

        setCounts({
          totalContests: contests.length,
          totalUsers: users.length,
          totalParticipation: totalParticipants
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Active Contests", value: counts.totalContests, icon: <FaTrophy />, color: "text-blue-600" },
    { label: "Global Creators", value: counts.totalUsers, icon: <FaUsers />, color: "text-blue-600" },
    { label: "Total Participants", value: counts.totalParticipation, icon: <FaFire />, color: "text-blue-600" },
    { label: "Prize Money", value: "$10k+", icon: <FaDollarSign />, color: "text-blue-600" },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Our Platform <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              By The Numbers
            </span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-medium">
            Join thousands of creators and participate in contests to showcase your talent.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className={`text-3xl mb-4 flex justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                {item.value}
              </div>
              <div className="mt-2 text-gray-500 dark:text-gray-400 uppercase text-[10px] tracking-[0.15em] font-black">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;