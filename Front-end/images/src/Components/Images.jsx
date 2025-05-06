import React, { useEffect, useState } from "react";

const Images = ({ category }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from the backend API based on category
  useEffect(
    () => {
      fetch(`http://localhost:5000/api/images/canteen`)
        .then(response => response.json())
        .then(data => {
          setImages(data);
          console.log(data);
          setLoading(false);
        })
        .catch(err => {
          setError("Error fetching images");
          setLoading(false);
        });
    },
    [category]
  ); // Trigger a new fetch if the category changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  return (
    <div className="image-gallery">
      {images.length === 0
        ? <p>No images found in this category.</p>
        : images.map(image =>
            <div key={image.id} className="image-item">
              <img src={image.url} alt={image.category} />
              <p>
                {image.category}
              </p>
            </div>
          )}
    </div>
  );
};

export default Images;
