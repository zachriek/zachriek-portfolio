import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import TitleHeader from './TitleHeader';
import { achievements } from '@/data';

const Achievements = () => {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	return (
		<section id="achievements" className="flex-center py-20 px-5 md:px-10 xl:px-0 relative z-10">
			<div className="w-full h-full md:px-20 px-5">
				<TitleHeader title="My Achievements" sub="Achievements Overview" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32">
					{achievements.map((achievement) => (
						<div key={achievement.id} className="group relative" onMouseEnter={() => setHoveredCard(achievement.id)} onMouseLeave={() => setHoveredCard(null)}>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							<div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:-translate-y-2">
								<div className="space-y-3">
									<h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{achievement.title}</h3>

									<p className="text-gray-300 text-sm font-medium">{achievement.subtitle}</p>

									<div className="flex items-center gap-2 text-gray-400 text-sm">
										<Calendar className="w-4 h-4" />
										<span>{achievement.date}</span>
									</div>
								</div>

								<div
									className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-opacity duration-300 ${
										hoveredCard === achievement.id ? 'opacity-100' : 'opacity-0'
									}`}
									style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'subtract' }}
								></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Achievements;
