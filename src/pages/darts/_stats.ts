// 一般的なスタッツ(3DA・PPD・First 9・MPR)の表記。全計算機で共有する。
// 3DA(3-dart average)= 得点 / 本数 × 3。PPD = 得点 / 本数。

// 39.995 が 39.99499… と表現される浮動小数点の誤差を吸収してから、四捨五入する。
function roundHalfUp(v: number, digits: number): string {
  const k = 10 ** digits;
  return (Math.round(v * k + 1e-7) / k).toFixed(digits);
}

// プレイ中のスコア欄の AVG(小数第 1 位)。
export function fmt1(v: number): string {
  return roundHalfUp(v, 1);
}

export function fmt2(v: number): string {
  return roundHalfUp(v, 2);
}

export function threeDartAvgLabel(scored: number, thrown: number): string {
  return thrown < 1 ? '3DA —' : '3DA ' + fmt2((scored / thrown) * 3);
}

export function ppdLabel(scored: number, thrown: number): string {
  return thrown < 1 ? 'PPD —' : 'PPD ' + fmt2(scored / thrown);
}

// 最初の 3 ラウンド(9 本)の 3DA。9 本に届く前に終わったときは、投げた本数で計算する。
export function first9Label(scored: number, thrown: number): string {
  return thrown < 1 ? 'First 9 —' : 'First 9 ' + fmt2((scored / thrown) * 3);
}

export function mprLabel(marks: number, rounds: number): string {
  return rounds < 1 ? 'MPR —' : 'MPR ' + fmt2(marks / rounds);
}

// 「プレイヤーチェンジ」の時点で、入力しなかったダーツをミスとして数えるための不足本数。
export function unthrownDarts(dartsThisTurn: number): number {
  return Math.max(0, 3 - dartsThisTurn);
}
