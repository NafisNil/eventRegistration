import React from 'react';

type LeadershipModel = {
    id?: number | string;
    name?: string | null;
    role?: string | null;
    ministry?: string | null;
    logo?: string | null;
};

const fallbackLeadership = [
    {
        id: 'minister',
        name: 'মাননীয় মন্ত্রী',
        role: 'HONOURABLE MINISTER',
        ministry: 'জনাব জাকারিয়া তাহের এমপি<br />গৃহায়ন ও গণপূর্ত মন্ত্রণালয়',
        logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'state-minister',
        name: 'মাননীয় প্রতিমন্ত্রী',
        role: 'STATE MINISTER',
        ministry: 'জনাব আহম্মদ সোহেল মনজুর এমপি<br />গৃহায়ন ও গণপূর্ত মন্ত্রণালয়',
        logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'secretary',
        name: 'সচিব',
        role: 'SECRETARY',
        ministry: 'জনাব মো: ওবায়দুর রহমান<br />গৃহায়ন ও গণপূর্ত মন্ত্রণালয়',
        logo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80',
    },
];

export const LandingLeadership: React.FC<{ leaderships?: LeadershipModel[] | null }> = ({ leaderships }) => {
    const leaders = leaderships && leaderships.length > 0
        ? leaderships.map((leader, index) => ({
            ...leader,
            id: String(leader.id ?? leader.name ?? `leader-${index}`),
            name: leader.name || 'Leadership',
            role: leader.role || 'LEADERSHIP',
            ministry: leader.ministry || 'Ministry of Housing and Public Works',
            logo: leader.logo
                ? (leader.logo.startsWith('http') ? leader.logo : `/storage/${leader.logo}`)
                : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        }))
        : fallbackLeadership;

    const featuredLeader = leaders[0];
    const secondaryLeaders = leaders.slice(1);

    return (
        <section className="ministry-leadership" id="ministry-leadership">
            <div className="leadership-head">
                <div className="leadership-eyebrow">MINISTRY LEADERSHIP</div>
                <h2>মন্ত্রণালয়ের সম্মানিত নেতৃত্ব</h2>
            </div>

            {featuredLeader ? (
                <div className="leadership-featured">
                    <article className="leader-card leader-card-featured" key={featuredLeader.id}>
                        <div className="leader-photo">
                            <img src={featuredLeader.logo} alt={featuredLeader.name ?? 'Leadership member'} loading="lazy" />
                        </div>
                        <div className="leader-role">{featuredLeader.role}</div>
                        <h3 className="leader-name">{featuredLeader.name}</h3>
                        <p className="leader-ministry" dangerouslySetInnerHTML={{ __html: featuredLeader.ministry ?? '' }} />
                    </article>
                </div>
            ) : null}

            {secondaryLeaders.length > 0 ? (
                <div className="leadership-grid leadership-grid-secondary">
                    {secondaryLeaders.map((leader) => (
                        <article className="leader-card" key={leader.id}>
                            <div className="leader-photo">
                                <img src={leader.logo} alt={leader.name ?? 'Leadership member'} loading="lazy" />
                            </div>
                            <div className="leader-role">{leader.role}</div>
                            <h3 className="leader-name">{leader.name}</h3>
                            <p className="leader-ministry" dangerouslySetInnerHTML={{ __html: leader.ministry ?? '' }} />
                        </article>
                    ))}
                </div>
            ) : null}
        </section>
    );
};
