import type { Song } from "../hooks/useSongs";

interface Props {
  song: Song;
}

const SongCard = ({ song }: Props) => {
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <audio controls src={song.audio_url}></audio>
    </div>
  );
};

export default SongCard;
