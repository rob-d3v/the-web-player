/** Validate cursor IDs without rounding PostgreSQL bigint values in JavaScript. */
export function inboxBatch(data, after = '0') {
  if (!data || !Array.isArray(data.messages)) throw new Error('invalid_inbox');
  const seen = new Set();
  let cursor = BigInt(after);
  const messages = [];
  for (const item of data.messages) {
    const id = String(item?.id ?? '');
    if (!/^[0-9]{1,19}$/.test(id) || BigInt(id) <= BigInt(after) || seen.has(id)) continue;
    if (item.role !== 'assistant' || typeof item.content !== 'string' || !item.content.trim()) continue;
    seen.add(id);
    if (BigInt(id) > cursor) cursor = BigInt(id);
    messages.push({ id: `human-${id}`, role: 'assistant', authorType: 'human', content: item.content,
      timestamp: item.created_at, raw: item });
  }
  return { messages, cursor: String(cursor), paused: data.paused === true };
}
