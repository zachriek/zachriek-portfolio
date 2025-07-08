import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eduCards } from '@/data';
import TitleHeader from '@/components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const Educations = () => {
	useGSAP(() => {
		gsap.to('.timeline-edu', {
			transformOrigin: 'bottom bottom',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '.timeline-edu',
				start: 'top center',
				end: '70% center',
				onUpdate: (self) => {
					gsap.to('.timeline-edu', {
						scaleY: 1 - self.progress,
					});
				},
			},
		});

		gsap.utils.toArray('.eduText').forEach((text) => {
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
		<section id="educations" className="flex-center py-20 px-5 md:px-10 xl:px-0">
			<div className="w-full h-full md:px-20 px-5">
				<TitleHeader title="My Educations" sub="Educations Overview" />
				<div className="mt-32 relative">
					<div className="relative z-50 xl:space-y-32 space-y-20">
						{eduCards.map((card) => (
							<div key={card.title} className="edu-card-wrapper">
								<div>
									<div className="flex items-start">
										<div className="timeline-edu-wrapper">
											<div className="timeline-edu" />
											<div className="gradient-line w-1 h-full" />
										</div>
										<div className="eduText flex gap-5 relative z-20">
											<div className="timeline-edu-logo">
												<img src={card.logoPath} alt="logo" />
											</div>
											<div>
												<h1 className="font-semibold text-2xl md:text-3xl mb-2">{card.title}</h1>
												<h2 className="font-medium text-xl md:text-2xl opacity-80">{card.sub}</h2>
												<p className="my-5 text-white-50">&nbsp;{card.date}</p>
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

export default Educations;
