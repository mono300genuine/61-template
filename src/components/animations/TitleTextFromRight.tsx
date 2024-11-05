import { Fragment } from 'react/jsx-runtime';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const TitleTextFromRight = ({
  text,
  startAt = 0,
  gradient = false,
}: {
  text: string;
  startAt?: number;
  gradient?: boolean;
}) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIndex) => (
        <p
          key={lineIndex}
          style={{
            margin: 0,
            lineHeight: '110px',
            position: 'relative',
            whiteSpace: 'nowrap',
            textShadow: gradient ? '' : '5px 20px 50px #00000020',
            left: interpolate(
              (frame - startAt - lineIndex * 15) / (durationInFrames - startAt),
              [0, 0.3],
              [50, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.quad),
              }
            ),
            opacity: interpolate(
              (frame - startAt - lineIndex * 15) / (durationInFrames - startAt),
              [0, 0.3],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.quad),
              }
            ),
          }}
        >
          {line.split(' ').map((word, index) => {
            const wordDelay = 6;
            const startFrame = startAt + lineIndex * 15 + wordDelay * index;

            const wordOpacity = interpolate(
              frame,
              [startFrame, startFrame + wordDelay * 2],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.quad),
              }
            );

            const wordLeft = interpolate(
              frame,
              [startFrame, startFrame + wordDelay],
              [25, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.quad),
              }
            );

            return (
              <Fragment key={`word-${index}-${lineIndex}`}>
                <span
                  style={{
                    position: 'relative',
                    top: 0,
                    left: wordLeft,
                    opacity: wordOpacity,
                    background: 'linear-gradient(90deg, #f61174ab 0%, rgba(227,186,17,1) 100%)',
                    WebkitBackgroundClip: 'text',
                    color: gradient ? 'transparent' : 'white',
                    display: 'inline-block',
                  }}
                >
                  {word}
                </span>
                {index < line.split(' ').length - 1 && ' '}
              </Fragment>
            );
          })}
          {lineIndex < lines.length - 1 && <br />}
        </p>
      ))}
    </>
  );
};
