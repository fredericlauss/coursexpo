import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { createContext, useState } from 'react';

export const UsersContext = createContext<{
  users: User[];
  addUser: (name: string) => void;
  editUser: (id: number, newName: string) => void;
  deleteUser: (id: number) => void;
}>({ users: [], addUser: () => {}, editUser: () => {}, deleteUser: () => {} });

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

  function editUser(id: number, newName: string) {
    setUsers(users.map((user) => (user.id === id ? { ...user, name: newName } : user)));
  }

  function deleteUser(id: number) {
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <UsersContext.Provider
      value={{ users: users, addUser: addUser, editUser: editUser, deleteUser: deleteUser }}
    >
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
