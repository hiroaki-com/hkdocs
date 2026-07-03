import { useEffect } from 'react';

// JSON-LD構造化データを <head> に注入し、アンマウント時に取り除くフック。
export default function useJsonLdSchema(schema: Record<string, unknown> | null): void {
  useEffect(() => {
    if (!schema) return;

    const id = `json-ld-${schema['@type'] ?? 'custom'}`;
    const script = Object.assign(document.createElement('script'), {
      type: 'application/ld+json',
      id,
      innerHTML: JSON.stringify(schema),
    });

    document.head.appendChild(script);

    return () => document.getElementById(id)?.remove();
  }, [schema]);
}
