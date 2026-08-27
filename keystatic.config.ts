import { config, fields, collection } from '@keystatic/core';

// Storage: local dev, github prod (switch via env in later PBI-008)
// Collections: labs, research, experiments, projects — PBI-005
// Remaining: articles, people, organizations, opensource, roadmap land in PBI-006
export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    labs: collection({
      label: 'Labs',
      slugField: 'title',
      path: 'src/content/labs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({ label: 'Short Description', validation: { isRequired: true } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Exploring', value: 'exploring' },
            { label: 'Paused', value: 'paused' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        }),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        publishedAt: fields.datetime({ label: 'Published At' }),
        updatedAt: fields.datetime({ label: 'Updated At' }),
        content: fields.markdoc({ label: 'Content' }),
        // Relationships (PBI-005 subset; articles/people/orgs deferred to PBI-006)
        research: fields.array(fields.relationship({ label: 'Research', collection: 'research' }), {
          label: 'Research',
          itemLabel: (props) => props.value ?? 'Research',
        }),
        experiments: fields.array(fields.relationship({ label: 'Experiments', collection: 'experiments' }), {
          label: 'Experiments',
          itemLabel: (props) => props.value ?? 'Experiment',
        }),
        projects: fields.array(fields.relationship({ label: 'Projects', collection: 'projects' }), {
          label: 'Projects',
          itemLabel: (props) => props.value ?? 'Project',
        }),
        technologies: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Technologies',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        priority: fields.integer({ label: 'Priority' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        socialImage: fields.image({ label: 'Social Image', directory: 'src/assets/labs', publicPath: '../../assets/labs/' }),
        socialImageAlt: fields.text({ label: 'Social Image Alt' }),
      },
    }),
    research: collection({
      label: 'Research',
      slugField: 'title',
      path: 'src/content/research/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({ label: 'Short Description', validation: { isRequired: true } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Active', value: 'active' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        }),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        publishedAt: fields.datetime({ label: 'Published At' }),
        updatedAt: fields.datetime({ label: 'Updated At' }),
        content: fields.markdoc({ label: 'Content' }),
        lab: fields.relationship({ label: 'Lab', collection: 'labs' }),
        experiments: fields.array(fields.relationship({ label: 'Experiments', collection: 'experiments' }), {
          label: 'Experiments',
          itemLabel: (props) => props.value ?? 'Experiment',
        }),
        projects: fields.array(fields.relationship({ label: 'Projects', collection: 'projects' }), {
          label: 'Projects',
          itemLabel: (props) => props.value ?? 'Project',
        }),
        // Research question / hypothesis / methodology / findings / conclusion stored in content + dedicated fields for discoverability
        question: fields.text({ label: 'Research Question', multiline: true }),
        hypothesis: fields.text({ label: 'Hypothesis', multiline: true }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        priority: fields.integer({ label: 'Priority' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        socialImage: fields.image({ label: 'Social Image', directory: 'src/assets/research', publicPath: '../../assets/research/' }),
        socialImageAlt: fields.text({ label: 'Social Image Alt' }),
      },
    }),
    experiments: collection({
      label: 'Experiments',
      slugField: 'title',
      path: 'src/content/experiments/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({ label: 'Short Description', validation: { isRequired: true } }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Active', value: 'active' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        }),
        outcome: fields.select({
          label: 'Outcome',
          options: [
            { label: 'Validated', value: 'VALIDATED' },
            { label: 'Inconclusive', value: 'INCONCLUSIVE' },
            { label: 'Failed', value: 'FAILED' },
            { label: 'Partial', value: 'PARTIAL' },
          ],
          defaultValue: 'INCONCLUSIVE',
        }),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        publishedAt: fields.datetime({ label: 'Published At' }),
        updatedAt: fields.datetime({ label: 'Updated At' }),
        content: fields.markdoc({ label: 'Content' }),
        lab: fields.relationship({ label: 'Lab', collection: 'labs' }),
        research: fields.array(fields.relationship({ label: 'Research', collection: 'research' }), {
          label: 'Research',
          itemLabel: (props) => props.value ?? 'Research',
        }),
        project: fields.relationship({ label: 'Project', collection: 'projects' }),
        objective: fields.text({ label: 'Objective', multiline: true }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        priority: fields.integer({ label: 'Priority' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        socialImage: fields.image({ label: 'Social Image', directory: 'src/assets/experiments', publicPath: '../../assets/experiments/' }),
        socialImageAlt: fields.text({ label: 'Social Image Alt' }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({ label: 'Short Description', validation: { isRequired: true } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Internal', value: 'Internal' },
            { label: 'Client', value: 'Client' },
            { label: 'Startup', value: 'Startup' },
            { label: 'Collaboration', value: 'Collaboration' },
            { label: 'Open Source', value: 'Open Source' },
            { label: 'Research', value: 'Research' },
          ],
          defaultValue: 'Internal',
        }),
        stage: fields.select({
          label: 'Stage',
          options: [
            { label: 'Idea', value: 'Idea' },
            { label: 'Validating', value: 'Validating' },
            { label: 'Validated', value: 'Validated' },
            { label: 'Implementation', value: 'Implementation' },
            { label: 'Live', value: 'Live' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Spun Out', value: 'Spun Out' },
            { label: 'Archived', value: 'Archived' },
          ],
          defaultValue: 'Idea',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Active', value: 'active' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        }),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        publishedAt: fields.datetime({ label: 'Published At' }),
        updatedAt: fields.datetime({ label: 'Updated At' }),
        content: fields.markdoc({ label: 'Content' }),
        originLab: fields.relationship({ label: 'Origin Lab', collection: 'labs' }),
        research: fields.array(fields.relationship({ label: 'Research', collection: 'research' }), {
          label: 'Research',
          itemLabel: (props) => props.value ?? 'Research',
        }),
        experiments: fields.array(fields.relationship({ label: 'Experiments', collection: 'experiments' }), {
          label: 'Experiments',
          itemLabel: (props) => props.value ?? 'Experiment',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        priority: fields.integer({ label: 'Priority' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        seoDescription: fields.text({ label: 'SEO Description', multiline: true }),
        socialImage: fields.image({ label: 'Social Image', directory: 'src/assets/projects', publicPath: '../../assets/projects/' }),
        socialImageAlt: fields.text({ label: 'Social Image Alt' }),
      },
    }),
  },
});
