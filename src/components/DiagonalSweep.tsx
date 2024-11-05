import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import React from 'react';

interface DiagonalSweepMaskProps {
  children: React.ReactNode;
  masks: {
    width: number;            // Width of the sweep
    start: [number, number]; // Start point [x, y]
    end: [number, number];   // End point [x, y]
  }[];
}

const DiagonalSweepMask: React.FC<DiagonalSweepMaskProps> = ({ children, masks }) => {
  const frame = useCurrentFrame();

  // Canvas dimensions
  const WIDTH = 1920;
  const HEIGHT = 1080;

  return (
    <AbsoluteFill>
      
			<AbsoluteFill >{children}</AbsoluteFill>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          {/* Create a mask for each sweep */}
          {masks.map((mask, index) => {
            const { width, start, end } = mask;

  const rotation = 45 * (180 / Math.PI);
  

            // Sweep animation progress (0 to 1)
            const sweep = interpolate(frame, [0, 60], [0, 1], {
              extrapolateRight: 'clamp',
            });

            const centerX = interpolate(sweep, [0, 1], [start[0], end[0]]);
            const centerY = interpolate(sweep, [0, 1], [start[1], end[1]]);
            const rectHeight = Math.sqrt((WIDTH) ** 2 + (HEIGHT) ** 2) ; 

            return (
              <mask id={`sweep-mask-${index}`} key={index}>
                <rect
                  x={centerX - width / 2}
                  y={centerY - rectHeight / 2}
                  width={width}
                  height={rectHeight}
                  transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
                  fill="white"
                />
              </mask>
            );
          })}
        </defs>

        {/* Render children, masked by all sweeping rectangles */}
        <g>
          {masks.map((_, index) => {
               // Assign unique translation and scaling values for each mask
            const translateY = interpolate(frame, [0, 60], [-100 - index * 20, 0], {
              extrapolateRight: 'clamp',
            });
          return(
            <foreignObject
              key={index}
              width="100%"
              height="100%"
              mask={`url(#sweep-mask-${index})`}
            >
              <div  
               style={{ width: '100%', height: '100%' ,
                transform: `translateY(${translateY}px) `,
              }}>
                {children}
              </div>
            </foreignObject>
          )})}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default DiagonalSweepMask;
