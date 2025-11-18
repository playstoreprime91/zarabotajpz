const express = require('express');
res.json(rows);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'internal_error' });
}
});


// GET /entities/:id
router.get('/:id', async (req, res) => {
const id = Number(req.params.id);
if (!id) return res.status(400).json({ error: 'id must be a positive integer' });
try {
const row = await get('SELECT * FROM entities WHERE id = ?', [id]);
if (!row) return res.status(404).json({ error: 'not_found' });
res.json(row);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'internal_error' });
}
});


// POST /entities
router.post('/', async (req, res) => {
const body = req.body || {};
const errors = validatePayload(body);
if (errors.length) return res.status(400).json({ error: 'validation_failed', details: errors });


const created_at = new Date().toISOString();
try {
const r = await run('INSERT INTO entities (title, description, amount, created_at) VALUES (?, ?, ?, ?)', [body.title.trim(), body.description || null, Number(body.amount), created_at]);
const id = r.lastID;
const created = await get('SELECT * FROM entities WHERE id = ?', [id]);
res.status(201).json(created);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'internal_error' });
}
});


// PUT /entities/:id
router.put('/:id', async (req, res) => {
const id = Number(req.params.id);
if (!id) return res.status(400).json({ error: 'id must be a positive integer' });


const body = req.body || {};
const errors = validatePayload(body);
if (errors.length) return res.status(400).json({ error: 'validation_failed', details: errors });


try {
const exists = await get('SELECT id FROM entities WHERE id = ?', [id]);
if (!exists) return res.status(404).json({ error: 'not_found' });


await run('UPDATE entities SET title = ?, description = ?, amount = ? WHERE id = ?', [body.title.trim(), body.description || null, Number(body.amount), id]);
const updated = await get('SELECT * FROM entities WHERE id = ?', [id]);
res.json(updated);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'internal_error' });
}
});


// DELETE /entities/:id
router.delete('/:id', async (req, res) => {
const id = Number(req.params.id);
if (!id) return res.status(400).json({ error: 'id must be a positive integer' });
try {
const exists = await get('SELECT id FROM entities WHERE id = ?', [id]);
if (!exists) return res.status(404).json({ error: 'not_found' });
await run('DELETE FROM entities WHERE id = ?', [id]);
res.status(204).send();
} catch (e) {
console.error(e);
res.status(500).json({ error: 'internal_error' });
}
});


module.exports = router;
