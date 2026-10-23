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

export const SPECIES = { dog: 'Dog', cat: 'Cat' };

// A step applies to a species unless it lists other species only.
export const stepFor = (step, species) => !step.species || step.species.includes(species);

// The route as it applies to one species: cat overrides merged in, steps filtered.
export function routeFor(key, species = 'dog') {
  const base = RULES.routes[key];
  const { cat, ...route } = base;
  const merged = species === 'cat' && cat ? { ...route, ...cat } : route;
  return { ...merged, steps: base.steps.filter((s) => stepFor(s, species)) };
}

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
