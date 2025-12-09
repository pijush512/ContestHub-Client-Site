import React from "react";

const WinnerAdsSection = () => {
  return (
    <div className="bg-yellow-100 py-20 mt-16">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-yellow-700">
          Congratulations To Our Recent Winners!
        </h2>

        <p className="text-lg mb-10 text-gray-700">
          See how contestants achieved success — You can be the next champion!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/9ZcVt9b/trophy.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">10+ Recent Winners</h3>
            <p className="text-gray-500 mt-2">We celebrate success every day!</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/XbV8NJL/winner.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">৳50,000+ Prize Money</h3>
            <p className="text-gray-500 mt-2">Earn rewards by participating.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <img
              src="https://i.ibb.co/NYcCHqv/medal.png"
              className="h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">100+ Total Winners</h3>
            <p className="text-gray-500 mt-2">Join and become one of them!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdsSection;
