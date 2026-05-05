import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
// Using the brand colors we defined in your MVC theme
import { Colors as BrandColors } from '@/src/views/theme/colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Using your high-energy neon orange for the active tab
        tabBarActiveTintColor: BrandColors.primary,
        tabBarStyle: {
          backgroundColor: BrandColors.background,
          borderTopColor: '#333',
        },
        headerStyle: {
          backgroundColor: BrandColors.background,
        },
        headerTitleStyle: {
          color: BrandColors.text,
          fontWeight: 'bold',
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites" // Changed from 'two' to 'favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}