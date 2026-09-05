import React, { useState, useEffect, ReactNode } from 'react';
import { Footer } from '@/layouts/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-[#f5faf7] text-[#163b2f]">
            {/* Header / Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 px-[5%] py-4 flex justify-between items-center text-white transition-all duration-300 ${
                    scrolled ? 'bg-[#073c2d] shadow-lg' : 'bg-transparent'
                }`}
            >
                <div className="font-extrabold text-xl leading-tight">
                    বিশ্ব বসতি দিবস ২০২৬
                    <small className="block text-[#bce889] text-[10px] tracking-widest font-normal">
                        WORLD HABITAT DAY 2026
                    </small>
                </div>
                
                <div className="flex items-center gap-6 text-sm font-semibold">
                    <a href="#hero" className="hover:text-[#bce889] transition-colors">হোম</a>
                    <a href="#about" className="hover:text-[#bce889] transition-colors">মূল বার্তা</a>
                    <a href="#register" className="inline-block bg-[#e84f62] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#d43f52] transition-colors">
                        নিবন্ধন করুন
                    </a>
                </div>
            </nav>

            {/* Main Page Content */}
            <main>{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
};