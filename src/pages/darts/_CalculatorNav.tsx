import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type CalculatorId = '01' | 'cricket' | 'countup';

type CalcLink = {
  id: CalculatorId;
  to: string;
  label: { en: string; ja: string };
};

// 固定順序。各ページは現在のゲームを除いた2つをこの順で表示する。
const CALCULATORS: CalcLink[] = [
  { id: '01', to: '/darts/darts-01-score-calculator/', label: { en: '01', ja: '01ゲーム' } },
  { id: 'cricket', to: '/darts/darts-cricket-score-calculator/', label: { en: 'Cricket', ja: 'クリケット' } },
  { id: 'countup', to: '/darts/darts-countup-score-calculator/', label: { en: 'Count-Up', ja: 'カウントアップ' } },
];

// ダーツ計算機ページ末尾の「ほかのダーツ計算機」ナビゲーション。
export default function CalculatorNav({ current }: { current: CalculatorId }): JSX.Element {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const en = currentLocale === 'en';
  const others = CALCULATORS.filter((c) => c.id !== current);
  return (
    <nav
      aria-label={en ? 'Other darts calculators' : 'ほかのダーツ計算機'}
      style={{ margin: '2.5rem auto 1.5rem', textAlign: 'center', fontSize: '0.9em' }}
    >
      <span style={{ opacity: 0.7 }}>{en ? 'More darts calculators: ' : 'ほかのダーツ計算機: '}</span>
      <Link to="/darts/">{en ? 'Darts home' : '計算機トップ'}</Link>
      {others.map((c) => (
        <React.Fragment key={c.id}>
          {' · '}
          <Link to={c.to}>{en ? c.label.en : c.label.ja}</Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
