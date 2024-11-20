import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Cart from "./Cart";
import ClassOrder from "./ClassOrder";
import { Button, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Available Classes",
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Order")}
                title="Search"
                color="#007AFF"
              />
            ),
          })}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Order" component={ClassOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
