/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, Coffee, Sparkles, Users, MapPin, Phone, 
  Instagram, X, ChevronRight, Star, Clock, CheckCircle2,
  Menu as MenuIcon
} from 'lucide-react';

// --- Data ---

const GAMES = [
  { id: 1, title: 'EA SPORTS FC 24', genre: 'Sports', multiplayer: true, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Spider-Man 2', genre: 'Action', multiplayer: false, image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Call of Duty: MW3', genre: 'Shooter', multiplayer: true, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'GTA V', genre: 'Action', multiplayer: true, image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Mortal Kombat 1', genre: 'Fighting', multiplayer: true, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'God of War Ragnarök', genre: 'Action', multiplayer: false, image: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?q=80&w=800&auto=format&fit=crop' },
];

const MENU_ITEMS = [
  { id: 1, name: 'Majestic Smash Burger', desc: 'Double patty, melted cheese, secret sauce', price: '₹299', tag: 'Best Seller', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Neon Peri Peri Fries', desc: 'Crispy fries tossed in spicy peri peri', price: '₹149', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Cyberpunk Shake', desc: 'Thick Oreo & chocolate overload', price: '₹199', tag: 'Must Try', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bf699?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Blue Potion Mojito', desc: 'Refreshing blue curacao mint cooler', price: '₹129', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop' },
];

const PACKAGES = [
  { id: 1, name: 'Solo Leveling', time: '1 Hour', price: '₹199', features: ['1 PS5 Controller', 'Any Game', 'Free Water'], popular: false },
  { id: 2, name: 'The Duo Pass', time: '2 Hours', price: '₹349', features: ['2 PS5 Controllers', 'Multiplayer Games', '2 Soft Drinks'], popular: true },
  { id: 3, name: 'Squad Goalz', time: '3 Hours', price: '₹799', features: ['4 PS5 Controllers', 'Private Lounge', '2 Burgers + Fries'], popular: false },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-1 w-24 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-6 rounded-full" />
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = activeGenre === 'All' 
    ? GAMES 
    : GAMES.filter(g => g.genre === activeGenre);

  const genres = ['All', ...Array.from(new Set(GAMES.map(g => g.genre)))];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-brand-black z-50 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-brand-blue border-t-brand-pink rounded-full mb-8"
        />
        <motion.h1 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-heading text-2xl text-white tracking-widest uppercase"
        >
          Loading Majestic Experience...
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-blue selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" className="font-heading text-2xl font-bold tracking-tighter flex items-center gap-2">
                <Gamepad2 className="text-brand-blue w-8 h-8" />
                <span>MAJESTIC<span className="text-brand-pink">.</span></span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="hover:text-brand-blue transition-colors px-3 py-2 text-sm font-medium uppercase tracking-wider">About</a>
                <a href="#games" className="hover:text-brand-blue transition-colors px-3 py-2 text-sm font-medium uppercase tracking-wider">Games</a>
                <a href="#menu" className="hover:text-brand-blue transition-colors px-3 py-2 text-sm font-medium uppercase tracking-wider">Menu</a>
                <a href="#pricing" className="hover:text-brand-blue transition-colors px-3 py-2 text-sm font-medium uppercase tracking-wider">Pricing</a>
              </div>
            </div>
            <div className="hidden md:block">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-brand-blue text-black font-bold px-6 py-2.5 rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm box-glow-purple"
              >
                Book Now
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-black border-b border-white/10 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-blue block px-3 py-2 text-base font-medium uppercase">About</a>
                <a href="#games" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-blue block px-3 py-2 text-base font-medium uppercase">Games</a>
                <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-blue block px-3 py-2 text-base font-medium uppercase">Menu</a>
                <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-blue block px-3 py-2 text-base font-medium uppercase">Pricing</a>
                <button 
                  onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}
                  className="mt-4 bg-brand-blue text-black font-bold px-6 py-3 rounded-full w-full uppercase tracking-wider"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/80 to-brand-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            alt="Gaming Cafe Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tighter leading-none">
              Play. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple text-glow-blue">Chill.</span> Repeat.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Delhi's Ultimate PS5 Gaming Café Experience. Premium setups, delicious food, and unmatched vibes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto bg-brand-pink hover:bg-white hover:text-black text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 uppercase tracking-wider box-glow-purple flex items-center justify-center gap-2"
              >
                Book Your Session <ChevronRight className="w-5 h-5" />
              </button>
              <a 
                href="#games"
                className="w-full sm:w-auto bg-transparent border-2 border-white/20 hover:border-brand-blue text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 uppercase tracking-wider flex items-center justify-center"
              >
                Explore Games
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1 h-3 bg-brand-blue rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 px-4 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="Level up your hangout game. Here's why we're the best spot in town.">
            Why Choose Us
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Gamepad2, title: 'Ultra-Smooth PS5', desc: 'Latest consoles with 4K TVs and premium headsets for immersive gameplay.', color: 'text-brand-blue' },
              { icon: Coffee, title: 'Delicious Fast Food', desc: 'Gourmet burgers, loaded fries, and thick shakes served right at your seat.', color: 'text-brand-pink' },
              { icon: Sparkles, title: 'Premium Vibe', desc: 'Neon aesthetics, comfortable seating, and a chill atmosphere.', color: 'text-brand-purple' },
              { icon: Users, title: 'Perfect for Groups', desc: 'Spacious couches for multiplayer action with friends or a unique date night.', color: 'text-brand-blue' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Zone Showcase */}
      <section id="games" className="py-24 px-4 bg-brand-black relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="From intense shooters to casual sports, we have a massive library of the latest PS5 titles.">
            Game Zone
          </SectionHeading>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeGenre === genre 
                    ? 'bg-brand-blue text-black box-glow-purple' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredGames.map(game => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
                >
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-brand-purple text-white px-2 py-1 rounded">
                        {game.genre}
                      </span>
                      {game.multiplayer && (
                        <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center gap-1">
                          <Users className="w-3 h-3" /> Multiplayer
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-brand-blue transition-colors">{game.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Food Menu */}
      <section id="menu" className="py-24 px-4 relative">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="Fuel up without pausing the game. Delicious fast food served hot to your couch.">
            Cafe Menu
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {MENU_ITEMS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.tag && (
                    <div className="absolute top-0 left-0 bg-brand-pink text-white text-[10px] font-bold uppercase px-2 py-1 rounded-br-lg">
                      {item.tag}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold">{item.name}</h3>
                    <span className="text-brand-blue font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 italic">And many more options available at the cafe...</p>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section id="pricing" className="py-24 px-4 bg-brand-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Simple, transparent pricing. Choose a package that fits your squad.">
            Packages
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {PACKAGES.map((pkg, idx) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white/5 border rounded-3xl p-8 flex flex-col ${
                  pkg.popular 
                    ? 'border-brand-blue box-glow-purple transform md:-translate-y-4' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-black font-bold uppercase tracking-wider text-xs px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-heading text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-brand-pink">{pkg.price}</span>
                  <span className="text-gray-400">/ {pkg.time}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className={`w-full py-3 rounded-full font-bold uppercase tracking-wider transition-all ${
                    pkg.popular
                      ? 'bg-brand-blue text-black hover:bg-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience / Gallery */}
      <section className="py-24 px-4 overflow-hidden">
        <SectionHeading subtitle="Get a glimpse of the ultimate gaming setup.">
          The Vibe
        </SectionHeading>
        
        <div className="mt-16 flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {/* We duplicate the array to create a continuous scrolling effect feel, though here it's just a horizontal scroll */}
          {[...GALLERY, ...GALLERY].map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="shrink-0 w-[80vw] sm:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden snap-center relative group"
            >
              <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-brand-black border-y border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading>What Gamers Say</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { name: 'Rahul S.', text: 'Best hangout spot in Delhi 🔥 The PS5 controllers are brand new and the burgers are insane.', rating: 5 },
              { name: 'Priya M.', text: 'Came here for a date night. The neon vibe is so aesthetic and we had a blast playing Mortal Kombat!', rating: 5 },
              { name: 'Aman K.', text: 'Our squad comes here every weekend. The 3-hour package is totally worth it. Highly recommend.', rating: 5 },
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-blue text-brand-blue" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center font-bold text-black">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">Find Us</h2>
              <p className="text-gray-400 text-lg mb-8">Drop by for an epic gaming session. We're located in the heart of Delhi.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-pink">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-gray-400">Gali No.5, Vikas Marg, Laxmi Nagar<br/>Opposite pillar No.31, Delhi 110092</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-blue">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Timings</h4>
                    <p className="text-gray-400">Mon - Sun: 11:00 AM - 2:00 AM<br/>(Late night sessions available)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-purple">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Contact</h4>
                    <p className="text-gray-400">+91 98765 43210<br/>hello@majesticgame.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 relative group">
              {/* Placeholder for actual map */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-white/20" />
                <span className="absolute mt-24 text-white/40 font-heading tracking-widest uppercase">Interactive Map Here</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                alt="Map placeholder" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-luminosity" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-heading text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
            Ready to Level Up Your Chill Time?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Limited slots available for the weekend. Book now to secure your PS5 setup.
          </p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-brand-blue text-black font-bold text-xl px-12 py-5 rounded-full hover:bg-white transition-all duration-300 uppercase tracking-wider box-glow-purple inline-block"
          >
            Book Your Slot Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-brand-blue w-6 h-6" />
            <span className="font-heading text-xl font-bold tracking-tighter">MAJESTIC<span className="text-brand-pink">.</span></span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400 font-medium uppercase tracking-wider">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#games" className="hover:text-white transition-colors">Games</a>
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors text-gray-400">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Majestic Game Story. All rights reserved.
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wider">Book a Session</h3>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Booking request sent! (UI Demo)'); setIsBookingOpen(false); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Name</label>
                    <input type="text" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="John Doe" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Date</label>
                      <input type="date" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Time</label>
                      <input type="time" required className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Package</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors appearance-none">
                      <option>Solo Leveling (1 Hr)</option>
                      <option>The Duo Pass (2 Hrs)</option>
                      <option>Squad Goalz (3 Hrs)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="w-full bg-brand-blue text-black font-bold text-lg px-6 py-4 rounded-xl hover:bg-white transition-all duration-300 uppercase tracking-wider box-glow-purple">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
