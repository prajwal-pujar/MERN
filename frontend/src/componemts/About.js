import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    // Add fade-in animation when component mounts
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 200); // Staggered animation
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-8 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold fade-in">About ChatSphere</h1>
          <p className="mt-3 text-lg md:text-xl fade-in">Your gateway to effortless communication</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto py-12 px-4 md:px-0">
        <section className="max-w-3xl mx-auto text-center fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-4">Our Story</h2>
          <p className="text-base md:text-lg leading-relaxed">
          We$Chat was born out of a simple idea: to make conversations easy, secure, and fun. Since our launch in 2023, we’ve been dedicated to building a chat platform that connects people worldwide with speed and simplicity. Whether it’s a quick hello or a deep discussion, we’re here to power your connections.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow fade-in">
            <h3 className="text-xl font-bold text-indigo-600">Real-Time Chats</h3>
            <p className="mt-2 text-gray-600">
              Messages delivered instantly, keeping you in sync with those who matter most.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow fade-in">
            <h3 className="text-xl font-bold text-indigo-600">Secure & Private</h3>
            <p className="mt-2 text-gray-600">
              End-to-end encryption ensures your conversations stay between you and your contacts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow fade-in">
            <h3 className="text-xl font-bold text-indigo-600">Customizable Experience</h3>
            <p className="mt-2 text-gray-600">
              Personalize your app with themes, emojis, and more to make it truly yours.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-700 text-black py-4 text-center">
        <p className="text-sm fade-in">© 2025 ChatSphere. Built with ❤️ for the world.</p>
      </footer>

      {/* Inline Styles for Animation */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default About;
