import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UsersContext } from './_layout';

export default function EditExpenses() {
  const { users } = useContext(UsersContext);

  return (
    <View style={{}}>
      <Text>Show Expenses</Text>
      {users.map((user) => {
        const totalExpenses = user.expenses.reduce((sum, expense) => sum + expense.number, 0);
        return (
          <View key={user.id} style={{ marginVertical: 10 }}>
            <Text>User: {user.name}</Text>
            <Text>Total Expenses: {totalExpenses}</Text>
          </View>
        );
      })}
    </View>
  );
}
