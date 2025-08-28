
import { useEffect, useState } from 'react';

export default function Random() {
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  const API_KEY = import.meta.env.VITE_GIF_MINI_PROJECT;
  const apiurl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

  const fetchData = async () => {
    setLoading(true);
    setError(''); 
    try {
      const res = await fetch(apiurl);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const output = await res.json();

      if (!output.data || !output.data.images) {
        throw new Error('No GIF returned from API');
      }

      setGif(output.data.images.downsized_large.url);
    } catch (err) {
      console.error('Error fetching gif:', err);
      setError(err.message || 'Something went wrong while fetching GIF');
      setGif('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function clickHandler() {
    fetchData();
  }

  return (
    <div className="max-w-sm mt-5 mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">🎲 Random GIF</h1>

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

      <button
        onClick={clickHandler}
        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transform transition duration-300 shadow-md"
      >
        Generate
      </button>
    </div>
  );
}
