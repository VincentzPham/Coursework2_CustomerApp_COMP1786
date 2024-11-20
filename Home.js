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

const Home = ({ navigation }) => {
  const [dataClass, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCourses = () => {
      onValue(ref(db, "Class"), (snapshot) => {
        const classes = snapshot.val();
        const data = Object.keys(classes).map((key) => classes[key]);
        setData(data);
        setFilteredData(data);
      });
    };

    fetchCourses();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const lowercasedQuery = text.toLowerCase();
    const filtered = dataClass.filter(
      (course) =>
        (course.date && course.date.toLowerCase().includes(lowercasedQuery)) ||
        (course.teacher &&
          course.teacher.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Cart", { item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.teacher}>Teacher: {item.teacher}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Please choose your favourite class
        </Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { backgroundColor: "#6200ea", padding: 16, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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

export default Home;
