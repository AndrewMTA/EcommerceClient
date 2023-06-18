import React, { useRef, useState, useEffect } from 'react';

const Lazy = ({ src, alt, placeholder, className }) => {
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [blurredPlaceholder, setBlurredPlaceholder] = useState('');

  useEffect(() => {
    const generateBlurredImage = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const image = new Image();
      image.src = placeholder;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        context.filter = 'blur(20px)';
        context.drawImage(image, 0, 0);

        const blurredDataUrl = canvas.toDataURL();
        setBlurredPlaceholder(blurredDataUrl);
      };
    };

    generateBlurredImage();
  }, [placeholder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const boxStyle = {
    backgroundImage: `url(${isVisible ? src : blurredPlaceholder})`,
  };

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom right, lightgray, darkgray, lightgray)`,
    backgroundSize: '200% 200%',
    backgroundPosition: 'top left',
    animation: 'gradient-animation 1.5s ease-in-out infinite',
  };

  return (
    <div ref={boxRef} className={`${className} box-load`} style={boxStyle}>
      {!isVisible && <div className="gradient" style={gradientStyle} />}
    </div>
  );
};

export default Lazy;
