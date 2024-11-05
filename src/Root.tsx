import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'FrancoisOne',
            secondary: 'Abel',
          },
          transitionDuration: 50,
          scene1Duration: 200,
          scene1Props: {
            logo: staticFile('sample_logo.png'),
            title: 'MASTER ENGLISH, MASTER THE WORLD',
            img1: staticFile('teaching.png'),
            img2: staticFile('books.jpg')
          },
          scene2Duration: 200,
          scene2Props: {
            logo: staticFile('sample_logo.png'),
            title: 'WANT TO SPEAK ENGLISH FLUENTLY?',
            img1: staticFile('bubble.webp'),
            img2: staticFile('Media_4.jpg')
          },
          scene3Duration: 200,
          scene3Props: {
            title: 'BAD SKILLS CAN LIMIT OPPORTUNITIES',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image3.jpg'),
          },
          scene4Duration: 200,
          scene4Props: {
            title: 'EXPERIENCED iNSTRUCTORS',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image6.jpg'),
          },
          scene5Duration: 200,
          scene5Props: {
            title: 'GAIN FLUENCY, CONFIDENCE',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image6.jpg'),
          },
          scene6Duration: 200,
          scene6Props: {
            title: 'ENROLL NOW AND START YOUR JOURNEY TO ENGLISH FLUENCY!',
            logo: staticFile('sample_logo.png'),
            subTitle: 'wwww.example.com'
          },
        }}
      />

      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'FrancoisOne',
            secondary: 'Abel',
          },
          transitionDuration: 50,
          scene1Duration: 200,
          scene1Props: {
            logo: staticFile('sample_logo.png'),
            title: 'MASTER ENGLISH, MASTER THE WORLD',
            img1: staticFile('teaching.png'),
            img2: staticFile('books.jpg')
          },
          scene2Duration: 200,
          scene2Props: {
            logo: staticFile('sample_logo.png'),
            title: 'WANT TO SPEAK ENGLISH FLUENTLY?',
            img1: staticFile('bubble.webp'),
            img2: staticFile('Media_4.jpg')
          },
          scene3Duration: 200,
          scene3Props: {
            title: 'BAD SKILLS CAN LIMIT OPPORTUNITIES',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image3.jpg'),
          },
          scene4Duration: 200,
          scene4Props: {
            title: 'EXPERIENCED iNSTRUCTORS',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image6.jpg'),
          },
          scene5Duration: 200,
          scene5Props: {
            title: 'GAIN FLUENCY, CONFIDENCE',
            logo: staticFile('sample_logo.png'),
            img: staticFile('image6.jpg'),
          },
          scene6Duration: 200,
          scene6Props: {
            title: 'ENROLL NOW AND START YOUR JOURNEY TO ENGLISH FLUENCY!',
            logo: staticFile('sample_logo.png'),
            subTitle: 'wwww.example.com'
          },
        }}
      />
    </>
  );
};
