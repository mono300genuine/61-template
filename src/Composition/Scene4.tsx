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
import SlideWrapper from '../components/SlideWrapper';

export const scene4Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
});
type Scene4Props = z.infer<typeof scene4Schema> & { background: BackgroundProps };

const Scene4: React.FC<Scene4Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 700,
  });
  return (
    <AbsoluteFill>
      <SlideWrapper slides={5} direction='vertical'><>
        <AbsoluteFill
          style={{
            ...titleSplit.style,
            color: colorVar('primaryText'),
            background: 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)',
          }}
        >
          <AbsoluteFill style={{ top: 0, right: 0 }}>
            <img src={props.img} style={{ width: WIDTH, height: HEIGHT }} />
          </AbsoluteFill>
          <AbsoluteFill style={{ top: 0, left: 0, width: WIDTH * 0.5 }}>
            <GradientOverlay direction="leftToRight" height={HEIGHT} opacity={0.5} rate={0.5} />
          </AbsoluteFill>

          <div style={{ position: 'absolute', top: 0, right: 0, width: WIDTH * 0.5 }}>
            <GradientOverlay direction="rightToLeft" height={HEIGHT} opacity={0.5} rate={0.5} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 50,
              right: WIDTH * 0.5,
              transform: 'translate(50%)',
            }}
          >
            <Logo logo={props.logo} height={120} direction="from-right" />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <TitleTextFromRight text={titleSplit.text} startAt={48} />
          </div>

          <div style={{ position: 'absolute', top: -10, right: '50%', transform: 'translate(50%)' }}>
            <AnimatedBorder width={WIDTH * 0.2} height={300} borderWidth={10} />
          </div>

          <div
            style={{ position: 'absolute', bottom: -10, right: '50%', transform: 'translate(50%)' }}
          >
            <AnimatedBorder width={WIDTH * 0.4} height={150} borderWidth={10} />
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ width: WIDTH * 0.11, top: 100, left: 0 }}>
          <GradientOverlay direction="bottomToTop" height={HEIGHT} opacity={0.5} rate={0.5} delay={45} gradient={true} />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: '85%', left: 200 }}>
          <LineAnimation startAt={48} />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: 200, left: '80%' }}>
          <LineAnimation startAt={45} />
        </AbsoluteFill></></SlideWrapper>
    </AbsoluteFill>
  );
};

export default Scene4;
