import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 99999 99999", "+91 88888 88888"],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@acharibliss.com", "orders@acharibliss.com"],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Spice Street", "Mumbai, Maharashtra 400001"],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Order Support",
    "Bulk Orders",
    "Partnership",
    "Feedback",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-turmeric-50 via-white to-turmeric-50 pt-16">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-achari-50 text-achari-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-earthy-900 mb-6 font-serif">
            Contact <span className="text-achari-600">Achari Bliss</span>
          </h1>
          <p className="text-xl text-earthy-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our pickles? Want to place a bulk order? We'd love to hear from you! 
            Our team is here to help with all your pickle needs.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 border border-turmeric-100"
              >
                <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="text-lg font-bold text-earthy-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-earthy-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-card p-8 border border-turmeric-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-earthy-900 mb-4 font-serif">Send us a Message</h2>
                <p className="text-earthy-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-earthy-900 mb-2">Message Sent!</h3>
                  <p className="text-earthy-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-earthy-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-earthy-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-earthy-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-earthy-900 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300"
                        required
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-earthy-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-4 border-2 border-turmeric-200 rounded-xl focus:ring-2 focus:ring-achari-500 focus:border-achari-500 transition-all duration-300 resize-none"
                      required
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-achari-500 to-achari-600 hover:from-achari-600 hover:to-achari-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl shadow-card p-8 border border-turmeric-100">
                <h3 className="text-2xl font-bold text-earthy-900 mb-6 font-serif">Find Us</h3>
                <div className="bg-gradient-to-br from-turmeric-100 to-achari-100 rounded-2xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-achari-600 mx-auto mb-4" />
                    <p className="text-earthy-700 font-medium">Interactive Map</p>
                    <p className="text-earthy-600 text-sm">123 Spice Street, Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-3xl shadow-card p-8 border border-turmeric-100">
                <h3 className="text-2xl font-bold text-earthy-900 mb-6 font-serif">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/919999999999?text=Hi, I'd like to get in touch with Achari Bliss."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-earthy-900">WhatsApp Chat</div>
                      <div className="text-earthy-600 text-sm">Get instant responses</div>
                    </div>
                  </a>

                  <a
                    href="tel:+919999999999"
                    className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-earthy-900">Call Now</div>
                      <div className="text-earthy-600 text-sm">+91 99999 99999</div>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@acharibliss.com"
                    className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-earthy-900">Email Us</div>
                      <div className="text-earthy-600 text-sm">hello@acharibliss.com</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl shadow-card p-8 border border-turmeric-100">
                <h3 className="text-2xl font-bold text-earthy-900 mb-6 font-serif">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-turmeric-50 to-achari-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earthy-900 mb-4 font-serif">
              Frequently Asked <span className="text-achari-600">Questions</span>
            </h2>
            <p className="text-earthy-600 text-lg">
              Quick answers to common questions about our pickles and services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long do your pickles last?",
                answer: "Our pickles have a shelf life of 12 months when stored properly in a cool, dry place. Once opened, consume within 3 months for best taste."
              },
              {
                question: "Do you use any preservatives?",
                answer: "No, we use traditional methods with mustard oil and natural spices. No artificial preservatives or chemicals are added to our pickles."
              },
              {
                question: "Can I place bulk orders for events?",
                answer: "Yes! We offer special pricing for bulk orders. Contact us at least 7 days in advance for orders above 50 jars."
              },
              {
                question: "What are your delivery charges?",
                answer: "Free delivery on orders above ₹500. For orders below ₹500, delivery charges are ₹50 across India."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-bold text-earthy-900 mb-3">{faq.question}</h3>
                <p className="text-earthy-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;