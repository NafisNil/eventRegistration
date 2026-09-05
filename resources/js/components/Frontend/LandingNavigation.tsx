import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Logo from '/logo/logo.jpeg';
export const LandingNavigation: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: '/#about', label: 'পরিচিতি' },
        { href: '/#program', label: 'প্রোগ্রাম' },
        { href: '/#ministry-leadership', label: 'নেতৃত্ব' },

        { href: '/#venue', label: 'স্থান' },

        { href: '/#support', label: 'দপ্তর/সংস্থা' },
        { href: '/#contact', label: 'যোগাযোগ' },
    ];

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav id="nav" className={menuOpen ? 'menu-open' : ''}>
            <div className="nav-inner">
                <Link href="/" className="brand" onClick={closeMenu}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <img
                            src="/storage/logo/lo.svg"
                            alt="World Habitat Day Logo"
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                        />
                        <span>
                            গৃহায়ন ও গণপূর্ত মন্ত্রণালয় <br></br>
                            <small className='text-green-500'>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</small>
                        </span>
                    </span>
                </Link>



                <div className="nav-actions">
                    <div className={`links ${menuOpen ? 'open' : ''}`}>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={closeMenu}>
                                {link.label}
                            </Link>
                        ))}
    
                    </div>


                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((value) => !value)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </nav>
    );
};
