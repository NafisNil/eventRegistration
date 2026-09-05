import React from 'react';

type ScheduleModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    time?: string | null;
    badge?: string | null;
    location?: string | null;
    keynote_speaker?: string | null;
};

const fallbackSchedules: ScheduleModel[] = [
    { id: 1, time: '09:00 AM', title: 'Registration & Welcome', description: 'অতিথি ও অংশগ্রহণকারীদের অভ্যর্থনা ও নিবন্ধন।' },
    { id: 2, time: '10:00 AM', title: 'Opening Ceremony', description: 'উদ্বোধনী অনুষ্ঠান ও স্বাগত বক্তব্য।' },
    { id: 3, time: '11:00 AM', title: 'Keynote Session', description: 'সর্বজনীন বাসস্থান ও টেকসই নগরায়ণ বিষয়ে মূল বক্তব্য।' },
    { id: 4, time: '12:00 PM', title: 'Panel Discussion', description: 'বিশেষজ্ঞদের অংশগ্রহণে টেকসই নগর ভবিষ্যৎ নিয়ে আলোচনা।' },
    { id: 5, time: '02:00 PM', title: 'Technical Session', description: 'Green infrastructure, mobility ও climate resilience।' },
    { id: 6, time: '04:30 PM', title: 'Closing Ceremony', description: 'সমাপনী বক্তব্য ও ভবিষ্যৎ কর্মপরিকল্পনা।' },
];

export const LandingProgram: React.FC<{ schedules?: ScheduleModel[] | null }> = ({ schedules }) => {
    const scheduleItems = schedules && schedules.length > 0 ? schedules : fallbackSchedules;

    return (
        <section id="program">
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">EVENT PROGRAMME</div>
                    <h2>দিনব্যাপী অনুষ্ঠানসূচি</h2>
                    <p>সময়, সেশন ও কার্যক্রম এক জায়গায়।</p>
                </div>
                <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
                    {/* Vertical timeline line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 'calc(clamp(88px, 12vw, 170px) + 24px)',
                            top: '1px',
                            bottom: '1px',
                            width: '3px',
                            background: 'linear-gradient(to bottom, #d8e6ea, #c7d8dd)',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />
                    {scheduleItems.map((item, index) => (
                        <div
                            key={item.id ?? `${item.title}-${index}`}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'clamp(88px, 12vw, 170px) 48px minmax(0, 1fr)',
                                gap: '20px',
                                alignItems: 'start',
                                marginBottom: '24px',
                                position: 'relative',
                            }}
                        >
                            <time
                                style={{
                                    fontWeight: 900,
                                    color: '#113452',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                    whiteSpace: 'pre-line',
                                    textAlign: 'left',
                                    paddingTop: '12px',
                                    fontSize: '12px',
                                }}
                            >
                                {item.time || '09:00 AM'}
                            </time>

                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
                                <span
                                    style={{
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        border: '4px solid #d2a84d',
                                        background: '#fff',
                                        boxShadow: 'inset 0 0 0 7px rgba(210, 168, 77, 0.14)',
                                        display: 'inline-block',
                                        flexShrink: 0,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    background: '#fff',
                                    border: '2px solid rgba(178, 203, 209, 0.48)',
                                    borderRadius: '30px',
                                    padding: '18px clamp(18px, 3vw, 40px)',
                                    boxShadow: '0 10px 22px rgba(18, 56, 79, 0.04)',
                                }}
                            >
                                {item.badge ? (
                                    <small
                                        style={{
                                            display: 'inline-block',
                                            marginBottom: '10px',
                                            color: '#0f8d78',
                                            fontWeight: 700,
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {item.badge}
                                    </small>
                                ) : null}
                                <h3
                                    style={{
                                        margin: '0 0 10px',
                                        color: '#123654',
                                        fontSize: 'clamp(16px, 4.2vw, 30px)',
                                        lineHeight: 1.18,
                                        fontWeight: 800,
                                    }}
                                >
                                    {item.title || 'Program Session'}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        marginBottom: '6px',
                                        color: '#758996',
                                        fontSize: 'clamp(16px, 1vw, 36px)',
                                        lineHeight: 1.1,
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.description || 'No description available.'}
                                </p>
                                {(item.location || item.keynote_speaker) && (
                                    <p style={{ marginTop: '8px', color: '#4d665f', fontWeight: 600, lineHeight: 1.2, fontSize: '13px' }}>
                                        {item.location ? `📍 ${item.location}` : ''}
                                        {item.location && item.keynote_speaker ? ' • ' : ''}
                                        {item.keynote_speaker ? `🎤 ${item.keynote_speaker}` : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
