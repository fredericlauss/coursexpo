import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { createContext, useState } from 'react';

export const UsersContext = createContext<{
  users: User[];
  addUser: (name: string) => void;
  editUser: (id: number, newName: string) => void;
  deleteUser: (id: number) => void;
  addExpense: (userId: number, name: string, number: number) => void;
  editExpense: (userId: number, expenseId: number, newName: string, newNumber: number) => void;
  deleteExpense: (userId: number, expenseId: number) => void;
}>({
  users: [],
  addUser: () => {},
  editUser: () => {},
  deleteUser: () => {},
  addExpense: () => {},
  editExpense: () => {},
  deleteExpense: () => {},
});

interface Expense {
  id: number;
  name: string;
  number: number;
}

interface User {
  id: number;
  name: string;
  expenses: Expense[];
}

export default function TabLayout() {
  const [users, setUsers] = useState<User[]>([]);

  function addUser(name: string) {
    setUsers([
      ...users,
      {
        id: Date.now(),
        name: name,
        expenses: [],
      },
    ]);
  }

  function editUser(id: number, newName: string) {
    setUsers(users.map((user) => (user.id === id ? { ...user, name: newName } : user)));
  }

  function deleteUser(id: number) {
    setUsers(users.filter((user) => user.id !== id));
  }

  function addExpense(userId: number, name: string, number: number) {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, expenses: [...user.expenses, { id: Date.now(), name, number }] }
          : user
      )
    );
  }

  function editExpense(userId: number, expenseId: number, newName: string, newNumber: number) {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              expenses: user.expenses.map((expense) =>
                expense.id === expenseId
                  ? { ...expense, name: newName, number: newNumber }
                  : expense
              ),
            }
          : user
      )
    );
  }

  function deleteExpense(userId: number, expenseId: number) {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, expenses: user.expenses.filter((expense) => expense.id !== expenseId) }
          : user
      )
    );
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        editUser,
        deleteUser,
        addExpense,
        editExpense,
        deleteExpense,
      }}
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
          name="edit-expenses"
          options={{
            title: 'Edit Expenses',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
        <Tabs.Screen
          name="show-expenses"
          options={{
            title: 'Show Expenses',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    </UsersContext.Provider>
  );
}
