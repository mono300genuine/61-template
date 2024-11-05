import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import Logo from '../components/Logo';
import ShowImage from '../components/ShowImage';
import AnimatedBorder from '../components/AnimatedBorder';
import GradientOverlay from '../components/GradirntOverlay';
import LineAnimation from '../components/LineAnimation';

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img1: z.string(),
  img2: z.string(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 2,
    maxWidth: 1500,
  });
  console.log('title', props.title);

  return (
    <AbsoluteFill>

      <AbsoluteFill
        style={{
          ...titleSplit.style,
          color: colorVar('primaryText'),
          background: 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)',
        }}
      >
        <AbsoluteFill style={{ right: 0, width: 500, left: 'auto' }}>
          <ShowImage src={props.img2} height={HEIGHT * 0.7} width={500} rate={0} delay={5} />
        </AbsoluteFill>
        <AbsoluteFill style={{ left: '40%' }}>
          <ShowImage src={props.img1} width={620} height={HEIGHT} rate={0} />
        </AbsoluteFill>
        <AbsoluteFill style={{ left: 100, top: '35%' }}>
          <Logo logo={props.logo} height={200} direction="from-right" delay={15} />
          <TitleTextFromRight text={titleSplit.text} startAt={16} />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: '80%', alignItems: 'center' }}>
          <AnimatedBorder width={WIDTH * 0.5} height={90} borderWidth={10} />
        </AbsoluteFill>

        <AbsoluteFill style={{ width: WIDTH * 0.12, left: '10%' }}>
          <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.15} rate={0} delay={16} gradient={false} />
        </AbsoluteFill>

        <AbsoluteFill style={{ width: WIDTH * 0.12, right: '20%', top: 100, left: 'auto' }}>
          <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.3} rate={0.7} delay={16} gradient={true} />
        </AbsoluteFill>
        <AbsoluteFill style={{ left: '35%', top: 100 }}>
          <LineAnimation />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: '85%' }}>
          <LineAnimation startAt={45} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene1;
