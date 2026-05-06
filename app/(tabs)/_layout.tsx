import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4400', // لون النيون البرتقالي عند التحديد
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#000', // خلفية سوداء للشريط
          borderTopColor: 'rgba(255, 68, 0, 0.3)', // خط علوي نيون خفيف
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
      }}>
      
      {/* التاب الأولى: صفحة الأفلام الرئيسية */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <Ionicons name="film-outline" size={24} color={color} />,
        }}
      />
      
      {/* التاب الثانية: صفحة المفضلة */}
      <Tabs.Screen
        name="favorites" // ✅ تم إعادة هذا السطر إلى مكانه الصحيح هنا
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}