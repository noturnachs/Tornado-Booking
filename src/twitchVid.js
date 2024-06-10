import React, { useRef, useEffect, useState, memo } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { Fab, CardHeader, Avatar, Typography } from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";

import cover from "./vids/vid1.png";
import cover2 from "./vids/vid2.png";
import cover3 from "./vids/vid3.png";

import vid1 from "./vids/vid1.mp4";
import vid2 from "./vids/vid2.mp4";
import vid3 from "./vids/vid3.MOV";

import "./twitch.css";

const data = [
  { coverImage: cover, video: vid1 },
  { coverImage: cover2, video: vid2 },
  { coverImage: cover3, video: vid3 },
];

const carouselData = [...data, ...data, ...data];

function ResponsiveCarousel() {
  const ref = useRef(null);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(width, carouselRef) => {
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Slide}
              slideWidth={750}
              carouselWidth={width}
              data={carouselData}
              maxVisibleSlide={5}
              // disableSwipe
              customScales={[1, 0.85, 0.7, 0.55]}
              transitionTime={450}
              // updateHeight={true}
              height={400}
            />
          );
        }}
      />
    </div>
  );
}

const Slide = memo(function (props) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const [loadDelay, setLoadDelay] = useState(null);
  const [removeDelay, setRemoveDelay] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Moved useRef logic to before early return to avoid calling conditionally
    if (videoRef.current) {
      const videoElement = videoRef.current;

      function handleVideoLoadedMetadata() {
        const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
        videoElement.style.width = isCenterSlide ? "100%" : "auto";
        // Set height based on calculated aspect ratio
        videoElement.style.height = `${
          videoElement.offsetWidth / aspectRatio
        }px`;
      }

      videoElement.addEventListener(
        "loadedmetadata",
        handleVideoLoadedMetadata
      );
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleVideoLoadedMetadata
        );
      };
    }
  }, [isCenterSlide]);

  useEffect(() => {
    if (isCenterSlide) {
      clearTimeout(removeDelay);
      setLoadDelay(setTimeout(() => setLoaded(true), 1000));
    } else {
      clearTimeout(loadDelay);
      if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
    }
  }, [isCenterSlide]);

  useEffect(
    () => () => {
      clearTimeout(removeDelay);
      clearTimeout(loadDelay);
    },
    [removeDelay, loadDelay]
  );

  if (
    !data ||
    !Array.isArray(data) ||
    dataIndex < 0 ||
    dataIndex >= data.length
  ) {
    return null; // Handle cases where data is undefined, not an array, or index is out of bounds
  }

  const { coverImage, video } = data[dataIndex];

  return (
    <div className="twitch-card mt-10" draggable={false}>
      <div className={`cover fill ${isCenterSlide && loaded ? "off" : "on"}`}>
        <div
          className="card-overlay fill h-max"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        <img className="cover-image fill" src={coverImage} alt="Cover" />
      </div>
      {loaded && (
        <div className="w-full h-full relative">
          <video
            className="w-full h-full object-cover"
            src={video}
            autoPlay
            loop
            muted
          />
        </div>
      )}
    </div>
  );
});

export default ResponsiveCarousel;
