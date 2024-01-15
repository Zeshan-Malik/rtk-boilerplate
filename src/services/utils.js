export const handleApiError = (error) => {
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);
      // Handle specific HTTP status codes or error responses here
  
    } else if (error.request) {
      // The request was made, but no response was received (e.g., network error)
      console.log('No Response Received:', error.request);
      // Handle network-related errors here
  
    } else {
      // Something happened in setting up the request that triggered an error
      console.log('Request Error:', error.message);
      // Handle other errors here
    }
    // You can also log the error for debugging or analytics
    console.error('API Error:', error);
  };