'use client';

import React from 'react';

import { skills } from '@/data';
import { InfiniteMovingCards } from './ui/InfiniteCards';

const Skills = () => {
	return (
		<section id="skills" className="pt-20">
			<h1 className="heading">
				Here are some of my <span className="text-purple">key skills</span>
			</h1>

			<div className="flex flex-col items-center max-lg:mt-10">
				<div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden py-6 md:py-20">
					<InfiniteMovingCards items={skills} direction="right" speed="slow" pauseOnHover={false} />
				</div>
			</div>
		</section>
	);
};

export default Skills;
