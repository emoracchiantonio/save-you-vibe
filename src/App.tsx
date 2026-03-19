import React, { useState } from 'react';
import { Plus, Search, Loader2, Globe, ExternalLink, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { BookmarkGrid } from './components/BookmarkGrid';
import { MOCK_BOOKMARKS, BookmarkItem, Category, CATEGORY_COLORS, NEO_COLORS } from './types';
import { GoogleGenAI, Type } from "@google/genai";

const CATEGORIES: (Category | 'All')[] = ['All', 'Design', 'Lifestyle', 'Video', 'Art', 'Music'];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Components ---

function GalleryModal({ bookmark, onClose }: { bookmark: BookmarkItem; onClose: () => void }) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      
      // Static images for each category to maintain consistency as requested
      const categoryImages: Record<string, string[]> = {
        Design: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        ],
        Lifestyle: [
          'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
        ],
        Art: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80',
        ],
        Video: [
          'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1535016120720-40c646be44da?auto=format&fit=crop&w=800&q=80',
        ],
        Music: [
          'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1514525253361-bee871871771?auto=format&fit=crop&w=800&q=80',
        ],
      };

      // If it's a category we have images for, use them. Otherwise use fallback.
      const staticImages = categoryImages[bookmark.category] || [
        `https://picsum.photos/seed/${bookmark.id}-1/800/600`,
        `https://picsum.photos/seed/${bookmark.id}-2/800/600`,
        `https://picsum.photos/seed/${bookmark.id}-3/800/600`,
        `https://picsum.photos/seed/${bookmark.id}-4/800/600`,
        `https://picsum.photos/seed/${bookmark.id}-5/800/600`,
        `https://picsum.photos/seed/${bookmark.id}-6/800/600`,
      ];

      setImages(staticImages);
      setLoading(false);
    };

    fetchImages();
  }, [bookmark]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white neo-border w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b-2 border-black flex items-center justify-between bg-neo-accent">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {bookmark.category} <span className="text-white">Inspiration</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="neo-border bg-white p-2 hover:bg-black hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="mb-8">
            <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{bookmark.title}</h3>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Contenuti correlati al tema</p>
          </div>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-neo-accent" />
              <p className="font-black uppercase tracking-widest text-xs">Curating your vibe...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="neo-border bg-black aspect-square overflow-hidden group"
                >
                  <img 
                    src={img} 
                    alt={`Inspiration ${idx}`}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddBookmarkModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (title: string, color: string, url: string) => void }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(NEO_COLORS[0].class);
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white neo-border w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b-2 border-black flex items-center justify-between bg-neo-accent">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Nuova Casella</h2>
          <button onClick={onClose} className="neo-border bg-white p-2 hover:bg-black hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Titolo / Nome</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Inserisci un nome..."
              className="w-full neo-border p-4 font-bold outline-none focus:bg-neo-accent/10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">URL (Opzionale)</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full neo-border p-4 font-bold outline-none focus:bg-neo-accent/10"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest">Scegli Colore</label>
              <div className="grid grid-cols-5 gap-2">
                {NEO_COLORS.map((c) => (
                  <button
                    key={c.class}
                    onClick={() => setColor(c.class)}
                    className={`
                      w-full aspect-square neo-border transition-all relative
                      ${c.class}
                      ${color === c.class ? 'scale-110 z-10' : 'hover:scale-105'}
                    `}
                    title={c.name}
                  >
                    {color === c.class && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (title.trim()) {
                onAdd(title, color, url);
                setTitle('');
                setUrl('');
                onClose();
              }
            }}
            className="w-full bg-neo-accent neo-border py-4 font-black uppercase hover:bg-black hover:text-white transition-colors"
          >
            Crea Casella
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(MOCK_BOOKMARKS);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchingPublic, setIsSearchingPublic] = useState(false);
  const [publicResults, setPublicResults] = useState<any[]>([]);
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkItem | null>(null);

  const filteredBookmarks = filter === 'All' 
    ? bookmarks 
    : bookmarks.filter(b => b.category === filter);

  const handleReorder = (newOrder: BookmarkItem[]) => {
    if (filter === 'All') {
      setBookmarks(newOrder);
    } else {
      const filteredIds = new Set(filteredBookmarks.map(b => b.id));
      let filteredIdx = 0;
      const finalBookmarks = bookmarks.map(b => {
        if (filteredIds.has(b.id)) {
          return newOrder[filteredIdx++];
        }
        return b;
      });
      setBookmarks(finalBookmarks);
    }
  };

  const handleManualAdd = (title: string, color: string, url: string) => {
    const newBookmark: BookmarkItem = {
      id: Math.random().toString(36).substr(2, 9),
      url: url || '#',
      title: title,
      image: `https://picsum.photos/seed/${Math.random()}/800/450`,
      category: 'Design', // Default category
      color: color,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setBookmarks(prev => [newBookmark, ...prev]);
  };

  const handleAddBookmark = () => {
    if (!inputValue.trim()) {
      setIsAddModalOpen(true);
      return;
    }
    
    setIsAdding(true);
    
    // Simulate API call to fetch metadata
    setTimeout(() => {
      const category = filter === 'All' ? CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1] as Category : filter;
      const newBookmark: BookmarkItem = {
        id: Math.random().toString(36).substr(2, 9),
        url: inputValue,
        title: `New discovery: ${inputValue.replace('https://', '').split('/')[0]}`,
        image: `https://picsum.photos/seed/${Math.random()}/800/450`,
        category: category,
        color: CATEGORY_COLORS[category],
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setBookmarks(prev => [newBookmark, ...prev]);
      setInputValue('');
      setIsAdding(false);
    }, 1500);
  };

  const handleSearchPublic = async () => {
    if (!inputValue.trim()) return;
    
    setIsSearchingPublic(true);
    setPublicResults([]);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Trova 4 link pubblici di alta qualità (articoli, video, gallerie) inerenti a: ${inputValue}. 
        Se possibile, focalizzati sulla categoria: ${filter === 'All' ? 'generale' : filter}.
        Restituisci i risultati in formato JSON.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Titolo del contenuto" },
                url: { type: Type.STRING, description: "URL del contenuto" },
                description: { type: Type.STRING, description: "Breve descrizione" },
                category: { type: Type.STRING, description: "Categoria suggerita" },
              },
              required: ["title", "url", "description"]
            }
          }
        }
      });
      
      const results = JSON.parse(response.text);
      setPublicResults(results);
    } catch (error) {
      console.error("Errore nella ricerca pubblica:", error);
    } finally {
      setIsSearchingPublic(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddBookmark();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 pb-20">
        {/* Hero Section */}
        <section className="py-16 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none">
              Save your <span className="bg-neo-accent px-2">vibe</span>
            </h1>
            <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto">
              A minimalist Neo-Brutalist board for saving and organizing your digital inspiration.
            </p>
          </motion.div>

          {/* Universal Input */}
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-focus-within:translate-x-2 group-focus-within:translate-y-2 transition-transform" />
            <div className="relative flex neo-border bg-white overflow-hidden">
              <div className="flex items-center pl-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Aggiungi qualcosa..."
                className="flex-1 px-4 py-4 text-lg font-bold outline-none placeholder:text-gray-300"
              />
              <button
                onClick={handleAddBookmark}
                disabled={isAdding || isSearchingPublic}
                className="bg-neo-accent border-l-2 border-black px-6 font-black uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAdding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Aggiungi</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Public Results Section */}
          <AnimatePresence>
            {publicResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-4xl mt-8 overflow-hidden"
              >
                <div className="neo-border bg-white p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Risultati Pubblici</h2>
                    <button 
                      onClick={() => setPublicResults([])}
                      className="text-xs font-bold uppercase underline"
                    >
                      Chiudi
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publicResults.map((res, idx) => (
                      <div key={idx} className="neo-border p-4 bg-gray-50 group hover:bg-neo-accent transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5">
                            {res.category || 'Web'}
                          </span>
                          <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <h3 className="font-bold text-lg leading-tight mb-2">{res.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{res.description}</p>
                        <button
                          onClick={() => {
                            setInputValue(res.url);
                            handleAddBookmark();
                            setPublicResults(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="w-full neo-border bg-white py-2 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors"
                        >
                          Salva in Bacheca
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  neo-border px-6 py-2 text-lg font-black uppercase tracking-tighter transition-all cursor-pointer
                  ${filter === cat 
                    ? 'bg-black text-white -translate-x-1 -translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white hover:bg-neo-accent hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid Section */}
        <BookmarkGrid 
          bookmarks={filteredBookmarks} 
          onReorder={handleReorder}
          onCategoryClick={(cat) => setFilter(cat)}
          onCardClick={(bookmark) => setSelectedBookmark(bookmark)}
        />
      </main>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedBookmark && (
          <GalleryModal 
            bookmark={selectedBookmark} 
            onClose={() => setSelectedBookmark(null)} 
          />
        )}
      </AnimatePresence>

      {/* Add Bookmark Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddBookmarkModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={handleManualAdd} 
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t-2 border-black py-8 px-4 text-center bg-white">
        <p className="text-xs font-bold uppercase tracking-widest">
          Curated Vibe &copy; 2026 &mdash; Built with Neo-Brutalism
        </p>
      </footer>
    </div>
  );
}
