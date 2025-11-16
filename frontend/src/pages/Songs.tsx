import { useSongs } from "../hooks/useSongs";
import SongCard from "../components/SongCard";

const Songs = () => {
  const { songs, loading, refetch } = useSongs();

  if (loading) return <p>Loading songs...</p>;
  if (!songs.length) return <p>No songs available yet.</p>;

  return (
    <div>
      <h2>All Songs</h2>
      <button onClick={refetch} style={{ marginBottom: "10px" }}>
        Refresh Playlist
      </button>
      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Songs;
