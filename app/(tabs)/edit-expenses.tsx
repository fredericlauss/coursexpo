import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UsersContext } from './_layout';

export default function EditExpenses() {
  const [userId, setUserId] = useState<number | null>(null);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const { users, addExpense, editExpense, deleteExpense } = useContext(UsersContext);

  const selectedUser = users.find((user) => user.id === userId);

  return (
    <View style={{}}>
      <Text>Select User to Manage Expenses</Text>
      {users.map((user) => (
        <Button key={user.id} title={user.name} onPress={() => setUserId(user.id)} />
      ))}

      {selectedUser && (
        <>
          <Text>Expenses for {selectedUser.name}</Text>
          {selectedUser.expenses.map((expense) => (
            <View key={expense.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>
                {expense.name} - {expense.number}
              </Text>
              <Button
                title="Edit"
                onPress={() => {
                  setEditingExpenseId(expense.id);
                  setExpenseName(expense.name);
                  setExpenseAmount(expense.number);
                }}
              />
              <Button title="Delete" onPress={() => deleteExpense(selectedUser.id, expense.id)} />
            </View>
          ))}
          <TextInput placeholder="Expense Name" value={expenseName} onChangeText={setExpenseName} />
          <TextInput
            placeholder="Expense Amount"
            value={expenseAmount ? expenseAmount.toString() : ''}
            onChangeText={(value) => setExpenseAmount(Number(value))}
            keyboardType="numeric"
          />
          <Button
            title={editingExpenseId ? 'Edit Expense' : 'Add Expense'}
            onPress={() => {
              if (editingExpenseId !== null) {
                editExpense(selectedUser.id, editingExpenseId, expenseName, expenseAmount!);
                setEditingExpenseId(null);
              } else {
                addExpense(selectedUser.id, expenseName, expenseAmount!);
              }
              setExpenseName('');
              setExpenseAmount(null);
            }}
          />
        </>
      )}
    </View>
  );
}
