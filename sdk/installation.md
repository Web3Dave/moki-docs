---
sidebar_position: 2
---

# Installation

This guide covers everything you need to install and set up the Moki SDK in your project.

## Package Installation

Install the Moki SDK using your preferred package manager:

```bash npm2yarn
npm install @moki-chat/core
```

## TypeScript Configuration

The SDK is built with TypeScript and includes full type definitions. For the best development experience, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    ...
  }
}
```
