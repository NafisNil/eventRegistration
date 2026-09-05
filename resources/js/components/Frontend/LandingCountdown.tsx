import React from 'react';

export const LandingCountdown: React.FC = () => {
    return (
        <div className="count">
            <div><b id="d">00</b><small>DAYS</small></div>
            <div><b id="h">00</b><small>HOURS</small></div>
            <div><b id="m">00</b><small>MINUTES</small></div>
            <div><b id="s">00</b><small>SECONDS</small></div>
        </div>
    );
};
