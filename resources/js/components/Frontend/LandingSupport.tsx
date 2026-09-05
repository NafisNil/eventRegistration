import React from 'react';

type PartnerModel = {
    id?: number | string;
    name?: string | null;
    logo?: string | null;
    link?: string | null;
    featured?: boolean | number | null;
    partnership_category?: {
        id?: number | string;
        name?: string | null;
    } | null;
};

type SupportItem = {
    id: string;
    category: string;
    name: string;
    subtitle: string;
    alt: string;
    src: string;
    link?: string | null;
};

const fallbackSupportItems: SupportItem[] = [
    { id: 'dept-1', category: 'আওতাধীন অধিদপ্তরসমূহ', name: 'গণপূর্ত অধিদপ্তর', subtitle: 'Public Works Department', alt: 'গণপূর্ত অধিদপ্তর', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
    { id: 'dept-2', category: 'আওতাধীন অধিদপ্তরসমূহ', name: 'নগর উন্নয়ন অধিদপ্তর', subtitle: 'Urban Development Directorate', alt: 'নগর উন্নয়ন অধিদপ্তর', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
    { id: 'dept-3', category: 'আওতাধীন অধিদপ্তরসমূহ', name: 'এইচবিআরআই', subtitle: 'Housing & Building Research Institute', alt: 'এইচবিআরআই', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
    { id: 'dept-4', category: 'আওতাধীন অধিদপ্তরসমূহ', name: 'স্থাপত্য অধিদপ্তর', subtitle: 'Department of Architecture', alt: 'স্থাপত্য অধিদপ্তর', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
    { id: 'org-1', category: 'আওতাধীন পরিদপ্তরসমূহ', name: 'অভ্যন্তরীণ নিরীক্ষা পরিদপ্তর', subtitle: 'Internal Audit Directorate', alt: 'অভ্যন্তরীণ নিরীক্ষা পরিদপ্তর', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
    { id: 'org-2', category: 'আওতাধীন পরিদপ্তরসমূহ', name: 'সরকারি আবাস পরিদপ্তর', subtitle: 'Government Accommodation Directorate', alt: 'সরকারি আবাস পরিদপ্তর', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg', link: null },
];

const normalizeUrl = (url?: string | null): string | null => {
    const value = url?.trim();

    if (!value) {
        return null;
    }

    if (/^(javascript|data|vbscript):/i.test(value)) {
        return null;
    }

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    return `https://${value}`;
};

export const LandingSupport: React.FC<{ partners?: PartnerModel[] | null }> = ({ partners }) => {
    const supportItems: SupportItem[] = partners && partners.length > 0
        ? partners.map((partner, index) => ({
            id: String(partner.id ?? partner.name ?? `partner-${index}`),
            category: partner.partnership_category?.name?.trim() || 'অন্যান্য অংশীদার',
            name: partner.name || 'Partner',
            subtitle: partner.partnership_category?.name || 'Official Partner',
            alt: partner.name || 'Partner logo',
            src: partner.logo ? (partner.logo.startsWith('http') ? partner.logo : `/storage/${partner.logo}`) : 'https://upload.wikimedia.org/wikipedia/commons/7/73/BD_Gov_logo.svg',
            link: normalizeUrl(partner.link),
        }))
        : fallbackSupportItems;

    const groupedPartners = supportItems.reduce<Array<{ category: string; items: SupportItem[] }>>((acc, item) => {
        const existing = acc.find((entry) => entry.category === item.category);

        if (existing) {
            existing.items.push(item);

            return acc;
        }

        acc.push({ category: item.category, items: [item] });

        return acc;
    }, []);

    return (
        <section className="support-section" id="support">
            <div className="support-wrap">
                <div className="support-head">
                    <div className="support-eyebrow">UNDER THE MINISTRY</div>
                    <h2>অধীনস্ত দপ্তর/সংস্থাসমূহ</h2>
                    <p>গৃহায়ন ও গণপূর্ত মন্ত্রণালয়ের অধীনস্থ দপ্তর, পরিদপ্তর ও উন্নয়ন কর্তৃপক্ষসমূহ।</p>
                </div>

                <div className="support-categories">
                    {groupedPartners.map((group, groupIndex) => (
                        <div className="support-category" key={group.category}>
                            <div className="support-category-head">
                                <span className="support-category-index">{String(groupIndex + 1).padStart(2, '0')}</span>
                                <h3 className="support-category-title">{group.category}</h3>
                            </div>
                            <div className="support-category-grid">
                                {group.items.map((item) => (
                                    <article className="support-partner-card" key={item.id}>
                                        <div className="support-partner-logo" aria-hidden="true">
                                            <img src={item.src} alt={item.alt} />
                                        </div>
                                        <div className="support-partner-body">
                                            {item.link ? (
                                                <a className="support-partner-name support-partner-link" href={item.link} target="_blank" rel="noopener noreferrer">
                                                    {item.name}
                                                </a>
                                            ) : (
                                                <div className="support-partner-name">{item.name}</div>
                                            )}
                                            <div className="support-partner-sub">{item.subtitle}</div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
