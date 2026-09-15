import { Head } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import { LandingFooter } from '@/components/Frontend/LandingFooter';
import { LandingNavigation } from '@/components/Frontend/LandingNavigation';

type ScheduleModel = {
	id?: number | string;
	title?: string | null;
	description?: string | null;
	time?: string | null;
	badge?: string | null;
	location?: string | null;
	keynote_speaker?: string | null;
	day_no?: number | string | null;
};

type LocationModel = {
	address?: string | null;
	phone?: string | null;
	email?: string | null;
};

type SocialMediaModel = {
	id?: number | string;
	facebook?: string | null;
	linkedin?: string | null;
	youtube?: string | null;
	twitter?: string | null;
};

const toBnDigits = (input: string): string => {
	const en = '0123456789';
	const bn = '০১২৩৪৫৬৭৮৯';

	return input.replace(/[0-9]/g, (digit) => bn[en.indexOf(digit)] ?? digit);
};

const toDayNumber = (value: number | string | null | undefined): number | null => {
	if (value === null || value === undefined || value === '') {
		return null;
	}

	const parsed = Number(value);

	return Number.isFinite(parsed) ? parsed : null;
};

const dayBanglaLabel = (day: number): string => {
	if (day === 1) {
		return 'প্রথম দিন';
	}

	if (day === 2) {
		return 'দ্বিতীয় দিন';
	}

	if (day === 3) {
		return 'তৃতীয় দিন';
	}

	return `${toBnDigits(String(day))}তম দিন`;
};

export default function SchedulePage({
	schedules,
	location,
	socialMedia,
}: {
	schedules?: ScheduleModel[] | null;
	location?: LocationModel | null;
	socialMedia?: SocialMediaModel | SocialMediaModel[] | null;
}) {
	const scheduleList = useMemo(() => schedules ?? [], [schedules]);

	const days = useMemo(() => {
		const unique = new Set<number>();

		scheduleList.forEach((item) => {
			const day = toDayNumber(item.day_no);

			if (day !== null && day > 0) {
				unique.add(day);
			}
		});

		return Array.from(unique).sort((a, b) => a - b);
	}, [scheduleList]);

	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const activeDay = useMemo(() => {
		if (!days.length) {
			return 1;
		}

		if (selectedDay !== null && days.includes(selectedDay)) {
			return selectedDay;
		}

		return days[0];
	}, [days, selectedDay]);

	const activeDaySchedules = useMemo(
		() => scheduleList.filter((item) => toDayNumber(item.day_no) === activeDay),
		[activeDay, scheduleList],
	);

	const shownDays = days.length ? days : [1, 2, 3];

	return (
		<>
			<Head title="Event Schedule" />

			<div className="world-habitat-day frontend-schedule-page">
				<style>{`
					* { box-sizing: border-box; }
					.frontend-schedule-page a { color: inherit; text-decoration: none; }
					.frontend-schedule-page { min-height: 100vh; background: radial-gradient(circle at 6% 0%, #dbf4ff 0%, transparent 30%), linear-gradient(180deg, #f2f9ff 0%, #ebf4fc 52%, #eaf4fc 100%); color: #123e30; }
					.frontend-schedule-page nav { position: fixed; top: 0; width: 100%; z-index: 20; color: white; background: rgba(13,30,26,.96); box-shadow: 0 10px 28px rgba(0,0,0,0.16); }
					.frontend-schedule-page .nav-inner { position: relative; width: 100%; padding: 14px 5%; display: flex; justify-content: space-between; align-items: center; }
					.frontend-schedule-page .brand { font-weight: 800; font-size: 19px; letter-spacing: 0.2px; }
					.frontend-schedule-page .brand small { display: block; color: #ebd6a3; font-size: 10px; letter-spacing: 2px; font-weight: 700; }
					.frontend-schedule-page .nav-actions { display: flex; align-items: center; gap: 22px; }
					.frontend-schedule-page .links { display: flex; gap: 22px; font-size: 14px; font-weight: 600; align-items: center; }
					.frontend-schedule-page .links a { opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease; }
					.frontend-schedule-page .links a:hover { opacity: 1; transform: translateY(-1px); }
					.frontend-schedule-page .menu-toggle { display: none; width: 42px; height: 42px; border-radius: 12px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); align-items: center; justify-content: center; flex-direction: column; gap: 5px; cursor: pointer; }
					.frontend-schedule-page .menu-toggle span { width: 18px; height: 2px; background: white; border-radius: 999px; display: block; }

					.frontend-schedule-page .schedule-main { padding: 118px 2% 80px; }
					.frontend-schedule-page .schedule-hero { text-align: center; padding: 24px 12px 34px; }
					.frontend-schedule-page .schedule-eyebrow { font-size: 13px; font-weight: 800; color: #0b8221; letter-spacing: 1px; text-transform: uppercase; }
					.frontend-schedule-page .schedule-hero h1 { margin: 8px 0 6px; color: #03471d; font-size: clamp(24px, 19.5vw, 32px); line-height: 1.1; font-weight: 800; }
					.frontend-schedule-page .schedule-hero p { margin: 0; color: #5a735c; font-size: clamp(13px, 1vw, 16px); font-weight: 600; }

					.frontend-schedule-page .schedule-shell { max-width: 1110px; margin: 0 auto; background: #ffffff; border: 1px solid #cfe2f3; border-radius: 24px; box-shadow: 0 16px 50px rgba(26, 83, 125, 0.12); padding: 34px 34px 40px; }
					.frontend-schedule-page .schedule-head { text-align: center; margin-bottom: 28px; }
					.frontend-schedule-page .schedule-head h2 { margin: 0; color: #03471d; font-size: clamp(22px, 1.1vw, 30px); line-height: 1.15; font-weight: 800; }
					.frontend-schedule-page .schedule-head p { margin: 8px 0 0; color: #566658; font-size: clamp(13px, 1vw, 16px); font-weight: 600; }
					.frontend-schedule-page .schedule-accent { width: 110px; height: 4px; border-radius: 999px; margin: 12px auto 0; background: linear-gradient(90deg, #109fbe 0%, #18c59e 55%, #e282ab 100%); }

					.frontend-schedule-page .day-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 22px; }
					.frontend-schedule-page .day-tab { border: 1px solid #c9dff2; background: #f4f9ff; border-radius: 14px; padding: 14px 12px; text-align: center; cursor: pointer; transition: all 0.2s ease; }
					.frontend-schedule-page .day-tab:hover { border-color: #90c5e7; transform: translateY(-1px); }
					.frontend-schedule-page .day-tab.active { color: #ffffff; border-color: transparent; background: linear-gradient(120deg, #125728 0%, #13b3ae 100%); box-shadow: 0 8px 20px rgba(19, 179, 159, 0.32); }
					.frontend-schedule-page .day-tab-top { display: block; font-size: clamp(13px, 1vw, 16px); font-weight: 800; letter-spacing: 0.5px; }
					.frontend-schedule-page .day-tab-bottom { display: block; margin-top: 4px; font-size: clamp(12px, 0.8vw, 14px); font-weight: 700; opacity: 0.96; }

					.frontend-schedule-page .current-day-banner { margin: 12px 0 28px; background: #cbfbdb; border: 1px solid #cbeafb; border-radius: 12px; text-align: center; color: #044b30; font-size: clamp(13px, 1.2vw, 17px); font-weight: 800; padding: 10px 12px; }

					.frontend-schedule-page .timeline { position: relative; display: grid; gap: 18px; }
					.frontend-schedule-page .timeline::before { content: ''; position: absolute; left: 196px; top: 14px; bottom: 14px; width: 2px; background: #d7ecfb; border-radius: 999px; }
					.frontend-schedule-page .timeline-item { position: relative; display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 36px; align-items: flex-start; }
					.frontend-schedule-page .timeline-time { color: #0d6ea1; font-size: clamp(13px, 0.8vw, 22px); font-weight: 800; letter-spacing: 0.4px; text-align: right; white-space: nowrap; padding-top: 8px; }
					.frontend-schedule-page .timeline-card-wrap { position: relative; }
					.frontend-schedule-page .timeline-dot { position: absolute; left: -15px; top: 10px; width: 15px; height: 15px; border-radius: 999px; background: #12a7ab; border: 4px solid #ffffff; box-shadow: 0 0 0 3px #9ddfe0; }
					.frontend-schedule-page .timeline-card { background: #ffffff; border: 1px solid #d1e4f3; border-radius: 14px; padding: 14px 16px; box-shadow: 0 8px 26px rgba(22, 90, 132, 0.08); margin-left: 15px; }
					.frontend-schedule-page .timeline-title { margin: 0 0 4px; color: #0d4f80; font-size: clamp(16px, 0.8vw, 24px); line-height: 1.1; font-weight: 800; }
					.frontend-schedule-page .timeline-description { margin: 0; color: #5f7991; font-size: clamp(14px, 1vw, 18px); line-height: 1.25; }
					.frontend-schedule-page .timeline-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
					.frontend-schedule-page .meta-pill { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 999px; background: #ecf8ff; color: #0b779f; font-size: 11px; font-weight: 700; border: 1px solid #c9eaf8; }
					.frontend-schedule-page .empty-state { padding: 26px 18px; text-align: center; border: 1px dashed #bfd9ec; border-radius: 14px; color: #5e7a93; font-size: 18px; font-weight: 600; background: #f7fbff; }

					.frontend-schedule-page .site-footer { background: #0d2b3f; color: #8fa7b5; padding: 56px 5% 10px; position: relative; overflow: hidden; border-top-left-radius: 26px; border-top-right-radius: 26px; }
					.frontend-schedule-page .site-footer::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 8% 0%, rgba(38, 167, 132, 0.13), transparent 28%), radial-gradient(circle at 92% 100%, rgba(237, 188, 67, 0.08), transparent 25%); pointer-events: none; }
					.frontend-schedule-page .footer-shell { position: relative; }
					.frontend-schedule-page .footer-inner { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 1.8fr 1fr 1.1fr 1.2fr; gap: 34px; align-items: start; }
					.frontend-schedule-page .footer-brand-line { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
					.frontend-schedule-page .footer-brand-title { margin: 0; color: #ffffff; font-size: clamp(20px, 1.3vw, 34px); line-height: 1.1; font-weight: 800; }
					.frontend-schedule-page .footer-brand-sub { margin: 6px 0 0; color: #607887; font-size: 11px; letter-spacing: 1.2px; font-weight: 600; text-transform: uppercase; }
					.frontend-schedule-page .footer-brand-copy { color: #95acb8; font-size: 16px; line-height: 1.8; max-width: 560px; margin: 8px 0 24px; }
					.frontend-schedule-page .footer-social-label { color: #7f98a6; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
					.frontend-schedule-page .footer-social-list { display: flex; gap: 10px; }
					.frontend-schedule-page .footer-social-btn { width: 32px; height: 32px; border-radius: 14px; border: 1px solid rgba(172,196,210,.35); background: rgba(255,255,255,.03); color: #f1f6f9; display: grid; place-items: center; font-size: 16px; font-weight: 800; text-decoration: none; transition: transform 0.2s ease, border-color 0.2s ease; }
					.frontend-schedule-page .footer-social-btn:hover { transform: translateY(-2px); border-color: rgba(231,192,88,.62); }
					.frontend-schedule-page .footer-col-title { margin: 2px 0 16px; color: #ffffff; font-size: 18px; line-height: 1.1; font-weight: 800; }
					.frontend-schedule-page .footer-link-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
					.frontend-schedule-page .footer-link-list a { color: #a9bfcb; font-size: 12px; line-height: 1.15; text-decoration: none; font-weight: 600; }
					.frontend-schedule-page .footer-link-list a:hover { color: #ffffff; }
					.frontend-schedule-page .footer-link-list-muted a { color: #90a8b6; }
					.frontend-schedule-page .footer-contact-col { display: grid; gap: 12px; }
					.frontend-schedule-page .footer-contact-card { display: flex; gap: 12px; align-items: center; padding: 14px 14px; border-radius: 16px; background: rgba(145,171,188,0.12); border: 1px solid rgba(172,196,210,.2); }
					.frontend-schedule-page .footer-contact-icon { width: 32px; height: 32px; border-radius: 12px; display: grid; place-items: center; background: rgba(168,191,205,.16); color: #dbab30; font-weight: 800; font-size: 20px; flex-shrink: 0; }
					.frontend-schedule-page .footer-contact-card small { display: block; color: #8ea5b2; font-size: 17px; line-height: 1.2; }
					.frontend-schedule-page .footer-contact-card strong { display: block; color: #f5fbff; font-size: 24px; letter-spacing: 1px; line-height: 1.12; }
					.frontend-schedule-page .footer-meta-row { max-width: 1150px; margin: 36px auto 0; padding: 16px 0; border-top: 1px solid rgba(190,208,219,.2); border-bottom: 1px solid rgba(190,208,219,.2); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
					.frontend-schedule-page .footer-meta-left { display: inline-flex; align-items: center; gap: 12px; color: #8da4b2; font-size: 14px; }
					.frontend-schedule-page .footer-status-dot { width: 10px; height: 10px; border-radius: 999px; background: #41c6a2; box-shadow: 0 0 0 6px rgba(65,198,162,.12); }
					.frontend-schedule-page .footer-meta-link { color: #f0c54f; text-decoration: none; font-size: 18px; font-weight: 800; }
					.frontend-schedule-page .bottom-bar { max-width: 1150px; margin: 20px auto 0; text-align: center; color: #6b8290; font-size: 12px; position: relative; }

					@media (max-width: 1100px) {
						.frontend-schedule-page .footer-inner { grid-template-columns: 1fr 1fr; }
						.frontend-schedule-page .schedule-shell { padding: 26px 18px 30px; }
                        .frontend-schedule-page .timeline-card{margin-left: 1px}
					}

					@media (max-width: 850px) {
                      .frontend-schedule-page .timeline-card{margin-left: 1px}
						.frontend-schedule-page .nav-inner { padding: 12px 16px; }
						.frontend-schedule-page .menu-toggle { display: inline-flex; }
						.frontend-schedule-page .links { position: absolute; top: calc(100% + 8px); left: 16px; right: 16px; display: none; flex-direction: column; align-items: flex-start; gap: 16px; padding: 18px 16px; border-radius: 18px; background: rgba(14, 60, 47, 0.96); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 18px 40px rgba(0,0,0,.18); }
						.frontend-schedule-page .links.open { display: flex; }
						.frontend-schedule-page .links a { font-size: 15px; }
						.frontend-schedule-page .schedule-main { padding-top: 104px; }
						.frontend-schedule-page .timeline { gap: 14px; }
						.frontend-schedule-page .timeline::before { left: 13px; top: 12px; bottom: 12px; }
						.frontend-schedule-page .timeline-item { grid-template-columns: 1fr; gap: 8px; }
						.frontend-schedule-page .timeline-time { text-align: left; padding-left: 42px; }
						.frontend-schedule-page .timeline-card-wrap { padding-left: 42px; }
						.frontend-schedule-page .timeline-dot { left: 3px; top: 8px; }
						.frontend-schedule-page .day-tabs { grid-template-columns: 1fr; }
					}

					@media (max-width: 720px) {
						.frontend-schedule-page .site-footer { border-top-left-radius: 20px; border-top-right-radius: 20px; }
						.frontend-schedule-page .footer-inner { grid-template-columns: 1fr; gap: 24px; }
						.frontend-schedule-page .footer-brand-title { font-size: 26px; }
						.frontend-schedule-page .footer-brand-copy { font-size: 14px; line-height: 1.7; }
						.frontend-schedule-page .footer-social-label { font-size: 20px; }
						.frontend-schedule-page .footer-social-btn { width: 30px; height: 30px; font-size: 16px; border-radius: 12px; }
						.frontend-schedule-page .footer-col-title { font-size: 20px; margin-bottom: 10px; }
						.frontend-schedule-page .footer-link-list a { font-size: 18px; }
						.frontend-schedule-page .footer-contact-card strong { font-size: 28px; }
						.frontend-schedule-page .footer-contact-card small { font-size: 13px; }
						.frontend-schedule-page .footer-meta-row { flex-direction: column; align-items: flex-start; }
						.frontend-schedule-page .footer-meta-link { font-size: 20px; }
					}
				`}</style>

				<LandingNavigation />

				<main className="schedule-main">
					<section className="schedule-hero">
						<div className="schedule-eyebrow">EVENT SCHEDULE</div>
						<h1>৩ দিনব্যাপী অনুষ্ঠানসূচি</h1>
						<p>বিশ্ব বসতি দিবস ২০২৬-এর বিস্তারিত অনুষ্ঠানসূচি</p>
					</section>

					<section className="schedule-shell">
						<div className="schedule-head">
							<h2>অনুষ্ঠানসূচি</h2>
							<p>তিন দিনব্যাপী আয়োজনে অংশগ্রহণকারীদের জন্য বিস্তারিত সময়সূচি</p>
							<div className="schedule-accent" />
						</div>

						<div className="day-tabs">
							{shownDays.map((day) => {
								const isActive = day === activeDay;

								return (
									<button
										key={day}
										type="button"
										className={`day-tab ${isActive ? 'active' : ''}`}
										onClick={() => setSelectedDay(day)}
									>
										<span className="day-tab-top">DAY {String(day).padStart(2, '0')}</span>
										<span className="day-tab-bottom">{dayBanglaLabel(day)}</span>
									</button>
								);
							})}
						</div>

						<div className="current-day-banner">
							{toBnDigits(String(activeDay))} অক্টোবর ২০২৬ - {dayBanglaLabel(activeDay)}
						</div>

						{activeDaySchedules.length ? (
							<div className="timeline">
								{activeDaySchedules.map((item) => (
									<div className="timeline-item" key={String(item.id ?? `${item.time ?? 'item'}-${item.title ?? ''}`)}>
										<div className="timeline-time">{toBnDigits(item.time || '--')}</div>
										<div className="timeline-card-wrap">
											<span className="timeline-dot" />
											<article className="timeline-card">
												<h3 className="timeline-title">{item.title || 'অনুষ্ঠানের শিরোনাম'}</h3>
												<p className="timeline-description">{item.description || 'বিস্তারিত তথ্য শীঘ্রই জানানো হবে।'}</p>
												<div className="timeline-meta">
													{item.badge ? <span className="meta-pill">{item.badge}</span> : null}
													{item.location ? <span className="meta-pill">স্থান: {item.location}</span> : null}
													{item.keynote_speaker ? <span className="meta-pill">বক্তা: {item.keynote_speaker}</span> : null}
												</div>
											</article>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="empty-state">
								{dayBanglaLabel(activeDay)} এর জন্য এখনো কোনো সেশন যোগ করা হয়নি।
							</div>
						)}
					</section>
				</main>

				<LandingFooter location={location} socialMedia={socialMedia} />
			</div>
		</>
	);
}
