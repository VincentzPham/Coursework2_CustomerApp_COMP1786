import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "./Firebase";

const ClassOrder = ({ navigation }) => {
  const [ordersClass, setOrdersClass] = useState([]);
  const [filteredOrdersClass, setFilteredOrdersClass] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = () => {
      const ordersCollection = ref(db, "Orders");

      onValue(ordersCollection, (snapshot) => {
        const data = snapshot.val();

        const orders = Object.keys(data).map((key) => data[key]);

        if (!orders.length) return;

        setOrdersClass(orders);
        setFilteredOrdersClass({});
      });
    };

    fetchOrders();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = ordersClass.filter((order) => order.email === text);
    setFilteredOrdersClass(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.orderClass.name}</Text>
      <Text style={styles.teacher}>Teacher: {item.orderClass.teacher}</Text>
      <Text style={styles.date}>Date: {item.orderClass.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Enter your email"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredOrdersClass}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    margin: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 },
  teacher: { fontSize: 14, color: "#666", marginBottom: 4 },
  date: { fontSize: 14, color: "#888" },
});

export default ClassOrder;
