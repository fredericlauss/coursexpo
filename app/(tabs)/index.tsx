import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { UsersContext } from './_layout';

export default function Index() {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const { users, addUser, editUser, deleteUser } = useContext(UsersContext);

  return (
    <View style={{}}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {users.map((user) => (
        <View key={user.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{user.name}</Text>
          <Button
            title="Edit"
            onPress={() => {
              setEditingId(user.id);
              setName(user.name);
            }}
          />
          <Button title="Delete" onPress={() => deleteUser(user.id)} />
        </View>
      ))}
      <TextInput
        style={{ borderColor: 'black', borderWidth: 2 }}
        value={name}
        onChangeText={(value) => setName(value)}
        onSubmitEditing={() => {
          if (editingId !== null) {
            editUser(editingId, name);
            setEditingId(null);
          } else {
            addUser(name);
          }
          setName('');
        }}
      />
      <Link href="/details">Aller sur les details</Link>
    </View>
  );
}
