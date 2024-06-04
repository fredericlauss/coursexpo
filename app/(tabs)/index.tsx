import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { UsersContext } from './_layout';

export default function Index() {
  const [name, setName] = useState('');
  const { users, addUser } = useContext(UsersContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {users.map((user) => (
        <Text>{user.name}</Text>
      ))}
      <TextInput
        style={{ borderColor: 'black', borderWidth: 2 }}
        value={name}
        onChangeText={(value) => setName(value)}
        onSubmitEditing={() => {
          addUser(name);
        }}
      />
      <Link href="/details">Aller sur les details</Link>
    </View>
  );
}
