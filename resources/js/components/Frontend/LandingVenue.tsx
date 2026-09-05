import React from 'react';

type EventStatModel = {
    event_name?: string | null;
    location?: string | null;
    event_date?: string | null;
    time?: string | null;
};

type LocationModel = {
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    map?: string | null;
};

export const LandingVenue: React.FC<{ eventStat?: EventStatModel | null; location?: LocationModel | null }> = ({ eventStat, location: locationInfo }) => {
    const venueName = eventStat?.location || 'বাংলাদেশ-চীন মৈত্রী সম্মেলন কেন্দ্র';
    const eventDate = eventStat?.event_date || '৫ অক্টোবর ২০২৬';
    const eventTime = eventStat?.time || 'সকাল ৯:০০টা থেকে';
    const address = locationInfo?.address || 'আগারগাঁও, ঢাকা, বাংলাদেশ';
    const contact = locationInfo?.phone || locationInfo?.email || null;
    const mapUrl = locationInfo?.map || '';

    return (
        <section id="venue">
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">VENUE</div>
                    <h2>অনুষ্ঠানের স্থান</h2>
                </div>
                <div className="venue">
                    <div className="venuebox">
                        <div className="venue-meta">
                            {venueName ? <div className="venue-location text-white" dangerouslySetInnerHTML={{ __html: venueName }} /> : null}
                            {eventDate ? <div>📅 {eventDate}</div> : null}
                            {eventTime ? <div>🕘 {eventTime}</div> : null}
                            {contact ? <div>📞 {contact}</div> : null}
                        </div>
                        <a className="btn" href="#register">Register for Event</a>
                    </div>
                    <div className="map">
                        {mapUrl ? (
                            <iframe
                                src={mapUrl}
                                title={`Map for ${venueName}`}
                                className="h-32 w-full rounded-lg border border-emerald-200"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        ) : (
                            <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: '#4d665f', fontWeight: 700 }}>
                                Map unavailable
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
