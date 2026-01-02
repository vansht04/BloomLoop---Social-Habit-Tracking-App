import { useRef, useState } from 'react';
import { useApp, type Habit } from '@/lib/AppContext';
import Plant from './Plant';

export default function Garden() {
  const { habits, updateHabit } = useApp();
  const gardenRef = useRef<HTMLDivElement>(null);
  const [draggedHabit, setDraggedHabit] = useState<Habit | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (habit: Habit, e: React.MouseEvent) => {
    if (!gardenRef.current) return;
    
    const rect = gardenRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - habit.position.x,
      y: e.clientY - rect.top - habit.position.y,
    });
    setDraggedHabit(habit);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedHabit || !gardenRef.current) return;
    
    const rect = gardenRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(rect.width - 100, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(0, Math.min(rect.height - 100, e.clientY - rect.top - dragOffset.y));
    
    updateHabit(draggedHabit.id, {
      position: { x: newX, y: newY },
    });
  };

  const handleMouseUp = () => {
    setDraggedHabit(null);
  };

  return (
    <div
      ref={gardenRef}
      className="relative h-[600px] w-full overflow-hidden rounded-lg border border-border bg-cover bg-center shadow-lg"
      style={{ backgroundImage: 'url(/assets/generated/garden-background.dim_800x600.png)' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {habits.map(habit => (
        <Plant
          key={habit.id}
          habit={habit}
          onMouseDown={handleMouseDown}
          isDragging={draggedHabit?.id === habit.id}
        />
      ))}
      {habits.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-muted-foreground">Your garden is empty. Create a habit to plant your first seed!</p>
        </div>
      )}
    </div>
  );
}
