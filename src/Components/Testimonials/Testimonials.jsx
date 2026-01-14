const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Arif Rahman",
      role: "Graphic Designer",
      review: "Winning a contest on this platform changed my career path. The payment system is incredibly transparent!",
      image: "https://i.ibb.co/5GzXkwV/user1.jpg"
    },
    {
      id: 2,
      name: "Sadia Islam",
      role: "Content Writer",
      review: "I participated in three writing contests and won two of them. It has been an amazing experience!",
      image: "https://i.ibb.co/3Y8Nf6r/user2.jpg"
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      role: "Gamer",
      review: "The gaming review contests were great. Got paid on time and received excellent support from the team.",
      image: "https://i.ibb.co/MgsL6zW/user3.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/40">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-black text-center mb-12 dark:text-white">What Our Winners Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img src={rev.image} alt={rev.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{rev.name}</h3>
                  <p className="text-blue-600 text-sm">{rev.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">"{rev.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials