'use client';

import { navItems } from '@/data';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import RecentProjects from '@/components/RecentProjects';
import Educations from '@/components/Educations';
import Achievements from '@/components/Achievements';
import { FloatingNav } from '@/components/ui/FloatingNavbar';

const Home = () => {
	return (
		<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
			<div className="max-w-7xl w-full">
				<FloatingNav navItems={navItems} />
				<Hero />
				<RecentProjects />
				<Experience />
				<Skills />
				<Educations />
				<Achievements />
				<Footer />
			</div>
		</main>
	);
};

export default Home;
