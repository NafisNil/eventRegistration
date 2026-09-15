import React, { useEffect } from 'react';
import { LandingAbout } from './LandingAbout';
import { LandingFooter } from './LandingFooter';
import { LandingGuests } from './LandingGuests';
import { LandingHero } from './LandingHero';
import { LandingHighlights } from './LandingHighlights';
import { LandingLeadership } from './LandingLeadership';
import { LandingLoader } from './LandingLoader';
import { LandingNavigation } from './LandingNavigation';
import { LandingProgram } from './LandingProgram';
import { LandingRegistration } from './LandingRegistration';
import { LandingSupport } from './LandingSupport';
import { LandingToast } from './LandingToast';
import { LandingVenue } from './LandingVenue';

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

type AboutModel = {
    description?: string | null;
    reason_to_attend?: string | null;
    objectives?: string | null;
};

type ProgramHighlightModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    logo?: string | null;
};

type GuestModel = {
    id?: number | string;
    name?: string | null;
    designation?: string | null;
    description?: string | null;
    logo?: string | null;
    expertise?: string | null;
    type?: string | null;
};

type ScheduleModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    time?: string | null;
    badge?: string | null;
    location?: string | null;
    keynote_speaker?: string | null;
};

type ParticipantTypeModel = {
    id?: number | string;
    name?: string | null;
};

type LocationModel = {
    id?: number | string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    map?: string | null;
};

type LeadershipModel = {
    id?: number | string;
    name?: string | null;
    role?: string | null;
    ministry?: string | null;
    logo?: string | null;
};

type PartnerModel = {
    id?: number | string;
    name?: string | null;
    logo?: string | null;
    link?: string | null;
    featured?: boolean | number | null;
    partnership_category?: {
        id?: number | string;
        name?: string | null;
    } | null;
};

type SocialMediaModel = {
    id?: number | string;
    facebook?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    twitter?: string | null;
};

export const WorldHabitatLanding: React.FC<{
    hero?: HeroModel | null;
    eventStat?: EventStatModel | null;
    about?: AboutModel | null;
    programHighlights?: ProgramHighlightModel[] | null;
    guests?: GuestModel[] | null;
    schedules?: ScheduleModel[] | null;
    participantTypes?: ParticipantTypeModel[] | null;
    location?: LocationModel | null;
    leaderships?: LeadershipModel[] | null;
    partners?: PartnerModel[] | null;
    socialMedia?: SocialMediaModel | SocialMediaModel[] | null;
}> = ({ hero, eventStat, about, programHighlights, guests, schedules, participantTypes, location, leaderships, partners, socialMedia }) => {
    useEffect(() => {
        const buildTargetTime = () => {
            const eventDate = eventStat?.event_date || '2026-10-05';
            const eventTime = eventStat?.time || '09:00 AM';
            const match = eventTime.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);

            if (!match) {
                return new Date(`${eventDate}T09:00:00+06:00`).getTime();
            }

            let hours = Number(match[1]);
            const minutes = Number(match[2] || 0);
            const meridiem = match[3]?.toUpperCase();

            if (meridiem === 'PM' && hours < 12) hours += 12;
            if (meridiem === 'AM' && hours === 12) hours = 0;

            return new Date(`${eventDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00+06:00`).getTime();
        };

        const target = buildTargetTime();

        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, target - now);

            const d = document.getElementById('d');
            const h = document.getElementById('h');
            const m = document.getElementById('m');
            const s = document.getElementById('s');

            if (d) d.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
            if (h) h.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
            if (m) m.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            if (s) s.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        };

        tick();
        const countdownId = window.setInterval(tick, 1000);

        const nav = document.getElementById('nav');
        const handleScroll = () => {
            if (nav) {
                nav.classList.toggle('scrolled', window.scrollY > 50);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        const form = document.getElementById('worldHabitatForm') as HTMLFormElement | null;
        const toast = document.getElementById('toast');

        const handleSubmit = (event: Event) => {
            const target = event.target as HTMLFormElement | null;

            if (!target || target.id !== 'worldHabitatForm') {
                return;
            }

            if (target.dataset.localSubmit === 'true') {
                event.preventDefault();
                if (toast) {
                    toast.classList.add('show');
                    window.setTimeout(() => toast.classList.remove('show'), 3000);
                }
                target.reset();
            }
        };

        const handleLoaderClick = (event: Event) => {
            const targetEl = event.target as HTMLElement | null;
            const link = targetEl?.closest('a[href]');

            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return;

            const section = document.querySelector(href);
            if (!section) return;

            event.preventDefault();

            const loader = document.getElementById('eventLoader');
            if (loader) {
                loader.classList.add('is-active');
                loader.setAttribute('aria-hidden', 'false');
            }

            window.setTimeout(() => {
                window.history.pushState(null, '', href);
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.setTimeout(() => {
                    if (loader) {
                        loader.classList.remove('is-active');
                        loader.setAttribute('aria-hidden', 'true');
                    }
                }, 650);
            }, 320);
        };

        form?.addEventListener('submit', handleSubmit);
        document.addEventListener('click', handleLoaderClick);

        const loader = document.getElementById('eventLoader');
        if (loader) {
            window.setTimeout(() => loader.classList.remove('is-active'), 250);
        }

        return () => {
            window.clearInterval(countdownId);
            window.removeEventListener('scroll', handleScroll);
            form?.removeEventListener('submit', handleSubmit);
            document.removeEventListener('click', handleLoaderClick);
        };
    }, []);

    return (
        <div className="world-habitat-day">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700;800&display=swap');
                * { box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body { margin: 0; font-family: 'Noto Sans Bengali', sans-serif; background: #f5faf7; color: #163b2f; }
                a { color: inherit; text-decoration: none; }
                .world-habitat-day { background: linear-gradient(180deg, #f7f2ea 0%, #f4f8f6 22%, #f3f7f6 100%); color: #163b2f; line-height: 1.5; }
                .world-habitat-day nav { position: fixed; top: 0; width: 100%; z-index: 10; color: white; transition: 0.3s ease; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: linear-gradient(180deg, rgba(13,30,26,.78), rgba(13,30,26,0)); }
                .world-habitat-day .nav-inner { position: relative; width: 100%; padding: 14px 5%; display: flex; justify-content: space-between; align-items: center; }
                .world-habitat-day nav.scrolled { background: rgba(13,30,26,.96); box-shadow: 0 18px 45px rgba(0,0,0,0.18); }
                .world-habitat-day .brand { font-weight: 800; font-size: 19px; letter-spacing: 0.2px; }
                .world-habitat-day .brand small { display: block; color:#00b300; font-size: 10px; letter-spacing: 1px; font-weight: 700; }
                .world-habitat-day .nav-actions { display: flex; align-items: center; gap: 22px; }
                .world-habitat-day .links { display: flex; gap: 22px; font-size: 14px; font-weight: 600; align-items: center; }
                .world-habitat-day .links a { opacity: 0.86; transition: opacity 0.2s ease, transform 0.2s ease; }
                .world-habitat-day .links a:hover { opacity: 1; transform: translateY(-1px); }
                .world-habitat-day .btn { display: inline-block; background: linear-gradient(135deg, #d7b77a 0%, #b98942 100%); color: #fff !important; padding: 12px 22px; border-radius: 999px; font-weight: 800; border: 0; cursor: pointer; box-shadow: 0 16px 30px rgba(184,137,66,.28); transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; text-decoration: none; letter-spacing: 0.02em; }
                .world-habitat-day .menu-toggle { display: none; width: 42px; height: 42px; border-radius: 12px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); align-items: center; justify-content: center; flex-direction: column; gap: 5px; cursor: pointer; }
                .world-habitat-day .menu-toggle span { width: 18px; height: 2px; background: white; border-radius: 999px; display: block; }
                .world-habitat-day .mobile-btn { display: none; }
                .world-habitat-day .btn:hover { transform: translateY(-2px); box-shadow: 0 18px 35px rgba(184,137,66,.35); filter: saturate(1.08); }
                .world-habitat-day .btn.alt { background: rgba(255,255,255,.96); color: #143f33 !important; box-shadow: 0 16px 26px rgba(15,69,55,.22); }
                .world-habitat-day .hero { min-height: 94vh; position: relative; display: flex; align-items: center; overflow: hidden; }
                .world-habitat-day .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: saturate(1.1) contrast(1.05) brightness(0.72); transform: scale(1.08); animation: heroImageZoom 18s ease-in-out infinite alternate; }
                .world-habitat-day .hero-bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,31,25,.8), rgba(13,32,27,.42), rgba(13,32,27,.18)); }
                .world-habitat-day .hero-content { position: relative; z-index: 2; width: 90%; max-width: 960px; margin: auto; color: #fff; padding-top: 60px; }
                .world-habitat-day .hero-v2 { min-height: 100vh; }
                .world-habitat-day .hero-content-centered { width: min(1000px, 92%); text-align: center; padding-top: 88px; }
                .world-habitat-day .hero-badge { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 10px 22px; border-radius: 999px; background: rgba(34, 180, 148, 0.18); border: 1px solid rgba(122, 234, 206, 0.42); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04), 0 12px 30px rgba(8,25,32,0.18); color: #dffaf3; font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
                .world-habitat-day .hero-title { margin: 28px auto 18px; font-size: clamp(46px, 3vw, 108px); line-height: 0.96; letter-spacing: -0.05em; text-shadow: 0 14px 40px rgba(0,0,0,.25); max-width: 980px; }
                .world-habitat-day .hero-copy { max-width: 780px; margin: 0 auto 26px; font-size: 19px; line-height: 1.7; color: rgba(255,255,255,0.9); }
                .world-habitat-day .hero-stat-grid { max-width: 600px; margin: 0 auto 34px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
                .world-habitat-day .hero-stat-card { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100px; border-radius: 20px; background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.12); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.11); backdrop-filter: blur(8px); }
                .world-habitat-day .hero-stat-number { display: block; color: #4fe1be; font-size: clamp(28px, 1vw, 52px); line-height: 1; font-weight: 800; }
                .world-habitat-day .hero-stat-label { display: block; margin-top: 2px; color: rgba(255,255,255,0.88); font-size: 14px; letter-spacing: 0.02em; }
                .world-habitat-day .hero-meta-row { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; margin-bottom: 28px; }
                .world-habitat-day .hero-meta-item { display: inline-flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 20px; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.88); border: 1px solid rgba(255,255,255,0.1); font-size: 12px; }
                .world-habitat-day .hero-meta-icon { font-size: 16px; }
                .world-habitat-day .hero-actions { display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; }
                .world-habitat-day .hero-primary-btn,
                .world-habitat-day .hero-secondary-btn { display: inline-flex; align-items: center; justify-content: center; min-width: 200px; min-height: 48px; border-radius: 16px; font-weight: 800; font-size: 15px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .world-habitat-day .hero-primary-btn { background: linear-gradient(135deg, #1ec5a0, #14a78d); color: #fff; box-shadow: 0 14px 26px rgba(25,135,112,0.35); }
                .world-habitat-day .hero-secondary-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16); color: #fff; }
                .world-habitat-day .hero-primary-btn:hover,
                .world-habitat-day .hero-secondary-btn:hover { transform: translateY(-2px); }
                .world-habitat-day .tag { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.08); border-radius: 999px; backdrop-filter: blur(8px); font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: inset 0 1px 1px rgba(255,255,255,.16), 0 10px 25px rgba(0,0,0,.15); }
                .world-habitat-day h1 { font-size: clamp(32px, 6.5vw, 38px); line-height: 1.18; margin: 18px 0; max-width: 850px; text-shadow: 0 14px 40px rgba(0,0,0,.28); letter-spacing: -1px; }
                .world-habitat-day .hero p { max-width: 730px; font-size: 19px; line-height: 1.8; color: rgba(255,255,255,0.9); }
                .world-habitat-day .meta { display: flex; align-items: center; justify-content: flex-start; gap: 12px; flex-wrap: wrap; margin: 28px 0; }
                .world-habitat-day .meta span { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 9px 16px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); font-size: 14px; line-height: 1.2; box-shadow: 0 10px 25px rgba(9,37,30,.12); }
                .world-habitat-day .hero-location { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 10px 28px; border-radius: 999px; background: rgba(255,255,255,.12); border: 1px solid rgba(239,212,123,.38); color: #fff; text-align: center; box-shadow: 0 12px 30px rgba(2,35,30,.18); }
                .world-habitat-day .hero-location p,
                .world-habitat-day .hero-location span { margin: 0; color: inherit; font-size: inherit; line-height: 1.2; }
                .world-habitat-day .count { width: min(900px, 90%); margin: -60px auto 0; position: relative; z-index: 4; background: rgba(255,255,255,.96); border: 1px solid rgba(121,162,147,.25); border-radius: 28px; box-shadow: 0 26px 80px rgba(12,64,48,.16); backdrop-filter: blur(12px); display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; }
                .world-habitat-day .count > div { padding: 24px 30px; }
                .world-habitat-day .count b { font-size: 35px; color: #073c2d; display: block; }
                .world-habitat-day .count small { color: #71847c; letter-spacing: 0.18em; font-size: 10px; }
                .world-habitat-day section { padding: 90px 5%; scroll-margin-top: 82px; position: relative; }
                .world-habitat-day section:not(.dark):not(.support-section):not(.ministry-leadership)::before { content: ""; display: block; width: 52px; height: 4px; background: linear-gradient(90deg, #d9465f, #ef9e5d); border-radius: 9px; margin: 0 auto 22px; opacity: 0.9; }
                .world-habitat-day .wrap { max-width: 1150px; margin: auto; }
                .world-habitat-day .head { text-align: center; max-width: 720px; margin: 0 auto 45px; }
                .world-habitat-day .eyebrow { color: #b98942; font-size: 12px; font-weight: 800; letter-spacing: 2px; }
                .world-habitat-day .head h2 { font-size: 32px; margin: 8px 0; color: #123e30; line-height: 1.2; font-weight: 800; }
                .world-habitat-day .head p { color: #6b7e76; line-height: 1.8; }
                .world-habitat-day .about { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: stretch; max-width: 1300px; margin: 0 auto; }
                .world-habitat-day .about { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; align-items: stretch; max-width: 1300px; margin: 0 auto; }
                .world-habitat-day .about-card { position: relative; padding: 22px 24px 18px; border-radius: 26px; background: rgba(255,255,255,.78); border: 1px solid rgba(17,54,46,0.08); box-shadow: 0 18px 45px rgba(11,47,37,.04); overflow: hidden; }
                .world-habitat-day .about-card-alt { background: rgba(183, 218, 205, 0.22); }
                .world-habitat-day .about-icon { display: grid; place-items: center; width: 50px; height: 50px; border-radius: 10px; margin-bottom: 18px; box-shadow: 0 10px 28px rgba(14, 49, 40, 0.18); }
                .world-habitat-day .about-icon-primary { background: linear-gradient(135deg, #0e2f3d, #0f3f52); }
                .world-habitat-day .about-icon-secondary { background: linear-gradient(135deg, #0d413d, #0e5c4d); }
                .world-habitat-day .about-icon-mark { position: relative; width: 30px; height: 30px; border-radius: 900px; background: linear-gradient(135deg, #e8c76d, #d4a94f); display: block; box-shadow: inset 0 0 0 6px rgba(255,255,255,0.08); }
                .world-habitat-day .about-icon-mark::before { content: ""; position: absolute; inset: 8px; border-radius: 999px; border: 4px solid rgba(13, 46, 50, 0.9); background: rgba(12, 47, 53, 0.14); }
                .world-habitat-day .about-label { color: #1e9d80; font-size: 12px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 12px; }
                .world-habitat-day .about-card h3 { margin: 0 0 18px; font-size: clamp(28px, 1.4vw, 52px); line-height: 0.98; letter-spacing: -0.05em; color: #0b2d39;  font-weight: 600; }
                .world-habitat-day .about-copy { color: #214a42; font-size: 18px; line-height: 1.7; max-width: 1100px; }
                .world-habitat-day .about-copy p { margin: 0; }
                .world-habitat-day .about-card-alt .about-label { color: #168a70; }
                .world-habitat-day .about-card-alt h3 { color: #0f3a3d; }
                .world-habitat-day .about-card-alt .about-copy { color: #214a42; }
                .world-habitat-day .about-card::after { content: ""; position: absolute; right: -54px; bottom: -66px; width: 210px; height: 210px; border-radius: 50%; background: rgba(113, 185, 165, 0.12); }
                .world-habitat-day .about-card-alt::after { background: rgba(97, 173, 160, 0.08); }
                .world-habitat-day .about-banner { display: grid; grid-template-columns: 56px minmax(0, 220px) 1fr auto; align-items: center; gap: 18px; margin-top: 32px; padding: 12px 28px; border: 1px solid rgba(21, 98, 86, 0.42); border-radius: 15px; background: rgba(237, 244, 241, 0.7); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2); }
                .world-habitat-day .about-banner-check { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: rgba(30, 157, 128, 0.12); color: #1a8d73; font-size: 20px; font-weight: 800; }
                .world-habitat-day .about-banner-text { color: #0f3c3d; font-size: clamp(18px, 1vw, 30px); font-weight: 800; letter-spacing: -0.04em; }
                .world-habitat-day .about-banner-body { color: #163f3b; font-size: 14px; line-height: 1.3; }
                .world-habitat-day .about-banner-body span { display: inline-block; }
                .world-habitat-day .about-banner-link { color: #108b73; font-size: clamp(18px, 1.2vw, 30px); font-weight: 700; text-decoration: none; white-space: nowrap; }
                .world-habitat-day .about-banner-link span { display: inline-block; transform: translateY(-1px); }
                @media (max-width: 900px) {
                    .world-habitat-day .about-banner { grid-template-columns: 40px 1fr; align-items: start; gap: 12px 14px; padding: 14px 16px; }
                    .world-habitat-day .about-banner-check { width: 28px; height: 28px; font-size: 16px; margin-top: 2px; }
                    .world-habitat-day .about-banner-text { font-size: 20px; }
                    .world-habitat-day .about-banner-body { grid-column: 2 / -1; font-size: 13px; line-height: 1.5; }
                    .world-habitat-day .about-banner-link { grid-column: 2 / -1; font-size: 16px; white-space: normal; }
                }
                @media (max-width: 560px) {
                    .world-habitat-day .about-banner { grid-template-columns: 1fr; gap: 10px; }
                    .world-habitat-day .about-banner-check { margin: 0; }
                    .world-habitat-day .about-banner-body,
                    .world-habitat-day .about-banner-link { grid-column: auto; }
                }
                .world-habitat-day .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
                .world-habitat-day .card { background: #fff; padding: 23px; border-radius: 20px; box-shadow: 0 10px 30px rgba(22,59,47,.08); border: 1px solid rgba(98,138,128,.15); transition: transform 0.25s ease, box-shadow 0.25s ease; }
                .world-habitat-day .card:hover { transform: translateY(-7px); box-shadow: 0 20px 40px rgba(22,59,47,.12); }
                .world-habitat-day .icon { font-size: 32px; }
                .world-habitat-day .card h3 { font-size: 15px; margin: 12px 0 8px; }
                .world-habitat-day .card p { font-size: 12px; color: #70827b; line-height: 1.4; }
                .world-habitat-day .dark { background: linear-gradient(180deg, #0c503b, #0a402f); color: #fff; }
                .world-habitat-day .dark .head h2 { color: white; }
                .world-habitat-day .dark .head p { color: #c7ddd4; }
                @keyframes heroImageZoom {
                    0% { transform: scale(1.08); }
                    100% { transform: scale(1.22); }
                }
                .world-habitat-day .guests { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
                .world-habitat-day .guest { background: white; border-radius: 20px; overflow: hidden; text-align: center; }
                .world-habitat-day .photo { height: 190px; background: linear-gradient(135deg, #d6eee4, #9ecab8); display: grid; place-items: center; font-size: 62px; overflow: hidden; position: relative; }
                .world-habitat-day .photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
                .world-habitat-day .photo span { display: grid; place-items: center; width: 100%; height: 100%; color: rgba(18, 62, 48, 0.75); }
                .world-habitat-day .guest-info { padding: 18px; }
                .world-habitat-day .guest-info small { color: #e04e5c; font-weight: 800; letter-spacing: 0.1em; }
                .world-habitat-day .guest-info h3 { margin: 10px 0 8px; color: #123e30; font-size: 22px; }
                .world-habitat-day .guest-info p { font-size: 13px; color: #72827c; margin: 0; }
                .world-habitat-day .timeline { max-width: 850px; margin: auto; }
                .world-habitat-day .item { display: grid; grid-template-columns: 130px 1fr; gap: 25px; padding: 24px 0; border-bottom: 1px solid #dce8e2; }
                .world-habitat-day .item time { font-weight: 800; color: #087b51; }
                .world-habitat-day .item h3 { margin: 0 0 5px; }
                .world-habitat-day .item p { margin: 0; color: #718079; font-size: 14px; }
                .world-habitat-day .register { background: linear-gradient(135deg, #e2f3ea, #f8f2e9); }
                .world-habitat-day form { max-width: 800px; margin: auto; background: #fff; padding: 32px; border-radius: 26px; box-shadow: 0 15px 45px rgba(22,59,47,.1); }
                .world-habitat-day .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .world-habitat-day .field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
                .world-habitat-day .field.full { grid-column: 1 / -1; }
                .world-habitat-day .field label { font-size: 13px; font-weight: 700; }
                .world-habitat-day .field input, .world-habitat-day .field select, .world-habitat-day .field textarea { width: 100%; max-width: 100%; min-width: 0; display: block; box-sizing: border-box; padding: 13px; border: 1px solid #d9e5df; border-radius: 11px; font-family: inherit; font-size: 14px; }
                .world-habitat-day .submit { width: 100%; margin-top: 18px; border: none; }
                .world-habitat-day .venue { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .world-habitat-day .venuebox { padding: 35px; border-radius: 25px; background: #123e30; color: #fff; }
                .world-habitat-day .venuebox h2 { color: #fff; margin-top: 0; }
                .world-habitat-day .venue-meta { display: grid; gap: 8px; line-height: 1.9; color: #c9ddd6; }
                .world-habitat-day .venue-location { color: inherit; }
                .world-habitat-day .venue-location p,
                .world-habitat-day .venue-location span,
                .world-habitat-day .venue-location strong,
                .world-habitat-day .venue-location em { margin: 0; color: inherit; line-height: 1.5; }
                .world-habitat-day .map { border-radius: 25px; background: linear-gradient(135deg, #d4e9e1, #eef5f1); display: grid; place-items: center; font-size: 65px; min-height: 200px; }
                .world-habitat-day .site-footer { background: #0d2b3f; color: #8fa7b5; padding: 56px 5% 10px; position: relative; overflow: hidden; border-top-left-radius: 26px; border-top-right-radius: 26px; }
                .world-habitat-day .site-footer::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 8% 0%, rgba(38, 167, 132, 0.13), transparent 28%), radial-gradient(circle at 92% 100%, rgba(237, 188, 67, 0.08), transparent 25%); pointer-events: none; }
                .world-habitat-day .footer-shell { position: relative; }
                .world-habitat-day .footer-inner { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 1.8fr 1fr 1.1fr 1.2fr; gap: 34px; align-items: start; }
                .world-habitat-day .footer-brand-line { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
                .world-habitat-day .footer-logo-badge { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(160deg, #f2c44b, #dbab30); color: #0d2b3f; display: grid; place-items: center; font-size: 13px; font-weight: 800; }
                .world-habitat-day .footer-brand-title { margin: 0; color: #ffffff; font-size: clamp(18px, 1.1vw, 28px); line-height: 1.1; font-weight: 800; }
                .world-habitat-day .footer-brand-sub { margin: 6px 0 0; color: #607887; font-size: 11px; letter-spacing: 1.2px; font-weight: 600; text-transform: uppercase; }
                .world-habitat-day .footer-brand-copy { color: #95acb8; font-size: 14px; line-height: 1.7; max-width: 560px; margin: 8px 0 22px; }
                .world-habitat-day .footer-social-label { color: #7f98a6; font-size: 16px; font-weight: 700; margin-bottom: 10px; }
                .world-habitat-day .footer-social-list { display: flex; gap: 10px; }
                .world-habitat-day .footer-social-btn { width: 32px; height: 32px; border-radius: 11px; border: 1px solid rgba(172,196,210,.35); background: rgba(255,255,255,.03); color: #f1f6f9; display: grid; place-items: center; font-size: 14px; font-weight: 800; text-decoration: none; transition: transform 0.2s ease, border-color 0.2s ease; }
                .world-habitat-day .footer-social-btn:hover { transform: translateY(-2px); border-color: rgba(231,192,88,.62); }
                .world-habitat-day .footer-col-title { margin: 2px 0 12px; color: #ffffff; font-size: 13px; line-height: 1.1; font-weight: 800; }
                .world-habitat-day .footer-link-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
                .world-habitat-day .footer-link-list a { color: #a9bfcb; font-size: 13px; line-height: 1.2; text-decoration: none; font-weight: 500; }
                .world-habitat-day .footer-link-list a:hover { color: #ffffff; }
                .world-habitat-day .footer-link-list-muted a { color: #90a8b6; }
                .world-habitat-day .footer-contact-col { display: grid; gap: 12px; }
                .world-habitat-day .footer-contact-card { display: flex; gap: 9px; align-items: center; padding: 10px; border-radius: 14px; background: rgba(145,171,188,0.12); border: 1px solid rgba(172,196,210,.2); }
                .world-habitat-day .footer-contact-icon { width: 22px; height: 22px; border-radius: 10px; display: grid; place-items: center; background: rgba(168,191,205,.16); color: #dbab30; font-weight: 700; font-size: 14px; flex-shrink: 0; }
                .world-habitat-day .footer-contact-card small { display: block; color: #8ea5b2; font-size: 12px; line-height: 1.1; }
                .world-habitat-day .footer-contact-card strong { display: block; color: #f5fbff; font-size: 20px; letter-spacing: 0.6px; line-height: 1.12; }
                .world-habitat-day .footer-meta-row { max-width: 1150px; margin: 36px auto 0; padding: 16px 0; border-top: 1px solid rgba(190,208,219,.2); border-bottom: 1px solid rgba(190,208,219,.2); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .world-habitat-day .footer-meta-left { display: inline-flex; align-items: center; gap: 12px; color: #8da4b2; font-size: 12px; }
                .world-habitat-day .footer-status-dot { width: 10px; height: 10px; border-radius: 999px; background: #41c6a2; box-shadow: 0 0 0 6px rgba(65,198,162,.12); }
                .world-habitat-day .footer-meta-link { color: #f0c54f; text-decoration: none; font-size: 16px; font-weight: 800; }
                .world-habitat-day .footer-contact-inline { max-width: 1150px; margin: 10px auto 0; display: flex; flex-wrap: wrap; gap: 20px; color: #6f8694; font-size: 12px; }
                .world-habitat-day .bottom-bar { max-width: 1150px; margin: 20px auto 0; text-align: center; color: #6b8290; font-size: 12px; position: relative; }
                .world-habitat-day .toast { position: fixed; right: 20px; bottom: 20px; background: #123e30; color: #fff; padding: 15px 20px; border-radius: 13px; z-index: 20; transform: translateY(120px); transition: 0.3s ease; }
                .world-habitat-day .toast.show { transform: translateY(0); }
                .world-habitat-day .ministry-leadership { background: linear-gradient(180deg, #eef7f3 0%, #f7faf8 100%); padding: 62px 0 88px; position: relative; overflow: hidden; }
                .world-habitat-day .leadership-head { text-align: center; max-width: 900px; margin: 0 auto 48px; }
                .world-habitat-day .leadership-eyebrow { font-size: 13px; letter-spacing: 3px; font-weight: 800; color: #e84f62; margin-bottom: 10px; }
                .world-habitat-day .leadership-head h2 { margin: 0; color: #0f4537; font-size: clamp(34px, 2vw, 58px); line-height: 1.15; font-weight: 800; }
                .world-habitat-day .leadership-head p { margin: 18px auto 0; color: #6d8178; font-size: 17px; line-height: 1.8; }
                .world-habitat-day .leadership-featured { max-width: 1240px; margin: 0 auto 18px; padding: 0 24px; display: flex; justify-content: center; }
                .world-habitat-day .leadership-grid { max-width: 1240px; margin: 0 auto; display: grid; gap: 26px; padding: 0 24px; }
                .world-habitat-day .leadership-grid-secondary { max-width: 700px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .world-habitat-day .leader-card { background: linear-gradient(180deg, #ffffff, #f5faf7); border: 1px solid rgba(115,154,141,.15); border-radius: 28px; padding: 20px 20px 24px; box-shadow: 0 18px 45px rgba(22,59,47,.08); transition: transform 0.25s ease, box-shadow 0.25s ease; overflow: hidden; }
                .world-habitat-day .leader-card-featured { width: min(330px, 100%); }
                .world-habitat-day .leader-card-centered { grid-column: 1 / -1; justify-self: center; width: min(335px, 100%); }
                .world-habitat-day .leader-card:hover { transform: translateY(-7px); box-shadow: 0 25px 55px rgba(22,59,47,.14); }
                .world-habitat-day .leader-photo { height: 340px; border-radius: 15px; background: linear-gradient(145deg, #dcece6, #c7ddd5); overflow: hidden; position: relative; }
                .world-habitat-day .leader-photo img { width: 100%; height: 100%; object-fit: cover; display: block; object-position: center top; }
                .world-habitat-day .leader-role { font-size: 12px; letter-spacing: 2px; font-weight: 800; color: #e84f62; text-align: center; margin-top: 19px; }
                .world-habitat-day .leader-name { font-size: 25px; line-height: 1.35; font-weight: 800; color: #123f32; text-align: center; margin: 5px 0 3px; }
                .world-habitat-day .leader-ministry { text-align: center; color: #778b83; font-size: 14px; margin: 0; line-height: 1.6; }
                .world-habitat-day .leader-source { text-align: center; font-size: 10px; color: #9aa9a3; margin-top: 9px; }
                .world-habitat-day .support-section { background: linear-gradient(180deg, #ffffff 0%, #f8fbfa 100%); padding: 82px 5% 88px; position: relative; overflow: hidden; border-top: 1px solid #e4eee9; }
                .world-habitat-day .support-wrap { max-width: 1150px; margin: 0 auto; }
                .world-habitat-day .support-head { text-align: center; margin-bottom: 46px; }
                .world-habitat-day .support-eyebrow { font-size: 12px; letter-spacing: 4px; font-weight: 800; color: #0f8d78; margin-bottom: 10px; }
                .world-habitat-day .support-head h2 { margin: 0; color: #123a57; font-size: clamp(32px, 1.2vw, 68px); line-height: 1.13; font-weight: 800; letter-spacing: -0.03em; }
                .world-habitat-day .support-head p { margin: 14px auto 0; color: #718693; font-size: 17px; line-height: 1.7; max-width: 920px; }
                .world-habitat-day .support-categories { display: grid; gap: 30px; }
                .world-habitat-day .support-category-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
                .world-habitat-day .support-category-index { width: 26px; height: 26px; border-radius: 9px; display: grid; place-items: center; font-size: 13px; font-weight: 800; color: #0f8d78; background: #e6f3ef; }
                .world-habitat-day .support-category-title { margin: 0; color: #123a57; font-size: clamp(20px, 0.9vw, 40px); line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; }
                .world-habitat-day .support-category-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; }
                .world-habitat-day .support-partner-card { min-height: 72px; display: flex; align-items: center; gap: 11px; background: #fff; border: 1px solid #d5e3e8; border-radius: 18px; padding: 10px 12px; box-shadow: 0 8px 22px rgba(19, 58, 87, 0.04); }
                .world-habitat-day .support-partner-logo { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(145deg, #0f4b60, #0f8d78); display: grid; place-items: center; flex-shrink: 0; padding: 9px; }
                .world-habitat-day .support-partner-logo img { width: 100%; height: 100%; object-fit: contain;  opacity: 0.95; }
                .world-habitat-day .support-partner-body { min-width: 0; }
                .world-habitat-day .support-partner-name { color: #123a57; font-size: 14px; font-weight: 800; line-height: 1.25; overflow-wrap: anywhere; }
                .world-habitat-day .support-partner-link { text-decoration: none; border-bottom: 1px solid transparent; transition: color 0.2s ease, border-color 0.2s ease; }
                .world-habitat-day .support-partner-link:hover { color: #0f8d78; border-bottom-color: rgba(15,141,120,.5); }
                .world-habitat-day .support-partner-sub { color: #738896; font-size: 12px; margin-top: 2px; line-height: 1.35; }
                .world-habitat-day .event-loader { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; background: rgba(247,251,249,.97); backdrop-filter: blur(10px); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.28s ease, visibility 0.28s ease; }
                .world-habitat-day .event-loader.is-active { opacity: 1; visibility: visible; pointer-events: auto; }
                .world-habitat-day .event-loader-box { text-align: center; min-width: 260px; }
                .world-habitat-day .event-spinner { width: 132px; height: 132px; margin: 0 auto 20px; position: relative; display: grid; place-items: center; }
                .world-habitat-day .event-spinner::before { content: ""; position: absolute; inset: 3px; border: 2px solid #d8e9e2; border-top-color: #e84f62; border-right-color: #174f3f; border-radius: 50%; animation: eventSpin 1.05s linear infinite; }
                .world-habitat-day .event-spinner::after { content: ""; position: absolute; inset: 13px; border: 1px dashed #9bc0b1; border-radius: 50%; animation: eventSpinReverse 3s linear infinite; }
                .world-habitat-day .event-scene { position: relative; width: 86px; height: 76px; animation: eventFloat 1.8s ease-in-out infinite; }
                .world-habitat-day .event-sun { position: absolute; right: 3px; top: 4px; width: 16px; height: 16px; border: 3px solid #e84f62; border-radius: 50%; animation: eventPulse 1.5s ease-in-out infinite; }
                .world-habitat-day .event-building { position: absolute; left: 23px; bottom: 11px; width: 37px; height: 39px; background: #174f3f; border-radius: 3px 3px 1px 1px; box-shadow: 0 0 0 4px rgba(23,79,63,.06); }
                .world-habitat-day .event-building:before { content: ""; position: absolute; left: -7px; top: -18px; border-left: 25px solid transparent; border-right: 25px solid transparent; border-bottom: 20px solid #e84f62; }
                .world-habitat-day .event-building:after { content: ""; position: absolute; left: 8px; top: 11px; width: 7px; height: 7px; background: #f7fbf9; box-shadow: 14px 0 #f7fbf9, 0 13px #f7fbf9, 14px 13px #f7fbf9; }
                .world-habitat-day .event-tower { position: absolute; left: 8px; bottom: 11px; width: 17px; height: 28px; background: #2f705d; border-radius: 2px 2px 0 0; }
                .world-habitat-day .event-tower:after { content: ""; position: absolute; left: 4px; top: 7px; width: 4px; height: 4px; background: #eef8f4; box-shadow: 7px 0 #eef8f4, 0 8px #eef8f4, 7px 8px #eef8f4; }
                .world-habitat-day .event-tree { position: absolute; right: 8px; bottom: 9px; width: 5px; height: 23px; background: #7b5b3d; border-radius: 3px; }
                .world-habitat-day .event-tree:before { content: ""; position: absolute; left: -12px; top: -17px; width: 29px; height: 29px; background: #2f8b63; border-radius: 55% 45% 50% 50%; box-shadow: 8px 5px 0 -3px #49a66f, -7px 7px 0 -4px #76bd83; }
                .world-habitat-day .event-ground { position: absolute; left: 2px; bottom: 5px; width: 82px; height: 5px; border-radius: 50%; background: #b8d6ca; }
                .world-habitat-day .event-loader-title { margin: 0; color: #124638; font-size: 18px; font-weight: 800; }
                .world-habitat-day .event-loader-sub { margin: 7px 0 0; color: #789087; font-size: 12px; letter-spacing: 1.5px; font-weight: 700; }
                @keyframes eventSpin { to { transform: rotate(360deg); } }
                @keyframes eventSpinReverse { to { transform: rotate(-360deg); } }
                @keyframes eventFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes eventPulse { 0%, 100% { transform: scale(.85); opacity: .75; } 50% { transform: scale(1.12); opacity: 1; } }
                @media (max-width: 980px) { .world-habitat-day .support-category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .world-habitat-day .count { margin-left: 18px; margin-right: 18px; } .world-habitat-day .count > div { padding: 18px 14px; } .world-habitat-day .leadership-featured, .world-habitat-day .leadership-grid { max-width: 560px; } .world-habitat-day .leadership-grid-secondary { grid-template-columns: 1fr; } .world-habitat-day .leader-card-centered { grid-column: auto; width: 100%; } .world-habitat-day .leader-photo { height: 380px; } .world-habitat-day .about, .world-habitat-day .venue { grid-template-columns: 1fr; } }
                @media (max-width: 850px) { .world-habitat-day .nav-inner { padding: 12px 16px; } .world-habitat-day .desktop-btn { display: none; } .world-habitat-day .menu-toggle { display: inline-flex; } .world-habitat-day .links { position: absolute; top: calc(100% + 8px); left: 16px; right: 16px; display: none; flex-direction: column; align-items: flex-start; gap: 16px; padding: 18px 16px; border-radius: 18px; background: rgba(14, 60, 47, 0.96); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 18px 40px rgba(0,0,0,.18); } .world-habitat-day .links.open { display: flex; } .world-habitat-day .links a { font-size: 15px; } .world-habitat-day .mobile-btn { display: inline-block; margin-top: 4px; } .world-habitat-day .cards, .world-habitat-day .guests { grid-template-columns: 1fr 1fr; } .world-habitat-day .grid { grid-template-columns: 1fr; } }
                @media (max-width: 650px) { .world-habitat-day .brand { font-size: 15px; } .world-habitat-day .hero { min-height: 88vh; } .world-habitat-day .hero-content { padding: 70px 20px 50px; } .world-habitat-day .meta { flex-direction: column; align-items: flex-start; } .world-habitat-day .count { margin-top: -30px; border-radius: 18px; } .world-habitat-day .count > div { padding: 15px 7px; } .world-habitat-day .count b { font-size: 25px; } .world-habitat-day .count small { font-size: 9px; } .world-habitat-day .cards, .world-habitat-day .guests, .world-habitat-day .grid { grid-template-columns: 1fr; } .world-habitat-day .item { grid-template-columns: 85px 1fr; gap: 10px; } .world-habitat-day .hero p { font-size: 16px; } .world-habitat-day .head h2 { font-size: 32px; } .world-habitat-day .support-categories { gap: 20px; } .world-habitat-day .support-category-head { align-items: flex-start; } .world-habitat-day .support-category-index { width: 30px; height: 30px; font-size: 14px; border-radius: 10px; } .world-habitat-day .support-category-title { font-size: 20px; } .world-habitat-day .support-category-grid { grid-template-columns: 1fr; gap: 10px; } .world-habitat-day .support-partner-card { min-height: 84px; padding: 10px; border-radius: 14px; } .world-habitat-day .support-partner-logo { width: 46px; height: 46px; border-radius: 12px; } .world-habitat-day .support-partner-name { font-size: 13px; } .world-habitat-day .support-partner-sub { font-size: 11px; } .world-habitat-day .leader-card { border-radius: 22px; padding: 14px 14px 20px; } .world-habitat-day .leader-photo { height: 330px; border-radius: 16px; } .world-habitat-day .leader-name { font-size: 22px; } .world-habitat-day .field.full { grid-column: auto; } }
                @media (max-width: 1100px) { .world-habitat-day .footer-inner { grid-template-columns: 1fr 1fr; } .world-habitat-day .footer-col-title { font-size: 13px; } .world-habitat-day .footer-link-list a { font-size: 12px; } .world-habitat-day .footer-meta-link { font-size: 15px; } }
                @media (max-width: 720px) { .world-habitat-day .site-footer { border-top-left-radius: 20px; border-top-right-radius: 20px; } .world-habitat-day .footer-inner { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; } .world-habitat-day .footer-inner > :first-child, .world-habitat-day .footer-inner > :nth-child(4) { grid-column: 1 / -1; } .world-habitat-day .footer-logo-badge { width: 32px; height: 32px; font-size: 11px; } .world-habitat-day .footer-brand-title { font-size: 18px; } .world-habitat-day .footer-brand-copy { font-size: 13px; line-height: 1.6; } .world-habitat-day .footer-social-label { font-size: 15px; } .world-habitat-day .footer-social-btn { width: 28px; height: 28px; font-size: 13px; border-radius: 10px; } .world-habitat-day .footer-col-title { font-size: 12px; margin-bottom: 8px; } .world-habitat-day .footer-link-list a { font-size: 12px; } .world-habitat-day .footer-contact-card strong { font-size: 18px; } .world-habitat-day .footer-contact-card small { font-size: 11px; } .world-habitat-day .footer-meta-row { flex-direction: column; align-items: flex-start; } .world-habitat-day .footer-meta-link { font-size: 14px; } }
                @media (max-width: 650px) { .world-habitat-day .hero-badge { font-size: 10px; padding: 8px 14px; } .world-habitat-day .hero-title { font-size: clamp(30px, 10vw, 42px); margin: 18px auto 12px; } .world-habitat-day .hero-copy { font-size: 14px; line-height: 1.55; margin-bottom: 18px; } .world-habitat-day .hero-stat-grid { max-width: 100%; gap: 10px; margin-bottom: 20px; } .world-habitat-day .hero-stat-card { min-height: 80px; border-radius: 14px; } .world-habitat-day .hero-stat-number { font-size: 24px; } .world-habitat-day .hero-stat-label { font-size: 11px; } .world-habitat-day .hero-meta-row { gap: 10px; margin-bottom: 18px; } .world-habitat-day .hero-meta-item { font-size: 11px; padding: 7px 9px; } .world-habitat-day .hero-primary-btn, .world-habitat-day .hero-secondary-btn { min-width: 160px; min-height: 42px; font-size: 13px; border-radius: 12px; } }
                @media (max-width: 850px) { .world-habitat-day .hero-content-centered { padding-top: 148px; } }
                @media (max-width: 650px) { .world-habitat-day .hero-content-centered { padding-top: 145px; } }
                @media (prefers-reduced-motion: reduce) { .world-habitat-day .event-spinner::before, .world-habitat-day .event-spinner::after, .world-habitat-day .event-scene, .world-habitat-day .event-sun { animation: none; } }
            `}</style>

            <LandingLoader />
            <LandingNavigation />
            <LandingHero hero={hero} eventStat={eventStat} />
                        <LandingAbout about={about} />
            <LandingLeadership leaderships={leaderships} />

            <LandingHighlights programHighlights={programHighlights} />
            {/* <LandingGuests guests={guests} /> */}
            {/* <LandingProgram schedules={schedules} /> */}
            {/* <LandingRegistration participantTypes={participantTypes} /> */}
            <LandingVenue eventStat={eventStat} location={location} />
            <LandingSupport partners={partners} />
            <LandingFooter location={location} socialMedia={socialMedia} />
            <LandingToast />
        </div>
    );
};
