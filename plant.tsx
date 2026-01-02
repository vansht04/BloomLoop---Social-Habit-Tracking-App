import { type Habit } from '@/lib/AppContext';

interface PlantProps {
  habit: Habit;
  onMouseDown: (habit: Habit, e: React.MouseEvent) => void;
  isDragging: boolean;
}

export default function Plant({ habit, onMouseDown, isDragging }: PlantProps) {
  const getGrowthStage = () => {
    const progress = habit.checkIns.length / habit.duration;
    if (progress < 0.33) return 'seedling';
    if (progress < 0.66) return 'growing';
    return 'mature';
  };

  const getPlantImage = () => {
    const stage = getGrowthStage();
    switch (stage) {
      case 'seedling':
        return '/assets/generated/seedling-plant-transparent.dim_200x200.png';
      case 'growing':
        return '/assets/generated/growing-plant-transparent.dim_200x200.png';
      case 'mature':
        return '/assets/generated/mature-plant-transparent.dim_200x200.png';
    }
  };

  const progress = Math.min(100, (habit.checkIns.length / habit.duration) * 100);

  return (
    <div
      className={`absolute cursor-grab transition-transform hover:scale-110 ${isDragging ? 'z-50 cursor-grabbing scale-110 opacity-90' : 'z-10'}`}
      style={{
        left: `${habit.position.x}px`,
        top: `${habit.position.y}px`,
      }}
      onMouseDown={e => onMouseDown(habit, e)}
    >
      <div className="relative">
        <img
          src={getPlantImage()}
          alt={habit.name}
          className="h-24 w-24 object-contain drop-shadow-lg transition-all"
          draggable={false}
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/90 px-2 py-1 text-xs font-medium shadow-md">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
