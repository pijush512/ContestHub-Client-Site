import { FaPalette, FaPenNib, FaBusinessTime, FaGamepad } from 'react-icons/fa';

const FeaturedCategories = () => {
  const categories = [
    {
      name: "Image Design",
      type: "image-design",
      icon: <FaPalette />,
      color: "from-pink-500 to-rose-500",
      lightBg: "bg-pink-50 dark:bg-pink-900/10"
    },
    {
      name: "Article Writing",
      type: "article-writing",
      icon: <FaPenNib />,
      color: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      name: "Business Idea",
      type: "business-idea",
      icon: <FaBusinessTime />,
      color: "from-green-500 to-emerald-500",
      lightBg: "bg-green-50 dark:bg-green-900/10"
    },
    {
      name: "Gaming Review",
      type: "gaming-review",
      icon: <FaGamepad />,
      color: "from-purple-500 to-violet-500",
      lightBg: "bg-purple-50 dark:bg-purple-900/10"
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Explore by <span className="text-blue-600">Skill</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Choose your domain and show your talent to the world</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`group relative p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 ${cat.lightBg} hover:bg-white dark:hover:bg-gray-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center cursor-pointer`}
            >
              <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${cat.color} text-white text-3xl flex items-center justify-center mb-6 shadow-lg transform group-hover:-translate-y-2 group-hover:rotate-[10deg] transition-all duration-300`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>

              <div className="mt-4 flex items-center justify-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Browse Contests <span className="ml-2">→</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-gray-200 to-transparent dark:from-gray-800 opacity-10 rounded-full -z-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;