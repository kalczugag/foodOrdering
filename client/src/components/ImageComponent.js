import { useState, useEffect } from "react";

const ImageComponent = ({ imageUrl }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/images/${imageUrl}`);
                if (response.ok) {
                    const blob = await response.blob();
                    setImageData(URL.createObjectURL(blob));
                } else {
                    console.error("Error fetching image:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [imageUrl]);

    return <div>{imageData && <img src={imageData} alt="pizza" />}</div>;
};

export default ImageComponent;
