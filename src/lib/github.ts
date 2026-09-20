export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionData = {
  username: string;
  total: number;
  activeDays: number;
  longestStreak: number;
  busiestDay: number;
  days: ContributionDay[];
};

export const GITHUB_USER = 'ekkerihasan';

/**
 * GitHub's REST API does not expose the contribution calendar — only the
 * authenticated GraphQL API does. This proxy serves the same data without a
 * token. If it ever disappears, swap this for a GraphQL call using a
 * server-only GITHUB_TOKEN; the returned shape is what the rest of the file
 * depends on, so nothing else needs to change.
 */
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

type RawResponse = {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
};

export async function getContributions(): Promise<ContributionData | null> {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const raw: RawResponse = await res.json();
    const days = raw.contributions;
    if (!Array.isArray(days) || days.length === 0) return null;

    let longestStreak = 0;
    let running = 0;
    let activeDays = 0;
    let busiestDay = 0;
    let total = 0;

    for (const day of days) {
      total += day.count;
      if (day.count > 0) {
        activeDays += 1;
        running += 1;
        if (running > longestStreak) longestStreak = running;
        if (day.count > busiestDay) busiestDay = day.count;
      } else {
        running = 0;
      }
    }

    return {
      username: GITHUB_USER,
      total,
      activeDays,
      longestStreak,
      busiestDay,
      days,
    };
  } catch {
    return null;
  }
}

/**
 * Groups days into calendar columns of seven, padding the first column so the
 * first date lands on its real weekday (0 = Sunday, matching GitHub).
 */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [
    ...Array<null>(offset).fill(null),
    ...days,
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * A label for each week column, emitted where the month changes. A label whose
 * successor is fewer than MIN_GAP columns away is dropped, otherwise the two
 * collide — the calendar starts mid-month, so the leading partial month would
 * otherwise print straight into the next one ("SEPOCT").
 */
const MIN_GAP = 3;

export function monthLabels(
  weeks: (ContributionDay | null)[][],
): (string | null)[] {
  const marks: { index: number; month: number }[] = [];
  let previous = -1;

  weeks.forEach((week, index) => {
    const first = week.find((day): day is ContributionDay => day !== null);
    if (!first) return;
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month === previous) return;
    previous = month;
    marks.push({ index, month });
  });

  const labels: (string | null)[] = weeks.map(() => null);
  marks.forEach((mark, i) => {
    const next = marks[i + 1];
    if (next && next.index - mark.index < MIN_GAP) return;
    labels[mark.index] = MONTHS[mark.month];
  });
  return labels;
}

export function formatFullDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
