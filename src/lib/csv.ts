// CSVフィールド内のカンマ・改行・ダブルクォートをRFC 4180に沿ってエスケープする
export function escapeCsvField(field: string): string {
  if (/[",\n]/.test(field)) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

// header/rowsからCSVを組み立て、BOM付きUTF-8としてブラウザにダウンロードさせる
export function downloadCsv(filename: string, header: string, rows: string[]): void {
  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([String.fromCharCode(0xfeff) + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
