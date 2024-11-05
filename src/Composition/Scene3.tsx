import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import Logo from '../components/Logo';
import { HEIGHT, WIDTH } from '../lib/consts';

import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import GradientOverlay from '../components/GradirntOverlay';
import AnimatedBorder from '../components/AnimatedBorder';
import LineAnimation from '../components/LineAnimation';
import DiagonalSweep from '../components/DiagonalSweep';

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 3,
    maxWidth: 700,
  });
  return (
    <AbsoluteFill>
      <DiagonalSweep masks={[
        { width: 300, start: [0, 0], end: [1920, 1080] },
        { width: 200, start: [960, 540], end: [1920, 1080] },
        { width: 200, start: [480, 270], end: [1920, 1080] },
        { width: 200, start: [1440, 810], end: [0, 0] },
        { width: 400, start: [1920, 1080], end: [0, 0] },
      ]}>
        <AbsoluteFill
          style={{
            ...titleSplit.style,
            color: colorVar('primaryText'),
            position: 'relative',
          }}
        >
          <AbsoluteFill style={{ position: 'absolute', top: 0, right: 0 }}>
            <img src={props.img} />
          </AbsoluteFill>
          <GradientOverlay direction="leftToRight" height={HEIGHT} rate={0.46} delay={45} />
          <div style={{ position: 'absolute', top: '35%', left: 0, width: WIDTH * 0.5 }}>
            <GradientOverlay
              direction="rightToLeft"
              height={HEIGHT * 0.2}
              opacity={0.2}
              rate={0.46} delay={45}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 150,
              right: WIDTH * 0.33,
            }}
          >
            <Logo logo={props.logo} height={150} direction="from-right" delay={48} />
          </div>

          <div style={{ position: 'absolute', bottom: 100, right: 100 }}>
            <TitleTextFromRight text={titleSplit.text} startAt={48} />
          </div>

          <div style={{ position: 'absolute', top: 100, right: '-35%' }}>
            <AnimatedBorder width={WIDTH * 0.5} height={200} borderWidth={10} />
          </div>

          <div
            style={{ position: 'absolute', bottom: -100, right: '35%', transform: 'rotate(90deg)' }}
          >
            <AnimatedBorder width={WIDTH * 0.2} height={150} borderWidth={10} />
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ top: '85%' }}>
          <LineAnimation startAt={48} />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: 100, left: '50%' }}>
          <LineAnimation startAt={45} />
        </AbsoluteFill>
      </DiagonalSweep>
    </AbsoluteFill>
  );
};

export default Scene3;
