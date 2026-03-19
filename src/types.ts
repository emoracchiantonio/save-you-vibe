import { Bookmark } from 'lucide-react';

export type Category = 'Design' | 'Lifestyle' | 'Video' | 'Art' | 'Music';

export interface BookmarkItem {
  id: string;
  url: string;
  title: string;
  image: string;
  category: Category;
  color?: string; // Custom color override
  createdAt: string;
}

export const NEO_COLORS = [
  { name: 'Pink', class: 'bg-pink-200' },
  { name: 'Green', class: 'bg-green-200' },
  { name: 'Purple', class: 'bg-purple-200' },
  { name: 'Orange', class: 'bg-orange-200' },
  { name: 'Indigo', class: 'bg-indigo-200' },
  { name: 'Yellow', class: 'bg-yellow-200' },
  { name: 'Cyan', class: 'bg-cyan-200' },
  { name: 'Lime', class: 'bg-lime-200' },
  { name: 'Rose', class: 'bg-rose-200' },
];

export const MOCK_BOOKMARKS: BookmarkItem[] = [
  {
    id: '1',
    url: 'https://example.com/design-trends',
    title: 'MY IMMAGINE',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    category: 'Design',
    color: 'bg-pink-200',
    createdAt: '2026-03-18',
  },
  {
    id: '3',
    url: 'https://example.com/lifestyle-minimalism',
    title: 'MY IMMAGINE',
    image: 'https://picsum.photos/seed/lifestyle/800/450',
    category: 'Lifestyle',
    color: 'bg-green-200',
    createdAt: '2026-03-16',
  },
  {
    id: '4',
    url: 'https://example.com/video-essay',
    title: 'MY IMMAGINE',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    category: 'Video',
    color: 'bg-purple-200',
    createdAt: '2026-03-15',
  },
  {
    id: '5',
    url: 'https://example.com/art-gallery',
    title: 'MY IMMAGINE',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    category: 'Art',
    color: 'bg-orange-200',
    createdAt: '2026-03-14',
  },
  {
    id: '6',
    url: 'https://example.com/music-vibes',
    title: 'MY IMMAGINE',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    category: 'Music',
    color: 'bg-indigo-200',
    createdAt: '2026-03-13',
  },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Design: 'bg-pink-200',
  Lifestyle: 'bg-green-200',
  Video: 'bg-purple-200',
  Art: 'bg-orange-200',
  Music: 'bg-indigo-200',
};
