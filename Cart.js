// CartPage.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db } from "./Firebase";
import { ref, set } from "firebase/database";

const Cart = ({ route, navigation }) => {
  const { item } = route.params;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleOrder = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      let id = Math.random().toString(30).slice(2);

      try {
        await set(ref(db, "Orders/" + id), {
          email,
          orderClass: item,
          date: new Date().toISOString(),
        });

        Alert.alert(
          "Order Confirmed",
          `Order placed for ${item.name}.\nConfirmation sent to: ${email}`,
          [{ text: "OK", onPress: () => navigation.navigate("Home") }]
        );
      } catch (error) {
        console.error("Error placing order:", error);
        Alert.alert(
          "Error",
          "There was an error placing your order. Please try again."
        );
      }

      setEmail(""); // Clear email input
    } else {
      setIsEmailValid(false);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(true); // Reset error when the user starts typing
  };

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Cart</Text>
      <View style={styles.cartItem}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text>Teacher: {item.teacher}</Text>
        <Text>Date: {item.date}</Text>
      </View>

      <Text style={styles.emailLabel}>Enter your email to order:</Text>
      <TextInput
        style={[styles.emailInput, !isEmailValid && styles.emailInputError]}
        placeholder="you@example.com"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      {!isEmailValid && (
        <Text style={styles.errorText}>
          Please enter a valid email address.
        </Text>
      )}

      <Button title="Place Order" onPress={handleOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  cartTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  cartItem: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
  },
  cartName: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emailLabel: { fontSize: 16, marginTop: 20, marginBottom: 8 },
  emailInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  emailInputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 8 },
});

export default Cart;
