import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type PlantType = 'sunflower' | 'rose' | 'cactus' | 'fern' | 'tulip' | 'orchid';

export interface Habit {
  id: string;
  name: string;
  description: string;
  duration: number;
  plantType: PlantType;
  checkIns: string[];
  createdAt: string;
  position: { x: number; y: number };
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  backgroundColor?: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}

export interface UICustomization {
  fontSize: 'small' | 'medium' | 'large';
  textColor: string;
  backgroundColor: string;
}

interface AppContextType {
  currentUser: User;
  updateCurrentUser: (updates: Partial<User>) => void;
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'checkIns' | 'createdAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  checkInHabit: (id: string) => void;
  friends: User[];
  addFriend: (username: string) => boolean;
  posts: Post[];
  addPost: (content: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  achievements: Achievement[];
  friendHabits: Record<string, Habit[]>;
  allUsers: User[];
  uiCustomization: UICustomization;
  updateUICustomization: (updates: Partial<UICustomization>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: '1', username: 'sarah_green', displayName: 'Sarah Green', avatar: '🌻', bio: 'Nature lover and habit enthusiast', backgroundColor: '#e8f5e9' },
  { id: '2', username: 'mike_bloom', displayName: 'Mike Bloom', avatar: '🌿', bio: 'Building better habits one day at a time', backgroundColor: '#f1f8e9' },
  { id: '3', username: 'emma_rose', displayName: 'Emma Rose', avatar: '🌹', bio: 'Wellness coach & mindfulness advocate', backgroundColor: '#fce4ec' },
  { id: '4', username: 'alex_leaf', displayName: 'Alex Leaf', avatar: '🍃', bio: 'Fitness enthusiast and early riser', backgroundColor: '#e0f2f1' },
  { id: '5', username: 'lily_garden', displayName: 'Lily Garden', avatar: '🌺', bio: 'Spreading positivity through daily habits', backgroundColor: '#f3e5f5' },
  { id: '6', username: 'tom_sprout', displayName: 'Tom Sprout', avatar: '🌱', bio: 'Growing stronger every day', backgroundColor: '#e8eaf6' },
  { id: '7', username: 'nina_blossom', displayName: 'Nina Blossom', avatar: '🌸', bio: 'Mindfulness and meditation enthusiast', backgroundColor: '#fff3e0' },
];

const initialAchievements: Achievement[] = [
  { id: '1', name: 'First Seed', description: 'Create your first habit', icon: '/assets/generated/achievement-leaf.dim_64x64.png', unlocked: false, requirement: 'Create 1 habit' },
  { id: '2', name: 'Week Warrior', description: 'Complete 7 consecutive check-ins', icon: '/assets/generated/achievement-star.dim_64x64.png', unlocked: false, requirement: 'Complete 7 consecutive check-ins' },
  { id: '3', name: 'Garden Master', description: 'Have 5 active habits', icon: '/assets/generated/achievement-trophy.dim_64x64.png', unlocked: false, requirement: 'Create 5 habits' },
  { id: '4', name: 'Social Butterfly', description: 'Add 3 friends', icon: '/assets/generated/achievement-star.dim_64x64.png', unlocked: false, requirement: 'Add 3 friends' },
  { id: '5', name: 'Consistency King', description: 'Complete 30 check-ins', icon: '/assets/generated/achievement-trophy.dim_64x64.png', unlocked: false, requirement: 'Complete 30 check-ins' },
  { id: '6', name: 'Full Bloom', description: 'Grow a plant to maturity', icon: '/assets/generated/achievement-leaf.dim_64x64.png', unlocked: false, requirement: 'Complete a habit' },
  { id: '7', name: 'Streak Master', description: 'Maintain a 14-day streak', icon: '/assets/generated/achievement-star.dim_64x64.png', unlocked: false, requirement: 'Complete 14 consecutive check-ins' },
  { id: '8', name: 'Habit Champion', description: 'Complete 3 different habits', icon: '/assets/generated/achievement-trophy.dim_64x64.png', unlocked: false, requirement: 'Complete 3 habits' },
  { id: '9', name: 'Social Star', description: 'Create 10 posts', icon: '/assets/generated/achievement-star.dim_64x64.png', unlocked: false, requirement: 'Create 10 posts' },
  { id: '10', name: 'Community Builder', description: 'Add 5 friends', icon: '/assets/generated/achievement-leaf.dim_64x64.png', unlocked: false, requirement: 'Add 5 friends' },
  { id: '11', name: 'Century Club', description: 'Complete 100 total check-ins', icon: '/assets/generated/achievement-trophy.dim_64x64.png', unlocked: false, requirement: 'Complete 100 check-ins' },
  { id: '12', name: 'Engagement Expert', description: 'Receive 50 likes on your posts', icon: '/assets/generated/achievement-star.dim_64x64.png', unlocked: false, requirement: 'Receive 50 likes' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      duration: 30,
      plantType: 'sunflower',
      checkIns: [new Date().toISOString().split('T')[0]],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      position: { x: 150, y: 200 },
    },
    {
      id: '2',
      name: 'Daily Exercise',
      description: '30 minutes of physical activity',
      duration: 21,
      plantType: 'rose',
      checkIns: [new Date().toISOString().split('T')[0]],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      position: { x: 400, y: 250 },
    },
  ]);
  const [friends, setFriends] = useState<User[]>([mockUsers[1], mockUsers[2]]);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      content: 'Just completed my 7-day streak! 🎉 Feeling amazing!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: ['1'],
      comments: [
        { id: '1', userId: '1', content: 'Awesome work! Keep it up!', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
      ],
    },
    {
      id: '2',
      userId: '3',
      content: 'My morning meditation habit is really helping me stay focused throughout the day 🧘‍♀️',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: ['1', '2'],
      comments: [],
    },
  ]);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [uiCustomization, setUICustomization] = useState<UICustomization>({
    fontSize: 'medium',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  });

  const friendHabits: Record<string, Habit[]> = {
    '2': [
      {
        id: 'f1',
        name: 'Reading',
        description: 'Read for 30 minutes',
        duration: 21,
        plantType: 'fern',
        checkIns: Array.from({ length: 15 }, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        position: { x: 200, y: 180 },
      },
      {
        id: 'f2',
        name: 'Journaling',
        description: 'Write daily reflections',
        duration: 14,
        plantType: 'tulip',
        checkIns: Array.from({ length: 10 }, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        position: { x: 450, y: 220 },
      },
    ],
    '3': [
      {
        id: 'f3',
        name: 'Yoga Practice',
        description: 'Daily yoga session',
        duration: 30,
        plantType: 'orchid',
        checkIns: Array.from({ length: 20 }, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        position: { x: 300, y: 200 },
      },
    ],
  };

  useEffect(() => {
    const newAchievements = [...achievements];
    
    if (habits.length >= 1 && !newAchievements[0].unlocked) {
      newAchievements[0].unlocked = true;
    }
    
    if (habits.length >= 5 && !newAchievements[2].unlocked) {
      newAchievements[2].unlocked = true;
    }
    
    if (friends.length >= 3 && !newAchievements[3].unlocked) {
      newAchievements[3].unlocked = true;
    }

    if (friends.length >= 5 && !newAchievements[9].unlocked) {
      newAchievements[9].unlocked = true;
    }
    
    const totalCheckIns = habits.reduce((sum, habit) => sum + habit.checkIns.length, 0);
    if (totalCheckIns >= 30 && !newAchievements[4].unlocked) {
      newAchievements[4].unlocked = true;
    }

    if (totalCheckIns >= 100 && !newAchievements[10].unlocked) {
      newAchievements[10].unlocked = true;
    }
    
    const hasCompletedHabit = habits.some(habit => {
      const daysSinceCreation = Math.floor((Date.now() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      return habit.checkIns.length >= habit.duration || daysSinceCreation >= habit.duration;
    });
    if (hasCompletedHabit && !newAchievements[5].unlocked) {
      newAchievements[5].unlocked = true;
    }

    const completedHabitsCount = habits.filter(habit => {
      const daysSinceCreation = Math.floor((Date.now() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      return habit.checkIns.length >= habit.duration || daysSinceCreation >= habit.duration;
    }).length;
    if (completedHabitsCount >= 3 && !newAchievements[7].unlocked) {
      newAchievements[7].unlocked = true;
    }

    const maxStreak = habits.reduce((max, habit) => {
      const streak = habit.checkIns.length;
      return Math.max(max, streak);
    }, 0);
    if (maxStreak >= 7 && !newAchievements[1].unlocked) {
      newAchievements[1].unlocked = true;
    }
    if (maxStreak >= 14 && !newAchievements[6].unlocked) {
      newAchievements[6].unlocked = true;
    }

    if (posts.length >= 10 && !newAchievements[8].unlocked) {
      newAchievements[8].unlocked = true;
    }

    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);
    if (totalLikes >= 50 && !newAchievements[11].unlocked) {
      newAchievements[11].unlocked = true;
    }
    
    setAchievements(newAchievements);
  }, [habits, friends, posts]);

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'checkIns' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      checkIns: [],
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const checkInHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id && !h.checkIns.includes(today)) {
          return { ...h, checkIns: [...h.checkIns, today] };
        }
        return h;
      })
    );
  };

  const addFriend = (username: string): boolean => {
    const user = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user && !friends.find(f => f.id === user.id) && user.id !== currentUser.id) {
      setFriends(prev => [...prev, user]);
      return true;
    }
    return false;
  };

  const addPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const likes = p.likes.includes(currentUser.id)
            ? p.likes.filter(id => id !== currentUser.id)
            : [...p.likes, currentUser.id];
          return { ...p, likes };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            userId: currentUser.id,
            content,
            timestamp: new Date().toISOString(),
          };
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );
  };

  const updateUICustomization = (updates: Partial<UICustomization>) => {
    setUICustomization(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        checkInHabit,
        friends,
        addFriend,
        posts,
        addPost,
        likePost,
        addComment,
        achievements,
        friendHabits,
        allUsers: mockUsers,
        uiCustomization,
        updateUICustomization,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
