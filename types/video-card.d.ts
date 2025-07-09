import type { VideoResult } from "./youtube";

export interface VideoCardProps {
  video: VideoResult;
  onPress?: (url: string) => void;
}
