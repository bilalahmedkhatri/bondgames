import { INITIAL_POLL } from './seed-data';
import { runNeonQuery } from './neon';

let pollState = { ...INITIAL_POLL };

export async function getPoll() {
  const neonVotes = await runNeonQuery<any>(
    'SELECT option_id, COUNT(*) as count FROM poll_votes GROUP BY option_id'
  );

  if (neonVotes && neonVotes.length > 0) {
    let total = 0;
    const voteMap: Record<string, number> = {};
    for (const row of neonVotes) {
      const c = Number(row.count);
      voteMap[row.option_id] = c;
      total += c;
    }

    if (total > 0) {
      pollState.totalVotes = total;
      pollState.options = pollState.options.map(opt => {
        const v = voteMap[opt.id] || opt.votes;
        return {
          ...opt,
          votes: v,
          percent: Math.round((v / total) * 100)
        };
      });
    }
  }

  return pollState;
}

export async function recordVote(optionId: string): Promise<typeof pollState> {
  await runNeonQuery(
    'INSERT INTO poll_votes (poll_id, option_id) VALUES ($1, $2)',
    ['anticipated-2026', optionId]
  );

  const opt = pollState.options.find(o => o.id === optionId);
  if (opt) {
    opt.votes += 1;
    pollState.totalVotes += 1;
    pollState.options = pollState.options.map(o => ({
      ...o,
      percent: Math.round((o.votes / pollState.totalVotes) * 100)
    }));
  }

  return pollState;
}
