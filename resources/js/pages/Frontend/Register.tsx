import { Head } from '@inertiajs/react';
import React from 'react';
import { LandingFooter } from '@/components/Frontend/LandingFooter';
import { LandingNavigation } from '@/components/Frontend/LandingNavigation';
import { LandingRegistration } from '@/components/Frontend/LandingRegistration';

type ParticipantTypeModel = {
    id?: number | string;
    name?: string | null;
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

export default function RegisterPage({
    participantTypes,
    location,
    socialMedia,
}: {
    participantTypes?: ParticipantTypeModel[] | null;
    location?: LocationModel | null;
    socialMedia?: SocialMediaModel | SocialMediaModel[] | null;
}) {
    return (
        <>
            <Head title="Registration" />

            <div className="world-habitat-day frontend-register-page">
                <style>{`
                    * { box-sizing: border-box; }
                    .frontend-register-page a { color: inherit; text-decoration: none; }
                    .frontend-register-page { min-height: 100vh; background: linear-gradient(180deg, #f5faf7 0%, #edf7f2 100%); color: #123e30; }
                    .frontend-register-page nav { position: fixed; top: 0; width: 100%; z-index: 10; color: white; background: rgba(13,30,26,.96); box-shadow: 0 10px 28px rgba(0,0,0,0.16); }
                    .frontend-register-page .nav-inner { position: relative; width: 100%; padding: 14px 5%; display: flex; justify-content: space-between; align-items: center; }
                    .frontend-register-page .brand { font-weight: 800; font-size: 19px; letter-spacing: 0.2px; }
                    .frontend-register-page .brand small { display: block; color: #ebd6a3; font-size: 10px; letter-spacing: 2px; font-weight: 700; }
                    .frontend-register-page .nav-actions { display: flex; align-items: center; gap: 22px; }
                    .frontend-register-page .links { display: flex; gap: 22px; font-size: 14px; font-weight: 600; align-items: center; }
                    .frontend-register-page .links a { opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease; }
                    .frontend-register-page .links a:hover { opacity: 1; transform: translateY(-1px); }
                    .frontend-register-page .menu-toggle { display: none; width: 42px; height: 42px; border-radius: 12px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); align-items: center; justify-content: center; flex-direction: column; gap: 5px; cursor: pointer; }
                    .frontend-register-page .menu-toggle span { width: 18px; height: 2px; background: white; border-radius: 999px; display: block; }
                    .frontend-register-page .mobile-btn { display: none; }
                    .frontend-register-page .btn { display: inline-block; background: linear-gradient(135deg, #d7b77a 0%, #b98942 100%); color: #fff !important; padding: 12px 22px; border-radius: 999px; font-weight: 800; border: 0; cursor: pointer; box-shadow: 0 16px 30px rgba(184,137,66,.28); transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; text-decoration: none; letter-spacing: 0.02em; }
                    .frontend-register-page .btn:hover { transform: translateY(-2px); box-shadow: 0 18px 35px rgba(184,137,66,.35); filter: saturate(1.08); }

                    .frontend-register-page .register { padding: 132px 5% 82px; }
                    .frontend-register-page .wrap { max-width: 1150px; margin: 0 auto; }
                    .frontend-register-page .head { text-align: center; max-width: 720px; margin: 0 auto 38px; }
                    .frontend-register-page .eyebrow { color: #b98942; font-size: 12px; font-weight: 800; letter-spacing: 2px; }
                    .frontend-register-page .head h2 { font-size: clamp(30px, 3vw, 44px); margin: 8px 0 0; color: #123e30; line-height: 1.2; font-weight: 800; }
                    .frontend-register-page form { max-width: 900px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 24px; box-shadow: 0 16px 40px rgba(22,59,47,.10); border: 1px solid rgba(98,138,128,.16); }
                    .frontend-register-page .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                    .frontend-register-page .field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
                    .frontend-register-page .field.full { grid-column: 1 / -1; }
                    .frontend-register-page .field label { font-size: 13px; font-weight: 700; }
                    .frontend-register-page .field input,
                    .frontend-register-page .field select,
                    .frontend-register-page .field textarea { width: 100%; max-width: 100%; min-width: 0; display: block; box-sizing: border-box; padding: 13px; border: 1px solid #d9e5df; border-radius: 11px; font-family: inherit; font-size: 14px; }
                    .frontend-register-page .field textarea { resize: vertical; }
                    .frontend-register-page .submit { width: 100%; margin-top: 18px; border: none; }

                    .frontend-register-page .site-footer { background: #0d2b3f; color: #8fa7b5; padding: 56px 5% 10px; position: relative; overflow: hidden; border-top-left-radius: 26px; border-top-right-radius: 26px; }
                    .frontend-register-page .site-footer::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 8% 0%, rgba(38, 167, 132, 0.13), transparent 28%), radial-gradient(circle at 92% 100%, rgba(237, 188, 67, 0.08), transparent 25%); pointer-events: none; }
                    .frontend-register-page .footer-shell { position: relative; }
                    .frontend-register-page .footer-inner { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 1.8fr 1fr 1.1fr 1.2fr; gap: 34px; align-items: start; }
                    .frontend-register-page .footer-brand-line { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
                    .frontend-register-page .footer-logo-badge { width: 32px; height: 32px; border-radius: 12px; background: linear-gradient(160deg, #f2c44b, #dbab30); color: #0d2b3f; display: grid; place-items: center; font-size: 10px; font-weight: 800; }
                    .frontend-register-page .footer-brand-title { margin: 0; color: #ffffff; font-size: clamp(20px, 1.3vw, 34px); line-height: 1.1; font-weight: 800; }
                    .frontend-register-page .footer-brand-sub { margin: 6px 0 0; color: #607887; font-size: 11px; letter-spacing: 1.2px; font-weight: 600; text-transform: uppercase; }
                    .frontend-register-page .footer-brand-copy { color: #95acb8; font-size: 16px; line-height: 1.8; max-width: 560px; margin: 8px 0 24px; }
                    .frontend-register-page .footer-social-label { color: #7f98a6; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
                    .frontend-register-page .footer-social-list { display: flex; gap: 10px; }
                    .frontend-register-page .footer-social-btn { width: 32px; height: 32px; border-radius: 14px; border: 1px solid rgba(172,196,210,.35); background: rgba(255,255,255,.03); color: #f1f6f9; display: grid; place-items: center; font-size: 16px; font-weight: 800; text-decoration: none; transition: transform 0.2s ease, border-color 0.2s ease; }
                    .frontend-register-page .footer-social-btn:hover { transform: translateY(-2px); border-color: rgba(231,192,88,.62); }
                    .frontend-register-page .footer-col-title { margin: 2px 0 16px; color: #ffffff; font-size: 18px; line-height: 1.1; font-weight: 800; }
                    .frontend-register-page .footer-link-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
                    .frontend-register-page .footer-link-list a { color: #a9bfcb; font-size: 12px; line-height: 1.15; text-decoration: none; font-weight: 600; }
                    .frontend-register-page .footer-link-list a:hover { color: #ffffff; }
                    .frontend-register-page .footer-link-list-muted a { color: #90a8b6; }
                    .frontend-register-page .footer-contact-col { display: grid; gap: 12px; }
                    .frontend-register-page .footer-contact-card { display: flex; gap: 12px; align-items: center; padding: 14px 14px; border-radius: 16px; background: rgba(145,171,188,0.12); border: 1px solid rgba(172,196,210,.2); }
                    .frontend-register-page .footer-contact-icon { width: 32px; height: 32px; border-radius: 12px; display: grid; place-items: center; background: rgba(168,191,205,.16); color: #dbab30; font-weight: 800; font-size: 20px; flex-shrink: 0; }
                    .frontend-register-page .footer-contact-card small { display: block; color: #8ea5b2; font-size: 17px; line-height: 1.2; }
                    .frontend-register-page .footer-contact-card strong { display: block; color: #f5fbff; font-size: 24px; letter-spacing: 1px; line-height: 1.12; }
                    .frontend-register-page .footer-meta-row { max-width: 1150px; margin: 36px auto 0; padding: 16px 0; border-top: 1px solid rgba(190,208,219,.2); border-bottom: 1px solid rgba(190,208,219,.2); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                    .frontend-register-page .footer-meta-left { display: inline-flex; align-items: center; gap: 12px; color: #8da4b2; font-size: 14px; }
                    .frontend-register-page .footer-status-dot { width: 10px; height: 10px; border-radius: 999px; background: #41c6a2; box-shadow: 0 0 0 6px rgba(65,198,162,.12); }
                    .frontend-register-page .footer-meta-link { color: #f0c54f; text-decoration: none; font-size: 18px; font-weight: 800; }
                    .frontend-register-page .footer-contact-inline { max-width: 1150px; margin: 10px auto 0; display: flex; flex-wrap: wrap; gap: 20px; color: #6f8694; font-size: 12px; }
                    .frontend-register-page .bottom-bar { max-width: 1150px; margin: 20px auto 0; text-align: center; color: #6b8290; font-size: 12px; position: relative; }

                    @media (max-width: 1100px) {
                        .frontend-register-page .footer-inner { grid-template-columns: 1fr 1fr; }
                        .frontend-register-page .footer-col-title { font-size: 28px; }
                        .frontend-register-page .footer-link-list a { font-size: 18px; }
                        .frontend-register-page .footer-meta-link { font-size: 18px; }
                    }
                    @media (max-width: 850px) {
                        .frontend-register-page .nav-inner { padding: 12px 16px; }
                        .frontend-register-page .desktop-btn { display: none; }
                        .frontend-register-page .menu-toggle { display: inline-flex; }
                        .frontend-register-page .links { position: absolute; top: calc(100% + 8px); left: 16px; right: 16px; display: none; flex-direction: column; align-items: flex-start; gap: 16px; padding: 18px 16px; border-radius: 18px; background: rgba(14, 60, 47, 0.96); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 18px 40px rgba(0,0,0,.18); }
                        .frontend-register-page .links.open { display: flex; }
                        .frontend-register-page .links a { font-size: 15px; }
                        .frontend-register-page .mobile-btn { display: inline-block; margin-top: 4px; }
                        .frontend-register-page .register { padding-top: 112px; }
                        .frontend-register-page .grid { grid-template-columns: 1fr; }
                        .frontend-register-page form { padding: 22px 16px; border-radius: 18px; }
                        .frontend-register-page .field.full { grid-column: auto; }
                    }
                    @media (max-width: 720px) {
                        .frontend-register-page .site-footer { border-top-left-radius: 20px; border-top-right-radius: 20px; }
                        .frontend-register-page .footer-inner { grid-template-columns: 1fr; gap: 24px; }
                        .frontend-register-page .footer-logo-badge { width: 52px; height: 52px; font-size: 26px; }
                        .frontend-register-page .footer-brand-title { font-size: 26px; }
                        .frontend-register-page .footer-brand-copy { font-size: 14px; line-height: 1.7; }
                        .frontend-register-page .footer-social-label { font-size: 20px; }
                        .frontend-register-page .footer-social-btn { width: 30px; height: 30px; font-size: 16px; border-radius: 12px; }
                        .frontend-register-page .footer-col-title { font-size: 20px; margin-bottom: 10px; }
                        .frontend-register-page .footer-link-list a { font-size: 18px; }
                        .frontend-register-page .footer-contact-card strong { font-size: 28px; }
                        .frontend-register-page .footer-contact-card small { font-size: 13px; }
                        .frontend-register-page .footer-meta-row { flex-direction: column; align-items: flex-start; }
                        .frontend-register-page .footer-meta-link { font-size: 20px; }
                    }
                `}</style>
                <LandingNavigation />
                <LandingRegistration participantTypes={participantTypes} />
                <LandingFooter location={location} socialMedia={socialMedia} />
            </div>
        </>
    );
}
