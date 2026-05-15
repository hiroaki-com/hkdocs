import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type T = {
  pageTitle: string;
  pageDesc: string;
  setupTitle: string;
  setupSub: (n: number) => string;
  numPlayers: string;
  bullLabel: string;
  turnLimit: string;
  playerName: (n: number) => string;
  start: string;
  multSingle: string;
  multDouble: string;
  multTriple: string;
  roundLabel: (round: number, limit: number, name: string) => string;
  miss: string;
  undo: string;
  nextPlayer: string;
  settings: string;
  settingsConfirm: string;
  winTitle: (name: string) => string;
  finishTitle: string;
  draw: string;
  rematch: string;
  back: string;
  logThrow: (name: string, lbl: string, pts: number, total: number) => string;
  logMiss: (name: string) => string;
};

const I18N: Record<'ja' | 'en', T> = {
  ja: {
    pageTitle: 'Count-Up スコア計算機',
    pageDesc: 'ダーツのカウントアップ（Count-Up）用スコア計算ツール。',
    setupTitle: 'Count-Up',
    setupSub: (n: number) => n === 1 ? 'シングルプレイ' : `${n}人対戦`,
    numPlayers: 'プレイヤー数',
    bullLabel: 'ブルオプション',
    turnLimit: 'ラウンド数制限',
    playerName: (n: number) => `プレイヤー ${n}`,
    start: 'ゲーム開始',
    multSingle: 'シングル', multDouble: 'ダブル', multTriple: 'トリプル',
    roundLabel: (round: number, limit: number, name: string) => `R${round}/${limit} — ${name}`,
    miss: 'ミス', undo: '戻す', nextPlayer: 'プレイヤーチェンジ', settings: '設定',
    settingsConfirm: '設定画面に戻りますか？\n現在のゲーム進行は失われます。',
    winTitle: (name: string) => `${name}の勝利`,
    finishTitle: 'ゲーム終了',
    draw: '引き分け',
    rematch: 'もう一度 (同設定)', back: '設定に戻る',
    logThrow: (name: string, lbl: string, pts: number, total: number) => `${name}: ${lbl} = ${pts}pts (合計 ${total})`,
    logMiss: (name: string) => `${name}: ミス`,
  },
  en: {
    pageTitle: 'Count-Up Darts Score Calculator',
    pageDesc: 'Score calculator for Count-Up darts.',
    setupTitle: 'Count-Up',
    setupSub: (n: number) => n === 1 ? 'Single Player' : `${n} Players`,
    numPlayers: 'Players',
    bullLabel: 'Bull Option',
    turnLimit: 'Round Limit',
    playerName: (n: number) => `Player ${n}`,
    start: 'Start Game',
    multSingle: 'Single', multDouble: 'Double', multTriple: 'Triple',
    roundLabel: (round: number, limit: number, name: string) => `R${round}/${limit} — ${name}`,
    miss: 'Miss', undo: 'Undo', nextPlayer: 'Next Player', settings: 'Settings',
    settingsConfirm: 'Return to settings?\nCurrent game progress will be lost.',
    winTitle: (name: string) => `${name} Wins!`,
    finishTitle: 'Game Finished',
    draw: 'Draw',
    rematch: 'Rematch (same settings)', back: 'Settings',
    logThrow: (name: string, lbl: string, pts: number, total: number) => `${name}: ${lbl} = ${pts}pts (Total ${total})`,
    logMiss: (name: string) => `${name}: Miss`,
  },
};

const CSS = `
.dartscu-container {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: transparent;
  min-height: calc(100vh - var(--ifm-navbar-height, 60px));
  overflow-x: hidden;
}

.dcu-setup {
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: var(--ifm-global-radius, 8px);
  padding: 32px;
  box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05));
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.dcu-stitle { font-size: 24px; font-weight: 700; color: var(--ifm-heading-color); margin-bottom: 8px; text-align: center; }
.dcu-ssub { font-size: 14px; color: var(--ifm-color-emphasis-600); text-align: center; margin-bottom: 32px; }
.dcu-row { margin-bottom: 20px; }
.dcu-lbl { font-size: 14px; font-weight: 600; color: var(--ifm-color-emphasis-700); margin-bottom: 8px; }
.dcu-seg { display: flex; gap: 8px; }
.dcu-seg-btn { flex: 1; padding: 10px; border-radius: var(--ifm-button-border-radius, 6px); border: 1px solid var(--ifm-color-emphasis-300); background: var(--ifm-background-color); cursor: pointer; font-size: 14px; font-weight: 600; color: var(--ifm-font-color-base); text-align: center; transition: all 0.15s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
.dcu-seg-btn.sel { background: var(--ifm-color-primary); border-color: var(--ifm-color-primary); color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.dcu-seg-btn:hover:not(.sel):not(:disabled) { background: var(--ifm-color-emphasis-100); border-color: var(--ifm-color-emphasis-400); }
.dcu-seg-btn:active:not(:disabled) { transform: scale(0.96); }

.dcu-inp { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-300); border-radius: var(--ifm-button-border-radius, 6px); padding: 10px 12px; font-size: 15px; color: var(--ifm-font-color-base); width: 100%; transition: all 0.2s ease; }
.dcu-inp:focus { outline: none; border-color: var(--ifm-color-primary); box-shadow: 0 0 0 2px rgba(var(--ifm-color-primary-rgb), 0.2); }

.dcu-start, .dcu-wb1 { width: 100%; padding: 14px; border-radius: var(--ifm-button-border-radius, 6px); border: none; background: var(--ifm-color-primary); cursor: pointer; font-size: 16px; font-weight: 700; color: #fff; margin-top: 24px; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.dcu-start:hover, .dcu-wb1:hover { background: var(--ifm-color-primary-dark); transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
.dcu-start:active, .dcu-wb1:active { transform: scale(0.98); }

.dcu-sh, .dcu-tp, .dcu-ip, .dcu-ww {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.dcu-sh {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--ifm-background-color);
  padding: 8px 0 4px;
}

.dcu-sc { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); padding: 16px 12px; text-align: center; display: flex; flex-direction: column; justify-content: center; transition: all 0.2s ease; box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05)); min-width: 0; }
.dcu-sc.active { border-color: var(--ifm-color-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-2px); }
.dcu-sn { font-size: 14px; color: var(--ifm-color-emphasis-700); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dcu-sn.active { color: var(--ifm-color-primary); font-weight: 700; }
.dcu-rem { font-size: 42px; font-weight: 700; color: var(--ifm-font-color-base); line-height: 1.1; }
.dcu-avg { font-size: 13px; color: var(--ifm-color-emphasis-500); margin-top: 8px; font-weight: 600; }

.dcu-tp { position: relative; background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); padding: 16px; margin-bottom: 16px; box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05)); }
.dcu-tt { display: flex; align-items: center; margin-bottom: 12px; }
.dcu-tpl { position: absolute; top: 16px; right: 16px; font-size: 14px; font-weight: 600; color: var(--ifm-color-emphasis-600); white-space: nowrap; }
.dcu-dots { display: flex; gap: 8px; flex-shrink: 0; }
.dcu-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--ifm-color-emphasis-300); transition: all 0.2s ease; }
.dcu-dot.used { background: var(--ifm-color-emphasis-600); border-color: var(--ifm-color-emphasis-600); }
.dcu-dot.rem { background: var(--ifm-color-primary-lightest); border-color: var(--ifm-color-primary-light); }
.dcu-dl { display: flex; gap: 8px; flex-wrap: wrap; min-height: 28px; align-items: center; }
.dcu-chip { font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: var(--ifm-button-border-radius, 6px); background: var(--ifm-color-emphasis-100); border: 1px solid var(--ifm-color-emphasis-200); color: var(--ifm-font-color-base); }
.dcu-chip.miss { color: var(--ifm-color-emphasis-500); }
.dcu-nd { font-size: 14px; color: var(--ifm-color-emphasis-400); }

.dcu-ip { background: var(--ifm-background-color); border: 1px solid var(--ifm-color-emphasis-200); border-radius: var(--ifm-global-radius, 8px); padding: 24px; box-shadow: var(--ifm-global-shadow-lw, 0 1px 3px rgba(0,0,0,0.05)); }
.dcu-mr { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }

.dcu-mb, .dcu-nb, .dcu-sb, .dcu-ab, .dcu-wb2 {
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
.dcu-mb, .dcu-sb, .dcu-ab, .dcu-wb2 { flex-direction: row; }

.dcu-mb:hover:not(.sel), .dcu-nb:hover:not(.over), .dcu-sb:hover:not(:disabled), .dcu-ab:hover:not(:disabled), .dcu-wb2:hover { background: var(--ifm-color-emphasis-100); border-color: var(--ifm-color-emphasis-400); }
.dcu-mb:active, .dcu-nb:active:not(.over), .dcu-sb:active:not(:disabled), .dcu-ab:active:not(:disabled), .dcu-wb2:active { transform: scale(0.96); }
.dcu-mb.sel { background: var(--ifm-color-primary); border-color: var(--ifm-color-primary); color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }

.dcu-np { display: grid; gap: 8px; margin-bottom: 16px; }
.dcu-nb.over, .dcu-sb.over { opacity: 0.35; cursor: default; }
.dcu-nn { font-size: 18px; font-weight: 700; color: var(--ifm-font-color-base); }
.dcu-nv { font-size: 12px; color: var(--ifm-color-emphasis-500); margin-top: 2px; }

.dcu-sr { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.dcu-sb:disabled, .dcu-ab:disabled, .dcu-seg-btn:disabled { opacity: 0.4; cursor: not-allowed; background: var(--ifm-color-emphasis-100); color: var(--ifm-color-emphasis-400); transform: none; box-shadow: none; }

.dcu-ar { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 8px; }
.dcu-ab.undo { color: var(--ifm-color-danger); border-color: var(--ifm-color-danger); }
.dcu-ab.undo:hover:not(:disabled) { background: rgba(var(--ifm-color-danger-rgb), 0.1); }
.dcu-ab.ghost { color: var(--ifm-color-emphasis-600); }
.dcu-ab.hi { background: var(--ifm-color-primary); color: #fff; border-color: var(--ifm-color-primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.dcu-ab.hi:hover { background: var(--ifm-color-primary-dark); }

.dcu-log { margin-top: 16px; font-size: 14px; color: var(--ifm-color-emphasis-600); text-align: center; min-height: 20px; }

.dcu-ww { min-height: 340px; background: var(--ifm-background-color-subtle, var(--ifm-color-emphasis-100)); display: flex; align-items: center; justify-content: center; border-radius: var(--ifm-global-radius, 8px); margin-bottom: 16px; border: 1px solid var(--ifm-color-emphasis-200); }
.dcu-wm { background: var(--ifm-background-color); border-radius: 12px; padding: 32px 28px; max-width: 360px; width: 90%; text-align: center; border: 1px solid var(--ifm-color-emphasis-200); box-shadow: 0 8px 16px -4px rgba(0,0,0,0.1); }
.dcu-wt { font-size: 24px; font-weight: 700; color: var(--ifm-heading-color); margin-bottom: 12px; }
.dcu-ws { font-size: 15px; color: var(--ifm-color-emphasis-700); margin-bottom: 32px; line-height: 1.8; }
.dcu-wbs { display: flex; flex-direction: column; gap: 12px; }
.dcu-wb1 { margin-top: 0; }

@media (max-width: 480px) {
  .dartscu-container { padding: 0.4rem 0.4rem; }
  .dcu-setup { padding: 20px 16px; }
  .dcu-stitle { font-size: 20px; }

  .dcu-sh { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 5px; padding: 4px 0 2px; margin-bottom: 6px; }
  .dcu-sc { padding: 8px 5px; }
  .dcu-rem { font-size: 28px; }
  .dcu-avg { font-size: 11px; margin-top: 4px; }
  .dcu-sn { font-size: 12px; }

  .dcu-tp { padding: 7px 10px; margin-bottom: 6px; }
  .dcu-tpl { top: 7px; right: 10px; font-size: 12px; }
  .dcu-tt { margin-bottom: 8px; }
  .dcu-dl { min-height: 22px; gap: 5px; }
  .dcu-chip { font-size: 12px; padding: 3px 9px; }

  .dcu-ip { padding: 9px 8px; }
  .dcu-mr { gap: 4px; margin-bottom: 8px; }
  .dcu-np { grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 8px; }
  .dcu-sr { gap: 4px; margin-bottom: 8px; }
  .dcu-ar { gap: 4px; }

  .dcu-nb, .dcu-sb, .dcu-mb, .dcu-ab, .dcu-seg-btn { padding: 7px 4px; font-size: 13px; }

  .dcu-nb { min-height: 40px; }
  .dcu-nn { font-size: 14px; }
  .dcu-nv { font-size: 10px; margin-top: 1px; }

  .dcu-log { margin-top: 8px; font-size: 13px; min-height: 16px; }
}

@media (min-width: 481px) and (max-width: 768px) {
  .dartscu-container { padding: 1rem 1rem; }
  .dcu-sh { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
  .dcu-np { grid-template-columns: repeat(5, 1fr); }
}

@media (min-width: 769px) {
  .dcu-sh { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .dcu-np { grid-template-columns: repeat(10, 1fr); }
}
`;

interface Cfg {
  bullType: number;
  turnLimit: number;
  playerCount: number;
  names: string[];
}
interface Player { name: string; score: number; thrown: number; }
interface DartEntry { lbl: string; pts: number; miss?: boolean; }
interface GameState {
  players: Player[];
  cp: number; du: number; mult: number;
  darts: DartEntry[];
  log: string; over: boolean;
  winners: number[]; round: number;
}

const DEFAULT_CFG: Cfg = {
  bullType: 1, turnLimit: 8,
  playerCount: 1,
  names: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
};

function ptsFor(num: number | 'B', mult: number, bullType: number): number {
  if (num === 'B') return bullType === 1 || mult === 2 ? 50 : 25;
  return (num as number) * mult;
}

function labelFor(num: number | 'B', mult: number): string {
  if (num === 'B') return mult === 2 ? 'D-Bull' : 'Bull';
  if (mult === 2) return 'D' + num;
  if (mult === 3) return 'T' + num;
  return String(num);
}

function avgLabel(score: number, thrown: number): string {
  if (thrown < 1) return 'AVG 0.0';
  return 'AVG ' + ((score / thrown) * 3).toFixed(1);
}

function newGame(cfg: Cfg): GameState {
  return {
    players: cfg.names.slice(0, cfg.playerCount).map(n => ({ name: n, score: 0, thrown: 0 })),
    cp: 0, du: 0, mult: 1,
    darts: [], log: '', over: false, winners: [], round: 1,
  };
}

function deepClone(g: GameState): GameState {
  return JSON.parse(JSON.stringify(g));
}

function ScoreCards({ players, cp, over, cfg, t }: { players: Player[]; cp: number; over: boolean; cfg: Cfg; t: T }) {
  return (
    <div className="dcu-sh">
      {players.map((p, i) => {
        const isActive = cp === i && !over;
        return (
          <div key={i} className={`dcu-sc${isActive ? ' active' : ''}`}>
            <div className={`dcu-sn${isActive ? ' active' : ''}`}>{p.name}</div>
            <div className="dcu-rem">{p.score}</div>
            <div className="dcu-avg">{avgLabel(p.score, p.thrown)}</div>
          </div>
        );
      })}
    </div>
  );
}

function SetupView({ cfg, t, onChange, onStart }: {
  cfg: Cfg; t: T;
  onChange: (k: keyof Cfg, v: Cfg[keyof Cfg]) => void;
  onStart: () => void;
}) {
  return (
    <div className="dcu-setup">
      <div className="dcu-stitle">{t.setupTitle}</div>
      <div className="dcu-ssub">{t.setupSub(cfg.playerCount)}</div>

      <div className="dcu-row">
        <div className="dcu-lbl">{t.numPlayers}</div>
        <div className="dcu-seg">
          {[1, 2, 3, 4].map(n => (
            <button type="button" key={n} className={`dcu-seg-btn${cfg.playerCount === n ? ' sel' : ''}`}
              onClick={() => onChange('playerCount', n)}>{n}</button>
          ))}
        </div>
      </div>

      <div className="dcu-row">
        <div className="dcu-lbl">{t.bullLabel}</div>
        <div className="dcu-seg">
          <button type="button" className={`dcu-seg-btn${cfg.bullType === 1 ? ' sel' : ''}`}
            onClick={() => onChange('bullType', 1)}>FAT</button>
          <button type="button" className={`dcu-seg-btn${cfg.bullType === 2 ? ' sel' : ''}`}
            onClick={() => onChange('bullType', 2)}>SEPARATE</button>
        </div>
      </div>

      <div className="dcu-row">
        <div className="dcu-lbl">{t.turnLimit}</div>
        <input type="number" className="dcu-inp" value={cfg.turnLimit} min={1}
          onChange={e => onChange('turnLimit', Math.max(1, parseInt(e.target.value, 10) || 1))} />
      </div>

      {Array.from({ length: cfg.playerCount }, (_, i) => (
        <div key={i} className="dcu-row">
          <div className="dcu-lbl">{t.playerName(i + 1)}</div>
          <input className="dcu-inp" value={cfg.names[i]}
            onChange={e => {
              const names = [...cfg.names];
              names[i] = e.target.value;
              onChange('names', names);
            }} />
        </div>
      ))}

      <button type="button" className="dcu-start" onClick={onStart}>{t.start}</button>
    </div>
  );
}

function WinView({ game, cfg, t, onRematch, onReset }: {
  game: GameState; cfg: Cfg; t: T; onRematch: () => void; onReset: () => void;
}) {
  const isSolo = game.players.length === 1;
  let title = '';
  if (isSolo) {
    title = t.finishTitle;
  } else if (game.winners.length > 1) {
    title = t.draw;
  } else {
    title = t.winTitle(game.players[game.winners[0]].name);
  }

  const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);

  return (
    <>
      <ScoreCards players={game.players} cp={game.cp} over cfg={cfg} t={t} />
      <div className="dcu-ww">
        <div className="dcu-wm">
          <div className="dcu-wt">{title}</div>
          <div className="dcu-ws">
            {sortedPlayers.map((p, i) => (
              <span key={i}>
                <strong>{p.name}</strong>: {p.score} pts<br/>
                <span style={{ fontSize: '0.85em', color: 'var(--ifm-color-emphasis-600)' }}>
                  ({avgLabel(p.score, p.thrown)})
                </span><br /><br />
              </span>
            ))}
          </div>
          <div className="dcu-wbs">
            <button type="button" className="dcu-wb1" onClick={onRematch}>{t.rematch}</button>
            <button type="button" className="dcu-wb2" onClick={onReset}>{t.back}</button>
          </div>
        </div>
      </div>
    </>
  );
}

function GameView({ game, cfg, t, canUndo, onThrow, onMiss, onEndTurn, onUndo, onReset, onSetMult }: {
  game: GameState; cfg: Cfg; t: T; canUndo: boolean;
  onThrow: (num: number | 'B', mult: number) => void;
  onMiss: () => void; onEndTurn: () => void;
  onUndo: () => void; onReset: () => void; onSetMult: (m: number) => void;
}) {
  const { cp, du, mult, darts, log, players, round } = game;
  const needChange = du >= 3;
  const isInvalidBull = mult === 3;
  const bv = ptsFor('B', mult, cfg.bullType);
  const multLabels = [t.multSingle, t.multDouble, t.multTriple];

  return (
    <>
      <ScoreCards players={players} cp={cp} over={false} cfg={cfg} t={t} />

      <div className="dcu-tp">
        <div className="dcu-tpl">{t.roundLabel(round, cfg.turnLimit, players[cp].name)}</div>
        <div className="dcu-tt">
          <div className="dcu-dots">
            {[0, 1, 2].map(i => <span key={i} className={`dcu-dot ${i < du ? 'used' : 'rem'}`} />)}
          </div>
        </div>
        <div className="dcu-dl">
          {darts.length > 0
            ? darts.map((d, i) => (
                <span key={i} className={`dcu-chip${d.miss ? ' miss' : ''}`}>
                  {d.lbl}{d.pts > 0 ? ` (${d.pts})` : ''}
                </span>
              ))
            : <span className="dcu-nd">—</span>}
        </div>
      </div>

      <div className="dcu-ip">
        <div className="dcu-mr">
          {[1, 2, 3].map(m => (
            <button type="button" key={m} className={`dcu-mb${mult === m ? ' sel' : ''}`} onClick={() => onSetMult(m)} aria-pressed={mult === m}>
              {multLabels[m - 1]}
            </button>
          ))}
        </div>

        <div className="dcu-np">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => {
            const v = ptsFor(n, mult, cfg.bullType);
            return (
              <button type="button" key={n} className={`dcu-nb${needChange ? ' over' : ''}`} onClick={() => { if (!needChange) onThrow(n, mult); }}>
                <div className="dcu-nn">{n}</div>
                <div className="dcu-nv">{v}pts</div>
              </button>
            );
          })}
        </div>

        <div className="dcu-sr">
          <button type="button" className={`dcu-sb${needChange || isInvalidBull ? ' over' : ''}`}
            onClick={() => { if (!needChange && !isInvalidBull) onThrow('B', mult); }} disabled={isInvalidBull}>
            Bull ({isInvalidBull ? '—' : `${bv}pts`})
          </button>
          <button type="button" className={`dcu-sb${needChange ? ' over' : ''}`} onClick={() => { if (!needChange) onMiss(); }}>
            {t.miss}
          </button>
        </div>

        <div className="dcu-ar">
          <button type="button" className="dcu-ab undo" onClick={onUndo} disabled={!canUndo}>{t.undo}</button>
          <button type="button" className={`dcu-ab${needChange ? ' hi' : ''}`} onClick={onEndTurn}>{t.nextPlayer}</button>
          <button type="button" className="dcu-ab ghost"
            onClick={() => { if (window.confirm(t.settingsConfirm)) onReset(); }}>
            {t.settings}
          </button>
        </div>

        <div className="dcu-log">{log}</div>
      </div>
    </>
  );
}

export default function DartsCountUp() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const t: T = I18N[currentLocale === 'en' ? 'en' : 'ja'];

  const [cfg, setCfg] = useState<Cfg>(DEFAULT_CFG);
  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [game, setGame] = useState<GameState | null>(null);
  const hist = useRef<string[]>([]);

  function handleChangeCfg(k: keyof Cfg, v: Cfg[keyof Cfg]) {
    setCfg(prev => ({ ...prev, [k]: v }));
  }

  function handleStart() {
    const nextCfg: Cfg = {
      ...cfg,
      names: cfg.names.map((n, i) => n.trim() || t.playerName(i + 1)),
    };
    hist.current = [];
    setCfg(nextCfg);
    setGame(newGame(nextCfg));
    setPhase('game');
  }

  function handleReset() { setPhase('setup'); setGame(null); hist.current = []; }

  function handleRematch() { hist.current = []; setGame(newGame(cfg)); }

  function handleSetMult(m: number) {
    if (!game) return;
    setGame({ ...game, mult: m });
  }

  function handleThrow(num: number | 'B', mult: number) {
    if (!game || game.du >= 3 || game.over) return;
    if (num === 'B' && mult === 3) return;

    hist.current.push(JSON.stringify(game));
    const g = deepClone(game);
    const p = g.cp;
    const pts = ptsFor(num, mult, cfg.bullType);
    const lbl = labelFor(num, mult);

    g.players[p].thrown++;
    g.players[p].score += pts;
    g.darts.push({ lbl, pts });
    g.du++;
    g.log = t.logThrow(g.players[p].name, lbl, pts, g.players[p].score);
    g.mult = 1;
    setGame(g);
  }

  function handleMiss() {
    if (!game || game.du >= 3 || game.over) return;
    hist.current.push(JSON.stringify(game));
    const g = deepClone(game);
    g.players[g.cp].thrown++;
    g.darts.push({ lbl: 'Miss', pts: 0, miss: true });
    g.du++;
    g.log = t.logMiss(g.players[g.cp].name);
    g.mult = 1;
    setGame(g);
  }

  function handleEndTurn() {
    if (!game || game.over) return;
    hist.current.push(JSON.stringify(game));
    const g = deepClone(game);

    if (g.cp === g.players.length - 1 && g.round >= cfg.turnLimit) {
      g.over = true;
      const maxScore = Math.max(...g.players.map(p => p.score));
      g.winners = g.players.reduce<number[]>((acc, p, i) => { if (p.score === maxScore) acc.push(i); return acc; }, []);
      g.log = '';
      setGame(g);
      return;
    }

    if (g.cp === g.players.length - 1) g.round++;
    g.cp = (g.cp + 1) % g.players.length;
    g.du = 0;
    g.darts = [];
    g.mult = 1;
    g.log = '';
    setGame(g);
  }

  function handleUndo() {
    if (!hist.current.length) return;
    setGame(JSON.parse(hist.current.pop()!));
  }

  return (
    <Layout title={t.pageTitle} description={t.pageDesc}>
      <style>{CSS}</style>
      <div className="dartscu-container">
        {phase === 'setup' && (
          <SetupView cfg={cfg} t={t} onChange={handleChangeCfg} onStart={handleStart} />
        )}
        {phase === 'game' && game?.over && (
          <WinView game={game} cfg={cfg} t={t} onRematch={handleRematch} onReset={handleReset} />
        )}
        {phase === 'game' && game && !game.over && (
          <GameView
            game={game} cfg={cfg} t={t} canUndo={hist.current.length > 0}
            onThrow={handleThrow} onMiss={handleMiss}
            onEndTurn={handleEndTurn} onUndo={handleUndo}
            onReset={handleReset} onSetMult={handleSetMult}
          />
        )}
      </div>
    </Layout>
  );
}
