import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import FacultySection from '../components/FacultySection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 500);
      setShowWelcome(scrollPosition < 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const welcomeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const welcomeY = useTransform(scrollY, [0, 400], [0, -100]);
  const mainContentOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const mainContentY = useTransform(scrollY, [300, 500], [100, 0]);

  return (
    <div className="min-h-screen">
      {/* Welcome Screen - Full Screen Background (Initial View) */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 z-50 flex items-center justify-center"
        style={{
          opacity: welcomeOpacity,
          pointerEvents: showWelcome ? 'auto' : 'none',
        }}
      >
        {/* Blurred background image */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://cdn.bio.link/uploads/profile_pictures/2023-10-06/IWyuyLz8EahJPxI2IWh9L8vdQkIYVjJZ.png)',
            backgroundSize: '60%',
            filter: 'blur(4px)',
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/50 to-gray-800/50" />
        <div className="relative z-10">
          <WelcomeText />
        </div>
      </motion.div>

      {/* Main Content - Starts below viewport, appears on scroll */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800" style={{ minHeight: '200vh' }}>
        {/* Spacer to push content below viewport initially */}
        <div style={{ height: '100vh' }}></div>

        {/* Navbar - Only visible after scrolling past welcome */}
        <motion.div
          style={{
            opacity: mainContentOpacity,
          }}
        >
          <Navbar isScrolled={isScrolled} />
        </motion.div>

        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center pt-20 px-4 pb-0"
          style={{
            opacity: mainContentOpacity,
            y: mainContentY,
          }}
        >
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Tagline */}
            <div className="text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Capturing the Spirit of TCET.
              </h2>
              <Link
                to="/gallery"
                className="inline-block mt-8 bg-red-orange-500 text-white px-8 py-3 rounded-lg hover:bg-red-orange-600 transition-colors text-lg font-semibold"
              >
                View Gallery
              </Link>
            </div>

            {/* Right Side - Image Slider */}
            <div>
              <ImageSlider />
            </div>
          </div>
        </motion.section>

        {/* Power Behind The Picture Section */}
        <FacultySection />

        {/* Team Section */}
        <TeamSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

const WelcomeText = () => {
  const text1 = "Welcome to";
  const text2 = "TCET Capture.";
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [characterColors, setCharacterColors] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const characterRefs = useRef({});
  const containerRef = useRef(null);
  const radius = 60; // Reduced radius in pixels for color change
  const darkRed = '#990000'; // Dark red color

  // Split texts into characters, preserving spaces
  const characters1 = text1.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: index,
    isSpace: char === ' ',
  }));
  
  const characters2 = text2.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: index + characters1.length, // Offset index for second line
    isSpace: char === ' ',
  }));
  
  const allCharacters = [...characters1, ...characters2];

  // Track mouse movement and update character colors
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        setMousePosition({ x: mouseX, y: mouseY });

        // Calculate colors for all characters
        const newColors = {};
        const containerRect = containerRef.current.getBoundingClientRect();
        
        allCharacters.forEach((char, index) => {
          if (char.isSpace || !characterRefs.current[index]) {
            newColors[index] = { color: '#ffffff', blur: 0 };
            return;
          }

          const charRect = characterRefs.current[index].getBoundingClientRect();
          
          // Get character center position relative to container
          const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
          const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

          // Calculate distance from mouse to character center
          const distance = Math.sqrt(
            Math.pow(mouseX - charCenterX, 2) + 
            Math.pow(mouseY - charCenterY, 2)
          );

          // Calculate blur based on distance (more blur closer to cursor)
          if (distance <= radius) {
            const blurAmount = Math.max(0, (radius - distance) / radius * 5); // Max 5px blur
            newColors[index] = { color: darkRed, blur: blurAmount };
          } else {
            newColors[index] = { color: '#ffffff', blur: 0 };
          }
        });

        setCharacterColors(newColors);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [allCharacters]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
    // Reset all colors to white
    const resetColors = {};
    allCharacters.forEach((_, index) => {
      resetColors[index] = { color: '#ffffff', blur: 0 };
    });
    setCharacterColors(resetColors);
  };

  return (
    <div 
      ref={containerRef}
      className="text-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="text-6xl md:text-8xl font-bold text-white mb-4"
        initial={{ opacity: 0.3, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0.3, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* First line: "Welcome to" */}
        <div className="flex flex-wrap justify-center items-center mb-2">
          {characters1.map(({ char, index, isSpace }) => (
            <motion.span
              key={index}
              ref={(el) => {
                if (el) characterRefs.current[index] = el;
              }}
              className={`inline-block ${isSpace ? 'w-2 md:w-4' : ''}`}
              animate={{
                color: characterColors[index]?.color || '#ffffff',
              }}
              style={{
                display: 'inline-block',
                filter: `blur(${characterColors[index]?.blur || 0}px)`,
                transition: 'filter 0.2s ease-out',
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        {/* Second line: "TCET Capture." */}
        <div className="flex flex-wrap justify-center items-center">
          {characters2.map(({ char, index, isSpace }) => (
            <motion.span
              key={index}
              ref={(el) => {
                if (el) characterRefs.current[index] = el;
              }}
              className={`inline-block ${isSpace ? 'w-2 md:w-4' : ''}`}
              animate={{
                color: characterColors[index]?.color || '#ffffff',
              }}
              style={{
                display: 'inline-block',
                filter: `blur(${characterColors[index]?.blur || 0}px)`,
                transition: 'filter 0.2s ease-out',
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>
      <motion.p
        className="text-xl md:text-2xl text-gray-400 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Scroll to explore
      </motion.p>
    </div>
  );
};

export default Home;

