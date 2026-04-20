import React, { useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const TARGETS: (number | 'B')[] = [20, 19, 18, 17, 16, 15, 'B'];
const TV: Record<string, number> = { 20: 20, 19: 19, 18: 18, 17: 17, 16: 16, 15: 15, B: 25 };
const MULT_LABELS: Record<number, string> = { 1: 'Single', 2: 'Double', 3: 'Triple' };
const MULT_SHORT: Record<number, string> = { 1: 'S', 2: 'D', 3: 'T' };

const I18N = {
  ja: {
    pageTitle: 'クリケット ダーツ スコア計算機',
    title: 'クリケット Game',
    subtitle: '2〜4人対戦 · 20〜15 + Bull',
    numPlayers: 'プレイヤー数',
    playerLabel: (n: number) => `プレイヤー ${n}`,
    nPeople: (n: number) => `${n}人`,
    maxTurns: 'ターン数制限',
    start: 'ゲーム開始',
    undo: '戻す',
    endTurn: 'プレイヤーチェンジ',
    settings: '設定に戻る',
    settingsConfirm: '設定画面に戻りますか？\n現在のゲーム進行は失われます。',
    bull: 'Bull',
    miss: 'Miss',
    noDart: '—',
    turnLabel: (cur: number, max: number) => `R${cur}/${max}`,
    winTitle: (name: string) => `${name} の勝利！`,
    drawTitle: '引き分け',
    playAgain: '設定に戻る',
    pts: (n: number) => `+${n}pts`,
  },
  en: {
    pageTitle: 'Cricket Darts Score Calculator',
    title: 'Cricket Darts',
    subtitle: '2–4 Players · 20–15 + Bull',
    numPlayers: 'Players',
    playerLabel: (n: number) => `Player ${n}`,
    nPeople: (n: number) => `${n}`,
    maxTurns: 'Turn Limit',
    start: 'Start Game',
    undo: 'Undo',
    endTurn: 'Next Player',
    settings: 'Settings',
    settingsConfirm: 'Return to settings?\nCurrent game progress will be lost.',
    bull: 'Bull',
    miss: 'Miss',
    noDart: '—',
    turnLabel: (cur: number, max: number) => `R${cur}/${max}`,
    winTitle: (name: string) => `${name} Wins!`,
    drawTitle: 'Draw',
    playAgain: 'Settings',
    pts: (n: number) => `+${n}pts`,
  },
} as const;

type T = (typeof I18N)['ja' | 'en'];

type DartThrow =
  | { miss: true }
  | { miss: false; mult: number; t: number | 'B'; pts: number };

type Player = { name: string; score: number; marks: Record<string, number> };

type Game = {
  players: Player[];
  cp: number;
  du: number;
  mult: number;
  darts: DartThrow[];
  over: boolean;
  winner: number | null;
  turn: number;
  maxTurns: number;
};

const CSS = `
.darts-cricket-container {
  --dc-tgt-w: 54px;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: transparent;
  min-height: calc(100vh - var(--ifm-navbar-height, 60px));
  overflow-x: hidden;
}

.dc-setup {
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: var(--ifm-global-radius, 8px);
  padding: 32px;
  box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05));
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.dc-stitle { font-size: 24px; font-weight: 700; color: var(--ifm-heading-color); margin-bottom: 8px; text-align: center; }
.dc-ssub { font-size: 14px; color: var(--ifm-color-emphasis-600); text-align: center; margin-bottom: 32px; }
.dc-row { margin-bottom: 20px; }
.dc-lbl { font-size: 14px; font-weight: 600; color: var(--ifm-color-emphasis-700); margin-bottom: 8px; }
.dc-seg { display: flex; gap: 8px; }
.dc-seg-btn { flex: 1; padding: 10px; border-radius: var(--ifm-button-border-radius, 6px); border: 1px solid var(--ifm-color-emphasis-300); background: var(--ifm-background-color); cursor: pointer; font-size: 14px; font-weight: 600; color: var(--ifm-font-color-base); text-align: center; transition: all 0.15s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
.dc-seg-btn.sel { background: var(--ifm-color-primary); border-color: var(--ifm-color-primary); color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.dc-seg-btn:hover:not(.sel) { background: var(--ifm-color-emphasis-100); border-color: var(--ifm-color-emphasis-400); }
.dc-seg-btn:active { transform: scale(0.96); }

.dc-inp { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-300); border-radius: var(--ifm-button-border-radius, 6px); padding: 10px 12px; font-size: 15px; color: var(--ifm-font-color-base); width: 100%; transition: all 0.2s ease; }
.dc-inp:focus { outline: none; border-color: var(--ifm-color-primary); box-shadow: 0 0 0 2px rgba(var(--ifm-color-primary-rgb), 0.2); }

.dc-start { width: 100%; padding: 14px; border-radius: var(--ifm-button-border-radius, 6px); border: none; background: var(--ifm-color-primary); cursor: pointer; font-size: 16px; font-weight: 700; color: #fff; margin-top: 24px; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.dc-start:hover { background: var(--ifm-color-primary-dark); transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
.dc-start:active { transform: scale(0.98); }

/* Unified header card: score grid + turn info merged */
.dc-sh-wrap {
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: var(--ifm-global-radius, 8px);
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05));
}

.dc-board, .dc-ip, .dc-ww {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Sticky wrapper keeps unified header + board visible while scrolling input panel */
.dc-sticky-top {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--ifm-background-color);
  padding: 8px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.dc-sh { display: grid; gap: 0 8px; }
.dc-sc { background: var(--ifm-color-emphasis-50, var(--ifm-color-emphasis-100)); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); padding: 10px 8px; text-align: center; display: flex; flex-direction: column; justify-content: center; transition: all 0.2s ease; min-width: 0; }
.dc-sc.active { border-color: var(--ifm-color-primary); background: var(--ifm-background-color); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.dc-sn { font-size: 13px; color: var(--ifm-color-emphasis-700); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dc-sn.active { color: var(--ifm-color-primary); font-weight: 700; }
.dc-rem { font-size: 24px; font-weight: 700; color: var(--ifm-font-color-base); line-height: 1.1; }
.dc-turn-lbl { font-size: 16px; color: var(--ifm-color-emphasis-400); font-weight: 500; flex-shrink: 0; margin-left: auto; }

/* Turn row integrated inside header card */
.dc-turn-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--ifm-color-emphasis-100);
  min-height: 24px;
}
.dc-dots { display: flex; gap: 6px; flex-shrink: 0; }
.dc-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--ifm-color-emphasis-300); transition: all 0.2s ease; }
.dc-dot.used { background: var(--ifm-color-emphasis-600); border-color: var(--ifm-color-emphasis-600); }
.dc-dot.rem { background: var(--ifm-color-primary-lightest); border-color: var(--ifm-color-primary-light); }
.dc-dl { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; flex: 1; min-width: 0; }
.dc-chip { font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: var(--ifm-button-border-radius, 6px); background: var(--ifm-color-emphasis-100); border: 1px solid var(--ifm-color-emphasis-200); color: var(--ifm-font-color-base); }
.dc-chip.miss { color: var(--ifm-color-emphasis-500); }
.dc-nd { font-size: 13px; color: var(--ifm-color-emphasis-400); }

.dc-board { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); overflow: hidden; margin-bottom: 8px; box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05)); }
.dc-board-row { display: grid; border-bottom: 1px solid var(--ifm-color-emphasis-200); align-items: center; min-height: 48px; }
.dc-board-row:last-child { border-bottom: none; }
.dc-board-cell { display: flex; align-items: center; gap: 4px; padding: 6px 8px; min-width: 0; }
.dc-board-cell.left { justify-content: flex-end; }
.dc-board-cell.right { justify-content: flex-start; }
.dc-board-target { text-align: center; font-size: 16px; font-weight: 700; color: var(--ifm-font-color-base); }
.dc-board-target.closed { color: var(--ifm-color-emphasis-400); text-decoration: line-through; }

.dc-mark { font-family: sans-serif; font-weight: bold; font-size: 16px; line-height: 1; display: inline-block; width: 16px; text-align: center; }
.dc-mark-1 { color: var(--ifm-font-color-base); }
.dc-mark-2 { color: var(--ifm-font-color-base); }
.dc-mark-3 { color: var(--ifm-color-success); font-size: 18px; }
.dc-mark-plus { font-size: 12px; font-weight: bold; color: var(--ifm-color-danger); margin: 0 2px; }

.dc-ip { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); padding: 20px; box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05)); }
.dc-mr { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }

.dc-mb, .dc-nb, .dc-ab, .dc-wb2 {
  padding: 12px 8px;
  border-radius: var(--ifm-button-border-radius, 6px);
  border: 1px solid var(--ifm-color-emphasis-300);
  background: var(--ifm-background-color);
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: var(--ifm-font-color-base);
  text-align: center;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.dc-mb, .dc-ab, .dc-wb2 { flex-direction: row; }

.dc-mb:hover:not(.sel), .dc-nb:hover:not(:disabled), .dc-ab:hover:not(:disabled), .dc-wb2:hover { background: var(--ifm-color-emphasis-100); border-color: var(--ifm-color-emphasis-400); }
.dc-mb:active, .dc-nb:active:not(:disabled), .dc-ab:active:not(:disabled), .dc-wb2:active { transform: scale(0.96); }
.dc-mb.sel { background: var(--ifm-color-primary); border-color: var(--ifm-color-primary); color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }

.dc-np { display: grid; gap: 8px; margin-bottom: 12px; }
.dc-nb:disabled { opacity: 0.4; cursor: not-allowed; background: var(--ifm-color-emphasis-100); box-shadow: none; transform: none; }
.dc-nb.over { opacity: 0.35; }
.dc-nn { font-size: 18px; font-weight: 700; color: var(--ifm-font-color-base); line-height: 1.2; }
.dc-nv { font-size: 12px; color: var(--ifm-color-emphasis-500); margin-top: 2px; }

.dc-ar { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 8px; }
.dc-ab:disabled { opacity: 0.4; cursor: not-allowed; background: var(--ifm-color-emphasis-100); box-shadow: none; transform: none; }
.dc-ab.undo { color: var(--ifm-color-danger); border-color: var(--ifm-color-danger); }
.dc-ab.undo:hover:not(:disabled) { background: rgba(var(--ifm-color-danger-rgb), 0.1); }
.dc-ab.ghost { color: var(--ifm-color-emphasis-600); }
.dc-ab.hi { background: var(--ifm-color-primary); color: #fff; border-color: var(--ifm-color-primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.dc-ab.hi:hover { background: var(--ifm-color-primary-dark); }

.dc-ww { min-height: 340px; background: var(--ifm-background-color-subtle, var(--ifm-color-emphasis-100)); display: flex; align-items: center; justify-content: center; border-radius: var(--ifm-global-radius, 8px); margin-bottom: 16px; border: 1px solid var(--ifm-color-emphasis-200); }
.dc-wm { background: var(--ifm-background-color); border-radius: 12px; padding: 32px 28px; max-width: 360px; width: 90%; text-align: center; border: 1px solid var(--ifm-color-emphasis-200); box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1); }
.dc-wt { font-size: 24px; font-weight: 700; color: var(--ifm-heading-color); margin-bottom: 12px; }
.dc-ws { font-size: 14px; color: var(--ifm-color-emphasis-700); margin-bottom: 32px; line-height: 1.8; }
.dc-wbs { display: flex; flex-direction: column; gap: 12px; }
.dc-wb1 { width: 100%; padding: 14px; border-radius: var(--ifm-button-border-radius, 6px); border: none; background: var(--ifm-color-primary); cursor: pointer; font-size: 15px; font-weight: 700; color: #fff; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.dc-wb1:hover { background: var(--ifm-color-primary-dark); transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
.dc-wb1:active { transform: scale(0.98); }

@media(max-width: 480px) {
  .darts-cricket-container { padding: 0.25rem 0.5rem; --dc-tgt-w: 38px; }
  .dc-setup { padding: 20px 16px; }
  .dc-stitle { font-size: 20px; }

  /* Sticky header: tighter vertical rhythm */
  .dc-sticky-top { padding: 3px 0; }
  .dc-sh-wrap { padding: 6px; margin-bottom: 3px; }
  .dc-sh { gap: 0 4px; }
  .dc-sc { padding: 5px 4px; }
  .dc-rem { font-size: 16px; }
  .dc-sn { font-size: 10px; }

  /* Turn row: compact */
  .dc-turn-row { margin-top: 6px; padding-top: 6px; gap: 6px; min-height: 20px; }
  .dc-dot { width: 9px; height: 9px; }
  .dc-chip { font-size: 11px; padding: 2px 7px; }
  .dc-turn-lbl { font-size: 13px; }

  /* Scoreboard rows: minimal height */
  .dc-board { margin-bottom: 3px; }
  .dc-board-row { min-height: 28px; }
  .dc-board-cell { padding: 1px 4px; gap: 2px; }
  .dc-board-target { font-size: 11px; }
  .dc-mark { width: 11px; font-size: 11px; }
  .dc-mark-3 { font-size: 12px; }
  .dc-mark-plus { font-size: 9px; margin: 0 1px; }

  /* Input panel: tighter spacing */
  .dc-ip { padding: 8px; }
  .dc-mr { gap: 4px; margin-bottom: 6px; }
  .dc-np { grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 6px; }
  .dc-ar { gap: 4px; }

  /* Buttons: reduced vertical padding, consistent touch target */
  .dc-nb, .dc-mb, .dc-ab { padding: 7px 4px; font-size: 13px; min-height: 40px; }
  .dc-nn { font-size: 14px; }
  .dc-nv { font-size: 10px; margin-top: 1px; }
}

@media(min-width: 481px) and (max-width: 768px) {
  .darts-cricket-container { padding: 1rem 1rem; }
  .dc-np { grid-template-columns: repeat(4, 1fr); }
}

@media(min-width: 769px) {
  .dc-np { grid-template-columns: repeat(8, 1fr); }
  .dc-board-row { min-height: 52px; }
  .dc-board-target { font-size: 18px; }
  .dc-mark { width: 18px; font-size: 18px; }
  .dc-mark-3 { font-size: 20px; }
}
`;

function freshPlayers(names: string[], t: T): Player[] {
  return names.map((name, i) => ({
    name: name.trim() || t.playerLabel(i + 1),
    score: 0,
    marks: { 20: 0, 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, B: 0 },
  }));
}

function checkWin(players: Player[]): number | null {
  const idx = players.findIndex((p, pi) =>
    TARGETS.every(t => p.marks[String(t)] >= 3) &&
    players.every((op, i) => i === pi || p.score >= op.score)
  );
  return idx === -1 ? null : idx;
}

function cloneGame(g: Game): Game {
  return JSON.parse(JSON.stringify(g));
}

function MarkDisplay({ n }: { n: number }) {
  if (n === 0) return null;
  if (n === 1) return <span className="dc-mark dc-mark-1">/</span>;
  if (n === 2) return <span className="dc-mark dc-mark-2">X</span>;
  return <span className="dc-mark dc-mark-3">⊗</span>;
}

function DartsCricketApp({ t }: { t: T }) {
  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['', '', '', '']);
  const [maxTurns, setMaxTurns] = useState(20);
  const [game, setGame] = useState<Game | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const updateName = (i: number, val: string) =>
    setNames(prev => { const n = [...prev]; n[i] = val; return n; });

  const startGame = () => {
    setGame({
      players: freshPlayers(names.slice(0, playerCount), t),
      cp: 0, du: 0, mult: 1, darts: [], over: false, winner: null, turn: 1, maxTurns,
    });
    setHistory([]);
    setPhase('game');
  };

  const resetGame = () => { setPhase('setup'); setGame(null); setHistory([]); };

  const withSnapshot = (fn: (g: Game) => Game) => {
    setGame(prev => {
      if (!prev) return prev;
      setHistory(h => [...h, JSON.stringify(prev)]);
      return fn(cloneGame(prev));
    });
  };

  const throwDart = (target: number | 'B', mult: number) => {
    if (!game || game.du >= 3 || game.over) return;
    if (target === 'B' && mult === 3) return;

    withSnapshot(g => {
      const tk = String(target);
      const p = g.cp;
      const pm = g.players[p].marks;
      let hits = mult, pts = 0;

      if (pm[tk] < 3) { const add = Math.min(hits, 3 - pm[tk]); pm[tk] += add; hits -= add; }
      const anyOpen = g.players.some((op, i) => i !== p && op.marks[tk] < 3);
      if (hits > 0 && pm[tk] >= 3 && anyOpen) { pts = hits * TV[tk]; g.players[p].score += pts; }

      g.darts.push({ miss: false, mult, t: target, pts });
      g.du++;
      g.mult = 1;

      const w = checkWin(g.players);
      if (w !== null) { g.over = true; g.winner = w; }
      return g;
    });
  };

  const miss = () => {
    if (!game || game.du >= 3 || game.over) return;
    withSnapshot(g => { g.darts.push({ miss: true }); g.du++; g.mult = 1; return g; });
  };

  const endTurn = () => {
    if (!game || game.over) return;
    withSnapshot(g => {
      if (g.cp === g.players.length - 1) g.turn++;
      g.cp = (g.cp + 1) % g.players.length;
      g.du = 0; g.darts = []; g.mult = 1;

      if (g.cp === 0 && g.turn > g.maxTurns) {
        g.over = true;
        let max = -1, ws: number[] = [];
        g.players.forEach((pl, i) => {
          if (pl.score > max) { max = pl.score; ws = [i]; }
          else if (pl.score === max) ws.push(i);
        });
        g.winner = ws.length === 1 ? ws[0] : null;
      }
      return g;
    });
  };

  const undo = () => {
    if (!history.length) return;
    setGame(JSON.parse(history[history.length - 1]));
    setHistory(h => h.slice(0, -1));
  };

  if (phase === 'setup') {
    return (
      <div className="darts-cricket-container">
        <div className="dc-setup">
          <div className="dc-stitle">{t.title}</div>
          <div className="dc-ssub">{t.subtitle}</div>

          <div className="dc-row">
            <div className="dc-lbl">{t.numPlayers}</div>
            <div className="dc-seg">
              {([2, 3, 4] as const).map(n => (
                <button key={n} className={`dc-seg-btn${playerCount === n ? ' sel' : ''}`}
                  onClick={() => setPlayerCount(n)}>
                  {t.nPeople(n)}
                </button>
              ))}
            </div>
          </div>

          <div className="dc-row">
            <div className="dc-lbl">{t.maxTurns}</div>
            <input type="number" className="dc-inp" value={maxTurns} min={1}
              onChange={e => setMaxTurns(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          </div>

          {Array.from({ length: playerCount }, (_, i) => (
            <div key={i} className="dc-row">
              <div className="dc-lbl">{t.playerLabel(i + 1)}</div>
              <input className="dc-inp" value={names[i]} placeholder={t.playerLabel(i + 1)}
                onChange={e => updateName(i, e.target.value)} />
            </div>
          ))}

          <button className="dc-start" onClick={startGame}>{t.start}</button>
        </div>
      </div>
    );
  }

  if (!game) return null;
  const g = game;
  const pc = g.players.length;
  const cp = g.cp;
  const colCount = pc > 2 ? 2 : 1;
  const gridCols = `repeat(${colCount}, 1fr) var(--dc-tgt-w, 54px) repeat(${colCount}, 1fr)`;
  const headerGridCols = `repeat(${colCount}, 1fr) 16px repeat(${colCount}, 1fr)`;
  const needChange = g.du >= 3;

  const renderHeader = (idx: number) => {
    if (idx >= pc) return <div key={`empty-h-${idx}`} />;
    const p = g.players[idx];
    const isActive = cp === idx && !g.over;
    return (
      <div key={idx} className={`dc-sc${isActive ? ' active' : ''}`}>
        <div className={`dc-sn${isActive ? ' active' : ''}`}>{p.name}</div>
        <div className="dc-rem">{p.score}</div>
      </div>
    );
  };

  const scoreHeader = (
    <div className="dc-sh-wrap">
      <div className="dc-sh" style={{ gridTemplateColumns: headerGridCols }}>
        {Array.from({ length: colCount }).map((_, i) => renderHeader(i))}
        <div />
        {Array.from({ length: colCount }).map((_, i) => renderHeader(colCount + i))}
      </div>
      {!g.over && (
        <div className="dc-turn-row">
          <div className="dc-dots">
            {[0, 1, 2].map(i => (
              <span key={i} className={`dc-dot ${i < g.du ? 'used' : 'rem'}`} />
            ))}
          </div>
          <div className="dc-dl">
            {g.darts.length === 0 ? (
              <span className="dc-nd">{t.noDart}</span>
            ) : g.darts.map((d, i) => {
              if (d.miss) return (
                <span key={i} className="dc-chip miss">{t.miss}</span>
              );
              const tl = d.t === 'B' ? t.bull : String(d.t);
              // S/D/T prefix instead of Single/Double/Triple for compact display
              const ptsStr = d.pts > 0 ? `(${t.pts(d.pts)})` : '';
              return (
                <span key={i} className="dc-chip">
                  {MULT_SHORT[d.mult]}{tl}{ptsStr ? ' ' + ptsStr : ''}
                </span>
              );
            })}
          </div>
          <span className="dc-turn-lbl">{t.turnLabel(g.turn, g.maxTurns)}</span>
        </div>
      )}
    </div>
  );

  const scoreboard = (
    <div className="dc-board">
      {TARGETS.map(target => {
        const tk = String(target);
        const allClosed = g.players.every(p => p.marks[tk] >= 3);
        const anyOpen = g.players.some(p => p.marks[tk] < 3);
        const tLabel = target === 'B' ? t.bull : String(target);

        return (
          <div key={tk} className="dc-board-row" style={{ gridTemplateColumns: gridCols }}>
            {Array.from({ length: colCount }).map((_, i) => {
              if (i >= pc) return <div key={`empty-l-${i}`} />;
              const m = g.players[i].marks[tk];
              return (
                <div key={i} className="dc-board-cell left">
                  {m >= 3 && anyOpen && <span className="dc-mark-plus">+</span>}
                  <MarkDisplay n={m} />
                </div>
              );
            })}
            <div className={`dc-board-target${allClosed ? ' closed' : ''}`}>
              {tLabel}
            </div>
            {Array.from({ length: colCount }).map((_, i) => {
              const idx = colCount + i;
              if (idx >= pc) return <div key={`empty-r-${idx}`} />;
              const m = g.players[idx].marks[tk];
              return (
                <div key={idx} className="dc-board-cell right">
                  <MarkDisplay n={m} />
                  {m >= 3 && anyOpen && <span className="dc-mark-plus">+</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  if (g.over) {
    const winTitle = g.winner !== null ? t.winTitle(g.players[g.winner].name) : t.drawTitle;
    return (
      <div className="darts-cricket-container">
        <div className="dc-sticky-top">
          {scoreHeader}
          {scoreboard}
        </div>
        <div className="dc-ww">
          <div className="dc-wm">
            <div className="dc-wt">{winTitle}</div>
            <div className="dc-ws">
              {g.players.map((p, i) => (
                <span key={i}>{p.name}: {p.score}pts<br/></span>
              ))}
            </div>
            <div className="dc-wbs">
              <button className="dc-wb1" onClick={resetGame}>
                {t.playAgain}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="darts-cricket-container">
      {/* Sticky top: unified header (scores + turn info) + scoreboard */}
      <div className="dc-sticky-top">
        {scoreHeader}
        {scoreboard}
      </div>

      <div className="dc-ip">
        <div className="dc-mr">
          {[1, 2, 3].map(m => (
            <button key={m} className={`dc-mb${g.mult === m ? ' sel' : ''}`}
              onClick={() => setGame({ ...g, mult: m })}>
              {MULT_LABELS[m]}
            </button>
          ))}
        </div>

        <div className="dc-np">
          {TARGETS.map(target => {
            const tk = String(target);
            const tLabel = target === 'B' ? t.bull : String(target);
            const isInvalidBull = target === 'B' && g.mult === 3;
            const allClosed = g.players.every(p => p.marks[tk] >= 3);
            const disabled = allClosed || isInvalidBull || needChange;
            const pts = isInvalidBull ? '-' : `${TV[tk] * g.mult}pts`;
            return (
              <button key={tk} disabled={disabled} className={`dc-nb ${disabled ? 'over' : ''}`}
                onClick={() => throwDart(target, g.mult)}>
                <div className="dc-nn">{tLabel}</div>
                <div className="dc-nv">{pts}</div>
              </button>
            );
          })}
          <button disabled={needChange} className={`dc-nb ${needChange ? 'over' : ''}`} onClick={miss}>
            <div className="dc-nn">{t.miss}</div>
            <div className="dc-nv">-</div>
          </button>
        </div>

        <div className="dc-ar">
          <button className="dc-ab undo" disabled={history.length === 0} onClick={undo}>
            {t.undo}
          </button>
          <button className={`dc-ab${needChange ? ' hi' : ''}`} onClick={endTurn}>
            {t.endTurn}
          </button>
          <button className="dc-ab ghost"
            onClick={() => { if (window.confirm(t.settingsConfirm)) resetGame(); }}>
            {t.settings}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DartsCricketPage() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const t: T = I18N[currentLocale === 'en' ? 'en' : 'ja'];

  return (
    <Layout title={t.pageTitle} description={t.subtitle}>
      <style>{CSS}</style>
      <BrowserOnly fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        {() => <DartsCricketApp t={t} />}
      </BrowserOnly>
    </Layout>
  );
}
