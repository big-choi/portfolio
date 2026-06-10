import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { TroubleshootingCase } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'troubleshooting');

export function getTroubleshooting(slug: string): TroubleshootingCase[] {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!existsSync(filePath)) {
    return [];
  }

  const raw = readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  return raw
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const newlineIndex = section.indexOf('\n');
      const title = section.slice(0, newlineIndex).trim();
      const body = section
        .slice(newlineIndex + 1)
        .replace(/\n*---\s*$/, '')
        .trim();

      return { title, body };
    })
    .filter((item) => item.title.length > 0 && item.body.length > 0);
}
