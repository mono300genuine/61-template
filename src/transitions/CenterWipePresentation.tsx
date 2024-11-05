import { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import React, { useMemo, useState } from 'react';
import { AbsoluteFill, random } from 'remotion';

const makePathIn = (progress: number, direction: 'horizontal' | 'vertical' | 'diagonal', shift: number) => {
	const horizontalCenter = 0.5 + shift;
	const verticalCenter = 0.5 + shift;

	switch (direction) {
		case 'horizontal':
			return `
				M ${horizontalCenter - progress / 2} 0
				L ${horizontalCenter + progress / 2} 0
				L ${horizontalCenter + progress / 2} 1
				L ${horizontalCenter - progress / 2} 1
				Z`;

		case 'vertical':
			return `
				M 0 ${verticalCenter - progress / 2}
				L 1 ${verticalCenter - progress / 2}
				L 1 ${verticalCenter + progress / 2}
				L 0 ${verticalCenter + progress / 2}
				Z`;
        
        case 'diagonal':
          return `
            M ${(horizontalCenter) - progress / 2} 0
            L ${horizontalCenter + progress / 2} 0
            L ${horizontalCenter + progress / 2} 1
            L ${horizontalCenter - progress / 2} 1
            Z`;
      

		default:
			throw new Error(`Unknown direction: ${direction}`);
	}
};

export type CenterWipeProps = {
	direction?: 'horizontal' | 'vertical' | 'diagonal';
	shift?: number;
	outerEnterStyle?: React.CSSProperties;
	outerExitStyle?: React.CSSProperties;
	innerEnterStyle?: React.CSSProperties;
	innerExitStyle?: React.CSSProperties;
};

const CenterWipePresentation: React.FC<
	TransitionPresentationComponentProps<CenterWipeProps>
> = ({
	children,
	presentationProgress,
	presentationDirection,
	passedProps: { direction = 'horizontal', shift = 0, innerEnterStyle, innerExitStyle, outerEnterStyle, outerExitStyle },
}) => {
	const [clipId] = useState(() => String(random(null)));

	const progressInDirection =
		presentationDirection === 'entering'
			? presentationProgress
			: 1 - presentationProgress;

	const path = makePathIn(progressInDirection, direction, shift);

	const style: React.CSSProperties = useMemo(() => {
		return {
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			clipPath: presentationDirection === 'exiting' ? undefined : `url(#${clipId})`,
			...(presentationDirection === 'entering'
				? innerEnterStyle
				: innerExitStyle),
		};
	}, [clipId, innerEnterStyle, innerExitStyle, presentationDirection]);

	const outerStyle = useMemo(() => {
		return presentationDirection === 'entering'
			? outerEnterStyle
			: outerExitStyle;
	}, [outerEnterStyle, outerExitStyle, presentationDirection]);

	const svgStyle: React.CSSProperties = useMemo(() => {
		return {
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
		};
	}, []);

	return (
		<AbsoluteFill style={outerStyle}>
			<AbsoluteFill style={style}>{children}</AbsoluteFill>
			<AbsoluteFill>
				<svg viewBox="0 0 1 1" style={svgStyle}>
					<defs>
						<clipPath id={clipId} clipPathUnits="objectBoundingBox">
							<path d={path} fill="black" 
              transform={direction === 'diagonal' 
              ? `translate(0.5, 0.5) scale(${2}) translate(-0.5, -0.5) rotate(45, 0.5, 0.5)`
              : undefined}/>
						</clipPath>
					</defs>
				</svg>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export const centerWipe = (props?: CenterWipeProps): TransitionPresentation<CenterWipeProps> => {
	return {
		component: CenterWipePresentation,
		props: props ?? {},
	};
};
