import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Translation = {
  pageTitle: string;
  pageDesc: string;
  setupTitle: string;
  setupSub: (n: number) => string;
  numPlayers: string;
  gameType: string;
  outLabel: string;
  outSingle: string;
  outDouble: string;
  outMaster: string;
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
  hintInRange: string;
  winTitle: (name: string) => string;
  draw: string;
  finish: string;
  rematch: string;
  back: string;
  logBust: (name: string, rem: number) => string;
  logThrow: (name: string, lbl: string, pts: number, rem: number) => string;
  logMiss: (name: string) => string;
};

const I18N: Record<'ja' | 'en', Translation> = {
  ja: {
    pageTitle: '01ダーツ スコア計算機',
    pageDesc: '01ダーツ（301/501/701）用スコア計算ツール。シングル・ダブル・マスターアウト対応。',
    setupTitle: '01ダーツ',
    setupSub: (n: number) => `${n}人対戦`,
    numPlayers: 'プレイヤー数',
    gameType: 'ゲームタイプ',
    outLabel: 'アウト',
    outSingle: 'シングル', outDouble: 'ダブル', outMaster: 'マスター',
    bullLabel: 'ブルオプション',
    turnLimit: 'ターン数制限',
    playerName: (n: number) => `プレイヤー ${n}`,
    start: 'ゲーム開始',
    multSingle: 'シングル', multDouble: 'ダブル', multTriple: 'トリプル',
    roundLabel: (round: number, limit: number, name: string) => `R${round}/${limit} — ${name}`,
    miss: 'ミス', undo: '戻す', nextPlayer: 'プレイヤーチェンジ', settings: '設定',
    hintInRange: '圏内',
    winTitle: (name: string) => `${name}の勝利`,
    draw: '引き分け',
    finish: 'フィニッシュ:',
    rematch: 'もう一度 (同設定)', back: '設定に戻る',
    logBust: (name: string, rem: number) => `BUST: ${name} (${rem}に戻る)`,
    logThrow: (name: string, lbl: string, pts: number, rem: number) => `${name}: ${lbl} = ${pts}pts → 残り${rem}`,
    logMiss: (name: string) => `${name}: ミス`,
  },
  en: {
    pageTitle: '01 Darts Score Calculator',
    pageDesc: 'Score calculator for 01 darts (301/501/701). Supports single, double and master out.',
    setupTitle: '01 Darts',
    setupSub: (n: number) => `${n} Players`,
    numPlayers: 'Players',
    gameType: 'Game Type',
    outLabel: 'Out',
    outSingle: 'Single', outDouble: 'Double', outMaster: 'Master',
    bullLabel: 'Bull Option',
    turnLimit: 'Turn Limit',
    playerName: (n: number) => `Player ${n}`,
    start: 'Start Game',
    multSingle: 'Single', multDouble: 'Double', multTriple: 'Triple',
    roundLabel: (round: number, limit: number, name: string) => `R${round}/${limit} — ${name}`,
    miss: 'Miss', undo: 'Undo', nextPlayer: 'Next Player', settings: 'Settings',
    hintInRange: 'In range',
    winTitle: (name: string) => `${name} Wins!`,
    draw: 'Draw',
    finish: 'Finish:',
    rematch: 'Rematch (same settings)', back: 'Settings',
    logBust: (name: string, rem: number) => `BUST: ${name} (back to ${rem})`,
    logThrow: (name: string, lbl: string, pts: number, rem: number) => `${name}: ${lbl} = ${pts}pts → ${rem} left`,
    logMiss: (name: string) => `${name}: Miss`,
  },
};

type T = Translation;

const CSS = `
.d01{
  padding:10px;max-width:680px;margin:0 auto;
  background:var(--ifm-color-emphasis-200);
  min-height:calc(100vh - var(--ifm-navbar-height,60px));
}
.d01-sh{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.d01-sc{background:var(--ifm-background-color);border:1px solid var(--ifm-color-emphasis-300);border-radius:10px;padding:10px 14px;text-align:center}
.d01-sc.active{border:2px solid var(--ifm-color-primary-light)}
.d01-sn{font-size:12px;color:var(--ifm-color-emphasis-700);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d01-sn.active{color:var(--ifm-color-primary);font-weight:600}
.d01-rem{font-size:34px;font-weight:600;color:var(--ifm-font-color-base);line-height:1.1}
.d01-rem.near{color:var(--ifm-color-success)}
.d01-hint{font-size:11px;color:var(--ifm-color-success);margin-top:2px;min-height:14px;font-weight:500}
.d01-avg{font-size:11px;color:var(--ifm-color-emphasis-400);margin-top:1px}
.d01-tp{background:var(--ifm-background-color);border:1px solid var(--ifm-color-emphasis-300);border-radius:10px;padding:10px 12px;margin-bottom:8px}
.d01-tt{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.d01-tpl{font-size:14px;font-weight:600;color:var(--ifm-font-color-base)}
.d01-dots{display:flex;gap:5px;flex-shrink:0}
.d01-dot{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--ifm-color-emphasis-300)}
.d01-dot.used{background:var(--ifm-color-emphasis-700);border-color:var(--ifm-color-emphasis-700)}
.d01-dot.rem{background:var(--ifm-color-primary-lightest);border-color:var(--ifm-color-primary-light)}
.d01-dl{display:flex;gap:6px;flex-wrap:wrap;min-height:22px;align-items:center}
.d01-chip{font-size:12px;font-weight:500;padding:2px 8px;border-radius:6px;background:var(--ifm-color-emphasis-100);border:1px solid var(--ifm-color-emphasis-200);color:var(--ifm-font-color-base)}
.d01-chip.miss{color:var(--ifm-color-emphasis-400)}
.d01-nd{font-size:12px;color:var(--ifm-color-emphasis-400)}
.d01-ip{background:var(--ifm-background-color);border:1px solid var(--ifm-color-emphasis-300);border-radius:10px;padding:12px}
.d01-mr{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px}
.d01-mb{padding:7px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;font-size:13px;font-weight:600;color:var(--ifm-font-color-base);text-align:center;transition:background 0.1s}
.d01-mb:hover{background:var(--ifm-color-emphasis-200)}
.d01-mb.sel{background:var(--ifm-color-primary-lightest);border-color:var(--ifm-color-primary-light);color:var(--ifm-color-primary)}
.d01-np{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:6px}
.d01-nb{padding:9px 4px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;text-align:center;transition:background 0.1s}
.d01-nb:hover{background:var(--ifm-color-emphasis-200)}
.d01-nb:active{transform:scale(0.96)}
.d01-nb.over{opacity:0.35}
.d01-nn{font-size:15px;font-weight:600;color:var(--ifm-font-color-base)}
.d01-nv{font-size:10px;color:var(--ifm-color-emphasis-400)}
.d01-sr{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px}
.d01-sb{padding:9px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;font-size:13px;font-weight:600;color:var(--ifm-font-color-base);text-align:center;transition:background 0.1s}
.d01-sb:hover{background:var(--ifm-color-emphasis-200)}
.d01-sb:active{transform:scale(0.96)}
.d01-sb.over{opacity:0.35}
.d01-ar{display:grid;grid-template-columns:1fr 2fr 1fr;gap:6px}
.d01-ab{padding:9px 6px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;font-size:13px;font-weight:600;color:var(--ifm-font-color-base);text-align:center;transition:background 0.1s}
.d01-ab:hover{background:var(--ifm-color-emphasis-200)}
.d01-ab:active{transform:scale(0.97)}
.d01-ab.undo{color:var(--ifm-color-danger);border-color:rgba(220,38,38,0.35)}
.d01-ab:disabled{opacity:0.3;cursor:not-allowed;transform:none}
.d01-ab.ghost{color:var(--ifm-color-emphasis-700)}
.d01-ab.hi{background:var(--ifm-color-primary-lightest);color:var(--ifm-color-primary);border-color:var(--ifm-color-primary-light)}
.d01-log{margin-top:10px;font-size:12px;color:var(--ifm-color-emphasis-700);text-align:center;min-height:16px}
.d01-log.bust{color:var(--ifm-color-danger);font-weight:600}
.d01-setup{background:var(--ifm-background-color);border:1px solid var(--ifm-color-emphasis-300);border-radius:10px;padding:24px}
.d01-stitle{font-size:18px;font-weight:600;color:var(--ifm-font-color-base);margin-bottom:4px;text-align:center}
.d01-ssub{font-size:13px;color:var(--ifm-color-emphasis-700);text-align:center;margin-bottom:24px}
.d01-row{margin-bottom:14px}
.d01-lbl{font-size:13px;font-weight:500;color:var(--ifm-color-emphasis-700);margin-bottom:6px}
.d01-seg{display:flex;gap:6px}
.d01-seg-btn{flex:1;padding:8px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;font-size:14px;font-weight:600;color:var(--ifm-font-color-base);text-align:center;transition:background 0.1s}
.d01-seg-btn.sel{background:var(--ifm-color-primary-lightest);border-color:var(--ifm-color-primary-light);color:var(--ifm-color-primary)}
.d01-inp{background:var(--ifm-color-emphasis-100);border:1px solid var(--ifm-color-emphasis-300);border-radius:6px;padding:8px 10px;font-size:14px;color:var(--ifm-font-color-base);width:100%;margin-top:4px}
.d01-start{width:100%;padding:12px;border-radius:6px;border:1px solid var(--ifm-color-primary-light);background:var(--ifm-color-primary-lightest);cursor:pointer;font-size:15px;font-weight:600;color:var(--ifm-color-primary);margin-top:16px}
.d01-ww{min-height:300px;background:var(--ifm-color-emphasis-100);display:flex;align-items:center;justify-content:center;border-radius:10px;margin-bottom:8px}
.d01-wm{background:var(--ifm-background-color);border-radius:16px;padding:28px 24px;max-width:300px;width:90%;text-align:center;border:1px solid var(--ifm-color-emphasis-300);box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
.d01-wt{font-size:20px;font-weight:600;color:var(--ifm-font-color-base);margin-bottom:6px}
.d01-ws{font-size:13px;color:var(--ifm-color-emphasis-700);margin-bottom:24px;line-height:1.7}
.d01-wbs{display:flex;flex-direction:column;gap:8px}
.d01-wb1{width:100%;padding:11px;border-radius:6px;border:1px solid var(--ifm-color-primary-light);background:var(--ifm-color-primary-lightest);cursor:pointer;font-size:14px;font-weight:600;color:var(--ifm-color-primary)}
.d01-wb2{width:100%;padding:11px;border-radius:6px;border:1px solid var(--ifm-color-emphasis-300);background:var(--ifm-color-emphasis-100);cursor:pointer;font-size:13px;font-weight:600;color:var(--ifm-font-color-base)}
@media(max-width:480px){
  .d01{padding:8px 6px}
  .d01-setup{padding:16px 14px}
  .d01-stitle{font-size:16px}
  .d01-sh{gap:6px}
  .d01-sc{padding:8px 8px}
  .d01-rem{font-size:28px}
  .d01-tp{padding:8px 10px}
  .d01-tpl{font-size:13px}
  .d01-ip{padding:10px 8px}
  .d01-np{gap:4px}
  .d01-mr,.d01-sr,.d01-ar{gap:5px}
  .d01-nb{min-height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 2px}
  .d01-sb,.d01-mb{min-height:42px;display:flex;align-items:center;justify-content:center}
  .d01-ab{min-height:42px;display:flex;align-items:center;justify-content:center;font-size:12px}
}
@media(min-width:768px){
  .d01{padding:16px 12px}
  .d01-setup{padding:32px}
  .d01-stitle{font-size:20px}
}
`;

interface Cfg {
  gameType: number;
  outType: number;
  bullType: number;
  turnLimit: number;
  playerCount: number;
  names: string[];
}
interface Player { name: string; rem: number; thrown: number; scored: number; }
interface DartEntry { lbl: string; pts: number; bust?: boolean; miss?: boolean; }
interface GameState {
  players: Player[];
  cp: number; du: number; mult: number;
  turnStart: number[];
  darts: DartEntry[];
  log: string; busted: boolean; over: boolean;
  winner: number | null; finishDart: string | null; round: number;
}

const DEFAULT_CFG: Cfg = {
  gameType: 501, outType: 1, bullType: 1, turnLimit: 8,
  playerCount: 2,
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

function checkoutHint(rem: number, cfg: Cfg, t: T): string {
  if (rem <= 0 || rem > 60) return '';
  if (cfg.bullType === 1 && rem === 50) return 'Bull';
  if (cfg.bullType === 2 && rem === 50) return 'D-Bull';
  if (cfg.bullType === 2 && cfg.outType === 1 && rem === 25) return 'Bull';
  if (cfg.outType === 1 && rem <= 20) return String(rem);
  if (rem <= 40 && rem % 2 === 0) return 'D' + (rem / 2);
  if (cfg.outType !== 2 && rem % 3 === 0) return 'T' + (rem / 3);
  return t.hintInRange;
}

function avgLabel(scored: number, thrown: number): string {
  if (thrown < 1) return '';
  return 'AVG ' + ((scored / thrown) * 3).toFixed(1);
}

function checkBust(rem: number, pts: number, mult: number, num: number | 'B', cfg: Cfg): boolean {
  const newRem = rem - pts;
  if (newRem < 0) return true;
  if (newRem === 0) {
    if (cfg.outType === 2) {
      if (num === 'B' && cfg.bullType === 1) return false;
      if (mult !== 2) return true;
    }
    if (cfg.outType === 3) {
      if (num === 'B' && cfg.bullType === 1) return false;
      if (mult < 2) return true;
    }
  }
  if (newRem === 1 && cfg.outType >= 2) return true;
  return false;
}

function newGame(cfg: Cfg): GameState {
  return {
    players: cfg.names.slice(0, cfg.playerCount).map(n => ({ name: n, rem: cfg.gameType, thrown: 0, scored: 0 })),
    cp: 0, du: 0, mult: 1,
    turnStart: Array(cfg.playerCount).fill(cfg.gameType),
    darts: [], log: '', busted: false, over: false, winner: null, finishDart: null, round: 1,
  };
}

function deepClone(g: GameState): GameState {
  return JSON.parse(JSON.stringify(g));
}

function ScoreCards({ players, cp, over, cfg, t }: { players: Player[]; cp: number; over: boolean; cfg: Cfg; t: T }) {
  return (
    <div className="d01-sh">
      {players.map((p, i) => {
        const hint = checkoutHint(p.rem, cfg, t);
        const isActive = cp === i && !over;
        return (
          <div key={i} className={`d01-sc${isActive ? ' active' : ''}`}>
            <div className={`d01-sn${isActive ? ' active' : ''}`}>{p.name}</div>
            <div className={`d01-rem${p.rem <= 60 ? ' near' : ''}`}>{p.rem}</div>
            <div className="d01-hint">{hint ? '→ ' + hint : ''}</div>
            <div className="d01-avg">{avgLabel(p.scored, p.thrown)}</div>
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
    <div className="d01-setup">
      <div className="d01-stitle">{t.setupTitle}</div>
      <div className="d01-ssub">{t.setupSub(cfg.playerCount)}</div>

      <div className="d01-row">
        <div className="d01-lbl">{t.numPlayers}</div>
        <div className="d01-seg">
          {[2, 3, 4].map(n => (
            <button key={n} className={`d01-seg-btn${cfg.playerCount === n ? ' sel' : ''}`}
              onClick={() => onChange('playerCount', n)}>{n}</button>
          ))}
        </div>
      </div>

      <div className="d01-row">
        <div className="d01-lbl">{t.gameType}</div>
        <div className="d01-seg">
          {[301, 501, 701].map(gt => (
            <button key={gt} className={`d01-seg-btn${cfg.gameType === gt ? ' sel' : ''}`}
              onClick={() => onChange('gameType', gt)}>{gt}</button>
          ))}
        </div>
      </div>

      <div className="d01-row">
        <div className="d01-lbl">{t.outLabel}</div>
        <div className="d01-seg">
          {([t.outSingle, t.outDouble, t.outMaster] as const).map((label, idx) => (
            <button key={idx} className={`d01-seg-btn${cfg.outType === idx + 1 ? ' sel' : ''}`}
              onClick={() => onChange('outType', idx + 1)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="d01-row">
        <div className="d01-lbl">{t.bullLabel}</div>
        <div className="d01-seg">
          <button className={`d01-seg-btn${cfg.bullType === 1 ? ' sel' : ''}`}
            onClick={() => onChange('bullType', 1)}>FAT</button>
          <button className={`d01-seg-btn${cfg.bullType === 2 ? ' sel' : ''}`}
            onClick={() => onChange('bullType', 2)}
            disabled={cfg.outType === 1}
            style={cfg.outType === 1 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}>
            SEPARATE
          </button>
        </div>
      </div>

      <div className="d01-row">
        <div className="d01-lbl">{t.turnLimit}</div>
        <input type="number" className="d01-inp" value={cfg.turnLimit} min={1}
          onChange={e => onChange('turnLimit', Math.max(1, parseInt(e.target.value, 10) || 1))} />
      </div>

      {Array.from({ length: cfg.playerCount }, (_, i) => (
        <div key={i} className="d01-row">
          <div className="d01-lbl">{t.playerName(i + 1)}</div>
          <input className="d01-inp" value={cfg.names[i]}
            onChange={e => {
              const names = [...cfg.names];
              names[i] = e.target.value;
              onChange('names', names);
            }} />
        </div>
      ))}

      <button className="d01-start" onClick={onStart}>{t.start}</button>
    </div>
  );
}

function WinView({ game, cfg, t, onRematch, onReset }: {
  game: GameState; cfg: Cfg; t: T; onRematch: () => void; onReset: () => void;
}) {
  const winTitle = game.winner === -1 ? t.draw : t.winTitle(game.players[game.winner!].name);
  return (
    <>
      <ScoreCards players={game.players} cp={game.cp} over cfg={cfg} t={t} />
      <div className="d01-ww">
        <div className="d01-wm">
          <div className="d01-wt">{winTitle}</div>
          <div className="d01-ws">
            {game.finishDart && <>{t.finish} {game.finishDart}<br /></>}
            {game.players.map((p, i) => (
              <span key={i}>{p.name} {avgLabel(p.scored, p.thrown)}<br /></span>
            ))}
          </div>
          <div className="d01-wbs">
            <button className="d01-wb1" onClick={onRematch}>{t.rematch}</button>
            <button className="d01-wb2" onClick={onReset}>{t.back}</button>
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
  const { cp, du, mult, darts, log, busted, players, round } = game;
  const rem = players[cp].rem;
  const needChange = du >= 3 || busted;
  const isInvalidBull = mult === 3;
  const bv = ptsFor('B', mult, cfg.bullType);
  const bullOver = isInvalidBull || needChange || checkBust(rem, bv, mult, 'B', cfg);
  const multLabels = [t.multSingle, t.multDouble, t.multTriple];

  return (
    <>
      <ScoreCards players={players} cp={cp} over={false} cfg={cfg} t={t} />

      <div className="d01-tp">
        <div className="d01-tt">
          <div className="d01-tpl">{t.roundLabel(round, cfg.turnLimit, players[cp].name)}</div>
          <div className="d01-dots">
            {[0, 1, 2].map(i => <span key={i} className={`d01-dot ${i < du ? 'used' : 'rem'}`} />)}
          </div>
        </div>
        <div className="d01-dl">
          {darts.length > 0
            ? darts.map((d, i) => (
                <span key={i} className={`d01-chip${d.miss ? ' miss' : ''}`}>
                  {d.lbl}{d.pts > 0 ? ` (${d.pts})` : ''}
                </span>
              ))
            : <span className="d01-nd">—</span>}
        </div>
      </div>

      <div className="d01-ip">
        <div className="d01-mr">
          {[1, 2, 3].map(m => (
            <button key={m} className={`d01-mb${mult === m ? ' sel' : ''}`} onClick={() => onSetMult(m)}>
              {multLabels[m - 1]}
            </button>
          ))}
        </div>

        <div className="d01-np">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => {
            const v = ptsFor(n, mult, cfg.bullType);
            const over = needChange || checkBust(rem, v, mult, n, cfg);
            return (
              <button key={n} className={`d01-nb${over ? ' over' : ''}`} onClick={() => onThrow(n, mult)}>
                <div className="d01-nn">{n}</div>
                <div className="d01-nv">{v}pts</div>
              </button>
            );
          })}
        </div>

        <div className="d01-sr">
          <button className={`d01-sb${bullOver ? ' over' : ''}`}
            onClick={() => !isInvalidBull && onThrow('B', mult)}>
            Bull ({isInvalidBull ? '—' : `${bv}pts`})
          </button>
          <button className={`d01-sb${needChange ? ' over' : ''}`} onClick={onMiss}>
            {t.miss}
          </button>
        </div>

        <div className="d01-ar">
          <button className="d01-ab undo" onClick={onUndo} disabled={!canUndo}>{t.undo}</button>
          <button className={`d01-ab${needChange ? ' hi' : ''}`} onClick={onEndTurn}>{t.nextPlayer}</button>
          <button className="d01-ab ghost" onClick={onReset}>{t.settings}</button>
        </div>

        <div className={`d01-log${busted ? ' bust' : ''}`}>{log}</div>
      </div>
    </>
  );
}

export default function Darts01() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const t: T = I18N[currentLocale === 'en' ? 'en' : 'ja'];

  const [cfg, setCfg] = useState<Cfg>(DEFAULT_CFG);
  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [game, setGame] = useState<GameState | null>(null);
  const hist = useRef<string[]>([]);

  function handleChangeCfg(k: keyof Cfg, v: Cfg[keyof Cfg]) {
    setCfg(prev => {
      const next = { ...prev, [k]: v } as Cfg;
      if (k === 'outType' && v === 1) next.bullType = 1;
      return next;
    });
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
    if (!game || game.du >= 3 || game.over || game.busted) return;
    if (num === 'B' && mult === 3) return;

    hist.current.push(JSON.stringify(game));
    const g = deepClone(game);
    const p = g.cp;
    const pts = ptsFor(num, mult, cfg.bullType);
    const lbl = labelFor(num, mult);
    const isBust = checkBust(g.players[p].rem, pts, mult, num, cfg);
    const newRem = g.players[p].rem - pts;

    if (isBust) {
      g.darts.push({ lbl, pts, bust: true });
      g.players[p].thrown++;
      g.players[p].rem = g.turnStart[p];
      g.du = 3;
      g.log = t.logBust(g.players[p].name, g.turnStart[p]);
      g.busted = true;
    } else {
      g.players[p].thrown++;
      g.players[p].scored += pts;
      g.players[p].rem = newRem;
      g.darts.push({ lbl, pts });
      g.du++;
      g.log = t.logThrow(g.players[p].name, lbl, pts, newRem);
      if (newRem === 0) { g.over = true; g.winner = p; g.finishDart = lbl; }
    }
    g.mult = 1;
    setGame(g);
  }

  function handleMiss() {
    if (!game || game.du >= 3 || game.over || game.busted) return;
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
      const minRem = Math.min(...g.players.map(p => p.rem));
      const winners = g.players.reduce<number[]>((acc, p, i) => { if (p.rem === minRem) acc.push(i); return acc; }, []);
      g.winner = winners.length === 1 ? winners[0] : -1;
      g.log = '';
      setGame(g);
      return;
    }

    if (g.cp === g.players.length - 1) g.round++;
    g.cp = (g.cp + 1) % g.players.length;
    g.du = 0;
    g.turnStart = g.players.map(p => p.rem);
    g.darts = [];
    g.mult = 1;
    g.busted = false;
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
      <div className="d01">
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
