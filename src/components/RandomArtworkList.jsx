import React, { useEffect } from 'react';
import rest from 'restler';

const ArtworkList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await rest.get("https://api.harvardartmuseums.org/object", {
          query: {
            apikey: "5be33a36-0fe6-4f0e-b311-800cc1d47e34",
            title: "dog",
            fields: "objectnumber,title,dated",
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render your component */}
    </div>
  );
};

export default ArtworkList;