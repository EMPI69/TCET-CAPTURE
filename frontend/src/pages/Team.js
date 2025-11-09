import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

const Team = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
    // Scroll to team section after navigation
    setTimeout(() => {
      const teamSection = document.getElementById('team-section');
      if (teamSection) {
        const yOffset = -80; // Offset for navbar
        const y = teamSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  };

  useEffect(() => {
    // Always scroll to top when component mounts or when year param changes
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    fetchTeams();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchParams]);

  useEffect(() => {
    // Check if a year is specified in URL params
    const yearParam = searchParams.get('year');
    if (yearParam && teams.length > 0) {
      const teamExists = teams.find(team => team.year === yearParam);
      if (teamExists) {
        setSelectedYear(yearParam);
        // Ensure page is at top when team is selected
        window.scrollTo(0, 0);
      }
    }
  }, [searchParams, teams]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/teams`
      );
      setTeams(response.data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const years = teams.map(team => team.year);
  const selectedTeam = teams.find(team => team.year === selectedYear);

  const nextYear = () => {
    if (years.length > 0) {
      setCurrentYearIndex((prev) => (prev + 1) % years.length);
    }
  };

  const prevYear = () => {
    if (years.length > 0) {
      setCurrentYearIndex((prev) => (prev - 1 + years.length) % years.length);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar isScrolled={isScrolled} />

      {/* Team Section */}
      <section className="min-h-screen pt-24 px-4 pb-20">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-white text-xl">Loading teams...</div>
            </div>
          ) : teams.length === 0 ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-white text-xl">No teams found.</div>
            </div>
          ) : selectedYear && selectedTeam ? (
            // Show selected team's leads
            <div className="py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto"
              >
                {/* Back Button */}
                <motion.button
                  onClick={handleBackToHome}
                  className="mb-8 flex items-center space-x-2 text-white px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all shadow-lg font-semibold backdrop-blur-md border border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FiArrowLeft size={20} />
                  <span>Back to Team Section</span>
                </motion.button>
                
                <div className="mb-8 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {selectedYear}
                  </h2>
                  {selectedTeam.teamPhoto && (
                    <div className="w-full max-w-4xl mx-auto mb-6 flex justify-center">
                      <img
                        src={selectedTeam.teamPhoto}
                        alt={`Team ${selectedYear}`}
                        className="w-full max-w-full h-auto object-contain rounded-lg shadow-lg"
                        style={{ maxHeight: '600px' }}
                      />
                    </div>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {selectedTeam.leads?.map((lead, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={lead.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'}
                        alt={lead.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="text-xl font-bold text-gray-800">{lead.name}</h3>
                      <p className="text-red-orange-500">{lead.role}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            // Show all teams for browsing
            <div className="py-20">
              <div className="relative">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={prevYear}
                    className="text-4xl text-white hover:text-red-orange-500 transition-colors"
                  >
                    ←
                  </button>

                  <motion.div
                    key={currentYearIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex-1 max-w-2xl"
                  >
                    <div
                      className="holographic-card cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: '#f3f3f3', height: '500px', width: '100%' }}
                      onClick={() => setSelectedYear(years[currentYearIndex])}
                    >
                      <div className="w-full h-full flex items-center justify-center relative" style={{ height: '100%', width: '100%' }}>
                        <img
                          src={teams[currentYearIndex]?.teamPhoto || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'}
                          alt={`Team ${years[currentYearIndex]}`}
                          className="w-full h-full object-contain"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)' }}>
                          <h3 className="text-2xl font-bold text-white">
                            {years[currentYearIndex]}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <button
                    onClick={nextYear}
                    className="text-4xl text-white hover:text-red-orange-500 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;

