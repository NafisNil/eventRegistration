import React from 'react';
import { Link } from '@inertiajs/react';
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



export const LandingFooter: React.FC<{ location?: LocationModel | null; socialMedia?: SocialMediaModel | SocialMediaModel[] | null }> = ({ location, socialMedia }) => {
    const email = location?.email || 'hello@worldhabitatday.org';
    const phone = location?.phone || '+880 1700-000000';
    const address = location?.address || 'Dhaka, Bangladesh';
    const primarySocial = Array.isArray(socialMedia) ? socialMedia[0] : socialMedia;
    const facebookLink = primarySocial?.facebook || '#';

    return (
        <footer className="site-footer">
            <div className="wrap footer-shell">
                <div className="footer-inner">
                    <div className="footer-brand-col">
                        <div className="footer-brand-line">
                            <div className="footer-logo-badge">WHD</div>
                            <div>
                                <h3 className="footer-brand-title">বিশ্ব বসতি দিবস ২০২৬</h3>
                                <p className="footer-brand-sub">WORLD HABITAT DAY BANGLADESH</p>
                            </div>
                        </div>
                        <p className="footer-brand-copy">গৃহায়ন ও গণপূর্ত মন্ত্রণালয়ের উদ্যোগে বিশ্ব বসতি দিবস ২০২৬ উপলক্ষে নিরাপদ, টেকসই ও বাসযোগ্য নগর গড়ে তোলার প্রত্যয়ে এই আয়োজন।</p>

                        <div className="footer-social-label">সামাজিক যোগাযোগ</div>
                        <div className="footer-social-list">
                            <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">f</a>

                        </div>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-link-list">
                            <li><a href="#about">পরিচিতি</a></li>
                            <li><a href="#highlights">ভিশন ও মিশন</a></li>
                            <li><a href="#program">সময়সূচি</a></li>
                            <li><a href="#ministry-leadership">নেতৃত্ব</a></li>
                            <li><a href="#support">দপ্তর/সংস্থা</a></li>
                            <li><Link href="/user_register">রেজিস্ট্রেশন</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-col-title">সরকারি সেবা</h4>
                        <ul className="footer-link-list footer-link-list-muted">
                            <li><a href="https://www.mygov.bd" target="_blank" rel="noopener noreferrer">সেবা সহজীকরণ ↗</a></li>
                            <li><a href="https://bangladesh.gov.bd" target="_blank" rel="noopener noreferrer">সরকারি তথ্য ও সেবা ↗</a></li>
                            <li><a href="https://mohpw.gov.bd" target="_blank" rel="noopener noreferrer">গৃহায়ন ও গণপূর্ত মন্ত্রণালয় ↗</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact-col">
                        <h4 className="footer-col-title">জরুরি যোগাযোগ</h4>
                        <div className="footer-contact-card">
                            <span className="footer-contact-icon">i</span>
                            <div>
                                <small>সরকারি তথ্য ও সেবা</small>
                                <strong>৩৩৩</strong>
                            </div>
                        </div>
                        <div className="footer-contact-card">
                            <span className="footer-contact-icon">!</span>
                            <div>
                                <small>জরুরি সেবা</small>
                                <strong>৯৯৯</strong>
                            </div>
                        </div>
                        <div className="footer-contact-card">
                            <span className="footer-contact-icon">+</span>
                            <div>
                                <small>ফায়ার সার্ভিস হটলাইন</small>
                                <strong>১০২</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-meta-row">
                    <div className="footer-meta-left">
                        <span className="footer-status-dot" />
                        <span>সরকারি অনুষ্ঠান ওয়েবসাইট</span>
                    </div>
                    <a href="https://mohpw.gov.bd" target="_blank" rel="noopener noreferrer" className="footer-meta-link">mohpw.gov.bd ↗</a>
                </div>




                <div className="bottom-bar">© 2026 World Habitat Day Bangladesh. All Rights Reserved.</div>
            </div>
        </footer>
    );
};
