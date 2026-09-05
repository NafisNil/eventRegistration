import React from 'react';

export const LandingLoader: React.FC = () => {
    return (
        <div className="event-loader is-active" id="eventLoader" aria-hidden="false">
            <div className="event-loader-box">
                <div className="event-spinner" aria-hidden="true">
                    <div className="event-scene">
                        <span className="event-sun" />
                        <span className="event-tower" />
                        <span className="event-building" />
                        <span className="event-tree" />
                        <span className="event-ground" />
                    </div>
                </div>
                <p className="event-loader-title">পরবর্তী অংশে যাওয়া হচ্ছে</p>
                <p className="event-loader-sub">WORLD HABITAT DAY 2026</p>
            </div>
        </div>
    );
};
