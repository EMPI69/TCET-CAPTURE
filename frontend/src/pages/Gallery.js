import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiSearch, FiX } from 'react-icons/fi';

const Gallery = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    fetchEvents();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/events`
      );
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique clubs from organizingClub field
  const uniqueClubs = useMemo(() => {
    const clubs = new Set();
    events.forEach(event => {
      if (event.organizingClub) {
        clubs.add(event.organizingClub);
      }
    });
    return Array.from(clubs).sort();
  }, [events]);

  // Get unique tags from events (PROFESSIONAL BODIES, SOCIAL BODIES, CLUBS)
  const uniqueTags = useMemo(() => {
    const tags = new Set();
    events.forEach(event => {
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(tag => {
          // Handle both old format {type, value} and new format (string)
          const tagValue = typeof tag === 'string' ? tag : tag.value || tag;
          if (tagValue) {
            tags.add(tagValue);
          }
        });
      }
    });
    return Array.from(tags).sort();
  }, [events]);

  // Get unique event types from events (SPORTS, CULTURAL, TECH, SEMINAR)
  const uniqueEventTypes = useMemo(() => {
    const types = new Set();
    events.forEach(event => {
      if (event.eventTypes && Array.isArray(event.eventTypes)) {
        event.eventTypes.forEach(type => {
          const typeValue = typeof type === 'string' ? type : type.value || type;
          if (typeValue) {
            types.add(typeValue);
          }
        });
      }
    });
    return Array.from(types).sort();
  }, [events]);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter (searches event name, club name, tags, and event types)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesEventName = event.eventName?.toLowerCase().includes(query);
        const matchesClubName = event.organizingClub?.toLowerCase().includes(query);
        // Check tags
        const matchesTag = event.tags && Array.isArray(event.tags) &&
          event.tags.some(tag => {
            const tagValue = typeof tag === 'string' ? tag : tag.value || tag;
            return tagValue?.toLowerCase().includes(query);
          });
        // Check event types
        const matchesEventType = event.eventTypes && Array.isArray(event.eventTypes) &&
          event.eventTypes.some(type => {
            const typeValue = typeof type === 'string' ? type : type.value || type;
            return typeValue?.toLowerCase().includes(query);
          });
        
        if (!matchesEventName && !matchesClubName && !matchesTag && !matchesEventType) {
          return false;
        }
      }

      // Club filter
      if (selectedClub) {
        const matchesClub = event.organizingClub === selectedClub;
        if (!matchesClub) return false;
      }

      // Tag filter
      if (selectedTag) {
        const matchesTag = event.tags && Array.isArray(event.tags) &&
          event.tags.some(tag => {
            const tagValue = typeof tag === 'string' ? tag : tag.value || tag;
            return tagValue === selectedTag;
          });
        if (!matchesTag) return false;
      }

      // Event Type filter
      if (selectedEventType) {
        const matchesEventType = event.eventTypes && Array.isArray(event.eventTypes) &&
          event.eventTypes.some(type => {
            const typeValue = typeof type === 'string' ? type : type.value || type;
            return typeValue === selectedEventType;
          });
        if (!matchesEventType) return false;
      }

      // Date filter
      if (selectedDate) {
        if (!event.eventDate) return false;
        
        try {
          let eventDate;
          
          // Handle Firestore Timestamp object
          if (event.eventDate.toDate && typeof event.eventDate.toDate === 'function') {
            eventDate = event.eventDate.toDate();
          }
          // Handle serialized Firestore timestamp (from API)
          else if (event.eventDate.seconds && typeof event.eventDate.seconds === 'number') {
            eventDate = new Date(event.eventDate.seconds * 1000);
          }
          // Handle ISO string
          else if (typeof event.eventDate === 'string') {
            eventDate = new Date(event.eventDate);
          }
          // Handle Date object
          else if (event.eventDate instanceof Date) {
            eventDate = event.eventDate;
          }
          // Try to create Date from value
          else {
            eventDate = new Date(event.eventDate);
          }
          
          // Validate the date
          if (!(eventDate instanceof Date) || isNaN(eventDate.getTime())) {
            return false;
          }
          
          const filterDate = new Date(selectedDate);
          if (isNaN(filterDate.getTime())) {
            return false;
          }
          
          const matchesDate = eventDate.toDateString() === filterDate.toDateString();
          if (!matchesDate) return false;
        } catch (error) {
          console.error('Error filtering by date:', error);
          return false;
        }
      }

      return true;
    });
  }, [events, searchQuery, selectedClub, selectedTag, selectedEventType, selectedDate]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedClub('');
    setSelectedTag('');
    setSelectedEventType('');
    setSelectedDate(null);
  };

  const hasActiveFilters = searchQuery || selectedClub || selectedTag || selectedEventType || selectedDate;

  const welcomeOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const welcomeY = useTransform(scrollY, [0, 200], [0, -50]);
  const welcomeScale = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar isScrolled={isScrolled} />

      {/* Welcome Text with Gallery Background */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-gradient-to-b from-gray-900 to-gray-800"
        style={{
          opacity: welcomeOpacity,
        }}
      >
        <WelcomeText welcomeY={welcomeY} welcomeScale={welcomeScale} />
      </motion.div>

      {/* Gallery Section - Start after welcome screen */}
      <section className="min-h-screen pt-[100vh] px-4 pb-20">
        <div className="container mx-auto">
          {/* Search and Filter Section */}
          <motion.div
            className="mb-8 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2">
                Search Events
              </label>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by event name or club name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-orange-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Club Filter */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Club Name
                </label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-orange-500 focus:border-transparent"
                >
                  <option value="">All Clubs</option>
                  {uniqueClubs.map(club => (
                    <option key={club} value={club}>{club}</option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Tag
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-orange-500 focus:border-transparent"
                >
                  <option value="">All Tags</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Event Type Filter */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Event Type
                </label>
                <select
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-orange-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {uniqueEventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Date
                </label>
                <div className="w-full">
                  <DatePicker
                    selected={selectedDate && selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : null}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMM dd, yyyy"
                    placeholderText="Select date"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-orange-500 focus:border-transparent"
                    wrapperClassName="w-full"
                    isClearable
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <motion.button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-white px-6 py-2 bg-red-orange-500 hover:bg-red-orange-600 rounded-xl transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX size={18} />
                <span>Clear Filters</span>
              </motion.button>
            )}

            {/* Results Count */}
            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </motion.div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-white text-xl">Loading events...</div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-white text-xl">
                {hasActiveFilters ? 'No events match your filters.' : 'No events found.'}
              </div>
            </div>
          ) : (
            <div className="gallery-container">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const WelcomeText = ({ welcomeY, welcomeScale }) => {
  const text = "Welcome to Gallery.";
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [characterColors, setCharacterColors] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const characterRefs = useRef({});
  const containerRef = useRef(null);
  const radius = 60;
  const darkRed = '#990000';

  // Split text into characters, preserving spaces
  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index,
    isSpace: char === ' ',
  }));

  // Track mouse movement and update character colors
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        setMousePosition({ x: mouseX, y: mouseY });

        const newColors = {};
        const containerRect = containerRef.current.getBoundingClientRect();
        
        characters.forEach((char, index) => {
          if (char.isSpace || !characterRefs.current[index]) {
            newColors[index] = { color: '#ffffff', blur: 0 };
            return;
          }

          const charRect = characterRefs.current[index].getBoundingClientRect();
          const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
          const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(mouseX - charCenterX, 2) + 
            Math.pow(mouseY - charCenterY, 2)
          );

          if (distance <= radius) {
            const blurAmount = Math.max(0, (radius - distance) / radius * 5);
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
  }, [characters]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
    const resetColors = {};
    characters.forEach((_, index) => {
      resetColors[index] = { color: '#ffffff', blur: 0 };
    });
    setCharacterColors(resetColors);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="text-center"
      style={{
        y: welcomeY,
        scale: welcomeScale,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold text-white mb-4 flex flex-wrap justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0.3, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {characters.map(({ char, index, isSpace }) => (
          <motion.span
            key={index}
            ref={(el) => {
              if (el) characterRefs.current[index] = el;
            }}
            className={`inline-block cursor-pointer ${isSpace ? 'w-2 md:w-4' : ''}`}
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
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-gray-400 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Scroll to explore
      </motion.p>
    </motion.div>
  );
};

export default Gallery;

