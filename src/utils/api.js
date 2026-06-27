const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchJson = async (url, options = {}) => {
  const response = await fetch(`${API_BASE}${url}`, options);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Request failed');
  }
  return json;
};

// Fix image URL - ensure it's a full URL
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return 'https://via.placeholder.com/200x200?text=No+Image';
  
  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http')) {
    return encodeURI(imageUrl);
  }

  // If it's just a filename, prepend the server URL
  if (!imageUrl.startsWith('/')) {
    return encodeURI(`${API_BASE}/uploads/${imageUrl}`);
  }

  // If it starts with /, prepend the base URL
  return `${API_BASE}${imageUrl}`;
};

export default API_BASE;
