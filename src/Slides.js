import React, { useState, useEffect } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, PropaneSharp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const CarouselContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '400px', // Adjust as needed
}));

const SlideContainer = styled(Box)({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
});

const Slide = styled(Box)({
  minWidth: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const Indicators = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
});

const Indicator = styled(Box)(({ active }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: active ? '#fff' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
}));

const Carousel = ({ 
  slides, 
  autoPlay = true, 
  interval = 5000, 
  showArrows = true,
  showIndicators = true 
}) => {
  console.log("slides", slides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, interval, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true);
  };

  return (
    <CarouselContainer
      style={{backgroundColor: "black", width: 500, height: 500}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      elevation={3}
    >
      <SlideContainer
        sx={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={index}>
            {typeof slide === 'string' ? (
              <Box
                component="img"
                src={slide}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              slide
            )}
          </Slide>
        ))}
      </SlideContainer>

      {showArrows && (
        <>
          <NavigationButton
            onClick={handlePrev}
            sx={{ left: 16 }}
            size="large"
          >
            <KeyboardArrowLeft />
          </NavigationButton>
          <NavigationButton
            onClick={handleNext}
            sx={{ right: 16 }}
            size="large"
          >
            <KeyboardArrowRight />
          </NavigationButton>
        </>
      )}

      {showIndicators && (
        <Indicators>
          {slides.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </Indicators>
      )}
    </CarouselContainer>
  );
};

export default Carousel;

// Example usage:
/*
const slides = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  <Box sx={{ bgcolor: 'primary.main', width: '100%', height: '100%' }}>
    <Typography variant="h3">Custom Slide Content</Typography>
  </Box>,
];

<Carousel 
  slides={slides}
  autoPlay={true}
  interval={5000}
  showArrows={true}
  showIndicators={true}
/>
*/