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



  export const convertHexToRGBA = (hexCode, opacity = 0.1) => {
    let hex = hexCode.replace("#", "");
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }
    return `rgba(${r},${g},${b},${opacity})`;
  };