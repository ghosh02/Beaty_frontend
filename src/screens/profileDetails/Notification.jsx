import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BackButton from '../../components/BackButton';

const notifications = [
  {
    id: '1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '10:00 AM',
  },
  {
    id: '2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '10:30 AM',
  },
  {
    id: '3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '11:00 AM',
  },
  {
    id: '4',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '11:30 AM',
  },
  {
    id: '5',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
  {
    id: '6',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
  {
    id: '7',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
  {
    id: '8',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
  {
    id: '9',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
  {
    id: '10',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
    time: '12:00 PM',
  },
];

const renderNotificationItem = ({item}) => (
  <TouchableOpacity style={styles.notification}>
    <Text style={styles.notificationText}>{item.text}</Text>
    <Text style={[styles.timeText, styles.highlighted]}>{item.time}</Text>
  </TouchableOpacity>
);
const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="#000" />
        <Text style={styles.title}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotificationItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  title: {
    color: '#1C1C28',
    fontWeight: 'bold',
    fontSize: 20,
  },
  notification: {
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F0F5FA80',
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 14,
    color: '#1C1C28',
  },
  timeText: {
    marginTop: 5,
    fontSize: 12,
    color: '#32343E50',
  },

  default: {
    color: 'gray',
  },
});

export default Notification;

// import React, {useState} from 'react';
// import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
// import Swipeable from 'react-native-gesture-handler';
// import BackButton from '../../components/BackButton';

// const notificationsData = [
//   {
//     id: '1',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '10:00 AM',
//   },
//   {
//     id: '2',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '10:30 AM',
//   },
//   {
//     id: '3',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '11:00 AM',
//   },
//   {
//     id: '4',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '11:30 AM',
//   },
//   {
//     id: '5',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
//   {
//     id: '6',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
//   {
//     id: '7',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
//   {
//     id: '8',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
//   {
//     id: '9',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
//   {
//     id: '10',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, corporis',
//     time: '12:00 PM',
//   },
// ];

// const Notification = () => {
//   const [notifications, setNotifications] = useState(notificationsData);

//   const removeNotification = id => {
//     setNotifications(prevNotifications =>
//       prevNotifications.filter(notification => notification.id !== id),
//     );
//   };

//   const renderNotificationItem = ({item}) => {
//     return (
//       <Swipeable
//         renderRightActions={() => (
//           <View style={styles.deleteContainer}>
//             <Text style={styles.deleteText}>Delete</Text>
//           </View>
//         )}
//         onSwipeableRightOpen={() => removeNotification(item.id)}>
//         <TouchableOpacity style={styles.notification}>
//           <Text style={styles.notificationText}>{item.text}</Text>
//           <Text style={[styles.timeText, styles.highlighted]}>{item.time}</Text>
//         </TouchableOpacity>
//       </Swipeable>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <BackButton color="#000" />
//         <Text style={styles.title}>Notifications</Text>
//       </View>
//       <FlatList
//         data={notifications}
//         keyExtractor={item => item.id}
//         renderItem={renderNotificationItem}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginBottom: 20,
//   },
//   title: {
//     color: '#1C1C28',
//     fontWeight: 'bold',
//     fontSize: 24,
//   },
//   notification: {
//     marginBottom: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     backgroundColor: '#F0F5FA80',
//     borderRadius: 8,
//   },
//   notificationText: {
//     fontSize: 14,
//     color: '#1C1C28',
//   },
//   timeText: {
//     marginTop: 5,
//     fontSize: 12,
//     color: '#32343E',
//   },
//   deleteContainer: {
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     backgroundColor: 'red',
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   deleteText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Notification;
