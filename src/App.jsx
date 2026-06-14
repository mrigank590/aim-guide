import { useState, useEffect, useRef } from "react";

// ─── GOOGLE FONTS ────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
const DARK = {
  bg:        "#0D0F12",
  panel:     "#141618",
  panelAlt:  "#1A1D21",
  border:    "#252930",
  text:      "#E8ECF0",
  textMuted: "#7A8694",
  textDim:   "#3E4A58",
  accent:    "#00E5A0",
  accentDim: "#00E5A01A",
  warn:      "#FF6B6B",
  warnDim:   "#FF6B6B1A",
  gold:      "#F5C542",
  goldDim:   "#F5C5421A",
  tag:       "#1E2328",
  tagText:   "#7A8694",
};
const LIGHT = {
  bg:        "#ECEEF3",
  panel:     "#FFFFFF",
  panelAlt:  "#F4F6FA",
  border:    "#D4D9E4",
  text:      "#0F1217",
  textMuted: "#505A6E",
  textDim:   "#9AA4B4",
  accent:    "#007A58",
  accentDim: "#007A5814",
  warn:      "#BF3535",
  warnDim:   "#BF353514",
  gold:      "#9A6F00",
  goldDim:   "#9A6F0014",
  tag:       "#E6E9F0",
  tagText:   "#505A6E",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CORE_SKILLS = [
  { skill: "Flicking",         desc: "Snapping crosshair to a sudden target",      when: "Peeking, duels",        col: "accent" },
  { skill: "Tracking",         desc: "Keeping crosshair on a moving target",       when: "Strafing, close range", col: "accent" },
  { skill: "Target Switching", desc: "Moving cleanly from one enemy to the next",  when: "Multi-kills, clutches", col: "accent" },
  { skill: "Click Timing",     desc: "Firing at the exact right moment",           when: "Counter-strafe (CS2)",  col: "gold"   },
];

const FREE_TRAINERS = [
  {
    name: "Aim Lab", badge: "FREE", bc: "accent",
    sub: "Steam — most accessible entry point",
    pros: ["Huge scenario library", "Official partner of CS2, Valorant & Apex", "AI feedback & leaderboards", "Best starting point for beginners"],
    cons: ["Aggressive subscription push (~$10/mo)", "Paywalls on 40–60% of UI", "Battle pass added", "Sensitivity finder now behind paywall", "Feels like a mobile game (many Steam reviews)"],
    verdict: "Start here. Free tier still works — just ignore the subscription pressure.",
    link: "Search 'Aimlabs' on Steam", href: null,
  },
  {
    name: "3D Aim Trainer", badge: "FREE", bc: "accent",
    sub: "Browser — no download needed",
    pros: ["Instant access on any device", "CS2 & Valorant sensitivity sync", "AIMER7-co-designed drills", "Fundamental Academy is completely free"],
    cons: ["Slightly less smooth than native apps", "Fewer community scenarios than KovaaK's", "More advanced modes behind paywall"],
    verdict: "Great browser option — especially on devices where you can't install software.",
    link: "3daimtrainer.com", href: "https://www.3daimtrainer.com",
  },
  {
    name: "FPSAim / CS2Practice", badge: "FREE", bc: "accent",
    sub: "Browser — zero setup required",
    pros: ["No install", "Gridshot, tracking, flick modes", "Sensitivity sync built in", "Core modes free forever"],
    cons: ["Limited scenario depth vs. dedicated tools", "Smaller community"],
    verdict: "Good for a quick warmup anywhere, anytime.",
    link: "fpsaim.com  |  cs2practice.com", href: "https://fpsaim.com",
  },
  {
    name: "Open Aim Trainer", badge: "OPEN SOURCE", bc: "accent",
    sub: "Godot engine — zero ads, zero paywalls",
    pros: ["Fully free and open source", "Static and moving targets", "Community-driven development", "No monetization, ever"],
    cons: ["Less polished than commercial tools", "Smaller scenario library", "Less active support community"],
    verdict: "Best if you want zero compromise on 'free forever, no paywalls.'",
    link: "Search 'OpenAimTrainer erkkon' on GitHub", href: null,
  },
];

const WORKSHOP_MAPS = [
  { name: "Aim Botz",             trains: "Precise clicking, crosshair placement", notes: "Gold standard. Fully customizable bots. Pros use this daily." },
  { name: "Fast Aim / Reflex",    trains: "Reaction speed, flick shots",           notes: "Keep sessions short — 5–8 min max." },
  { name: "Recoil Master",        trains: "Spray patterns and recoil control",     notes: "Essential for AK-47, M4A4, M4A1-S mastery." },
  { name: "Yprac Series",         trains: "Crosshair placement, pre-aim angles",   notes: "Map-specific — learn exactly where enemy heads appear." },
  { name: "CSStats Training Map", trains: "All-rounder daily warmup",              notes: "Rush & Shuffle modes. Great structured warmup." },
  { name: "Movement Hub",         trains: "Counter-strafing, bunny hopping",       notes: "Often overlooked — very high impact on duels." },
];

const PAID_RESOURCES = [
  {
    name: "KovaaK's FPS Aim Trainer", price: "~$8–10 one-time (Steam)", badge: "PAID", bc: "gold",
    pros: ["200,000+ community-made scenarios", "No subscription or microtransactions", "Partnered with Voltaic benchmarks", "AIMER7 routines built around it", "Validated by 2024 peer-reviewed study", "Actively used by pro players"],
    cons: ["Performance issues reported on some systems (stuttering, mouse drift)", "Steeper setup curve than Aim Lab", "Stationary scenarios don't fully replicate strafing duels", "Tracking Trainer DLC sold separately (~$5)"],
    verdict: "The long-term investment. Start with Aim Lab free, graduate here when serious.",
  },
  {
    name: "Aiming.Pro", price: "Free tier + paid plans", badge: "FREEMIUM", bc: "gold",
    pros: ["Structured drill-based progression", "Deep performance analytics", "Global leaderboard", "Game-specific optimization"],
    cons: ["Advanced analytics require a paid plan", "Less community content than KovaaK's"],
    verdict: "Worth trying the free tier. Strong pick for data-driven players.",
  },
  {
    name: "Voltaic Coaching", price: "Variable — high", badge: "PAID", bc: "warn",
    pros: ["1-on-1 coaching from elite aimers", "Issue-specific personalized routines", "Backed by the Voltaic community"],
    cons: ["Expensive", "Only impactful at high skill levels", "Not worth it for most players"],
    verdict: "Skip unless you're competing at T1/T2 level or genuinely stuck at advanced rank.",
  },
];

const EDPI_DATA = [
  { game: "CS2",          range: "600–1200",  sweet: "~800",     ex: "800 DPI × 1.0 in-game" },
  { game: "Valorant",     range: "200–400",   sweet: "250–320",  ex: "800 DPI × 0.35 in-game" },
  { game: "Apex Legends", range: "800–1600",  sweet: "~1200",    ex: "800 DPI × 1.5 in-game" },
];

const WIN_SETTINGS = [
  { s: "Enhance Pointer Precision", v: "OFF",          why: "Mouse acceleration — destroys aim consistency" },
  { s: "Windows Pointer Speed",     v: "6/11 default", why: "Leave untouched when using Raw Input" },
  { s: "Raw Input (in-game)",       v: "ON",           why: "Bypasses Windows entirely — only DPI × sens matter" },
  { s: "Mouse Polling Rate",        v: "1000 Hz",      why: "Reports position every 1ms for smooth tracking" },
  { s: "V-Sync",                    v: "OFF",          why: "Adds input lag — use a frame rate cap instead" },
];

const HARDWARE_DATA = [
  { item: "Monitor refresh rate",       impact: "HIGH",   detail: "60Hz → 144Hz is a massive upgrade. Motion clarity improves dramatically. 240Hz offers further benefit at diminishing returns." },
  { item: "Mousepad size",              impact: "HIGH",   detail: "Low sensitivity requires large arm sweeps. XL (450mm+) is the modern standard. Pros bring their own pads to LAN events — surface change is that impactful." },
  { item: "Mouse surface type",         impact: "MEDIUM", detail: "Cloth = more control and friction. Hard/speed = faster glide. Pick one and stay consistent — changing surface forces relearning." },
  { item: "Mouse weight",               impact: "MEDIUM", detail: "Under 80g reduces fatigue in long sessions. Worth considering, not mandatory." },
  { item: "Specific mouse model",       impact: "LOW",    detail: "Any modern optical sensor performs identically at a competitive level. Shape, weight, and comfort matter more than brand." },
  { item: "High polling rate (4–8kHz)", impact: "LOW",    detail: "Only relevant at the absolute highest levels. 1000Hz is the competitive standard and fully sufficient." },
  { item: "RGB / branding",             impact: "NONE",   detail: "Marketing noise. A $30 optical mouse with a solid sensor is functionally equal to a $120 one for aim purposes." },
];

const ANALYSIS_TOOLS = [
  { name: "Leetify",              cost: "Free (freemium)", game: "CS2",           desc: "Grades match data: entry success rate, clutch rate, utility damage, opening duel win rate. Pinpoints exactly which skill is dragging your rating.", href: "https://leetify.com" },
  { name: "CS2 Demo System",      cost: "Free (built-in)", game: "CS2",           desc: "Built into CS2. Third-person replay of any match. Watch your deaths — where was your crosshair before the enemy appeared?", href: null },
  { name: "Tracker.gg",           cost: "Free",            game: "CS2 + Valorant", desc: "Performance trends over time. Spot K/D patterns per map, win rate per side, headshot %. Identify your weakest areas.", href: "https://tracker.gg" },
  { name: "ProSettings.net",      cost: "Free",            game: "CS2 + Valorant", desc: "Verified settings for 900+ CS2 pros and hundreds of Valorant pros. DPI, sens, crosshair, peripherals. Includes a free crosshair generator.", href: "https://prosettings.net" },
  { name: "cs2settings.com",      cost: "Free",            game: "CS2",           desc: "Alternative pro database tracking 2,400+ CS2 professionals. Settings verified directly from broadcasts and streams.", href: "https://cs2settings.com" },
  { name: "mouse-sensitivity.com",cost: "Free",            game: "All games",     desc: "Cross-game sensitivity converter. CS2 → Valorant multiplier is ×0.314 (engine yaw-based). Don't eyeball this — use the calculator.", href: "https://www.mouse-sensitivity.com" },
];

const MENTAL_TIPS = [
  { title: "Warmup before ranked — every time",     body: "10–15 min in Aim Botz or Aim Lab before queuing settles your nervous system. Players who skip warmup consistently perform below their actual skill level." },
  { title: "Focus on process, not rank",            body: "Set one specific goal per session — 'keep crosshair at head level on A-site' — rather than chasing a rank number. Rank is a lagging indicator of skill." },
  { title: "Max 2 ranked games before a break",     body: "Skills learned while tilted reinforce bad habits. The brain consolidates patterns based on repetition, not intent. Stop, reset, then come back." },
  { title: "Never queue after a loss streak",       body: "Switch to DM or an aim trainer instead. Playing ranked while frustrated is practice at playing frustrated — not at playing well." },
  { title: "Watch your deaths, not your kills",     body: "Every death contains information: wrong angle, bad position, caught reloading, crosshair too low. One focused demo session per week beats weeks of mindless deathmatch." },
  { title: "Commit to your sensitivity for a week", body: "Your aim is not the problem in most bad games. Changing sens after every loss cycle destroys muscle memory. Lock it in for at least seven full days." },
];

const GAME_TIPS = {
  cs2: [
    { tip: "Counter-strafing is mandatory",    detail: "CS2 has strict movement inaccuracy. Press the opposite key to stop before firing. Movement Hub workshop map trains this directly." },
    { tip: "Spray patterns are learnable",     detail: "AK-47 and M4 patterns are consistent and memorizable. 30 min on Recoil Master makes a visible difference in your first-bullet-to-kill speed." },
    { tip: "One-tap vs. spray decisions",      detail: "Stationary enemy → one-tap. Strafing enemy → spray and pull down-left. Moving target → burst fire (3 rounds, pause, 3 rounds)." },
    { tip: "Use peek momentum",                detail: "When you peek, you briefly have a frame advantage — the enemy must react. Commit to the peek rather than standing still in the open." },
    { tip: "Enable Follow Recoil crosshair",   detail: "CS2's built-in feature shows your crosshair following actual recoil. Use it while learning spray patterns, disable once patterns are memorized." },
  ],
  val: [
    { tip: "Abilities create opportunity — aim closes it", detail: "New players over-rely on agent abilities as a crutch. Abilities open angles and create information; your gun still needs to win the fight." },
    { tip: "First bullet accuracy is extremely high",      detail: "Valorant rewards precision over spray. Stop moving completely before firing — always. Running accuracy is negligible in this engine." },
    { tip: "Understand the headshot math",                 detail: "Two headshots with a Vandal kills at most ranges. Four body shots will not. Crosshair placement at head level is more critical here than in most games." },
    { tip: "Learn strafe-peeking",                         detail: "Strafe left-right to create a moving target, then stop briefly to fire accurately. This technique transfers directly from CS2 and is a core intermediate skill." },
    { tip: "Agent ability ≠ aim bypass",                   detail: "Strong ability usage at Plat+ assumes competent aim. At lower ranks, mechanical improvement gives more consistent rank-ups than ability optimization." },
  ],
  apex: [
    { tip: "Tracking is the dominant skill",          detail: "Unlike CS2/Valorant, Apex gunfights are longer and enemies rarely stop moving. Tracking — keeping your crosshair on a moving target — is the skill that wins fights." },
    { tip: "Strafe to win duels",                     detail: "Directional strafing (A-D-A-D) while shooting is effective in Apex due to movement speed. Counter-strafing to stop before shooting matters far less here." },
    { tip: "Learn bullet drop on snipers",            detail: "Longbow, Sentinel, and Charge Rifle projectiles have travel time. Always lead your shots — the bullet needs to arrive where the enemy will be." },
    { tip: "Recoil patterns vary wildly per gun",     detail: "Each weapon has a unique pattern. R-301 is forgiving; Flatline pulls hard left. Spend time in the firing range learning the guns you actually use in matches." },
    { tip: "High sensitivity works differently here", detail: "Apex's faster movement pace and tracking-heavy combat means many players run slightly higher eDPI (1000–1600) than in tactical shooters. Find what suits your style." },
  ],
};

const COMMUNITY_LINKS = [
  { name: "r/FPSAimTrainer", desc: "Dedicated aim improvement community", href: "https://reddit.com/r/FPSAimTrainer" },
  { name: "r/Voltaic",       desc: "Structured benchmarks and routines",  href: "https://reddit.com/r/Voltaic" },
  { name: "r/GlobalOffensive",desc: "CS2 general tips and discussion",    href: "https://reddit.com/r/GlobalOffensive" },
  { name: "r/VALORANT",      desc: "Valorant tips, meta, and guides",     href: "https://reddit.com/r/VALORANT" },
  { name: "r/LearnCSGO",     desc: "CS2-specific beginner guidance",      href: "https://reddit.com/r/LearnCSGO" },
  { name: "voltaic.gg",      desc: "Free routines, benchmarks, Discord",  href: "https://voltaic.gg" },
];

const ALL_LINKS = [
  { name: "Aim Lab",                cost: "Free (freemium)",     type: "Aim Trainer" },
  { name: "KovaaK's",              cost: "$8–10 one-time",      type: "Aim Trainer" },
  { name: "3D Aim Trainer",         cost: "Free (freemium)",     type: "Browser Trainer" },
  { name: "FPSAim.com",             cost: "Free",                type: "Browser Trainer" },
  { name: "CS2Practice.com",        cost: "Free",                type: "Browser Trainer" },
  { name: "Open Aim Trainer",       cost: "Free / Open Source",  type: "Downloadable" },
  { name: "Aim Botz (Workshop)",    cost: "Free — in-game",      type: "CS2 Workshop" },
  { name: "Recoil Master",          cost: "Free — in-game",      type: "CS2 Workshop" },
  { name: "Yprac Series",           cost: "Free — in-game",      type: "CS2 Workshop" },
  { name: "Movement Hub",           cost: "Free — in-game",      type: "CS2 Workshop" },
  { name: "Voltaic Community",      cost: "Free (coaching paid)", type: "Community" },
  { name: "AIMER7 Guides",          cost: "Free PDF",            type: "Education" },
  { name: "Leetify",                cost: "Free (freemium)",     type: "Match Analysis" },
  { name: "ProSettings.net",        cost: "Free",                type: "Pro Settings DB" },
  { name: "cs2settings.com",        cost: "Free",                type: "Pro Settings DB" },
  { name: "Tracker.gg",             cost: "Free",                type: "Stat Tracking" },
  { name: "mouse-sensitivity.com",  cost: "Free",                type: "Sens Converter" },
  { name: "Aiming.Pro",             cost: "Free (freemium)",     type: "Drill Trainer" },
];

const TABS = [
  { id: "overview",  label: "OVERVIEW"  },
  { id: "free",      label: "FREE"      },
  { id: "paid",      label: "PAID"      },
  { id: "settings",  label: "SETTINGS"  },
  { id: "calc",      label: "CALCULATOR"},
  { id: "hardware",  label: "HARDWARE"  },
  { id: "analysis",  label: "ANALYSIS"  },
  { id: "mental",    label: "MENTAL"    },
  { id: "gametips",  label: "GAME TIPS" },
  { id: "resources", label: "RESOURCES" },
];

// ─── RETICLE SVG ──────────────────────────────────────────────────────────────
const Reticle = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="3.5" stroke={color} strokeWidth="1.2" />
    <line x1="9" y1="0"    x2="9"  y2="5.5"  stroke={color} strokeWidth="1.2" />
    <line x1="9" y1="12.5" x2="9"  y2="18"   stroke={color} strokeWidth="1.2" />
    <line x1="0" y1="9"    x2="5.5" y2="9"   stroke={color} strokeWidth="1.2" />
    <line x1="12.5" y1="9" x2="18" y2="9"    stroke={color} strokeWidth="1.2" />
  </svg>
);

// ─── EDPI CALCULATOR ──────────────────────────────────────────────────────────
const EDPICalc = ({ t, mono, body }) => {
  const [dpi, setDpi]   = useState(800);
  const [sens, setSens] = useState(1.0);
  const [game, setGame] = useState("CS2");
  const edpi = Math.round(dpi * sens * 100) / 100;

  const ranges = { CS2: [600, 1200], Valorant: [200, 400], "Apex Legends": [800, 1600] };
  const [lo, hi] = ranges[game];
  const inRange = edpi >= lo && edpi <= hi;
  const tooHigh = edpi > hi;

  const statusColor = inRange ? t.accent : tooHigh ? t.warn : t.gold;
  const statusLabel = inRange ? "✓ IN RANGE" : tooHigh ? "▲ TOO HIGH" : "▼ TOO LOW";

  return (
    <div style={{ background: t.panel, border: `1px solid ${t.border}`, borderRadius: 8, padding: "24px", marginBottom: 24 }}>
      <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: t.accent, marginBottom: 16 }}>// EDPI CALCULATOR</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 20 }}>
        {/* DPI */}
        <div>
          <label style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: t.textMuted, display: "block", marginBottom: 6 }}>MOUSE DPI</label>
          <input
            type="number" value={dpi} min={100} max={16000} step={50}
            onChange={e => setDpi(Number(e.target.value))}
            style={{ width: "100%", background: t.panelAlt, border: `1px solid ${t.border}`, borderRadius: 4, padding: "8px 10px", color: t.text, fontFamily: mono, fontSize: 14, fontWeight: 700, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        {/* Sens */}
        <div>
          <label style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: t.textMuted, display: "block", marginBottom: 6 }}>IN-GAME SENSITIVITY</label>
          <input
            type="number" value={sens} min={0.01} max={10} step={0.01}
            onChange={e => setSens(Number(e.target.value))}
            style={{ width: "100%", background: t.panelAlt, border: `1px solid ${t.border}`, borderRadius: 4, padding: "8px 10px", color: t.text, fontFamily: mono, fontSize: 14, fontWeight: 700, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        {/* Game */}
        <div>
          <label style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: t.textMuted, display: "block", marginBottom: 6 }}>GAME</label>
          <select
            value={game} onChange={e => setGame(e.target.value)}
            style={{ width: "100%", background: t.panelAlt, border: `1px solid ${t.border}`, borderRadius: 4, padding: "8px 10px", color: t.text, fontFamily: mono, fontSize: 13, outline: "none", cursor: "pointer", boxSizing: "border-box" }}
          >
            {Object.keys(ranges).map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Result */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", padding: "16px 20px", background: t.panelAlt, borderRadius: 6, border: `1px solid ${t.border}` }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, color: t.textMuted, letterSpacing: "0.14em", marginBottom: 4 }}>YOUR eDPI</div>
          <div style={{ fontFamily: mono, fontSize: 32, fontWeight: 700, color: statusColor, lineHeight: 1 }}>{edpi}</div>
        </div>
        <div style={{ width: 1, height: 48, background: t.border }} />
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, color: t.textMuted, letterSpacing: "0.14em", marginBottom: 4 }}>STATUS FOR {game.toUpperCase()}</div>
          <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: statusColor }}>{statusLabel}</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>Recommended: {lo}–{hi} eDPI</div>
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, color: t.textMuted, letterSpacing: "0.14em", marginBottom: 4 }}>FORMULA</div>
          <div style={{ fontFamily: mono, fontSize: 13, color: t.text }}>{dpi} × {sens} = <span style={{ color: statusColor, fontWeight: 700 }}>{edpi}</span></div>
        </div>
      </div>

      {!inRange && (
        <div style={{ marginTop: 12, padding: "10px 14px", background: tooHigh ? t.warnDim : t.goldDim, borderRadius: 4, borderLeft: `3px solid ${statusColor}`, fontSize: 13, color: t.textMuted, fontFamily: mono }}>
          {tooHigh
            ? `▲ Your eDPI is high. Try lowering to ${lo}–${hi}. Suggested: 800 DPI × ${(lo / 800).toFixed(2)} sens.`
            : `▼ Your eDPI is low. Try raising to ${lo}–${hi}. Suggested: 800 DPI × ${(lo / 800).toFixed(2)} sens.`}
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FPSAimGuide() {
  const [dark, setDark] = useState(true);
  const [tab,  setTab]  = useState("overview");
  const [gameTipGame, setGameTipGame] = useState("cs2");
  const contentRef = useRef(null);
  const t = dark ? DARK : LIGHT;

  const mono = "'JetBrains Mono', 'Courier New', monospace";
  const body = "'Inter', system-ui, sans-serif";

  const changeTab = (id) => {
    setTab(id);
    setTimeout(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  // ── SHARED STYLE HELPERS ──────────────────────────────────────────────────
  const S = {
    root: { display: "flex", flexDirection: "column", height: "100vh", background: t.bg, color: t.text, fontFamily: body, overflow: "hidden" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 52, background: t.panel, borderBottom: `1px solid ${t.border}`, flexShrink: 0, zIndex: 10 },
    logo: { fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.accent, letterSpacing: "0.14em", display: "flex", alignItems: "center", gap: 8 },
    themeBtn: { fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "5px 11px", background: t.panelAlt, border: `1px solid ${t.border}`, color: t.textMuted, borderRadius: 4, cursor: "pointer" },
    hero: { padding: "28px 24px 24px", background: t.panel, borderBottom: `1px solid ${t.border}`, flexShrink: 0 },
    heroEyebrow: { fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: t.accent, marginBottom: 8 },
    heroTitle: { fontFamily: mono, fontSize: "clamp(20px,3.5vw,32px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 8, color: t.text },
    heroSub: { fontSize: 13, color: t.textMuted, maxWidth: 520, lineHeight: 1.65 },
    tabBar: { display: "flex", background: t.panel, borderBottom: `1px solid ${t.border}`, overflowX: "auto", flexShrink: 0, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" },
    tabBtn: (active) => ({ fontFamily: mono, fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: "0.12em", padding: "13px 14px 11px", border: "none", borderBottom: `2px solid ${active ? t.accent : "transparent"}`, background: "transparent", color: active ? t.accent : t.textMuted, cursor: "pointer", whiteSpace: "nowrap" }),
    scroll: { flex: 1, overflowY: "auto", overflowX: "hidden" },
    content: { maxWidth: 860, margin: "0 auto", padding: "28px 20px 80px" },
    // cards
    card: { background: t.panel, border: `1px solid ${t.border}`, borderRadius: 6, padding: "16px 18px", marginBottom: 10 },
    cardTitle: { fontFamily: mono, fontSize: 13, fontWeight: 700, color: t.text, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 },
    cardSub: { fontSize: 12, color: t.textMuted, marginBottom: 12 },
    // labels
    sectionLabel: { fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: t.accent, textTransform: "uppercase", marginBottom: 6 },
    sectionTitle: { fontFamily: mono, fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 14 },
    // badges
    badge: (col) => {
      const bg = col === "accent" ? t.accentDim : col === "gold" ? t.goldDim : t.warnDim;
      const fg = col === "accent" ? t.accent    : col === "gold" ? t.gold    : t.warn;
      return { fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "2px 7px", borderRadius: 3, background: bg, color: fg, border: `1px solid ${fg}44`, flexShrink: 0 };
    },
    impactPill: (lv) => {
      const map = { HIGH: [t.accentDim, t.accent], MEDIUM: [t.goldDim, t.gold], LOW: [t.warnDim, t.warn], NONE: [t.panelAlt, t.textMuted] };
      const [bg, fg] = map[lv] || map["NONE"];
      return { display: "inline-block", fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "2px 8px", borderRadius: 3, background: bg, color: fg };
    },
    tag: { display: "inline-block", background: t.tag, color: t.tagText, fontFamily: mono, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3 },
    // pro/con
    proConGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 },
    proBox: { background: t.accentDim, border: `1px solid ${t.accent}28`, borderRadius: 4, padding: "10px 12px" },
    conBox: { background: t.warnDim,   border: `1px solid ${t.warn}28`,   borderRadius: 4, padding: "10px 12px" },
    pcLabel: (col) => ({ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: col, marginBottom: 6 }),
    li: { fontSize: 12, color: t.textMuted, lineHeight: 1.65, paddingLeft: 10, marginBottom: 2 },
    // verdicts
    verdict: { background: t.accentDim, borderLeft: `3px solid ${t.accent}`, borderRadius: "0 4px 4px 0", padding: "8px 12px", fontSize: 12, color: t.accent, fontFamily: mono, fontWeight: 600 },
    warnVerdict: { background: t.warnDim, borderLeft: `3px solid ${t.warn}`, borderRadius: "0 4px 4px 0", padding: "8px 12px", fontSize: 12, color: t.warn, fontFamily: mono, fontWeight: 600 },
    goldVerdict: { background: t.goldDim, borderLeft: `3px solid ${t.gold}`, borderRadius: "0 4px 4px 0", padding: "8px 12px", fontSize: 12, color: t.gold, fontFamily: mono, fontWeight: 600 },
    // info boxes
    infoBox: { background: t.panelAlt, border: `1px solid ${t.border}`, borderLeft: `3px solid ${t.accent}`, borderRadius: "0 4px 4px 0", padding: "12px 14px", fontSize: 13, color: t.textMuted, lineHeight: 1.65, marginBottom: 16 },
    warnBox:  { background: t.warnDim,  border: `1px solid ${t.warn}28`,  borderLeft: `3px solid ${t.warn}`,   borderRadius: "0 4px 4px 0", padding: "12px 14px", fontSize: 13, color: t.textMuted, lineHeight: 1.65, marginBottom: 16 },
    // table
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
    th: { fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: t.textDim, textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${t.border}` },
    td:  { padding: "9px 12px", borderBottom: `1px solid ${t.border}`, color: t.textMuted, fontSize: 13, verticalAlign: "top", lineHeight: 1.5 },
    tdb: { padding: "9px 12px", borderBottom: `1px solid ${t.border}`, color: t.text, fontSize: 13, fontWeight: 600, verticalAlign: "top" },
    tda: { padding: "9px 12px", borderBottom: `1px solid ${t.border}`, color: t.accent, fontFamily: mono, fontSize: 12, fontWeight: 700, verticalAlign: "top" },
    // layout
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 },
    flex: { display: "flex", flexWrap: "wrap", gap: 10 },
    divider: { borderTop: `1px solid ${t.border}`, margin: "28px 0" },
    // step row
    stepRow: { display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 },
    stepNum: { fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.accent, minWidth: 22, marginTop: 2 },
    link: { color: t.accent, textDecoration: "none", fontFamily: mono, fontSize: 12, fontWeight: 600 },
  };

  // ── SKILL CARD ─────────────────────────────────────────────────────────────
  const SkillCard = ({ skill, desc, when, col }) => {
    const fg = col === "gold" ? t.gold : t.accent;
    const bg = col === "gold" ? t.goldDim : t.accentDim;
    return (
      <div style={{ background: bg, border: `1px solid ${fg}28`, borderRadius: 6, padding: "14px 16px", flex: "1 1 200px" }}>
        <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: fg, marginBottom: 4 }}>{skill}</div>
        <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.55, marginBottom: 6 }}>{desc}</div>
        <div style={{ fontFamily: mono, fontSize: 10, color: t.textDim }}>▸ {when}</div>
      </div>
    );
  };

  // ── TRAINER CARD ───────────────────────────────────────────────────────────
  const TrainerCard = ({ r }) => (
    <div style={S.card}>
      <div style={S.cardTitle}>{r.name}<span style={S.badge(r.bc)}>{r.badge}</span></div>
      <div style={S.cardSub}>{r.sub}</div>
      <div style={S.proConGrid}>
        <div style={S.proBox}>
          <div style={S.pcLabel(t.accent)}>▲ PROS</div>
          {r.pros.map((p, i) => <div key={i} style={S.li}>· {p}</div>)}
        </div>
        <div style={S.conBox}>
          <div style={S.pcLabel(t.warn)}>▼ CONS</div>
          {r.cons.map((c, i) => <div key={i} style={S.li}>· {c}</div>)}
        </div>
      </div>
      <div style={S.verdict}>▸ VERDICT: {r.verdict}</div>
      {r.href
        ? <div style={{ marginTop: 8 }}><a href={r.href} target="_blank" rel="noreferrer" style={S.link}>{r.link} ↗</a></div>
        : r.link && <div style={{ marginTop: 8, fontFamily: mono, fontSize: 11, color: t.textDim }}>{r.link}</div>}
    </div>
  );

  // ── TAB CONTENT ────────────────────────────────────────────────────────────
  const renderTab = () => {
    switch (tab) {

      // ── OVERVIEW ───────────────────────────────────────────────────────────
      case "overview": return (
        <>
          <div style={{ marginBottom: 32 }}>
            <div style={S.sectionLabel}>// FOUNDATION</div>
            <div style={S.sectionTitle}>What aim training actually does</div>
            <div style={S.infoBox}>
              Aim training improves the <strong style={{ color: t.text }}>mechanical</strong> parts of gunfighting — flicking to targets, tracking moving enemies, and clean target switching. Skills transfer between games when sensitivity is correctly matched.
            </div>
            <div style={S.warnBox}>
              <span style={{ color: t.warn, fontFamily: mono, fontSize: 11, fontWeight: 700 }}>DOES NOT IMPROVE: </span>
              Crosshair placement, positioning, map awareness, utility, or reading enemy patterns. Aim trainers matter most below Gold/Nova. Above that, game sense and habits are usually the real bottleneck.
            </div>
            <div style={S.sectionLabel}>// THE 4 CORE SKILLS</div>
            <div style={S.flex}>
              {CORE_SKILLS.map(s => <SkillCard key={s.skill} {...s} />)}
            </div>
          </div>

          <div style={S.divider} />

          <div style={{ marginBottom: 32 }}>
            <div style={S.sectionLabel}>// LEARNING PATH</div>
            <div style={S.sectionTitle}>Where to start based on your level</div>
            {[
              { level: "BEGINNER — 0 to 3 months", col: "accent", steps: ["Lock in your sensitivity — do not change it", "Install Aim Botz + Recoil Master from CS2 Workshop (free)", "Use Aim Lab (free) with Voltaic's beginner playlist — 15–20 min/day", "Learn crosshair placement from Yprac maps and TheWarOwl on YouTube", "Play Deathmatch after every aim session to apply what you trained", "Join r/LearnCSGO or r/VALORANT for game-specific community tips"] },
              { level: "INTERMEDIATE — 3 to 6 months", col: "gold", steps: ["Reassess: is your problem mechanical, or game sense and positioning?", "If mechanical: buy KovaaK's and follow a Voltaic intermediate routine", "Read AIMER7's free guide and follow a structured scenario routine", "Mix in Yprac prefire maps to solidify crosshair placement", "VOD review one session per week — watch deaths, not kills"] },
              { level: "ADVANCED — 6+ months", col: "warn", steps: ["Run Voltaic benchmarks to pinpoint specific weaknesses by skill type", "Use AIMER7 or Voltaic issue-specific routines to close the gaps", "Demo review every session — identify patterns across games, not individual mistakes", "Voltaic coaching only if competing at a serious, organised level"] },
            ].map(block => {
              const fc = block.col === "accent" ? t.accent : block.col === "gold" ? t.gold : t.warn;
              return (
                <div key={block.level} style={{ ...S.card, marginBottom: 14 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: fc, marginBottom: 12 }}>{block.level}</div>
                  {block.steps.map((step, i) => (
                    <div key={i} style={S.stepRow}>
                      <div style={{ ...S.stepNum, color: fc }}>{String(i + 1).padStart(2, "0")}</div>
                      <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.55 }}>{step}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// DAILY ROUTINE — FREE ONLY</div>
            <div style={S.sectionTitle}>Sample warmup using CS2 Workshop maps</div>
            <div style={S.card}>
              {[["10 min", "Aim Botz", "Crosshair placement — headshots only"], ["5 min", "Recoil Master", "Spray pattern for your main rifle"], ["5 min", "Fast Aim / Reflex", "Wake up reaction time"], ["15 min", "Deathmatch", "Apply everything under real pressure"]].map(([time, map, desc]) => (
                <div key={map} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${t.border}` }}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.accent, minWidth: 52 }}>{time}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{map}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );

      // ── FREE ───────────────────────────────────────────────────────────────
      case "free": return (
        <>
          <div style={{ marginBottom: 32 }}>
            <div style={S.sectionLabel}>// AIM TRAINERS</div>
            <div style={S.sectionTitle}>Free tools — reviewed honestly</div>
            {FREE_TRAINERS.map(r => <TrainerCard key={r.name} r={r} />)}
          </div>

          <div style={S.divider} />

          <div style={{ marginBottom: 32 }}>
            <div style={S.sectionLabel}>// CS2 WORKSHOP MAPS</div>
            <div style={S.sectionTitle}>In-engine training — perfect mechanical transfer</div>
            <div style={S.infoBox}>These run inside CS2's own engine. No sensitivity mismatch, no second-guessing transfer. Subscribe on Steam Workshop → launch from CS2 Practice mode.</div>
            <table style={S.table}>
              <thead><tr><th style={S.th}>Map</th><th style={S.th}>What It Trains</th><th style={S.th}>Notes</th></tr></thead>
              <tbody>
                {WORKSHOP_MAPS.map(m => (
                  <tr key={m.name}>
                    <td style={S.tdb}>{m.name}</td>
                    <td style={S.td}>{m.trains}</td>
                    <td style={S.td}>{m.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// EDUCATION</div>
            <div style={S.sectionTitle}>Free guides and communities</div>
            {[
              { name: "AIMER7's Guides", tag: "FREE PDF", col: "accent", desc: "Widely regarded as the single best free aim resource in the community. Covers every skill level, scenario type, flicking, tracking, and strafe aiming. Search 'AIMER7 KovaaK workout routines Steam guide' — available as a free PDF." },
              { name: "Voltaic Community", tag: "FREE", col: "accent", desc: "The premier free aim improvement community. Benchmarks for KovaaK's and Aim Lab, beginner-to-advanced routines, peripheral and health guides, and an active coaching Discord.", sub: "voltaic.gg  |  r/Voltaic" },
              { name: "TheWarOwl (YouTube)", tag: "FREE", col: "accent", desc: "Best structured CS2 education on YouTube. Clear explanations of game sense, mechanics, and crosshair placement. Not highlights — actual learning content." },
              { name: "n0thing — Jordan Gilbert (YouTube)", tag: "FREE", col: "accent", desc: "Ex-Cloud9 pro. Deep CS2 skill content focused on movement, dueling, and advanced mechanics." },
            ].map(item => (
              <div key={item.name} style={S.card}>
                <div style={S.cardTitle}>{item.name}<span style={S.badge(item.col)}>{item.tag}</span></div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65, marginBottom: item.sub ? 8 : 0 }}>{item.desc}</div>
                {item.sub && <div style={{ fontFamily: mono, fontSize: 11, color: t.textDim }}>{item.sub}</div>}
              </div>
            ))}
          </div>
        </>
      );

      // ── PAID ───────────────────────────────────────────────────────────────
      case "paid": return (
        <>
          <div style={S.sectionLabel}>// PAID TOOLS</div>
          <div style={S.sectionTitle}>Worth the money — or not?</div>
          <div style={S.warnBox}>You do not need to spend money to improve significantly. The entire free path covers most players completely. Everything below is optional.</div>
          {PAID_RESOURCES.map(r => (
            <div key={r.name} style={S.card}>
              <div style={S.cardTitle}>
                {r.name}
                <span style={S.badge(r.bc)}>{r.badge}</span>
                <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.gold }}>{r.price}</span>
              </div>
              <div style={{ height: 8 }} />
              <div style={S.proConGrid}>
                <div style={S.proBox}><div style={S.pcLabel(t.accent)}>▲ PROS</div>{r.pros.map((p, i) => <div key={i} style={S.li}>· {p}</div>)}</div>
                <div style={S.conBox}><div style={S.pcLabel(t.warn)}>▼ CONS</div>{r.cons.map((c, i) => <div key={i} style={S.li}>· {c}</div>)}</div>
              </div>
              <div style={r.name === "Voltaic Coaching" ? S.warnVerdict : S.verdict}>▸ VERDICT: {r.verdict}</div>
            </div>
          ))}
        </>
      );

      // ── SETTINGS ───────────────────────────────────────────────────────────
      case "settings": return (
        <>
          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// SENSITIVITY — EDPI EXPLAINED</div>
            <div style={S.sectionTitle}>The only number that actually matters</div>
            <div style={S.infoBox}><strong style={{ color: t.text }}>eDPI = DPI × In-game Sensitivity.</strong> This single number describes your true speed regardless of hardware. Always copy eDPI from pros — never raw sensitivity without knowing their DPI.</div>
            <table style={S.table}>
              <thead><tr><th style={S.th}>Game</th><th style={S.th}>Community Range</th><th style={S.th}>Pro Sweet Spot</th><th style={S.th}>Example Setup</th></tr></thead>
              <tbody>
                {EDPI_DATA.map(row => (
                  <tr key={row.game}>
                    <td style={S.tdb}>{row.game}</td>
                    <td style={S.td}>{row.range}</td>
                    <td style={S.tda}>{row.sweet} eDPI</td>
                    <td style={{ ...S.td, fontFamily: mono, fontSize: 12 }}>{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.divider} />

          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// SYSTEM + IN-GAME SETTINGS</div>
            <div style={S.sectionTitle}>Get these right before anything else</div>
            <table style={S.table}>
              <thead><tr><th style={S.th}>Setting</th><th style={S.th}>Value</th><th style={S.th}>Why</th></tr></thead>
              <tbody>
                {WIN_SETTINGS.map(row => (
                  <tr key={row.s}>
                    <td style={S.tdb}>{row.s}</td>
                    <td style={{ ...S.tda, color: row.v === "OFF" ? t.warn : t.accent }}>{row.v}</td>
                    <td style={S.td}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// COMMON MISTAKES</div>
            <div style={S.sectionTitle}>Settings habits that hurt your aim</div>
            {[
              { t: "Copying a pro's sensitivity without matching their DPI", b: "\"TenZ plays 0.22\" means nothing without his DPI. At 1600 DPI, 0.22 is double his actual speed. Always copy eDPI, not raw sensitivity numbers." },
              { t: "Changing sensitivity after a bad game", b: "You have an off game, bump sens. Next game is fine — confirmation bias. Then two more bad games, lower it again. This cycle destroys muscle memory. Commit for at least a full week." },
              { t: "Using high sensitivity because your mousepad is small", b: "Compensating with higher sens limits your aim ceiling and prevents you building consistent arm movement. Get an XL pad — they cost less than most gaming peripherals." },
            ].map(item => (
              <div key={item.t} style={{ ...S.card, borderLeft: `3px solid ${t.warn}`, marginBottom: 10 }}>
                <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.warn, marginBottom: 6 }}>⚠ {item.t}</div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{item.b}</div>
              </div>
            ))}
          </div>
        </>
      );

      // ── CALCULATOR ─────────────────────────────────────────────────────────
      case "calc": return (
        <>
          <div style={S.sectionLabel}>// INTERACTIVE TOOL</div>
          <div style={S.sectionTitle}>eDPI Calculator</div>
          <div style={S.infoBox}>Enter your current mouse DPI and in-game sensitivity. The calculator shows your eDPI and whether it falls in the recommended range for your game.</div>
          <EDPICalc t={t} mono={mono} body={body} />

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// CROSS-GAME CONVERSION</div>
            <div style={S.sectionTitle}>Matching sensitivity across games</div>
            <div style={S.infoBox}>Different games use different engine yaw values. You cannot copy the same sensitivity number between CS2 and Valorant — use a converter.</div>
            <div style={S.grid2}>
              {[
                { from: "CS2 → Valorant",     formula: "Valorant sens = CS2 sens × 0.314", note: "Based on engine yaw: CS2 uses 0.022, Valorant uses 0.07" },
                { from: "Valorant → CS2",     formula: "CS2 sens = Valorant sens × 3.18",  note: "Inverse of the above — same yaw ratio" },
                { from: "CS2 → Apex",         formula: "Use mouse-sensitivity.com",          note: "Apex has unique yaw; always use the calculator" },
                { from: "Any → Any",          formula: "mouse-sensitivity.com",             note: "Gold standard converter — free, supports 100+ games" },
              ].map(item => (
                <div key={item.from} style={S.card}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 6 }}>{item.from}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: t.text, marginBottom: 6, lineHeight: 1.5 }}>{item.formula}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.55 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      );

      // ── HARDWARE ───────────────────────────────────────────────────────────
      case "hardware": return (
        <>
          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// IMPACT RATINGS</div>
            <div style={S.sectionTitle}>What actually matters — and what doesn't</div>
            <table style={S.table}>
              <thead><tr><th style={S.th}>Hardware</th><th style={S.th}>Impact</th><th style={S.th}>Details</th></tr></thead>
              <tbody>
                {HARDWARE_DATA.map(row => (
                  <tr key={row.item}>
                    <td style={S.tdb}>{row.item}</td>
                    <td style={{ ...S.td, verticalAlign: "middle" }}><span style={S.impactPill(row.impact)}>{row.impact}</span></td>
                    <td style={S.td}>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.divider} />

          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// GRIP STYLES</div>
            <div style={S.sectionTitle}>How you hold the mouse affects training</div>
            <div style={S.grid2}>
              {[
                { name: "Palm Grip",     desc: "Full hand rests on mouse. Pure arm aiming. Slower but very stable. Best at low sensitivity.", use: "Low sens · rifles · precision duels" },
                { name: "Claw Grip",     desc: "Fingers arched, palm slightly raised. Wrist and arm hybrid. The most versatile style. Most common in the pro scene.", use: "All playstyles · most common" },
                { name: "Fingertip Grip",desc: "Only fingertips contact the mouse. Pure wrist aiming. Very fast but less stable at long range.", use: "High sens · small mice · aggressive play" },
              ].map(grip => (
                <div key={grip.name} style={S.card}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 6 }}>{grip.name}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.55, marginBottom: 8 }}>{grip.desc}</div>
                  <span style={S.tag}>{grip.use}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// DESK ERGONOMICS</div>
            <div style={S.sectionTitle}>Setup position — often ignored, always impactful</div>
            <div style={S.card}>
              {["Forearm resting flat on the desk surface — not hanging off the edge", "Elbow roughly level with the desk", "Mouse far enough from the edge to execute a full 180° flick without running out of space", "Monitor at eye level or slightly below — eyes forward, not tilted down"].map((tip, i) => (
                <div key={i} style={S.stepRow}>
                  <div style={{ ...S.stepNum }}>▸</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.55 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      );

      // ── ANALYSIS ───────────────────────────────────────────────────────────
      case "analysis": return (
        <>
          <div style={S.sectionLabel}>// PERFORMANCE TOOLS</div>
          <div style={S.sectionTitle}>Know exactly what's wrong — don't guess</div>
          <div style={S.infoBox}>Aim trainers improve mechanics. These tools tell you what's actually causing losses in real games — often something other than mechanics entirely.</div>
          <div style={S.grid2}>
            {ANALYSIS_TOOLS.map(tool => (
              <div key={tool.name} style={S.card}>
                <div style={S.cardTitle}>{tool.name}<span style={S.badge("accent")}>{tool.cost}</span></div>
                <div style={{ marginBottom: 8 }}><span style={S.tag}>{tool.game}</span></div>
                <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65, marginBottom: tool.href ? 10 : 0 }}>{tool.desc}</div>
                {tool.href && <a href={tool.href} target="_blank" rel="noreferrer" style={S.link}>{tool.href.replace("https://", "")} ↗</a>}
              </div>
            ))}
          </div>
        </>
      );

      // ── MENTAL ─────────────────────────────────────────────────────────────
      case "mental": return (
        <>
          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// PSYCHOLOGY</div>
            <div style={S.sectionTitle}>The most under-discussed part of improvement</div>
            <div style={S.infoBox}>
              In high-stakes situations, your brain activates a stress response that physically tightens muscles and narrows focus. This is <strong style={{ color: t.text }}>performance anxiety</strong> — universal among players at all levels. Pros manage it, not eliminate it. Your aim genuinely works differently in ranked vs DM — that's not your imagination.
            </div>
            <div style={S.grid2}>
              {MENTAL_TIPS.map(tip => (
                <div key={tip.title} style={S.card}>
                  <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.accent, marginBottom: 6, lineHeight: 1.4 }}>{tip.title}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{tip.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// DEMO REVIEW</div>
            <div style={S.sectionTitle}>The right and wrong way to review gameplay</div>
            <div style={S.card}>
              <div style={{ fontFamily: mono, fontSize: 10, color: t.warn, fontWeight: 700, marginBottom: 8, letterSpacing: "0.14em" }}>✕ WRONG WAY</div>
              <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20, lineHeight: 1.6 }}>Watching kills, highlights, and your best moments. This feels good but teaches nothing — you already know how to do what worked.</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: t.accent, fontWeight: 700, marginBottom: 10, letterSpacing: "0.14em" }}>✓ RIGHT WAY</div>
              {["Filter for rounds you lost — specifically rounds where you died first", "For each death: pause the moment the enemy appeared. Where was your crosshair?", "Ask: wrong angle? Bad position? Caught reloading? Crosshair too low?", "Identify the TYPE of mistake — not just 'I missed the shot'"].map((step, i) => (
                <div key={i} style={S.stepRow}>
                  <div style={S.stepNum}>{i + 1}.</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.55 }}>{step}</div>
                </div>
              ))}
              <div style={{ ...S.verdict, marginTop: 14 }}>▸ One demo session per week — focused on 3–5 key mistakes — beats weeks of mindless deathmatch.</div>
            </div>
          </div>
        </>
      );

      // ── GAME TIPS ──────────────────────────────────────────────────────────
      case "gametips": return (
        <>
          {/* Game selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {[["cs2", "CS2"], ["val", "VALORANT"], ["apex", "APEX LEGENDS"]].map(([id, label]) => (
              <button key={id} onClick={() => setGameTipGame(id)} style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "7px 14px", border: `1px solid ${gameTipGame === id ? t.accent : t.border}`, background: gameTipGame === id ? t.accentDim : t.panelAlt, color: gameTipGame === id ? t.accent : t.textMuted, borderRadius: 4, cursor: "pointer" }}>
                {gameTipGame === id ? `[ ${label} ]` : label}
              </button>
            ))}
          </div>

          {gameTipGame === "cs2" && (
            <>
              <div style={S.sectionLabel}>// COUNTER-STRIKE 2</div>
              <div style={S.sectionTitle}>CS2-specific mechanics</div>
              {GAME_TIPS.cs2.map(item => (
                <div key={item.tip} style={{ ...S.card, borderLeft: `3px solid ${t.accent}` }}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.accent, marginBottom: 6 }}>▸ {item.tip}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{item.detail}</div>
                </div>
              ))}
            </>
          )}

          {gameTipGame === "val" && (
            <>
              <div style={S.sectionLabel}>// VALORANT</div>
              <div style={S.sectionTitle}>What's different from CS2</div>
              {GAME_TIPS.val.map(item => (
                <div key={item.tip} style={{ ...S.card, borderLeft: `3px solid ${t.gold}` }}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.gold, marginBottom: 6 }}>▸ {item.tip}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{item.detail}</div>
                </div>
              ))}
            </>
          )}

          {gameTipGame === "apex" && (
            <>
              <div style={S.sectionLabel}>// APEX LEGENDS</div>
              <div style={S.sectionTitle}>Battle royale gunfight mechanics</div>
              {GAME_TIPS.apex.map(item => (
                <div key={item.tip} style={{ ...S.card, borderLeft: `3px solid ${t.warn}` }}>
                  <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: t.warn, marginBottom: 6 }}>▸ {item.tip}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{item.detail}</div>
                </div>
              ))}
            </>
          )}

          <div style={S.divider} />

          <div style={S.sectionLabel}>// UNIVERSAL PITFALLS</div>
          <div style={S.sectionTitle}>Mistakes every player makes regardless of game</div>
          {[
            { w: "Sensitivity must match between aim trainer and game", b: "If your in-game sens and trainer sens don't match, virtually no skill transfers. Set this up first — before any practice." },
            { w: "Score-chasing in aim trainers is a trap", b: "Many players optimise for high scores rather than transferable mechanics. Focus on smoothness, precision, and habits — not leaderboard numbers." },
            { w: "Stationary scenarios have limited real-game transfer", b: "Pure stationary target training doesn't replicate strafing duels. Balance your routine with moving-target and dynamic scenarios." },
            { w: "Consistency beats volume", b: "15–30 min of daily focused practice beats 3-hour grinding sessions twice a week. The brain builds motor skills through consistent repetition over time." },
          ].map(item => (
            <div key={item.w} style={{ ...S.card, borderLeft: `3px solid ${t.warn}`, marginBottom: 10 }}>
              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: t.warn, marginBottom: 6 }}>⚠ {item.w}</div>
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{item.b}</div>
            </div>
          ))}
        </>
      );

      // ── RESOURCES ──────────────────────────────────────────────────────────
      case "resources": return (
        <>
          <div style={{ marginBottom: 28 }}>
            <div style={S.sectionLabel}>// COMMUNITIES</div>
            <div style={S.sectionTitle}>Where to ask questions and find routines</div>
            <div style={S.grid2}>
              {COMMUNITY_LINKS.map(link => (
                <div key={link.name} style={S.card}>
                  <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                    <a href={link.href} target="_blank" rel="noreferrer" style={{ ...S.link, fontSize: 13 }}>{link.name} ↗</a>
                  </div>
                  <div style={{ fontSize: 13, color: t.textMuted }}>{link.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          <div>
            <div style={S.sectionLabel}>// MASTER LIST</div>
            <div style={S.sectionTitle}>Every resource in one place</div>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Resource</th>
                  <th style={S.th}>Cost</th>
                  <th style={S.th}>Type</th>
                </tr>
              </thead>
              <tbody>
                {ALL_LINKS.map(r => {
                  const isFree     = r.cost === "Free" || r.cost === "Free — in-game" || r.cost === "Free PDF" || r.cost === "Free / Open Source";
                  const isFreemium = !isFree && r.cost.startsWith("Free");
                  const costColor  = isFree ? t.accent : isFreemium ? t.gold : t.warn;
                  return (
                    <tr key={r.name}>
                      <td style={S.tdb}>{r.name}</td>
                      <td style={{ ...S.td, fontFamily: mono, fontSize: 11, color: costColor }}>{r.cost}</td>
                      <td style={S.td}><span style={S.tag}>{r.type}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      );

      default: return null;
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <FontLoader />
      <div style={S.root}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.logo}>
            <Reticle size={16} color={t.accent} />
            AIM_GUIDE.exe
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: mono, fontSize: 9, color: t.textDim, letterSpacing: "0.12em" }}>CS2 · VALORANT · APEX</span>
            <button style={S.themeBtn} onClick={() => setDark(d => !d)}>
              {dark ? "[ LIGHT ]" : "[ DARK ]"}
            </button>
          </div>
        </div>

        {/* Hero */}
        <div style={S.hero}>
          <div style={S.heroEyebrow}>// FPS IMPROVEMENT GUIDE v3.0</div>
          <div style={S.heroTitle}>
            The Complete <span style={{ color: t.accent }}>Aiming Guide</span>
          </div>
          <div style={S.heroSub}>
            Free and paid resources, settings, hardware, and mental game — reviewed honestly from Steam, Reddit, and the community.
            <span style={{ color: t.textDim }}> Updated June 2026.</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={S.tabBar}>
          {TABS.map(tb => (
            <button key={tb.id} style={S.tabBtn(tab === tb.id)} onClick={() => changeTab(tb.id)}>
              {tab === tb.id ? `[ ${tb.label} ]` : tb.label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={S.scroll} ref={contentRef}>
          <div style={S.content}>
            {renderTab()}
          </div>

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${t.border}`, padding: "16px 24px", background: t.panel, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: t.textDim, letterSpacing: "0.12em" }}>
              AIM_GUIDE.exe · v3.0 · Updated June 2026
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: t.textDim, letterSpacing: "0.08em" }}>
              Sources: Steam Reviews · Reddit · Metacritic · Community Benchmarks
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
