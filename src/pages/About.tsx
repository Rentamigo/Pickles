import React from 'react';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            For over three decades, PickleCo has been crafting premium pickles using time-honored 
            recipes and the finest ingredients. What started as a small family business has grown 
            into a trusted name in artisanal pickles.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">From Farm to Jar</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1985 by the Johnson family, PickleCo began as a small operation 
                in rural Ohio. Using cucumbers grown on their own farm and recipes passed 
                down through generations, they started selling pickles at local farmers markets.
              </p>
              <p className="text-gray-600 mb-4">
                Word spread quickly about the exceptional quality and unique flavors of our 
                pickles. What made us different was our commitment to using only natural 
                ingredients and traditional fermentation methods.
              </p>
              <p className="text-gray-600">
                Today, while we've grown significantly, we maintain the same dedication to 
                quality and craftsmanship that made us who we are. Every jar is still made 
                with love and attention to detail.
              </p>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/4113781/pexels-photo-4113781.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Pickle making process"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">We never compromise on the quality of our ingredients or processes.</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600">Every jar is crafted with care and attention to detail.</p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainable</h3>
              <p className="text-gray-600">We're committed to environmentally responsible practices.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Supporting local farmers and giving back to our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-green-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Mike Thompson</h3>
              <p className="text-green-600">Head of Production</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Lisa Chen</h3>
              <p className="text-green-600">Quality Control</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;