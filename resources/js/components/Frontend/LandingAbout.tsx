import React from 'react';

type AboutModel = {
    description?: string | null;
    reason_to_attend?: string | null;
    objectives?: string | null;
};

export const LandingAbout: React.FC<{ about?: AboutModel | null }> = ({ about }) => {
    const description = about?.description || 'বিশ্ব বসতি দিবস ২০২৬ উপলক্ষে নগরায়ণ, আবাসন ও টেকসই উন্নয়নের গুরুত্বপূর্ণ বিষয়গুলো নিয়ে এই আয়োজন।';
    const reasonToAttend = about?.reason_to_attend || 'নীতিনির্ধারক, বিশেষজ্ঞ, পেশাজীবী ও অংশীজনদের একত্রিত করে জ্ঞান, অভিজ্ঞতা ও ভবিষ্যৎ পরিকল্পনা বিনিময়ের একটি প্ল্যাটফর্ম।';
    const objectives = about?.objectives || 'আজকের পরিকল্পনাই আগামী দিনের বাসযোগ্য শহর তৈরি করবে।';

    return (
        <section id="about">
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">ABOUT THE EVENT</div>
                    <h2>একটি বাসযোগ্য ভবিষ্যতের পথে</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>

                <div className="about">
                    <article className="about-card">
                        <div className="about-icon about-icon-primary" aria-hidden="true">
                            <span className="about-icon-mark" />
                        </div>

                        <div className="about-label">VISION</div>
                        <h3>ভিশন</h3>

                        <div
                            className="about-copy"
                            dangerouslySetInnerHTML={{ __html: reasonToAttend }}
                        />
                    </article>

                    <article className="about-card about-card-alt">
                        <div className="about-icon about-icon-secondary" aria-hidden="true">
                            <span className="about-icon-mark" />
                        </div>

                        <div className="about-label">MISSION</div>
                        <h3>মিশন</h3>

                        <div
                            className="about-copy"
                            dangerouslySetInnerHTML={{ __html: objectives }}
                        />
                    </article>
                </div>

                <div className="about-banner">
                    <div className="about-banner-check" aria-hidden="true">✓</div>
                    <div className="about-banner-text">সরকারি উদ্যোগ</div>
                    <div className="about-banner-body">
                        <span>দূষণ ও মিশ্রণ বন্ধে ও পরিবেশে স্বাস্থ্যকর ও দ্রুতগতিতে কার্যকরীভাবে আয়োজনের প্রয়োজন।</span>
                    </div>
                    <a href="https://mohpw.gov.bd/" className="about-banner-link">Official Page <span aria-hidden="true">→</span></a>
                </div>
            </div>
        </section>
    );
};
