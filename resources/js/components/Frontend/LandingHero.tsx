import { Link } from '@inertiajs/react';
import React from 'react';

type HeroModel = {
    description?: string | null;
    logo?: string | null;
};

type EventStatModel = {
    event_name?: string | null;
    location?: string | null;
    event_date?: string | null;
    time?: string | null;
};

export const LandingHero: React.FC<{
    hero?: HeroModel | null;
    eventStat?: EventStatModel | null;
}> = ({ hero, eventStat }) => {
    const eventName = eventStat?.event_name || 'WORLD HABITAT DAY 2026';
    const eventLocation = eventStat?.location || 'ঢাকা, বাংলাদেশ';
    const eventTime = eventStat?.time || '09:00 AM';
    const eventDate = eventStat?.event_date ? new Date(`${eventStat.event_date}T00:00:00+06:00`) : new Date('2026-10-05T00:00:00+06:00');
    const formattedDate = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(eventDate);
    const heroDescription = hero?.description || 'নিজস্ব শহর, নিরাপদ পরিবেশ ও অন্তর্ভুক্তিমূলক নগর উন্নয়নে আমরা একসাথে কাজ করি।';
    const heroImage = hero?.logo
        ? hero.logo.startsWith('http')
            ? hero.logo
            : `/storage/${hero.logo}`
        : 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80';

    return (
        <header className="hero hero-v2" id="home">
            <div className="hero-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,25,39,0.88), rgba(9,28,37,0.52) 42%, rgba(3,23,31,0.62)), url("${heroImage}")` }} />
            <div className="hero-content hero-content-centered">
                <div className="hero-badge">🏛 {eventName}</div>

                <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">বিশ্ব বসতি দিবস <span className="text-green-500">২০২৬</span> </h1>

                <p
                    className="hero-copy"
                    dangerouslySetInnerHTML={{ __html: heroDescription }}
                />

                <div className="hero-stat-grid" aria-label="Event statistics">
                    <div className="hero-stat-card">
                        <span className="hero-stat-number" id="d">00</span>
                        <span className="hero-stat-label">দিন</span>
                    </div>
                    <div className="hero-stat-card">
                        <span className="hero-stat-number" id="h">00</span>
                        <span className="hero-stat-label">ঘণ্টা</span>
                    </div>
                    <div className="hero-stat-card">
                        <span className="hero-stat-number" id="m">00</span>
                        <span className="hero-stat-label">মিনিট</span>
                    </div>
                    <div className="hero-stat-card">
                        <span className="hero-stat-number" id="s">00</span>
                        <span className="hero-stat-label">সেকেন্ড</span>
                    </div>
                </div>

                <div className="hero-meta-row">
                    <div className="hero-meta-item">
                        <span className="hero-meta-icon">📍</span>
                        <span dangerouslySetInnerHTML={{ __html: eventLocation }} />
                    </div>
                    <div className="hero-meta-item">
                        <span className="hero-meta-icon">🗓️</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="hero-meta-item">
                        <span className="hero-meta-icon">🕘</span>
                        <span>{eventTime}</span>
                    </div>
                </div>

                <div className="hero-actions">
                    <Link href="/user_register" className="hero-primary-btn">রেজিস্ট্রেশন করুন →</Link>
                    <a href="#program" className="hero-secondary-btn">বিস্তারিত দেখুন</a>
                </div>
            </div>
        </header>
    );
};
