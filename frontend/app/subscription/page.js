"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/bar/Navbar";
import Homefooter from "../../components/footer/Homefooter";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://streamora-fullstack-movie-app.onrender.com/subscription")
      .then(res => res.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching subscriptions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow p-10">
        <h1 className="text-3xl font-extrabold mb-12 text-white drop-shadow-lg">
          Subscription Plans
        </h1>

        {subscriptions.length === 0 ? (
          <p className="text-gray-300 text-center text-lg">No subscription plans available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {subscriptions.map(sub => (
              <div
                key={sub.id}
                className="bg-linear-to-br from-purple-600 via-pink-600 to-red-900 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-96"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-3">{sub.planName}</h2>
                  <p className="text-lg text-gray-100 mb-2">{sub.price}</p>
                  <p className="text-gray-200 mb-1">{sub.quality}</p>
                  <p className="text-gray-200 mb-1">{sub.screens}</p>
                  <p className="text-gray-200">{sub.download}</p>
                </div>

                <p className={`mt-4 font-semibold text-lg ${sub.active ? "text-white" : "text-red-300"}`}>
                  {sub.active ? "Active" : "Inactive"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Homefooter />
    </div>
  );
}
