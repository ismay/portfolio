# Superwolff

> Portfolio website

## Environment variables

### Used client-side and server-side

- `NEXT_PUBLIC_API_MOCKING`: set to either `enabled` or `disabled`.

### Used server-side only

- `API_TOKEN`: the Graphcms token.
- `API_URL`: the Graphcms url.

### Affects the build

- `ANALYZE_BUNDLE`: set this to `enabled` to analyze the client and server bundles. Referenced in `next.config.js`.

### Used only in workflows

- `CHROMATIC_PROJECT_TOKEN`
- `GITHUB_TOKEN`
- `PERCY_TOKEN`
- `RELATIVE_CI_KEY`
- `VERCEL_TOKEN`

## Browserstack

Percy visual regression testing courtesy of [Browserstack](https://www.browserstack.com/open-source)
