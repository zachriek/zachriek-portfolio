'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const FloatingNav = ({
	navItems,
	className,
}: {
	navItems: {
		name: string;
		link: string;
		icon?: JSX.Element;
	}[];
	className?: string;
}) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useMotionValueEvent(scrollYProgress, 'change', (current) => {
		if (typeof current === 'number') {
			let direction = current! - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.05) {
				setVisible(true);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			}
		}
	});

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn('fixed z-[5000] inset-x-0 mx-auto', 'top-4 px-4', 'sm:top-6 sm:px-6', 'md:top-10 md:px-10', className)}
			>
				{/* Main Navigation Container */}
				<div
					className={cn(
						'flex items-center justify-between',
						'px-5 py-4 rounded-lg border border-black/.1',
						'shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]',
						'max-w-fit mx-auto',
						'md:max-w-fit md:min-w-[70vw] lg:min-w-fit',
						'md:justify-center md:space-x-4'
					)}
					style={{
						backdropFilter: 'blur(16px) saturate(180%)',
						backgroundColor: 'rgba(17, 25, 40, 0.75)',
						borderRadius: '12px',
						border: '1px solid rgba(255, 255, 255, 0.125)',
					}}
				>
					<div className="flex justify-between items-center gap-x-20">
						<div>
							<span className="text-white font-semibold text-lg">zachriek </span> <span className="font-mono">{`</>`}</span>
						</div>

						<div className="hidden md:flex items-center space-x-4">
							{navItems.map((navItem: any, idx: number) => (
								<Link
									key={`link=${idx}`}
									href={navItem.link}
									className={cn('relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500')}
								>
									<span className="text-sm">{navItem.icon}</span>
									<span className="text-sm !cursor-pointer">{navItem.name}</span>
								</Link>
							))}
						</div>

						<button onClick={toggleMenu} className="md:hidden rounded-md text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
							<motion.div animate={isOpen ? 'open' : 'closed'} className="w-6 h-6 relative">
								<motion.span
									className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
									variants={{
										closed: { rotate: 0, y: 0 },
										open: { rotate: 45, y: 8 },
									}}
									transition={{ duration: 0.3 }}
								/>
								<motion.span
									className="absolute top-2 left-0 w-full h-0.5 bg-white rounded-full"
									variants={{
										closed: { opacity: 1 },
										open: { opacity: 0 },
									}}
									transition={{ duration: 0.3 }}
								/>
								<motion.span
									className="absolute top-4 left-0 w-full h-0.5 bg-white rounded-full"
									variants={{
										closed: { rotate: 0, y: 0 },
										open: { rotate: -45, y: -8 },
									}}
									transition={{ duration: 0.3 }}
								/>
							</motion.div>
						</button>
					</div>
				</div>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="md:hidden mt-2 mx-auto max-w-fit"
						>
							<div
								className={cn('py-4 px-6 rounded-lg border border-black/.1', 'shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]')}
								style={{
									backdropFilter: 'blur(16px) saturate(180%)',
									backgroundColor: 'rgba(17, 25, 40, 0.75)',
									borderRadius: '12px',
									border: '1px solid rgba(255, 255, 255, 0.125)',
								}}
							>
								<div className="flex flex-col space-y-3">
									{navItems.map((navItem: any, idx: number) => (
										<Link
											key={`mobile-link=${idx}`}
											href={navItem.link}
											onClick={closeMenu}
											className={cn(
												'relative dark:text-neutral-50 items-center flex space-x-3 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500',
												'px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white/10',
												'whitespace-nowrap'
											)}
										>
											<span className="text-sm">{navItem.icon}</span>
											<span className="text-sm !cursor-pointer">{navItem.name}</span>
										</Link>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm" onClick={closeMenu} />}
			</motion.div>
		</AnimatePresence>
	);
};
