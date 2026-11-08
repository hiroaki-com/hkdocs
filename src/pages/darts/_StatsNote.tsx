import React, { JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { CalculatorId } from './_CalculatorNav';

type Term = { name: string; ja: string; en: string };

const TERMS: Record<'3da' | 'ppd' | 'f9' | 'mpr', Term> = {
  '3da': {
    name: '3DA',
    ja: '1 ラウンド（3 本）あたりの平均得点。得点 ÷ 投げた本数 × 3。',
    en: 'Average points per round of three darts: points ÷ darts thrown × 3.',
  },
  ppd: {
    name: 'PPD',
    ja: '1 本あたりの平均得点。得点 ÷ 投げた本数。',
    en: 'Average points per dart: points ÷ darts thrown.',
  },
  f9: {
    name: 'First 9',
    ja: '最初の 3 ラウンド（9 本）の 3DA。',
    en: '3DA over the first three rounds (nine darts).',
  },
  mpr: {
    name: 'MPR',
    ja: '1 ラウンドあたりの平均マーク数。全員が閉じた数字への余分なヒットは数えない。',
    en: 'Average marks per round. Extra hits on numbers everyone has closed do not count.',
  },
};

const BY_GAME: Record<CalculatorId, { terms: (keyof typeof TERMS)[]; note?: { ja: string; en: string } }> = {
  '01': {
    terms: ['3da', 'ppd', 'f9'],
    note: {
      ja: '入力しなかったダーツはミス（0 点）として数えます。バーストしたラウンドは 3 本・0 点です。',
      en: 'Darts left unentered count as misses (0 points). A bust round counts as three darts and 0 points.',
    },
  },
  countup: {
    terms: ['3da', 'ppd'],
    note: {
      ja: '入力しなかったダーツはミス（0 点）として数えます。',
      en: 'Darts left unentered count as misses (0 points).',
    },
  },
  cricket: { terms: ['mpr'] },
};

// 終了画面のカードの下部に置く、そのゲームで出すスタッツの定義。
export default function StatsNote({ game }: { game: CalculatorId }): JSX.Element {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const en = currentLocale === 'en';
  const { terms, note } = BY_GAME[game];
  return (
    <div
      style={{
        marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--ifm-color-emphasis-200)',
        textAlign: 'left', fontSize: 11, lineHeight: 1.5, color: 'var(--ifm-color-emphasis-600)',
      }}
    >
      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 8, rowGap: 2, margin: 0 }}>
        {terms.map((k) => (
          <React.Fragment key={k}>
            <dt style={{ fontWeight: 400, whiteSpace: 'nowrap', margin: 0 }}>{TERMS[k].name}</dt>
            <dd style={{ margin: 0 }}>{en ? TERMS[k].en : TERMS[k].ja}</dd>
          </React.Fragment>
        ))}
      </dl>
      {note && <p style={{ margin: '4px 0 0' }}>{en ? note.en : note.ja}</p>}
    </div>
  );
}
