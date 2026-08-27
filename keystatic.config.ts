import { config } from '@keystatic/core';

// Skeleton mount only — collections land in PBI-005/PBI-006.
// Storage: local in dev, github in prod (switch via env in later PBI-008).
// See specs/foundation/spec.md and specs/content-model/spec.md
export default config({
  storage: {
    kind: 'local',
  },
  collections: {},
});
