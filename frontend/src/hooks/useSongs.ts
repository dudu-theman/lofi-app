import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export interface Song {
  id: number;
  title: string;
  audio_url: string;
}

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/songs`);
      const data = await res.json();
      setSongs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, loading, refetch: fetchSongs };
}
