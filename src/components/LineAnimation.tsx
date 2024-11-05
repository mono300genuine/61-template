import { useCurrentFrame, interpolate, Easing } from 'remotion';

const LineAnimation: React.FC<{ startAt?: number,gradient?:boolean }> = ({ startAt=0,gradient=false }) => {
  const frame = useCurrentFrame();

  // Define properties for each line
  const lines = [
    { startPosition: 20, maxWidth: 200, delay: 10, duration: 100 },
    { startPosition: 50, maxWidth: 300, delay: 0, duration: 100 },
    { startPosition: 0, maxWidth: 150, delay: 20, duration: 100 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {lines.map((line, index) => {
        const cycleDuration = line.duration;

        // Start the animation only after the `startAt` frame is reached
        const animationFrame = Math.max(0, frame - startAt);
        
        // Calculate the loopProgress with the new delayed start
        const loopProgress = interpolate(
          animationFrame % cycleDuration, 
          [line.delay, cycleDuration + line.delay],
          [-line.maxWidth, line.maxWidth], 
          {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={index}
            style={{
              width: `${line.maxWidth}px`,
              overflow: 'hidden',
              height: '4px',
              position: 'relative',
              left: line.startPosition,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
          background:gradient? 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)':"white",
          transform: `translateX(${loopProgress}px)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LineAnimation;
