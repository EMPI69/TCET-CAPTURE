import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const faculty = [
  {
    name: 'Dr. Sonali Singh',
    role: 'Faculty In-Charge',
    image: 'https://www.tcetmumbai.in/image/Staff/hns/photos/Sonalisingh.jpg',
    description: 'Passionate about photography and mentoring students.',
  },
  {
    name: 'Sachin Sir',
    role: 'Faculty In-Charge',
    image: 'https://photos.fife.usercontent.google.com/pw/AP1GczNfqW0wAQHWnt_9qvV2C6DgY_WLvFPMQabo6GNQRVfxol0ofGwIBNh4xg=w622-h933-s-no-gm?authuser=0',
    description: 'Dedicated to guiding students in their photography journey.',
  },
];

const FacultySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="px-4 bg-gradient-to-b from-gray-900 to-gray-800" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          {/* Title */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2
              className="text-5xl md:text-7xl font-bold"
              style={{
                color: '#ff6b35',
              }}
            >
              Power Behind The Picture
            </h2>
          </motion.div>

          {/* Faculty Cards */}
          <div className="flex-1 grid md:grid-cols-2 gap-8">
            {faculty.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {member.name}
                      </h3>
                      <p className="text-red-orange-500">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;

