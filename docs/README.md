# Documentation i18n System

This directory contains the internationalization (i18n) system for generating README files.

## Structure

- `_data/i18n/locales.yml` - Defines available languages
- `_data/i18n/{locale}.yml` - Language-specific content for each locale
- `README files are generated using `scripts/generate-readme.js`

## Usage

To regenerate README files after updating translations:

```bash
npm run generate-readme
```

Or directly:

```bash
node scripts/generate-readme.js
```

This will generate:
- `README.md` (English)
- `README_zh_CN.md` (Chinese)
- Additional language variants as defined in `locales.yml`

## Adding New Languages

1. Add the language to `_data/i18n/locales.yml`
2. Create a new YAML file `_data/i18n/{locale-code}.yml` with translations
3. Run the generate script to create the corresponding README file