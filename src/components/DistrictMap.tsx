import React, { useState } from 'react';
import {
  Car,
  Check,
  Compass,
  Copy,
  Footprints,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  TrainFront,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/savoraData';

type PinKey = 'savora' | 'valet' | 'transit' | 'garage';
type MapStyle = 'nocturne' | 'ivory';

interface WaypointInfo {
  id: PinKey;
  label: string;
  title: string;
  subtitle: string;
  walkTime: string;
  distance: string;
  instruction: string;
  x: number;
  y: number;
  routePath: string;
}

const WAYPOINTS: Record<PinKey, WaypointInfo> = {
  savora: {
    id: 'savora',
    label: 'SAVORA',
    title: 'SAVORA Main Courtyard Archway',
    subtitle: '418 Mercer Courtyard · Heritage District',
    walkTime: 'Destination',
    distance: '0 min',
    instruction:
      'Enter beneath the hand-forged brass lantern archway off Mercer Promenade into the cobblestone carriage courtyard.',
    x: 332,
    y: 238,
    routePath: '',
  },
  valet: {
    id: 'valet',
    label: 'Valet',
    title: 'Complimentary Evening Valet Stand',
    subtitle: 'Townsend Alley Pull-In · Opens 5:00 PM',
    walkTime: '1 min walk',
    distance: '140 ft',
    instruction:
      'Approach southbound on King Street and turn right onto Townsend Alley. Our uniformed attendants greet you directly beside the private courtyard gate.',
    x: 186,
    y: 266,
    routePath: 'M 186 266 L 245 266 L 245 238 L 332 238',
  },
  transit: {
    id: 'transit',
    label: 'Transit',
    title: 'Heritage Transit & Light Rail Plaza',
    subtitle: '2nd & King Corridor · Embarcadero Connector',
    walkTime: '3 min walk',
    distance: '0.2 mi',
    instruction:
      'Exit toward King Street Plaza, walk west past the brick clocktower, and turn north onto tree-lined Mercer Promenade.',
    x: 528,
    y: 132,
    routePath: 'M 528 132 L 456 132 L 456 196 L 332 196 L 332 238',
  },
  garage: {
    id: 'garage',
    label: 'Garage',
    title: 'Mercer Covered Parking & EV Vault',
    subtitle: '380 Second Street · Validated 4 Hours',
    walkTime: '2 min walk',
    distance: '480 ft',
    instruction:
      'Self-parking and Level-2 EV charging available daily. Present your ticket to our Maître d’ desk for complimentary evening validation.',
    x: 118,
    y: 114,
    routePath: 'M 118 114 L 118 196 L 332 196 L 332 238',
  },
};

export const DistrictMap: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<PinKey>('valet');
  const [mapStyle, setMapStyle] = useState<MapStyle>('nocturne');
  const [zoom, setZoom] = useState<number>(1);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const isDark = mapStyle === 'nocturne';
  const activeWaypoint = WAYPOINTS[selectedPin];

  const handleZoomIn = () => setZoom((z) => Math.min(1.5, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))));
  const handleReset = () => {
    setZoom(1);
    setSelectedPin('savora');
  };

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText(
        `${RESTAURANT_INFO.addressLine1}, ${RESTAURANT_INFO.addressLine2} (${RESTAURANT_INFO.coordinates})`
      );
    } catch {
      // Ignore clipboard permission fallback
    }
    setCopiedCoords(true);
    window.setTimeout(() => setCopiedCoords(false), 2200);
  };

  const palette = isDark
    ? {
        canvas: '#140D0A',
        water: '#191418',
        waterStroke: '#3B282E',
        street: '#1E1410',
        block: '#251813',
        blockInner: '#2D1E18',
        blockStroke: '#3D2A22',
        park: '#1F231B',
        parkStroke: '#363E2E',
        courtyard: '#330A14',
        courtyardStroke: '#C5A059',
        roadText: '#B7A591',
        minorText: '#857363',
        route: '#E4C98D',
        grid: 'rgba(197, 160, 89, 0.06)',
      }
    : {
        canvas: '#EFE7DA',
        water: '#E2E4E6',
        waterStroke: '#C7CCD0',
        street: '#FAF7F2',
        block: '#E6DDD0',
        blockInner: '#DDD2C2',
        blockStroke: '#CBBCA7',
        park: '#DFE5D8',
        parkStroke: '#B8C4AB',
        courtyard: '#4A101D',
        courtyardStroke: '#C5A059',
        roadText: '#5C473D',
        minorText: '#8A7566',
        route: '#4A101D',
        grid: 'rgba(74, 16, 29, 0.06)',
      };

  return (
    <div className="flex h-full flex-col border border-[#E8DFD1] bg-[#160E0B] text-[#FAF7F2]">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#1B120E] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-[#C5A059]/40 bg-[#29070F] text-[#E4C98D]">
            <Compass className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#E4C98D]">
              Mercer Courtyard · Arrival Atlas
            </p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-[#D7C9B4] tabular-nums">
              <span>{RESTAURANT_INFO.coordinates}</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={handleCopyCoords}
                className="inline-flex items-center gap-1 text-[#E4C98D] hover:underline cursor-pointer"
              >
                {copiedCoords ? (
                  <>
                    <Check className="h-3 w-3" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" aria-hidden="true" />
                    Copy Pin
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Style & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Map theme"
            className="flex border border-white/15 bg-[#140D0A] p-0.5"
          >
            <button
              type="button"
              onClick={() => setMapStyle('nocturne')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                mapStyle === 'nocturne'
                  ? 'bg-[#C5A059] text-[#160E0B]'
                  : 'text-[#D7C9B4] hover:text-[#FAF7F2]'
              }`}
            >
              Evening
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('ivory')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                mapStyle === 'ivory'
                  ? 'bg-[#C5A059] text-[#160E0B]'
                  : 'text-[#D7C9B4] hover:text-[#FAF7F2]'
              }`}
            >
              Daylight
            </button>
          </div>

          <div className="flex items-center border border-white/15 bg-[#140D0A]">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              aria-label="Zoom out map"
              className="flex h-8 w-8 items-center justify-center text-[#FAF7F2] transition-colors hover:bg-white/10 disabled:opacity-40 cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-12 text-center text-[11px] font-medium text-[#D7C9B4] tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 1.5}
              aria-label="Zoom in map"
              className="flex h-8 w-8 items-center justify-center text-[#FAF7F2] transition-colors hover:bg-white/10 disabled:opacity-40 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset map view"
              className="flex h-8 w-8 items-center justify-center border-l border-white/10 text-[#D7C9B4] transition-colors hover:bg-white/10 hover:text-[#FAF7F2] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Waypoint Selector Strip */}
      <div className="grid grid-cols-2 border-b border-white/10 bg-[#231712] sm:grid-cols-4">
        {(
          [
            { key: 'savora', label: 'SAVORA Entrance', icon: MapPin },
            { key: 'valet', label: 'Evening Valet', icon: Car },
            { key: 'transit', label: 'Transit Plaza', icon: TrainFront },
            { key: 'garage', label: 'Mercer Garage', icon: Footprints },
          ] as const
        ).map(({ key, label, icon: Icon }) => {
          const active = selectedPin === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPin(key)}
              className={`flex items-center justify-center gap-2 border-b border-r border-white/10 px-3 py-3 text-xs font-medium sm:border-b-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r [&:nth-child(n+3)]:border-b-0 last:border-r-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#4A101D] text-[#E4C98D]'
                  : 'text-[#D7C9B4] hover:bg-white/5 hover:text-[#FAF7F2]'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Architectural Blueprint Map Viewport */}
      <div
        className="relative flex-1 overflow-hidden min-h-[240px] sm:min-h-[360px] lg:min-h-[420px]"
        style={{ backgroundColor: palette.canvas }}
      >
        <svg
          viewBox="0 0 720 440"
          className="h-full w-full transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '50% 52%',
          }}
          role="img"
          aria-label="Interactive architectural district map showing SAVORA, Valet Stand, Transit Plaza, and Mercer Garage"
        >
          <defs>
            <pattern
              id="architectural-grid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke={palette.grid}
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="water-lines"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(25)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="16"
                stroke={palette.waterStroke}
                strokeWidth="0.8"
                strokeOpacity="0.45"
              />
            </pattern>
          </defs>

          {/* Base Canvas & Grid */}
          <rect width="720" height="440" fill={palette.street} />
          <rect width="720" height="440" fill="url(#architectural-grid)" />

          {/* Eastern Bay / Pier Edge */}
          <polygon points="620,0 720,0 720,440 585,440" fill={palette.water} />
          <polygon points="620,0 720,0 720,440 585,440" fill="url(#water-lines)" />
          <path
            d="M 620 0 L 585 440"
            stroke={palette.waterStroke}
            strokeWidth="2"
            fill="none"
          />
          <text
            x="658"
            y="245"
            fill={palette.minorText}
            fontSize="10"
            letterSpacing="4"
            textAnchor="middle"
            transform="rotate(-85 658 245)"
          >
            SAN FRANCISCO BAY
          </text>

          {/* Urban City Blocks & Detailed Architectural Lot Subdivisions */}
          {/* Northwest Block (Mercer Garage) */}
          <g>
            <rect
              x="28"
              y="26"
              width="180"
              height="144"
              fill={palette.block}
              stroke={palette.blockStroke}
              strokeWidth="1.2"
            />
            <rect x="42" y="40" width="70" height="52" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="122" y="40" width="72" height="52" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="42" y="102" width="152" height="54" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
          </g>

          {/* North-Center Block */}
          <g>
            <rect
              x="246"
              y="26"
              width="192"
              height="144"
              fill={palette.block}
              stroke={palette.blockStroke}
              strokeWidth="1.2"
            />
            <rect x="262" y="40" width="90" height="116" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="364" y="40" width="60" height="54" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="364" y="104" width="60" height="52" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
          </g>

          {/* Northeast Block + Heritage Park */}
          <g>
            <rect
              x="476"
              y="26"
              width="114"
              height="144"
              fill={palette.park}
              stroke={palette.parkStroke}
              strokeWidth="1.2"
            />
            <circle cx="532" cy="84" r="24" fill="none" stroke={palette.parkStroke} strokeWidth="1" strokeDasharray="3 3" />
            <text x="532" y="88" textAnchor="middle" fill={palette.minorText} fontSize="8.5" letterSpacing="1.5">
              PLAZA
            </text>
          </g>

          {/* Southwest Block */}
          <g>
            <rect
              x="28"
              y="214"
              width="142"
              height="188"
              fill={palette.block}
              stroke={palette.blockStroke}
              strokeWidth="1.2"
            />
            <rect x="44" y="228" width="110" height="72" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="44" y="312" width="52" height="74" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="104" y="312" width="50" height="74" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
          </g>

          {/* Center Heritage Block (SAVORA 418 Mercer Courtyard) */}
          <g>
            <rect
              x="212"
              y="214"
              width="226"
              height="188"
              fill={palette.block}
              stroke={palette.blockStroke}
              strokeWidth="1.2"
            />
            {/* Surrounding 1924 Brick Carriage Houses */}
            <rect x="226" y="228" width="54" height="160" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="380" y="228" width="44" height="72" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="380" y="312" width="44" height="76" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="290" y="328" width="80" height="60" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />

            {/* SAVORA Courtyard Footprint */}
            <rect
              x="288"
              y="222"
              width="86"
              height="94"
              fill={palette.courtyard}
              stroke={palette.courtyardStroke}
              strokeWidth="1.6"
            />
            {/* Courtyard Fountain / Archway Ring */}
            <circle
              cx="332"
              cy="288"
              r="11"
              fill="none"
              stroke="#C5A059"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          </g>

          {/* Southeast Block */}
          <g>
            <rect
              x="476"
              y="214"
              width="98"
              height="188"
              fill={palette.block}
              stroke={palette.blockStroke}
              strokeWidth="1.2"
            />
            <rect x="490" y="228" width="70" height="84" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
            <rect x="490" y="322" width="70" height="64" fill={palette.blockInner} stroke={palette.blockStroke} strokeWidth="0.8" />
          </g>

          {/* Courtyard Tree Canopies along Mercer Promenade */}
          {[226, 268, 395, 434].map((tx) => (
            <circle
              key={tx}
              cx={tx}
              cy="208"
              r="5.5"
              fill={palette.park}
              stroke={palette.parkStroke}
              strokeWidth="1"
            />
          ))}

          {/* Street Names */}
          <text
            x="332"
            y="192"
            textAnchor="middle"
            fill={palette.roadText}
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="4"
          >
            MERCER PROMENADE
          </text>
          <text
            x="191"
            y="340"
            textAnchor="middle"
            fill={palette.roadText}
            fontSize="9.5"
            letterSpacing="2.5"
            transform="rotate(-90 191 340)"
          >
            TOWNSEND ALLEY
          </text>
          <text
            x="457"
            y="310"
            textAnchor="middle"
            fill={palette.roadText}
            fontSize="9.5"
            letterSpacing="2.5"
            transform="rotate(-90 457 310)"
          >
            KING STREET
          </text>
          <text
            x="227"
            y="98"
            textAnchor="middle"
            fill={palette.minorText}
            fontSize="9"
            letterSpacing="2.5"
            transform="rotate(-90 227 98)"
          >
            SECOND STREET
          </text>
          <text
            x="592"
            y="320"
            textAnchor="middle"
            fill={palette.minorText}
            fontSize="9"
            letterSpacing="2.5"
            transform="rotate(-85 592 320)"
          >
            THE EMBARCADERO
          </text>

          {/* Active Arrival Route Line */}
          {activeWaypoint.routePath && (
            <path
              d={activeWaypoint.routePath}
              fill="none"
              stroke={palette.route}
              strokeWidth="2.5"
              strokeDasharray="6 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Secondary Waypoint Pins */}
          {(['valet', 'transit', 'garage'] as const).map((key) => {
            const wp = WAYPOINTS[key];
            const isSelected = selectedPin === key;
            return (
              <g
                key={key}
                className="cursor-pointer"
                onClick={() => setSelectedPin(key)}
              >
                {isSelected && (
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="18"
                    fill="#C5A059"
                    fillOpacity="0.24"
                  />
                )}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isSelected ? '8.5' : '6.5'}
                  fill={isSelected ? '#C5A059' : isDark ? '#36251E' : '#FAF7F2'}
                  stroke={isSelected ? '#FAF7F2' : '#C5A059'}
                  strokeWidth="2"
                />
                <g transform={`translate(${wp.x}, ${wp.y - 16})`}>
                  <rect
                    x="-34"
                    y="-14"
                    width="68"
                    height="18"
                    fill={isSelected ? '#4A101D' : isDark ? '#160E0B' : '#231712'}
                    stroke="#C5A059"
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    fill={isSelected ? '#E4C98D' : '#FAF7F2'}
                    fontSize="9.5"
                    fontWeight="600"
                    letterSpacing="0.8"
                  >
                    {wp.label.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Primary SAVORA Landmark Pin */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedPin('savora')}
          >
            <circle
              cx={WAYPOINTS.savora.x}
              cy={WAYPOINTS.savora.y}
              r={selectedPin === 'savora' ? '26' : '20'}
              fill="#C5A059"
              fillOpacity="0.18"
            />
            <circle
              cx={WAYPOINTS.savora.x}
              cy={WAYPOINTS.savora.y}
              r="11"
              fill="#C5A059"
              stroke="#160E0B"
              strokeWidth="2.5"
            />
            <circle cx={WAYPOINTS.savora.x} cy={WAYPOINTS.savora.y} r="3.5" fill="#4A101D" />
            <text
              x={WAYPOINTS.savora.x}
              y={WAYPOINTS.savora.y + 26}
              textAnchor="middle"
              fill="#FAF7F2"
              fontSize="11.5"
              fontWeight="700"
              letterSpacing="2.5"
            >
              SAVORA
            </text>
          </g>

          {/* Scale Bar & North Indicator */}
          <g transform="translate(36, 418)">
            <line x1="0" y1="0" x2="64" y2="0" stroke={palette.roadText} strokeWidth="1.5" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke={palette.roadText} strokeWidth="1.5" />
            <line x1="64" y1="-3" x2="64" y2="3" stroke={palette.roadText} strokeWidth="1.5" />
            <text x="72" y="3" fill={palette.minorText} fontSize="9" letterSpacing="1">
              200 FT · NORTH ↑
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Arrival Details Panel */}
      <div className="border-t border-white/10 bg-[#160E0B] px-4 py-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="max-w-lg">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#E4C98D]">
              <span className="uppercase tracking-[0.14em]">{activeWaypoint.walkTime}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-[#D7C9B4]">{activeWaypoint.distance}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#D7C9B4]">{activeWaypoint.subtitle}</span>
            </div>
            <h3 className="mt-1.5 font-serif text-lg font-medium text-[#FAF7F2]">
              {activeWaypoint.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#D7C9B4]">
              {activeWaypoint.instruction}
            </p>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#C5A059]">
              Valet &amp; Arrival
            </p>
            <p className="mt-1 text-xs text-[#E8DFD1]">
              Evening Valet · 5:00 PM – Close
            </p>
            <p className="text-xs text-[#D7C9B4]">
              Wheelchair Courtyard Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
