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
import ShowImage from '../components/ShowImage';
import LineAnimation from '../components/LineAnimation';

export const scene5Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const Scene5: React.FC<Scene5Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 2,
    maxWidth: 1000,
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          ...titleSplit.style,
          color: colorVar('primaryText'),
          background: 'white',
        }}
      >
        <AbsoluteFill style={{ top: 0, left: 0, width: WIDTH * 0.4 }}>
          <GradientOverlay direction="bottomToTop" height={HEIGHT} delay={15} opacity={1} rate={0} />
        </AbsoluteFill>
        <div style={{ position: 'absolute', top: 100, right: '50%' }}>
          <ShowImage src={props.img} height={HEIGHT * 0.8} rate={0.45} />
        </div>

        <div style={{ position: 'absolute', top: 0, right: '20%', width: WIDTH * 0.13 }}>
          <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.1} delay={45} rate={0.1} />
        </div>

        <AbsoluteFill
          style={{
            top: '50%',
            left: '50%',
            width: 200,
            height: 300,
            transform: 'translate(-60%,-50%)',
          }}
        >
          <GradientOverlay direction="rightToLeft" height={300} opacity={0.2} delay={45} rate={0} />
        </AbsoluteFill>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: 50,
          }}
        >
          <div style={{ marginBottom: 50 }}>
            <Logo logo={props.logo} height={120} delay={45} direction="from-right" />
          </div>
          <TitleTextFromRight text={titleSplit.text} gradient startAt={48} />
        </div>

        <div style={{ position: 'absolute', top: -10, left: '20%', transform: 'rotate(90deg)' }}>
          <AnimatedBorder width={450} height={120} borderWidth={10} />
        </div>

        <div
          style={{ position: 'absolute', bottom: -10, left: '-50%', transform: 'translate(50%)' }}
        >
          <AnimatedBorder width={WIDTH * 0.5} height={250} borderWidth={10} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ top: '30%' }}>
        <LineAnimation startAt={48} />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 150, left: '75%' }}>
        <LineAnimation startAt={45} gradient />
      </AbsoluteFill>
      <AbsoluteFill style={{ top: '85%', left: '60%' }}>
        <LineAnimation startAt={45} gradient />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene5;
