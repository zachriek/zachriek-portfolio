'use client';

import { skills } from '@/data';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
	items,
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
	items: typeof skills;
	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);

	const [start, setStart] = useState(false);

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}

	const getDirection = () => {
		if (containerRef.current) {
			if (direction === 'left') {
				containerRef.current.style.setProperty('--animation-direction', 'forwards');
			} else {
				containerRef.current.style.setProperty('--animation-direction', 'reverse');
			}
		}
	};

	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === 'fast') {
				containerRef.current.style.setProperty('--animation-duration', '20s');
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s');
			} else {
				containerRef.current.style.setProperty('--animation-duration', '80s');
			}
		}
	};

	return (
		<div ref={containerRef} className={cn('scroller relative z-20 w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]', className)}>
			<div ref={scrollerRef} className={cn(' flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap', start && 'animate-scroll ', pauseOnHover && 'hover:[animation-play-state:paused]')}>
				{items.map((item) => (
					<React.Fragment key={item.id}>
						<div className="flex md:max-w-60 max-w-32 gap-2">
							<img src={item.img} alt={item.name} className="md:w-24 w-20" />
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
