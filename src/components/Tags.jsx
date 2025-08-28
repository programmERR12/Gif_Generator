
import { useEffect, useState } from 'react';

export default function Tags() {
  const [tags, setTags] = useState('');
  const [gif, setGif] = useState('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDNrOHZtZzdnMXgydGQzeW9qbDJjdThvMjQ2a2d4YWhlbjU1dzY5YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1qXc2onDaFpoHTgvHA/giphy.gif'); // ✅ default home gif
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_GIF_MINI_PROJECT;
  const apiurl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tags}`;

  const fetchData = async () => {
    if (tags.trim() === '') return; // ✅ don’t fetch if input is empty
    setLoading(true);
    setError('');
    try {
      const res = await fetch(apiurl);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const output = await res.json();

      if (!output.data || !output.data.images) {
        throw new Error('No GIF found for this tag');
      }

      setGif(output.data.images.downsized_large.url);
    } catch (err) {
      console.error('Error fetching gif:', err);
      setError(err.message || 'Something went wrong while fetching GIF');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
  }, []);

  function clickHandler() {
    fetchData();
  }

  function changeHandler(event) {
    setTags(event.target.value);
  }

  return (
    <div className="max-w-sm mt-5 mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">GIF</h1>

      {loading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="w-full h-64 flex items-center justify-center text-red-500 font-semibold">
          {error}
        </div>
      ) : (
        gif && (
          <img
            src={gif}
            alt="GIF"
            className="w-full h-64 object-cover rounded-lg border border-gray-200"
          />
        )
      )}

      <input
        type="text"
        className="w-10/12 bg-blue-200 p-2 rounded-lg"
        onChange={changeHandler}
        value={tags}
        placeholder="Enter tag..."
      />

      <button
        onClick={clickHandler}
        disabled={tags.trim() === ''}
        className={`mt-4 px-6 py-2 rounded-full transform transition duration-300 shadow-md ${
          tags.trim() === ''
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
        }`}
      >
        Generate
      </button>
    </div>
  );
}
