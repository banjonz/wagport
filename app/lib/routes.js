import RULES from '../../data/rules.json';

export { RULES };

// Routes we actively launch with. Everything else is a preview route.
export const LAUNCH = ['GB', 'EU', 'FR', 'AU', 'NZ'];

// URL slug for each route key.
export const SLUGS = {
  GB: 'uk',
  EU: 'eu',
  FR: 'france',
  AU: 'australia',
  NZ: 'new-zealand',
  US: 'usa',
  CA: 'canada',
  RU: 'russia',
};

export const keyFromSlug = (slug) =>
  Object.keys(SLUGS).find((k) => SLUGS[k] === slug);

export const routeName = (key) =>
  key === 'EU' ? 'the European Union' : RULES.routes[key].name;

export const isLaunch = (key) => LAUNCH.includes(key);

// Describe a step's window relative to travel day, without a date.
export function relWindow(step) {
  const w = step.window;
  if (!w) return step.rule ? 'Do first' : 'Before travel';
  const { from, to } = w;
  if (from !== undefined && to !== undefined) {
    if (from === to) return to === 0 ? 'Travel day' : `${-to} days before`;
    return `${-to}–${-from} days before`;
  }
  if (to !== undefined) return `At least ${-to} days before`;
  return 'Before travel';
}
