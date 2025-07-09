import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { VideoCardProps } from "../types/video-card";

const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(video.url)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {video.thumbnail ? (
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {video.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: "#f9f9f9", // Light neutral background
    borderWidth: 1,
    borderColor: "#e2e2e2", // Soft border for structure
  },
  content: {
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
  },
  thumbnail: {
    width: 160,
    height: 110,
    borderRadius: 12,
    marginRight: 16,
  },
  thumbnailPlaceholder: {
    backgroundColor: "#dcdcdc",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});

export default VideoCard;
