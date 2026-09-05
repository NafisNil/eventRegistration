import React, { useState } from 'react';
import { Link } from "@inertiajs/react";

export const LandingNavigation: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: '/#about', label: 'About' },
        { href: '/#program', label: 'Program' },
        { href: '/#ministry-leadership', label: 'Leadership' },

        { href: '/#venue', label: 'Venue' },
    ];

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav id="nav" className={menuOpen ? 'menu-open' : ''}>
            <div className="nav-inner">
                <Link href="/" className="brand" onClick={closeMenu}>
                    WORLD HABITAT DAY<small>2026 • BANGLADESH</small>
                </Link>

                <div className="nav-actions">
                    <div className={`links ${menuOpen ? 'open' : ''}`}>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={closeMenu}>
                                {link.label}
                            </Link>
                        ))}
    
                    </div>

                    <Link href="/user_register" className="btn desktop-btn" onClick={closeMenu}>
                        Register Now
                    </Link>

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
