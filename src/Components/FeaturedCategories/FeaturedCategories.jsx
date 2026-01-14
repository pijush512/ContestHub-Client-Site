// import React from 'react';
// import { FaPalette, FaPenNib, FaBusinessTime, FaGamepad, FaCode, FaBullhorn } from 'react-icons/fa';

// const FeaturedCategories = () => {
//   const categories = [
//     {
//       id: 1,
//       name: "Image Design",
//       icon: <FaPalette />,
//       count: "45 Contests",
//       color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30",
//     },
//     {
//       id: 2,
//       name: "Article Writing",
//       icon: <FaPenNib />,
//       count: "32 Contests",
//       color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
//     },
//     {
//       id: 3,
//       name: "Business Idea",
//       icon: <FaBusinessTime />,
//       count: "20 Contests",
//       color: "bg-green-100 text-green-600 dark:bg-green-900/30",
//     },
//     {
//       id: 4,
//       name: "Gaming Review",
//       icon: <FaGamepad />,
//       count: "15 Contests",
//       color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
//     },
//     {
//       id: 5,
//       name: "Software Dev",
//       icon: <FaCode />,
//       count: "28 Contests",
//       color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30",
//     },
//     {
//       id: 6,
//       name: "Digital Marketing",
//       icon: <FaBullhorn />,
//       count: "12 Contests",
//       color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30",
//     },
//   ];

//   return (
//     <section className="py-20 bg-white dark:bg-gray-900">
//       <div className="w-11/12 mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
//           <div>
//             <h2 className="text-4xl font-black dark:text-white mb-2">Browse by Category</h2>
//             <p className="text-gray-500 dark:text-gray-400">Explore contests based on your specific skills and interests.</p>
//           </div>
//           <button className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:border-blue-600 rounded-full px-8">
//             View All Categories
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.map((cat) => (
//             <div 
//               key={cat.id} 
//               className="group p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
//             >
//               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110 duration-300 ${cat.color}`}>
//                 {cat.icon}
//               </div>
//               <h3 className="text-xl font-bold dark:text-white mb-2">{cat.name}</h3>
//               <p className="text-gray-500 dark:text-gray-400 font-medium">{cat.count}</p>
              
//               <div className="mt-6 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 Explore Contests <span className="ml-2">→</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCategories;


import { FaPalette, FaPenNib, FaBusinessTime, FaGamepad } from 'react-icons/fa';

const FeaturedCategories = () => {
  // Mapping based on your backend 'type' strings
  const categories = [
    { name: "Image Design", type: "image-design", icon: <FaPalette />, color: "bg-pink-100 text-pink-600" },
    { name: "Article Writing", type: "article-writing", icon: <FaPenNib />, color: "bg-blue-100 text-blue-600" },
    { name: "Business Idea", type: "business-idea", icon: <FaBusinessTime />, color: "bg-green-100 text-green-600" },
    { name: "Gaming Review", type: "gaming-review", icon: <FaGamepad />, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-black mb-12 dark:text-white">Explore by Skill</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group">
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold dark:text-white">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;