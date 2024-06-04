import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { createContext, useState } from 'react';

export const UsersContext = createContext<{
  users: User[];
  addUser: (name: string) => void;
}>({ users: [], addUser: () => {} });

interface User {
  id: number;
  name: string;
}

export default function TabLayout() {
  const [users, setUsers] = useState<User[]>([]);

  function addUser(name: string) {
    setUsers([
      ...users,
      {
        id: Date.now(),
        name: name,
      },
    ]);
  }
  return (
    <UsersContext.Provider value={{ users: users, addUser: addUser }}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    </UsersContext.Provider>
  );
}
