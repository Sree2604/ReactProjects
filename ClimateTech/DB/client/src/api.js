const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const api = {
    get: async (url) => {
      const token = getToken();
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = response;
        console.log("response data:", data); 
        return data;
      } 
      else {
        console.error('Error:', response.status);
        throw new Error('Failed to fetch data');
      }
    },
  };
  
  export default api;