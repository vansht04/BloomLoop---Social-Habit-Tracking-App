import { Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useApp } from '@/lib/AppContext';

export default function Achievements() {
  const { achievements } = useApp();

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">
          Unlock badges by completing challenges · {unlockedCount} of {achievements.length} unlocked
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TooltipProvider>
          {achievements.map(achievement => (
            <Tooltip key={achievement.id}>
              <TooltipTrigger asChild>
                <Card
                  className={`transition-all ${achievement.unlocked ? 'border-primary shadow-lg' : 'opacity-60'}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`relative ${!achievement.unlocked && 'grayscale'}`}>
                          <img
                            src={achievement.icon}
                            alt={achievement.name}
                            className="h-16 w-16 object-contain"
                          />
                          {!achievement.unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                          {achievement.unlocked && (
                            <Badge variant="default" className="mt-1">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">{achievement.description}</CardDescription>
                    {!achievement.unlocked && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Requirement:</strong> {achievement.requirement}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              {!achievement.unlocked && (
                <TooltipContent>
                  <p>{achievement.requirement}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
