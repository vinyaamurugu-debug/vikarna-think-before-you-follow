import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface VikarnaAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showQuote?: boolean;
}

export const VikarnaAvatar: React.FC<VikarnaAvatarProps> = ({
  size = 'md',
  showQuote = true,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48 md:w-56 md:h-56',
    lg: 'w-64 h-64 md:w-72 md:h-72',
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Golden Aura & Radiant Mandala Ring */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-yellow-500/20 rounded-full blur-2xl transform scale-125 animate-pulse-glow" />

        {/* Ornate Mandala Ring */}
        <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-amber-500/30 border-dashed animate-spin [animation-duration:60s]" />
        <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-amber-400/15 border-dotted animate-spin [animation-duration:90s] [animation-direction:reverse]" />

        {/* The Graphic Illustration Container */}
        <div
          className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-gradient-to-b from-indigo-950 via-slate-900 to-amber-950/80 flex items-center justify-center p-2`}
        >
          {/* Subtle Archway Silhouette background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent pointer-events-none" />

          {/* Handcrafted Vector Illustration of Prince Vikarna */}
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full transform transition-transform hover:scale-105 duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Royal Gradients */}
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="robeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#c2410c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </linearGradient>
              <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Halo Starburst */}
            <circle cx="120" cy="115" r="95" fill="url(#goldGrad)" opacity="0.12" />
            <circle cx="120" cy="115" r="75" fill="#f59e0b" opacity="0.08" />

            {/* Shoulders & Royal Robe */}
            <path
              d="M40 240 C45 190 75 165 120 165 C165 165 195 190 200 240 Z"
              fill="url(#robeGrad)"
            />
            {/* Silk Angavastram (Golden Stole) */}
            <path
              d="M70 170 Q95 200 85 240 L105 240 Q110 195 90 167 Z"
              fill="url(#goldGrad)"
              opacity="0.9"
            />
            <path
              d="M170 170 Q145 200 155 240 L135 240 Q130 195 150 167 Z"
              fill="url(#goldGrad)"
              opacity="0.9"
            />

            {/* Royal Gold Necklace / Torc */}
            <path
              d="M95 165 Q120 185 145 165 Q120 175 95 165 Z"
              fill="url(#goldGrad)"
              filter="url(#glowEffect)"
            />
            <circle cx="120" cy="178" r="4" fill="#38bdf8" />

            {/* Long Noble Hair Flow */}
            <path
              d="M75 100 C65 140 70 180 80 200 C83 175 88 150 90 125 Z"
              fill="url(#hairGrad)"
            />
            <path
              d="M165 100 C175 140 170 180 160 200 C157 175 152 150 150 125 Z"
              fill="url(#hairGrad)"
            />

            {/* Neck */}
            <rect x="106" y="138" width="28" height="30" rx="6" fill="#e28743" />

            {/* Face Shape */}
            <path
              d="M86 92 C86 65 154 65 154 92 C154 132 138 156 120 156 C102 156 86 132 86 92 Z"
              fill="#fed7aa"
            />

            {/* Hair Style Top & Sides */}
            <path
              d="M80 88 C78 50 110 38 120 38 C130 38 162 50 160 88 C155 60 135 50 120 50 C105 50 85 60 80 88 Z"
              fill="url(#hairGrad)"
            />
            {/* Top Knot / Chignon */}
            <circle cx="120" cy="40" r="15" fill="url(#hairGrad)" />
            <circle cx="120" cy="38" r="6" fill="url(#goldGrad)" />

            {/* Royal Golden Mukuta (Crown / Circlet) */}
            <path
              d="M84 74 Q120 62 156 74 L154 80 Q120 70 86 80 Z"
              fill="url(#goldGrad)"
              filter="url(#glowEffect)"
            />
            {/* Center Crown Crest */}
            <path
              d="M114 68 L120 50 L126 68 Z"
              fill="url(#goldGrad)"
            />
            <circle cx="120" cy="62" r="3.5" fill="#ef4444" />

            {/* Eyebrows (Thoughtful / Inquiring) */}
            <path
              d="M96 95 Q106 91 113 95"
              stroke="#451a03"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M127 94 Q134 90 144 95"
              stroke="#451a03"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Kind & Intelligent Inquiring Eyes */}
            <ellipse cx="105" cy="104" rx="5.5" ry="4.5" fill="#1e1b4b" />
            <ellipse cx="135" cy="104" rx="5.5" ry="4.5" fill="#1e1b4b" />
            <circle cx="107" cy="102" r="1.8" fill="#ffffff" />
            <circle cx="137" cy="102" r="1.8" fill="#ffffff" />

            {/* Tilak of Wisdom (Subtle Gold/Red Line on Forehead) */}
            <line x1="120" y1="76" x2="120" y2="88" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="120" cy="90" r="1.5" fill="#f59e0b" />

            {/* Nose */}
            <path
              d="M120 102 L117 116 Q120 119 123 116"
              stroke="#c2410c"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Calm, Inquisitive Smile */}
            <path
              d="M112 129 Q120 135 128 129"
              stroke="#9a3412"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Royal Gold Kundala (Earrings) */}
            <circle cx="84" cy="108" r="4.5" fill="url(#goldGrad)" />
            <circle cx="156" cy="108" r="4.5" fill="url(#goldGrad)" />

            {/* Illuminated Ancient Scroll of Inquiry held in hand */}
            <g transform="translate(142, 175) rotate(-15)">
              <rect x="0" y="0" width="46" height="34" rx="4" fill="url(#scrollGrad)" stroke="#b45309" strokeWidth="1.5" />
              {/* Lines on scroll representing inquiry evidence */}
              <line x1="6" y1="8" x2="40" y2="8" stroke="#92400e" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="6" y1="14" x2="35" y2="14" stroke="#92400e" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="6" y1="20" x2="38" y2="20" stroke="#92400e" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="34" cy="26" r="3" fill="#ea580c" />
              {/* Wooden scroll roller ends */}
              <rect x="-3" y="-2" width="5" height="38" rx="2" fill="#78350f" />
              <rect x="44" y="-2" width="5" height="38" rx="2" fill="#78350f" />
            </g>

            {/* Hand holding the scroll */}
            <ellipse cx="148" cy="198" rx="10" ry="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />

            {/* Floating Sparkles / Question Stars */}
            <g filter="url(#glowEffect)">
              <circle cx="65" cy="70" r="2.5" fill="#fde047" />
              <circle cx="178" cy="85" r="2" fill="#fde047" />
              <circle cx="175" cy="55" r="2.5" fill="#38bdf8" />
            </g>
          </svg>
        </div>

        {/* Floating Mini Badge */}
        <div className="absolute -bottom-2 bg-gradient-to-r from-amber-600 to-orange-600 text-amber-100 text-[11px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full border border-amber-300/40 shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          <span>Prince of Reason</span>
        </div>
      </div>

      {/* Thought Bubble / Lore Snippet */}
      {showQuote && (
        <div className="mt-5 max-w-xs text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-xs shadow-inner">
            <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="italic">"Question before you follow the crowd."</span>
          </div>
        </div>
      )}
    </div>
  );
};
