import { VideoResult } from "@/types/youtube";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewRN } from "react-native-safe-area-context";
import { getEnhancedQuery } from "../api/gemini";
import { searchYouTubeVideos } from "../api/youtube";
import ContextTags from "../components/ContextTags";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  // Store search history for context
  const [searchContext, setSearchContext] = useState<string[]>([]);
  // Store Gemini-enhanced query
  const [enhancedQuery, setEnhancedQuery] = useState("");

  const searchVideos = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter a search topic");
      return;
    }
    setLoading(true);
    setSearchLoading(true);
    setVideos([]);
    try {
      const enhanced = await getEnhancedQuery(
        searchQuery.trim(),
        searchContext
      );
      setEnhancedQuery(enhanced);
      setSearchLoading(false);

      const videoResults = await searchYouTubeVideos(enhanced);
      setVideos(videoResults);

      setSearchContext((prev) => {
        const newContext = [...prev, searchQuery.trim()];
        return newContext.slice(-3);
      });
      if (videoResults.length === 0) {
        Alert.alert(
          "No Results",
          "No videos found for your search. Try different keywords."
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Search Error:", error);
        Alert.alert("Error", `Failed to search videos: ${error.message}`);
      } else {
        console.error("Search Error:", String(error));
        Alert.alert("Error", "Failed to search videos: Unknown error");
      }
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const clearContext = () => {
    setSearchContext([]);
    setEnhancedQuery("");
    Alert.alert("Context Cleared", "Search context has been reset.");
  };

  const openVideo = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open video");
    });
  };

  return (
    <SafeAreaViewRN style={styles.container}>
      <BlurView intensity={40} tint="light" style={styles.header}>
        <Text style={styles.title}>Smart YouTube Search</Text>
        <ContextTags
          context={searchContext}
          onClear={clearContext}
          loading={loading || searchLoading}
        />
        {enhancedQuery && enhancedQuery !== searchQuery && (
          <View style={styles.enhancedQueryContainer}>
            <Text style={styles.enhancedQueryLabel}>AI Enhanced Query:</Text>
            <Text style={styles.enhancedQueryText}>{enhancedQuery}</Text>
          </View>
        )}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={searchVideos}
          loading={loading || searchLoading}
        />
      </BlurView>
      {loading && !searchLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching videos</Text>
        </View>
      )}
      {searchLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>AI is enhancing your search...</Text>
        </View>
      )}
      {videos.length > 0 && (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoCard video={item} onPress={openVideo} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F3",
  },
  header: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderRadius: 24,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  enhancedQueryContainer: {
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },
  enhancedQueryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#856404",
    marginBottom: 4,
  },
  enhancedQueryText: {
    fontSize: 14,
    color: "#533502",
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 20,
  },
});

export default Index;
