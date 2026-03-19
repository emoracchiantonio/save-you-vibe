import React from 'react';
import { BookmarkItem, Category } from '../types';
import { BookmarkCard } from './BookmarkCard';
import { AnimatePresence } from 'motion/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

interface BookmarkGridProps {
  bookmarks: BookmarkItem[];
  onReorder: (newOrder: BookmarkItem[]) => void;
  onCategoryClick?: (category: Category) => void;
  onCardClick?: (bookmark: BookmarkItem) => void;
}

export const BookmarkGrid: React.FC<BookmarkGridProps> = ({ bookmarks, onReorder, onCategoryClick, onCardClick }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = bookmarks.findIndex((item) => item.id === active.id);
      const newIndex = bookmarks.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(bookmarks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={bookmarks.map(b => b.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
          <AnimatePresence mode="popLayout">
            {bookmarks.map((bookmark) => (
              <BookmarkCard 
                key={bookmark.id} 
                bookmark={bookmark} 
                onCategoryClick={onCategoryClick}
                onCardClick={onCardClick}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};
