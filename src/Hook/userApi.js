import axios from 'axios';

// Function to fetch users from your backend API
export const fetchUsers = async () => {
  const response = await axios.get('http://localhost:5000'); // Make sure your backend is running on this URL
  return response.data;
};