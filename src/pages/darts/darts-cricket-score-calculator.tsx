import React, { useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// --- 定数 ---
const TARGETS: (number | 'B')[] = [20, 19, 18, 17, 16, 15, 'B'];
const TV: Record<string, number> = { 20: 20, 19: 19, 18: 18, 17: 17, 16: 16, 15: 15, B: 25 };
const MULT_LABELS: Record<number, string> = { 1: 'Single', 2: 'Double', 3: 'Triple' };

// --- i18n ---
const I18N = {
  ja: {
    pageTitle: 'クリケット ダーツ スコア計算',
    title: 'クリケット ダーツ',
    subtitle: '2〜4人対戦 · 20〜15 + Bull',
    numPlayers: '対戦人数',
    playerLabel: (n: number) => `プレイヤー ${n}`,
    nPeople: (n: number) => `${n}人`,
    maxTurns: '最大ターン数（1ターン＝3投）',
    start: 'ゲーム開始',
    undo: '戻す',
    endTurn: 'ターン終了',
    settings: '設定に戻る',
    settingsConfirm: '設定画面に戻りますか？\n現在のゲーム進行は失われます。',
    bull: 'Bull',
    miss: 'Miss',
    noDart: '—',
    turnLabel: (cur: number, max: number) => `Turn ${cur}/${max}`,
    winTitle: (name: string) => `🎯 ${name} の勝利！`,
    drawTitle: '引き分け',
    playAgain: 'もう一度プレイ',
    pts: (n: number) => `+${n}pts`,
  },
  en: {
    pageTitle: 'Cricket Darts Score Calculator',
    title: 'Cricket Darts',
    subtitle: '2–4 Players · 20–15 + Bull',
    numPlayers: 'Players',
    playerLabel: (n: number) => `Player ${n}`,
    nPeople: (n: number) => `${n}`,
    maxTurns: 'Max Turns (1 turn = 3 darts)',
    start: 'Start Game',
    undo: 'Undo',
    endTurn: 'End Turn',
    settings: 'Settings',
    settingsConfirm: 'Return to settings?\nCurrent game progress will be lost.',
    bull: 'Bull',
    miss: 'Miss',
    noDart: '—',
    turnLabel: (cur: number, max: number) => `Turn ${cur}/${max}`,
    winTitle: (name: string) => `🎯 ${name} Wins!`,
    drawTitle: 'Draw',
    playAgain: 'Play Again',
    pts: (n: number) => `+${n}pts`,
  },
} as const;

type T = (typeof I18N)['ja' | 'en'];

// --- 型 ---
type DartThrow =
  | { miss: true }
  | { miss: false; mult: number; t: number | 'B'; pts: number };

type Player = { name: string; score: number; marks: Record<string, number> };

type Game = {
  players: Player[];
  cp: number;       // current player index
  du: number;       // darts used this turn
  mult: number;
  darts: DartThrow[];
  over: boolean;
  winner: number | null;
  turn: number;
  maxTurns: number;
};

// --- ゲームロジック ---
function freshPlayers(names: string[]): Player[] {
  return names.map(name => ({
    name,
    score: 0,
    marks: { 20: 0, 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, B: 0 },
  }));
}

function checkWin(players: Player[]): number | null {
  for (let pi = 0; pi < players.length; pi++) {
    const p = players[pi];
    if (
      TARGETS.every(t => p.marks[String(t)] >= 3) &&
      players.every((op, i) => i === pi || p.score >= op.score)
    ) return pi;
  }
  return null;
}

function cloneGame(g: Game): Game {
  return JSON.parse(JSON.stringify(g));
}

// --- スタイルユーティリティ (IFM変数でライト/ダークモード対応) ---
const S = {
  card: {
    background: 'var(--ifm-background-color)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: 8,
  } as React.CSSProperties,
  btnBase: {
    padding: '8px 6px',
    borderRadius: 6,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-color-emphasis-100)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--ifm-font-color-base)',
    textAlign: 'center',
    transition: 'background 0.15s',
  } as React.CSSProperties,
  btnActive: {
    padding: '8px 6px',
    borderRadius: 6,
    border: '1px solid var(--ifm-color-primary-light)',
    background: 'var(--ifm-color-primary-lightest)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--ifm-color-primary)',
    textAlign: 'center',
  } as React.CSSProperties,
};

// --- マーク表示: / X ⊗ ---
function MarkDisplay({ n }: { n: number }) {
  if (n === 0) return null;
  const style: React.CSSProperties = { fontSize: 16, fontWeight: 600, lineHeight: 1 };
  if (n === 1) return <span style={{ ...style, color: 'var(--ifm-font-color-base)' }}>/</span>;
  if (n === 2) return <span style={{ ...style, color: 'var(--ifm-font-color-base)' }}>X</span>;
  return <span style={{ fontSize: 17, color: 'var(--ifm-color-success)', lineHeight: 1 }}>⊗</span>;
}

// --- メインゲームコンポーネント ---
function DartsCricketApp() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const t: T = I18N[currentLocale === 'en' ? 'en' : 'ja'];

  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [maxTurns, setMaxTurns] = useState(8);
  const [game, setGame] = useState<Game | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const updateName = (i: number, val: string) =>
    setNames(prev => { const n = [...prev]; n[i] = val; return n; });

  const startGame = () => {
    setGame({
      players: freshPlayers(names.slice(0, playerCount)),
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
    if (target === 'B' && mult === 3) return; // Triple Bull は無効

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

      // 最大ターン数超過で強制終了
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

  // --- セットアップ画面 ---
  if (phase === 'setup') {
    return (
      <main style={{ padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ ...S.card, padding: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', color: 'var(--ifm-font-color-base)', marginBottom: 4 }}>
              {t.title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ifm-color-emphasis-600)', textAlign: 'center', marginBottom: 24 }}>
              {t.subtitle}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ifm-color-emphasis-700)' }}>{t.numPlayers}</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {([2, 3, 4] as const).map(n => (
                  <button key={n} style={{ flex: 1, ...(playerCount === n ? S.btnActive : S.btnBase) }}
                    onClick={() => setPlayerCount(n)}>
                    {t.nPeople(n)}
                  </button>
                ))}
              </div>
            </div>

            {Array.from({ length: playerCount }, (_, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ifm-color-emphasis-700)' }}>
                  {t.playerLabel(i + 1)}
                </label>
                <input
                  value={names[i]}
                  onChange={e => updateName(i, e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 14, borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-300)', background: 'var(--ifm-color-emphasis-100)', color: 'var(--ifm-font-color-base)' }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ifm-color-emphasis-700)' }}>{t.maxTurns}</label>
              <input
                type="number" min={1} value={maxTurns}
                onChange={e => setMaxTurns(Math.max(1, parseInt(e.target.value) || 8))}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 14, borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-300)', background: 'var(--ifm-color-emphasis-100)', color: 'var(--ifm-font-color-base)' }}
              />
            </div>

            <button onClick={startGame}
              style={{ ...S.btnActive, width: '100%', padding: 12, fontSize: 14, fontWeight: 700, marginTop: 4 }}>
              {t.start}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!game) return null;
  const g = game;
  const pc = g.players.length;
  const cp = g.cp;
  const half = Math.ceil(pc / 2);
  const needChange = g.du >= 3;

  // --- スコアヘッダー ---
  const scoreHeader = (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${pc}, 1fr)`, gap: 8, marginBottom: 10 }}>
      {g.players.map((p, i) => (
        <div key={i} style={{
          ...S.card,
          padding: '10px 8px',
          textAlign: 'center',
          border: cp === i && !g.over ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-emphasis-300)',
        }}>
          <div style={{ fontSize: 12, marginBottom: 2, fontWeight: cp === i && !g.over ? 600 : 400, color: cp === i && !g.over ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {p.name}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--ifm-font-color-base)', lineHeight: 1.1 }}>
            {p.score}
          </div>
        </div>
      ))}
    </div>
  );

  // --- スコアボード ---
  const scoreboard = (
    <div style={{ ...S.card, padding: 0, overflow: 'hidden', marginBottom: 10 }}>
      {TARGETS.map(target => {
        const tk = String(target);
        const allClosed = g.players.every(p => p.marks[tk] >= 3);
        const anyOpen = g.players.some(p => p.marks[tk] < 3);
        const tLabel = target === 'B' ? t.bull : String(target);
        const gridCols = `repeat(${half}, 1fr) 54px repeat(${pc - half}, 1fr)`;

        return (
          <div key={tk} style={{ display: 'grid', gridTemplateColumns: gridCols, borderBottom: '1px solid var(--ifm-color-emphasis-200)', alignItems: 'center', minHeight: 40 }}>
            {Array.from({ length: half }, (_, i) => {
              const m = g.players[i].marks[tk];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row-reverse', gap: 3, padding: '6px 8px' }}>
                  {m >= 3 && anyOpen && <span style={{ fontSize: 13, fontWeight: 'bold', color: 'var(--ifm-color-danger)', margin: '0 2px' }}>+</span>}
                  <MarkDisplay n={m} />
                </div>
              );
            })}
            <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 600, color: allClosed ? 'var(--ifm-color-emphasis-400)' : 'var(--ifm-font-color-base)', textDecoration: allClosed ? 'line-through' : 'none' }}>
              {tLabel}
            </div>
            {Array.from({ length: pc - half }, (_, idx) => {
              const i = half + idx;
              const m = g.players[i].marks[tk];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '6px 8px' }}>
                  <MarkDisplay n={m} />
                  {m >= 3 && anyOpen && <span style={{ fontSize: 13, fontWeight: 'bold', color: 'var(--ifm-color-danger)', margin: '0 2px' }}>+</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // --- 終了画面 ---
  if (g.over) {
    const winTitle = g.winner !== null ? t.winTitle(g.players[g.winner].name) : t.drawTitle;
    return (
      <main style={{ padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          {scoreHeader}
          {scoreboard}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, background: 'var(--ifm-color-emphasis-100)', borderRadius: 10 }}>
            <div style={{ ...S.card, maxWidth: 280, width: '90%', textAlign: 'center', padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ifm-font-color-base)', marginBottom: 8 }}>{winTitle}</div>
              <div style={{ fontSize: 13, color: 'var(--ifm-color-emphasis-600)', marginBottom: 20, lineHeight: 1.6 }}>
                {g.players.map(p => `${p.name}: ${p.score}pts`).join(' / ')}
              </div>
              <button style={{ ...S.btnActive, width: '100%', padding: 10, fontSize: 14, fontWeight: 600 }} onClick={resetGame}>
                {t.playAgain}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- ゲーム画面 ---
  return (
    <main style={{ padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {scoreHeader}
        {scoreboard}

        {/* ターン情報パネル */}
        <div style={{ ...S.card, padding: '10px 12px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ifm-font-color-base)' }}>
              {g.players[cp].name}
              <span style={{ fontSize: 12, color: 'var(--ifm-color-emphasis-600)', fontWeight: 400, marginLeft: 6 }}>
                {t.turnLabel(g.turn, g.maxTurns)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', border: '1.5px solid var(--ifm-color-emphasis-300)', background: i < g.du ? 'var(--ifm-color-emphasis-600)' : 'var(--ifm-color-primary-lightest)' }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 22, alignItems: 'center' }}>
            {g.darts.length === 0 ? (
              <span style={{ fontSize: 12, color: 'var(--ifm-color-emphasis-400)' }}>{t.noDart}</span>
            ) : g.darts.map((d, i) => {
              if (d.miss) return (
                <span key={i} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 6, background: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)', color: 'var(--ifm-color-emphasis-500)' }}>
                  {t.miss}
                </span>
              );
              const tl = d.t === 'B' ? t.bull : String(d.t);
              const ptsStr = d.pts > 0 ? ` (${t.pts(d.pts)})` : '';
              return (
                <span key={i} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 6, background: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)', color: 'var(--ifm-font-color-base)' }}>
                  {MULT_LABELS[d.mult]} {tl}{ptsStr}
                </span>
              );
            })}
          </div>
        </div>

        {/* 入力パネル */}
        <div style={{ ...S.card, padding: 12 }}>
          {/* マルチプライヤー選択 */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {[1, 2, 3].map(m => (
              <button key={m} style={{ flex: 1, ...(g.mult === m ? S.btnActive : S.btnBase) }}
                onClick={() => setGame({ ...g, mult: m })}>
                {MULT_LABELS[m]}
              </button>
            ))}
          </div>

          {/* ターゲットボタン (Miss含め4列グリッド) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 8 }}>
            {TARGETS.map(target => {
              const tk = String(target);
              const tLabel = target === 'B' ? t.bull : String(target);
              const isInvalidBull = target === 'B' && g.mult === 3;
              const allClosed = g.players.every(p => p.marks[tk] >= 3);
              const disabled = allClosed || isInvalidBull || needChange;
              const pts = isInvalidBull ? '-' : `${TV[tk] * g.mult}pts`;
              return (
                <button key={tk} disabled={disabled}
                  style={{ ...S.btnBase, padding: '8px 4px', opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
                  onClick={() => throwDart(target, g.mult)}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ifm-font-color-base)' }}>{tLabel}</div>
                  <div style={{ fontSize: 10, color: 'var(--ifm-color-emphasis-600)', marginTop: 1 }}>{pts}</div>
                </button>
              );
            })}
            <button disabled={needChange}
              style={{ ...S.btnBase, padding: '8px 4px', opacity: needChange ? 0.4 : 1, cursor: needChange ? 'not-allowed' : 'pointer' }}
              onClick={miss}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ifm-font-color-base)' }}>{t.miss}</div>
              <div style={{ fontSize: 10, color: 'var(--ifm-color-emphasis-600)', marginTop: 1 }}>-</div>
            </button>
          </div>

          {/* アクションボタン行 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 6 }}>
            <button disabled={history.length === 0} onClick={undo}
              style={{ ...S.btnBase, color: 'var(--ifm-color-danger)', borderColor: 'var(--ifm-color-danger)', opacity: history.length ? 1 : 0.3, cursor: history.length ? 'pointer' : 'not-allowed' }}>
              {t.undo}
            </button>
            <button onClick={endTurn}
              style={{ ...(needChange ? S.btnActive : S.btnBase), fontSize: 14, fontWeight: 600 }}>
              {t.endTurn}
            </button>
            <button style={S.btnBase}
              onClick={() => { if (window.confirm(t.settingsConfirm)) resetGame(); }}>
              {t.settings}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DartsCricketPage() {
  return (
    <Layout
      title="Cricket Darts Score Calculator"
      description="2–4 player cricket darts score calculator supporting 20–15 and Bull targets."
    >
      <BrowserOnly fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        {() => <DartsCricketApp />}
      </BrowserOnly>
    </Layout>
  );
}
