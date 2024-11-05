import React, { PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Direction = 'horizontal' | 'vertical' | 'diagonal';

interface SplitWrapperProps {
  slides: number;
  direction: Direction;
}

const SplitWrapper: React.FC<PropsWithChildren<SplitWrapperProps>> = ({ children, slides = 3, direction }) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const delayFrames = 0; // Delay animation start by 1 second

  // Define the dimensions and positioning for each direction
  const segmentWidth = direction === 'horizontal' || direction === 'diagonal' ? width / slides : width;
  const segmentHeight = direction === 'vertical' || direction === 'diagonal' ? height / slides : height;
  
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: '0px' }}>
      <AbsoluteFill>
        {children}
      </AbsoluteFill>
      {Array.from({ length: slides }).map((_, index) => {
        // Initial centralized position
        const initialX = width / 2 - segmentWidth / 2;
        const initialY = height / 2 - segmentHeight / 2;

        // Determine final position based on direction
        let finalX = 0;
        let finalY = 0;

        if (direction === 'diagonal') {
          finalX = index * (segmentWidth / 1.5); 
          finalY = index * (segmentHeight / 1.5);
        } else {
          switch (direction) {
            case 'horizontal':
              finalX = index * segmentWidth;
              finalY = 0;
              break;
            case 'vertical':
              finalX = 0;
              finalY = index * segmentHeight;
              break;
          }
        }

        // Calculate animation progress
        const progress = interpolate(
          frame - delayFrames,
          [0, fps],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={index}
            style={{
              width: segmentWidth,
              height: segmentHeight,
              overflow: 'hidden',
              position: 'absolute',
              left: initialX + (finalX - initialX) * progress,
              top: initialY + (finalY - initialY) * progress,
            }}
          >
            <div
              style={{
                width: width, // Ensure it covers the full width for correct clipping
                height: height, // Ensure it covers the full height for correct clipping
                transform: direction === 'horizontal' ? `translateX(-${index * segmentWidth}px)`
                          : direction === 'vertical' ? `translateY(-${index * segmentHeight}px)`
                          : `translate(-${index * segmentWidth}px, -${index * segmentHeight}px)`, 
              }}
            >
              {children}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default SplitWrapper;
