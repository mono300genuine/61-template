import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Direction = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

const GradientOverlay = ({
  width,
  height,
  rate,
  direction,
  opacity = 0.5,
  gradient=true,delay=0
}: {
  width?: number;
  height?: number;
  rate: number;
  direction: Direction;
  opacity?: number;
  gradient?:boolean
  delay?:number
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Calculate the scale animation for zoom out effect
  const scaleAnimation = interpolate(frame, [delay, (durationInFrames * 0.5)+delay], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate the clip-path based on the direction prop
  let clipPathAnimation: string;
  const clipPathProgress = interpolate(frame, [delay, (durationInFrames * 0.15)+delay], [1, rate], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Define the clip path based on the direction
  switch (direction) {
    case 'leftToRight':
      clipPathAnimation = `polygon(${clipPathProgress * 100}% 0%, 100% 0%, 100% 100%, ${clipPathProgress * 100}% 100%)`;
      break;
    case 'rightToLeft':
      clipPathAnimation = `polygon(0% 0%, ${100 - clipPathProgress * 100}% 0%, ${100 - clipPathProgress * 100}% 100%, 0% 100%)`;
      break;
    case 'topToBottom':
      clipPathAnimation = `polygon(0% 0%, 100% 0%, 100% ${100 - clipPathProgress * 100}%, 0% ${100 - clipPathProgress * 100}%)`;
      break;
    case 'bottomToTop':
      clipPathAnimation = `polygon(0% ${clipPathProgress * 100}%, 100% ${clipPathProgress * 100}%, 100% 100%, 0% 100%)`;
      break;
    default:
      clipPathAnimation = `polygon(${clipPathProgress * 100}% 0%, 100% 0%, 100% 100%, ${clipPathProgress * 100}% 100%)`;
  }

  return (
    <div
      style={{
        // overflow: 'hidden',
        width: width || '100%',
        height: height || '100%',
        opacity,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          // background: 'linear-gradient(45deg, #ff6f61, #ffde59)',
          background:gradient? 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)':"white",
          clipPath: clipPathAnimation,
          transform: `scale(${scaleAnimation})`,
        }}
      />
    </div>
  );
};

export default GradientOverlay;
