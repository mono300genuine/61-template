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
import LineAnimation from '../components/LineAnimation';
import GradientOverlay from '../components/GradirntOverlay';
import SlideWrapper from '../components/SlideWrapper';

export const scene2Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img1: z.string(),
  img2: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 2,
    maxWidth: 1300,
  });

  return (
    <AbsoluteFill>
      <SlideWrapper slides={4} direction='horizontal'>
        <>
          <AbsoluteFill
            style={{
              width: WIDTH,
              height: HEIGHT,
              ...titleSplit.style,
              color: colorVar('primaryText'),
              background: 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)',
              padding: '0px 100px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <AbsoluteFill style={{ right: "50%", alignItems: "flex-end", transform: "translate(-50%)" }}>
              <ShowImage src={props.img1} height={HEIGHT * 0.45} delay={34} rate={0.15} />
            </AbsoluteFill>
            <AbsoluteFill style={{ left: "50%", top: "25%", bottom: 100, }}>
              <ShowImage
                src={props.img2}
                width={WIDTH * 0.5 - 100}
                height={HEIGHT * 0.65}
                rate={0}
                delay={34}
              />
            </AbsoluteFill>
            <AbsoluteFill
              style={{
                top: 20,
                right: 20,
                left: 'auto',
                width: 250
              }}
            >
              <Logo logo={props.logo} height={100} direction="from-right" delay={50} />
            </AbsoluteFill>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <AnimatedBorder width={WIDTH * 0.2} height={90} borderWidth={15} delay={50} />
            </div>
            <TitleTextFromRight text={titleSplit.text} startAt={45} />
            <div style={{ marginTop: 50, marginBottom: -20 }}>
              <AnimatedBorder width={WIDTH * 0.2} height={90} borderWidth={15} delay={50} />
            </div>
          </AbsoluteFill>
          <AbsoluteFill style={{ left: 100, top: 100 }}>
            <LineAnimation />
          </AbsoluteFill>
          <AbsoluteFill style={{ top: '85%', right: 100, left: 'auto', width: 100 }}>
            <LineAnimation startAt={45} />
          </AbsoluteFill>

          <AbsoluteFill style={{ width: WIDTH * 0.11, left: '45%' }}>
            <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.3} rate={0.65} delay={30} gradient={true} />
          </AbsoluteFill>
          <AbsoluteFill style={{ width: WIDTH * 0.12, left: '10%' }}>
            <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.15} rate={0} delay={30} gradient={false} />
          </AbsoluteFill></>
      </SlideWrapper>
    </AbsoluteFill>
  );
};

export default Scene2;
