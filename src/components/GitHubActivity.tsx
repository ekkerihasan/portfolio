import { ArrowUpRight } from 'lucide-react';
import {
  formatFullDate,
  getContributions,
  GITHUB_USER,
  monthLabels,
  toWeeks,
} from '@/lib/github';
/** Empty cell, then four steps into the rust accent. */
const LEVEL_COLORS = [
  'rgba(21,23,26,0.07)',
  'rgba(168,64,26,0.28)',
  'rgba(168,64,26,0.50)',
  'rgba(168,64,26,0.75)',
  '#A8401A',
];
function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div>
      {' '}
      <p className="text-meta font-medium uppercase tracking-[0.2em] text-rust">
        {' '}
        {label}{' '}
      </p>{' '}
      <p className="mt-2 text-h3 leading-none text-basalt">
        {' '}
        <span className="font-semibold tabular-nums">{value}</span>{' '}
        {unit && (
          <span className="ml-1.5 text-small tracking-[0] text-stone">
            {' '}
            {unit}{' '}
          </span>
        )}{' '}
      </p>{' '}
    </div>
  );
}
export default async function GitHubActivity() {
  const data = await getContributions();
  return (
    <section
      id="github"
      className="section-padding relative isolate overflow-hidden bg-sand"
    >
      {' '}
      <div className="container-tight">
        {' '}
        <div className="flex flex-wrap items-end justify-between gap-4">
          {' '}
          <div>
            {' '}
            <div className="mb-5 flex items-center gap-4">
              {' '}
              <span className="h-px w-10 bg-rust/60" />{' '}
              <span className="text-meta font-medium uppercase tracking-[0.2em] text-rust">
                {' '}
                Activity{' '}
              </span>{' '}
            </div>{' '}
            <h2 className="text-h2 font-semibold text-basalt">
              {' '}
              GitHub activity.{' '}
            </h2>{' '}
          </div>{' '}
          <span className="text-meta uppercase tracking-[0.2em] text-stone">
            {' '}
            Last 12 months{' '}
          </span>{' '}
        </div>{' '}
        {data ? (
          <div className="mt-12 rounded-3xl border border-black/8 bg-white/45 p-6 sm:p-8">
            {' '}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {' '}
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-small uppercase tracking-[0.2em] text-basalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                {' '}
                @{GITHUB_USER}{' '}
                <ArrowUpRight
                  size={14}
                  className="text-stone transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />{' '}
              </a>{' '}
              <p className="text-small text-stone">
                {' '}
                <span className="font-semibold tabular-nums text-basalt">
                  {' '}
                  {data.total}{' '}
                </span>{' '}
                contributions in the last year{' '}
              </p>{' '}
            </div>{' '}
            <div className="mt-7 flex gap-3">
              {' '}
              {/* mt matches the month-label row (12px) + its margin (8px) so these sit on the same baseline as grid rows 2, 4 and 6. */}{' '}
              <div
                className="mt-[20px] grid shrink-0 grid-rows-7 gap-[3px] text-micro lowercase tracking-[0.2em] text-stone"
                aria-hidden="true"
              >
                {' '}
                <span className="h-[11px]" />{' '}
                <span className="h-[11px] leading-[11px]">mon</span>{' '}
                <span className="h-[11px]" />{' '}
                <span className="h-[11px] leading-[11px]">wed</span>{' '}
                <span className="h-[11px]" />{' '}
                <span className="h-[11px] leading-[11px]">fri</span>{' '}
                <span className="h-[11px]" />{' '}
              </div>{' '}
              <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
                {' '}
                <Calendar data={data} />{' '}
              </div>{' '}
            </div>{' '}
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-black/8 pt-7 sm:grid-cols-4">
              {' '}
              <Stat label="Contributions" value={String(data.total)} />{' '}
              <Stat
                label="Active days"
                value={String(data.activeDays)}
                unit={`/ ${data.days.length}`}
              />{' '}
              <Stat
                label="Longest streak"
                value={String(data.longestStreak)}
                unit="days"
              />{' '}
              <Stat
                label="Busiest day"
                value={String(data.busiestDay)}
                unit="in a day"
              />{' '}
            </div>{' '}
            <div className="mt-6 flex items-center justify-end gap-2 text-meta uppercase tracking-[0.2em] text-stone">
              {' '}
              Less{' '}
              {LEVEL_COLORS.map((color, level) => (
                <span
                  key={level}
                  className="h-[11px] w-[11px] rounded-[3px]"
                  style={{ backgroundColor: color }}
                />
              ))}{' '}
              More{' '}
            </div>{' '}
          </div>
        ) : (
          <p className="mt-12 max-w-xl border-l-2 border-rust/40 pl-5 text-body leading-7 text-stone">
            {' '}
            The contribution data did not load when this page was built.{' '}
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="text-basalt underline underline-offset-4"
            >
              {' '}
              The profile is here.{' '}
            </a>{' '}
          </p>
        )}{' '}
      </div>{' '}
    </section>
  );
}
function Calendar({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getContributions>>>;
}) {
  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks);
  return (
    <div className="inline-block min-w-max">
      {' '}
      <div
        className="mb-2 grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}
        aria-hidden="true"
      >
        {' '}
        {labels.map((label, i) => (
          <span
            key={i}
            className="h-3 whitespace-nowrap text-meta uppercase tracking-[0.2em] text-stone"
          >
            {' '}
            {label}{' '}
          </span>
        ))}{' '}
      </div>{' '}
      <div
        className="grid grid-flow-col grid-rows-7 gap-[3px]"
        role="img"
        aria-label={`GitHub contribution calendar: ${data.total} contributions over the last year, across ${data.activeDays} active days`}
      >
        {' '}
        {weeks
          .flat()
          .map((day, i) =>
            day ? (
              <span
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatFullDate(day.date)}`}
                className="h-[11px] w-[11px] rounded-[3px]"
                style={{ backgroundColor: LEVEL_COLORS[day.level] }}
              />
            ) : (
              <span key={`pad-${i}`} className="h-[11px] w-[11px]" />
            ),
          )}
      </div>
    </div>
  );
}
