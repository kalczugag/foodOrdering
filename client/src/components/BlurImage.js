import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

// data = {
//     title: String,
//     img: String
//     blurhash: String
// }

const BlurImage = ({ data, width, height, ...rest }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoaded(true);
        };
        img.src = data.img;
    }, [data.img]);

    return (
        <>
            <div
                style={{
                    display: imageLoaded ? "none" : "inline",
                    borderRadius: "50%",
                    overflow: "hidden",
                }}
            >
                <Blurhash
                    hash={data.blurhash}
                    width={width}
                    height={height}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    style={{ ...rest, borderRadius: "50%", overflow: "hidden" }}
                />
            </div>
            <img
                className={width <= 200 ? "md:w-3/4" : ""}
                src={data.img}
                alt={data.title}
                style={{
                    display: !imageLoaded ? "none" : "inline",
                    overflow: "hidden",
                }}
            />
        </>
    );
};

export default BlurImage;
