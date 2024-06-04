import { useContext } from 'react';
import { Text, View } from 'react-native';
import { UsersContext } from './_layout';

export default function Index() {
  const { users } = useContext(UsersContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Ceci est la page de detail</Text>
      {users.map((user) => (
        <Text>{user.name}</Text>
      ))}
    </View>
  );
}
