import React from 'react';

type GuestModel = {
    id?: number | string;
    name?: string | null;
    designation?: string | null;
    description?: string | null;
    logo?: string | null;
    expertise?: string | null;
    type?: string | null;
};

const fallbackGuests: GuestModel[] = [
    { id: 1, name: 'মাননীয় প্রধান অতিথি', designation: 'CHIEF GUEST', description: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার', logo: '👤' },
    { id: 2, name: 'বিশেষ অতিথি', designation: 'SPECIAL GUEST', description: 'গৃহায়ন ও গণপূর্ত মন্ত্রণালয়', logo: '👤' },
    { id: 3, name: 'মূল বক্তা', designation: 'KEYNOTE SPEAKER', description: 'Urban Development Expert', logo: '👤' },
    { id: 4, name: 'বিশেষ বক্তা', designation: 'SPECIAL SPEAKER', description: 'Sustainable City Specialist', logo: '👤' },
];

export const LandingGuests: React.FC<{ guests?: GuestModel[] | null }> = ({ guests }) => {
    const guestList = guests && guests.length > 0 ? guests : fallbackGuests;

    return (
        <section className="dark" id="guests">
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">DISTINGUISHED GUESTS</div>
                    <h2>আমাদের সম্মানিত অতিথিবৃন্দ</h2>
                    <p>বিশিষ্ট নীতিনির্ধারক, বিশেষজ্ঞ ও অংশীজনদের উপস্থিতিতে আয়োজনটি অনুষ্ঠিত হবে।</p>
                </div>
                <div className="guests">
                    {guestList.map((guest, index) => {
                        const name = guest.name || 'Guest';
                        const designation = guest.designation || guest.type || 'GUEST';
                        const description = guest.description || guest.expertise || '';
                        const logo = guest.logo;
                        const hasImageLogo = typeof logo === 'string' && (logo.startsWith('http') || logo.startsWith('/') || logo.includes('/'));
                        const imageSrc = typeof logo === 'string'
                            ? logo.startsWith('http')
                                ? logo
                                : logo.startsWith('/')
                                    ? `/storage/${logo.replace(/^\//, '')}`
                                    : `/storage/${logo}`
                            : null;

                        return (
                            <div className="guest" key={guest.id ?? `${name}-${index}`}>
                                <div className="photo">
                                    {hasImageLogo && imageSrc ? (
                                        <img src={imageSrc} alt={name} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                    ) : logo && !hasImageLogo ? (
                                        <span>{logo}</span>
                                    ) : (
                                        <span>👤</span>
                                    )}
                                </div>
                                <div className="guest-info">
                                    <small>{designation}</small>
                                    <h3 dangerouslySetInnerHTML={{ __html: name }} />
                         
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
