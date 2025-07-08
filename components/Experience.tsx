import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expCards } from '@/data';
import TitleHeader from '@/components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
	useGSAP(() => {
		gsap.to('.timeline', {
			transformOrigin: 'bottom bottom',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '.timeline',
				start: 'top center',
				end: '70% center',
				onUpdate: (self) => {
					gsap.to('.timeline', {
						scaleY: 1 - self.progress,
					});
				},
			},
		});

		gsap.utils.toArray('.expText').forEach((text) => {
			gsap.from(text as gsap.DOMTarget, {
				opacity: 0,
				xPercent: 0,
				duration: 1,
				ease: 'power2.inOut',
				scrollTrigger: {
					trigger: text as gsap.DOMTarget,
					start: 'top 60%',
				},
			});
		}, '<');
	}, []);

	return (
		<section id="experiences" className="flex-center py-20 px-5 md:px-10 xl:px-0">
			<div className="w-full h-full md:px-20 px-5">
				<TitleHeader title="My Experiences" sub="Experiences Overview" />
				<div className="mt-32 relative">
					<div className="relative z-50 xl:space-y-32 space-y-20">
						{expCards.map((card) => (
							<div key={card.title} className="exp-card-wrapper">
								<div>
									<div className="flex items-start">
										<div className="timeline-wrapper">
											<div className="timeline" />
											<div className="gradient-line w-1 h-full" />
										</div>
										<div className="expText flex gap-5 relative z-20">
											<div className="timeline-logo">
												<img src={card.logoPath} alt="logo" />
											</div>
											<div>
												<h1 className="font-semibold text-2xl md:text-3xl mb-2">{card.title}</h1>
												<h2 className="font-medium text-xl md:text-2xl opacity-80">{card.sub}</h2>
												<p className="my-5 text-white-50">{card.date}</p>
												<p className="text-[#839CB5] italic">Responsibilities</p>
												<ul className="list-disc ms-5 mt-5 flex flex-col gap-3 text-white-50">
													{card.responsibilities.map((responsibility, index) => (
														<li key={index} className="text-lg">
															{responsibility}
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
