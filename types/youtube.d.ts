export interface VideoResult {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

export interface VideoItem {
  type: string;
  video?: {
    videoId: string;
    title?: string;
    descriptionSnippet?: string;
    thumbnails?: { url: string }[];
  };
}
