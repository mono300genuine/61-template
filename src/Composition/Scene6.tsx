import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import Logo from '../components/Logo';
import { HEIGHT, WIDTH } from '../lib/consts';

import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import GradientOverlay from '../components/GradirntOverlay';
import LineAnimation from '../components/LineAnimation';
import SlideWrapper from '../components/SlideWrapper';

export const scene6Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subTitle: z.string(),
});
type Scene6Props = z.infer<typeof scene6Schema> & { background: BackgroundProps };

const Scene6: React.FC<Scene6Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 80,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 2,
    maxWidth: 1200,
  });
  return (
    <AbsoluteFill>
      <SlideWrapper slides={6} direction='horizontal'>
        <>
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              color: colorVar('primaryText'),
              background: 'linear-gradient(0deg, rgba(246,17,115,1) 0%, rgba(227,186,17,1) 100%)',
              // background:"white",
              position: 'relative',
            }}
          >

            <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
              <div style={{ marginBottom: 30 }}>

                <Logo logo={props.logo} height={250} direction="from-right" />
              </div>
              <div style={{
                textAlign: "center",
                ...titleSplit.style
              }}>

                <TitleTextFromRight text={titleSplit.text} startAt={25} />
              </div>
              <div style={{ fontSize: 70 }}>

                <TitleTextFromRight text={props.subTitle} startAt={70} />
              </div>
            </AbsoluteFill>
            <div style={{ position: 'absolute', top: 0, right: 100, width: WIDTH * 0.13 }}>
              <GradientOverlay direction="topToBottom" height={HEIGHT} opacity={0.2} rate={0} delay={35} gradient={false} />
            </div>
          </div>
          <AbsoluteFill style={{ top: 200, left: '25%' }}>
            <LineAnimation startAt={48} />
          </AbsoluteFill>
          <AbsoluteFill style={{ top: '70%', left: '80%' }}>
            <LineAnimation startAt={45} />
          </AbsoluteFill>
        </></SlideWrapper>
    </AbsoluteFill>
  );
};

export default Scene6;
