import { useState } from 'react';
import { CheckCircle2, Edit2, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useApp, type Habit } from '@/lib/AppContext';
import HabitForm from './HabitForm';
import { toast } from 'sonner';

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { checkInHabit, deleteHabit } = useApp();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isCheckedInToday = habit.checkIns.includes(today);
  const progress = Math.min(100, (habit.checkIns.length / habit.duration) * 100);
  const streak = habit.checkIns.length;

  const handleCheckIn = () => {
    if (!isCheckedInToday) {
      checkInHabit(habit.id);
      toast.success('Check-in recorded! 🌱');
    }
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    toast.success('Habit deleted');
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl">{habit.name}</CardTitle>
              <CardDescription>{habit.description}</CardDescription>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDeleteOpen(true)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border p-3">
              <p className="text-2xl font-bold text-primary">{streak}</p>
              <p className="text-xs text-muted-foreground">Check-ins</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-2xl font-bold text-primary">{habit.duration}</p>
              <p className="text-xs text-muted-foreground">Day Goal</p>
            </div>
          </div>

          <Button
            onClick={handleCheckIn}
            disabled={isCheckedInToday}
            className="w-full gap-2"
            variant={isCheckedInToday ? 'outline' : 'default'}
          >
            {isCheckedInToday ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Checked In Today
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4" />
                Check In
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          <HabitForm habit={habit} onSuccess={() => setIsEditOpen(false)} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Habit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{habit.name}" and all its progress. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
