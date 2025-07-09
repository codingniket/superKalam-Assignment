import { Search } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { SearchBarProps } from "../types/search-bar";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  loading,
}) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <Search size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for videos..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
      />
    </View>
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onSubmit}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>Search</Text>
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SearchBar;
