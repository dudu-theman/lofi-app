const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Home = () => {
  const generateSong = async () => {
    try {
      const res = await fetch(`${BASE_URL}/generate`, { method: "POST" });
      const data = await res.json();
      console.log("Song generation triggered:", data);
      alert("Song generation triggered! Songs will appear once ready.");
    } catch (err) {
      console.error(err);
      alert("Error generating song.");
    }
  };

  return (
    <div>
      <h1>Lofi AI Spotify</h1>
      <button onClick={generateSong}>Generate Lofi Song</button>
    </div>
  );
};

export default Home;
