import React from 'react';

type ProgramHighlightModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    logo?: string | null;
};

const fallbackHighlights: ProgramHighlightModel[] = [
    { id: 1, title: 'Affordable Housing', description: 'সবার জন্য নিরাপদ ও সাশ্রয়ী আবাসন।', logo: '🏠' },
    { id: 2, title: 'Green Cities', description: 'পরিবেশবান্ধব ও টেকসই নগর পরিকল্পনা।', logo: '🌱' },
    { id: 3, title: 'Sustainable Mobility', description: 'উন্নত গণপরিবহন ও নিরাপদ চলাচল।', logo: '🚲' },
    { id: 4, title: 'Climate Resilience', description: 'জলবায়ু পরিবর্তন মোকাবিলায় resilient city।', logo: '🌊' },
];

export const LandingHighlights: React.FC<{ programHighlights?: ProgramHighlightModel[] | null }> = ({ programHighlights }) => {
    const highlights = programHighlights && programHighlights.length > 0 ? programHighlights : fallbackHighlights;

    return (
        <section style={{ background: '#edf6f1' }}>
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">WHAT WE EXPLORE</div>
                    <h2>অনুষ্ঠানের মূল বিষয়সমূহ</h2>
                </div>
                <div className="cards">
                    {highlights.map((highlight, index) => {
                        const title = highlight.title || 'Program Highlight';
                        const description = highlight.description || '';
                        const logo = highlight.logo;
                        const hasImageLogo = typeof logo === 'string' && (logo.startsWith('http') || logo.startsWith('/') || logo.includes('/'));
                        const imageSrc = typeof logo === 'string'
                            ? logo.startsWith('http')
                                ? logo
                                : logo.startsWith('/')
                                    ? `/storage/${logo.replace(/^\//, '')}`
                                    : `/storage/${logo}`
                            : null;

                        return (
                            <div className="card" key={highlight.id ?? `${title}-${index}`}>
                                <div className="icon">
                                    {hasImageLogo && imageSrc ? (
                                        <img src={imageSrc} alt={title} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                                    ) : logo && !hasImageLogo ? (
                                        <span>{logo}</span>
                                    ) : (
                                        <span>{['🏠', '🌱', '🚲', '🌊'][index % 4]}</span>
                                    )}
                                </div>
                                <h3 dangerouslySetInnerHTML={{ __html: title }} />
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
