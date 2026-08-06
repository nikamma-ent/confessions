import { sql } from '@vercel/postgres';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const VALID_WORDS = ['love', 'pride', 'survival', 'childhood', 'nothing'];

function setCors(res) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
    setCors(res);

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method === 'GET') {
        const { rows } = await sql`
            SELECT id, text, word, created_at
            FROM confessions
            ORDER BY created_at DESC
            LIMIT 200
        `;
        const { rows: countRows } = await sql`SELECT COUNT(*)::int AS count FROM confessions`;
        res.status(200).json({ data: rows, count: countRows[0].count });
        return;
    }

    if (req.method === 'POST') {
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch {
                res.status(400).json({ error: 'invalid JSON' });
                return;
            }
        }

        const text = typeof body?.text === 'string' ? body.text.trim() : '';
        const word = VALID_WORDS.includes(body?.word) ? body.word : null;

        if (!text || text.length > 200) {
            res.status(400).json({ error: 'text must be 1-200 characters' });
            return;
        }

        const { rows } = await sql`
            INSERT INTO confessions (text, word)
            VALUES (${text}, ${word})
            RETURNING id, text, word, created_at
        `;
        res.status(201).json({ data: rows[0] });
        return;
    }

    res.status(405).json({ error: 'method not allowed' });
}
