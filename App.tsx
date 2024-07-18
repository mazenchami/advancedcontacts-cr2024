import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import type {ImageStyle, TextStyle, ViewStyle} from 'react-native';

import {Contact, TurboContacts} from './turbo-contacts/spec';

function App(): React.JSX.Element {
  const [hasPermission, setHasPermission] = useState(
    TurboContacts.hasContactsPermission(),
  );
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  {
    /*ListHeaderComponent={
        //   <Image source={require('./phone-book.jpg')} style={$image} />
        // }*/
  }
  return (
    <SafeAreaView style={$container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <View style={$values}>
            <View style={$icon}>
              <Text>{`${item.firstName.charAt(0).toUpperCase()}${item.lastName
                .charAt(0)
                .toUpperCase()}`}</Text>
            </View>
            <View>
              <Text>{`${item.firstName} ${item.lastName}`}</Text>
              <Text>{item.phoneNumber}</Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <>
            {hasPermission ? (
              <Pressable
                onPress={() => setContacts(TurboContacts.getContacts())}>
                <Text>Load Contacts</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  TurboContacts.requestContactsPermission().then(
                    setHasPermission,
                  )
                }>
                <Text>Request Permission</Text>
              </Pressable>
            )}
          </>
        }
        ItemSeparatorComponent={() => <View style={$itemSeparator} />}
      />
    </SafeAreaView>
  );
}

const $container: ViewStyle = {
  flex: 1,
  marginHorizontal: 12,
};

const $values: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
};

const $itemSeparator: ViewStyle = {
  height: 1,
  backgroundColor: 'gray',
};

const $icon: TextStyle = {
  marginRight: 12,
  backgroundColor: 'lightgray',
  padding: 4,
  borderRadius: 40 / 2,
  height: 40,
  width: 40,
  justifyContent: 'center',
  alignItems: 'center',
};

const $image: ImageStyle = {
  width: '100%',
  height: 200,
  resizeMode: 'cover',
};

export default App;
