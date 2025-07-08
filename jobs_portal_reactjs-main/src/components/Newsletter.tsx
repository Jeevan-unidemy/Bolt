import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <Mail className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Job Opportunity
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest job openings, career tips, and industry insights delivered straight to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-white">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-lg font-semibold">Successfully subscribed!</span>
            </div>
          )}

          <p className="text-blue-200 text-sm mt-4">
            Join 50,000+ professionals already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;