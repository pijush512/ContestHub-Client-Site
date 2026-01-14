// const StatsSection = () => {
//   const stats = [
//     { label: "Active Contests", value: "150+", icon: "🏆" },
//     { label: "Global Users", value: "12k+", icon: "👥" },
//     { label: "Total Prize Paid", value: "$45k", icon: "💰" },
//     { label: "Successful Submissions", value: "8k+", icon: "📩" },
//   ];
//   return (
//     <section className="py-16 bg-blue-600">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-11/12 mx-auto text-center">
//         {stats.map((item, index) => (
//           <div key={index} className="text-white">
//             <div className="text-4xl mb-2">{item.icon}</div>
//             <div className="text-3xl font-black">{item.value}</div>
//             <div className="text-blue-100 uppercase text-sm tracking-widest">{item.label}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default StatsSection




import React, { useEffect, useState } from 'react';

const StatsSection = () => {
  const [counts, setCounts] = useState({ totalUsers: 0, totalContests: 0, totalParticipation: 0 });

  useEffect(() => {
    // Replace with your actual base URL
    const fetchStats = async () => {
      const resContests = await fetch('http://localhost:3000/contest');
      const contests = await resContests.json();
      
      const resUsers = await fetch('http://localhost:3000/users'); // Ensure public or use admin token
      const users = await resUsers.json();

      const totalParticipants = contests.reduce((acc, curr) => acc + (curr.participantsCount || 0), 0);

      setCounts({
        totalContests: contests.length,
        totalUsers: users.length,
        totalParticipation: totalParticipants
      });
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Active Contests", value: counts.totalContests, icon: "🏆" },
    { label: "Global Creators", value: counts.totalUsers, icon: "👥" },
    { label: "Total Participants", value: counts.totalParticipation, icon: "🔥" },
    { label: "Prize Money", value: "$10k+", icon: "💰" },
  ];

  return (
    <section className="py-16 bg-blue-600">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-11/12 mx-auto text-center">
        {stats.map((item, index) => (
          <div key={index} className="text-white">
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-3xl font-black">{item.value}</div>
            <div className="text-blue-100 uppercase text-sm tracking-widest font-bold">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection