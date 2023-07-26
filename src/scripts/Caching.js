function Caching(key, data) {
    
    if (data) {
      try {
        const dataString = JSON.stringify(data);
        localStorage.setItem(key, dataString);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const cachedData = localStorage.getItem(key);
        if (cachedData !== null) {
        
          const parsedData = JSON.parse(cachedData);
        
          return parsedData;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
  }
  export {Caching};