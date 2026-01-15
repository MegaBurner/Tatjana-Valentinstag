import './Peony.css';

interface PeonyProps {
  size?: number;
}

const Peony = ({ size = 200 }: PeonyProps) => (
  <svg
    className="peony"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Radial Gradient für Petals: Soft Pink-Lavender */}
      <radialGradient id="petalGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#F8C8DC" />   {/* Light Pink Core */}
        <stop offset="50%" stopColor="#E6B8D7" />  {/* Lavender Mid */}
        <stop offset="100%" stopColor="#D4A7C8" /> {/* Soft Edge */}
      </radialGradient>
      
      {/* Gradient für innere Petals */}
      <radialGradient id="innerPetalGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FDD5E5" />
        <stop offset="100%" stopColor="#F4A5AE" />
      </radialGradient>
      
      {/* Center Gradient */}
      <radialGradient id="centerGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFE4B5" />  {/* Warm Yellow */}
        <stop offset="100%" stopColor="#F4A5AE" /> {/* Rose */}
      </radialGradient>
    </defs>
    
    {/* Outer Petals Layer */}
    <g className="outer-petals">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="60"
          rx="25"
          ry="45"
          fill="url(#petalGrad)"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.9"
        />
      ))}
    </g>
    
    {/* Middle Petals Layer */}
    <g className="middle-petals">
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="70"
          rx="18"
          ry="35"
          fill="url(#innerPetalGrad)"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.95"
        />
      ))}
    </g>
    
    {/* Inner Petals Layer */}
    <g className="inner-petals">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="80"
          rx="12"
          ry="22"
          fill="url(#innerPetalGrad)"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>
    
    {/* Blütenzentrum */}
    <g className="peony-center">
      <circle
        cx="100"
        cy="100"
        r="15"
        fill="url(#centerGrad)"
      />
    </g>
    
    {/* Stamen/Fringe Details */}
    <g className="stamens" stroke="#F4A5AE" strokeWidth="1" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="100"
          x2="100"
          y2="88"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>
  </svg>
);

export default Peony;
