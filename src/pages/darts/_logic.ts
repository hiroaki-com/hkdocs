// 01 / Count-Up 計算機で共有する得点ロジックと、全計算機で共有するディープクローン

// 投擲の得点を算出する。Bullは bullType(1=シングルBull50点)と mult に応じて 50/25 点。
export function ptsFor(num: number | 'B', mult: number, bullType: number): number {
  if (num === 'B') return bullType === 1 || mult === 2 ? 50 : 25;
  return (num as number) * mult;
}

// 投擲の表示ラベル(例: T20, D-Bull)を返す。
export function labelFor(num: number | 'B', mult: number): string {
  if (num === 'B') return mult === 2 ? 'D-Bull' : 'Bull';
  if (mult === 2) return 'D' + num;
  if (mult === 3) return 'T' + num;
  return String(num);
}

// ゲーム状態のディープクローン(履歴保存・不変更新のため)。
export function deepClone<T>(g: T): T {
  return JSON.parse(JSON.stringify(g));
}
