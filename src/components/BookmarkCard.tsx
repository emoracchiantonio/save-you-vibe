import React from 'react';
import { motion } from 'motion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BookmarkItem, CATEGORY_COLORS, Category } from '../types';

interface BookmarkCardProps {
  bookmark: BookmarkItem;
  onCategoryClick?: (category: Category) => void;
  onCardClick?: (bookmark: BookmarkItem) => void;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark, onCategoryClick, onCardClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bookmark.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCardClick?.(bookmark)}
        className={`${bookmark.color || CATEGORY_COLORS[bookmark.category]} neo-border neo-shadow hover:neo-shadow-hover group cursor-pointer overflow-hidden h-full`}
        {...attributes}
        {...listeners}
      >
        <div className="aspect-video overflow-hidden border-b-2 border-black bg-white">
          <img
            src={bookmark.image}
            alt={bookmark.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="p-4 flex justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick?.(bookmark.category);
            }}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag when clicking button
            className="text-2xl font-black uppercase tracking-tighter cursor-pointer hover:opacity-70 transition-opacity"
          >
            {bookmark.category}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
