import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { continueRender, delayRender, useVideoConfig } from 'remotion';

import { useIsFontLoaded } from './LoadFonts';
import { Font } from '../types';
import { fontVar } from './helpers';

const DEBUG = true;

const createElement = (style: CSSProperties) => {
  const element = document.createElement('div');
  Object.assign(element.style, style);
  return element;
};

const findMaxFontSize = ({
  style,
  initialFontSize,
  maxLines,
  maxWidth,
  text,
  template,
}: {
  style: CSSProperties;
  initialFontSize: number;
  maxLines: number;
  maxWidth: number;
  text: string;
  template: Element;
}) => {
  const element = createElement(style);
  element.textContent = text.replaceAll('-', '\u2011');
  template.appendChild(element);

  let fontSize = initialFontSize;
  const maxHeight = maxLines * initialFontSize;
  while (element.clientHeight > maxHeight || element.scrollWidth > maxWidth) {
    fontSize = Math.floor(fontSize * 0.95);
    element.style.fontSize = `${fontSize}px`;
  }
  template.removeChild(element);
  return fontSize;
};

const splitTextIntoLines = ({
  inputText,
  maxWidth,
  maxLines,
  fontSize,
  style,
  template,
}: {
  inputText: string;
  maxWidth: number;
  fontSize: number;
  maxLines: number;
  style: CSSProperties;
  template: Element;
}) => {
  const element = document.createElement('div');
  Object.assign(element.style, style);
  element.style.fontSize = `${fontSize}px`;
  template.appendChild(element);

  const words = inputText.replaceAll('\n', ' ').split(' ').filter(Boolean);
  let previousWords: string[] = [];
  const wordLines: string[][] = [];
  let linesReached = 0;

  for (const word of words) {
    // Add current word to the line
    element.textContent = [...previousWords, word].join(' ');

    // Check if the current line exceeds maxWidth
    if (element.clientWidth > maxWidth) {
      if (linesReached < maxLines - 1) {
        wordLines.push(previousWords); // Push the current line to wordLines
        previousWords = [word]; // Start a new line with the current word
        linesReached++;
      } else {
        // Max lines reached; add all remaining words to the last line
        previousWords.push(word);
      }
    } else {
      previousWords.push(word);
    }
  }

  // Add remaining words as the last line
  wordLines.push(previousWords);
  template.removeChild(element);

  return wordLines.map((l) => l.join(' ')).join('\n');
};

export const useTextSplitter = ({
  font = 'primary',
  ...props
}: {
  text: string;
  maxLines: number;
  font?: Font;
  fontWeight: string | undefined;
  maxWidth: number;
  fontSize: number;
  letterSpacing?: string;
}) => {
  const [handle] = useState(() => delayRender());
  const isFontLoaded = useIsFontLoaded(font);
  const key = useMemo(() => JSON.stringify(props), [props]);
  const [result, setResult] = useState<{ fontSize: number; text: string }>();
  // const context = useVideoContext()
  const { id } = useVideoConfig();
  useEffect(() => {
    // console.log(document.querySelectorAll("div"), "docu all ");
    if (!isFontLoaded) return;
    const template = document.querySelector(`#${id}`)!;
    console.log(template, 'template');

    const style: CSSProperties = {
      position: 'absolute',
      lineHeight: '1',
      opacity: '0',
      fontFamily: fontVar(font),
      // width: `${props.maxWidth}px`,
      fontSize: `${props.fontSize}px`,
      fontWeight: props.fontWeight || undefined,
      letterSpacing: props.letterSpacing || undefined,
    };

    const text = splitTextIntoLines({
      inputText: props.text,
      fontSize: props.fontSize,
      style,
      template,
      maxWidth: props.maxWidth,
      maxLines: props.maxLines,
    });
    // const fontSize = findMaxFontSize({
    //   initialFontSize: props.fontSize,
    //   style,
    //   template,
    //   maxLines: props.maxLines,
    //   maxWidth: props.maxWidth,
    //   text,
    // });

    if (DEBUG) console.log({ key, text });
    setResult({ fontSize: props.fontSize, text });
    continueRender(handle);
  }, [...Object.values(props), isFontLoaded]);

  return {
    text: result?.text || '',
    style: {
      minWidth: props.maxWidth,
      fontFamily: fontVar(font),
      fontWeight: props.fontWeight,
      fontSize: result?.fontSize || 0,
      outline: DEBUG ? 'red 1px solid' : undefined,
    },
  };
};
