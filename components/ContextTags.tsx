import { Brain, X } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { ContextTagsProps } from "../types/context-tags";

const ContextTags: React.FC<ContextTagsProps> = ({
  context,
  onClear,
  loading,
}) => {
  if (context.length === 0) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Brain size={16} color="#007AFF" />
        <Text style={styles.title}>Search Context:</Text>
        <TouchableOpacity
          onPress={onClear}
          style={styles.clearButton}
          disabled={loading}
        >
          <X size={16} color="#666" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tags}>
          {context.map((ctx, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{ctx}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginLeft: 5,
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  tagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ContextTags;
