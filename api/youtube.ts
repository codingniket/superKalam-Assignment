import type { VideoItem, VideoResult } from "../types/youtube";

export async function searchYouTubeVideos(
  query: string
): Promise<VideoResult[]> {
  const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY;
  const RAPID_API_HOST = process.env.EXPO_PUBLIC_RAPID_API_HOST;

  try {
    const url = `https://${RAPID_API_HOST}/search/?q=${encodeURIComponent(
      query
    )}&hl=en&gl=US`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.contents) {
      throw new Error("Invalid response format");
    }
    const videos: VideoResult[] = (data.contents as VideoItem[])
      .filter((item) => item.type === "video" && item.video)
      .slice(0, 5)
      .map((item) => ({
        id: item.video!.videoId,
        title: item.video!.title || "No Title Available",
        description:
          item.video!.descriptionSnippet || "No description available",
        thumbnail:
          item.video!.thumbnails?.[2]?.url ||
          item.video!.thumbnails?.[1]?.url ||
          item.video!.thumbnails?.[0]?.url ||
          "",
        url: `https://www.youtube.com/watch?v=${item.video!.videoId}`,
      }));

    return videos;
  } catch (error) {
    console.error("YouTube API Error:", error);
    throw error;
  }
}
