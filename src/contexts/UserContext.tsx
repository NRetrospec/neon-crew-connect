import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  from: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

interface User {
  email: string;
  id: string;
  name: string;
  avatar?: string;
  profileBackground?: { type: 'color' | 'animated' | 'default'; value?: string };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  updateProfileBackground: (newBg: { type: 'color' | 'animated' | 'default'; value?: string }) => void;
  updateProfileAvatar: (avatar: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatar] = useState<string | undefined>(() => localStorage.getItem('userAvatar') || undefined);

  const [user, setUser] = useState<User | null>(() => {
    // Check if we have a stored user on initial load
    const storedUser = localStorage.getItem('user');
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    return parsed ? { ...parsed, avatar } : null;
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    setNotifications(prev => [...prev, {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date()
    }]);
  };

  const updateProfileBackground = (newBg: { type: 'color' | 'animated' | 'default'; value?: string }) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, profileBackground: newBg };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateProfileAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem('userAvatar', newAvatar);
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, avatar: newAvatar };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = {
    user,
    setUser: (newUser: User | null) => {
      const userWithAvatar = newUser ? { ...newUser, avatar } : null;
      setUser(userWithAvatar);
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(userWithAvatar));
      } else {
        localStorage.removeItem('user');
      }
    },
    notifications,
    markNotificationsAsRead,
    addNotification,
    updateProfileBackground,
    updateProfileAvatar,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
