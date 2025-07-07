# Recall.ai Bot SDK

A TypeScript SDK for building with [Recall.ai](https://www.recall.ai/) bots.

## Installation

```bash
npm install @masterodin/recall-ai-bot-sdk
```

## Basic Usage

```typescript
import { RecallAi } from '@masterodin/recall-ai-bot-sdk';

const client = new RecallAi({
  apiKey: '...', // can omit and get value from process.env.RECALL_AI_API_KEY
  region: 'us-east-1'
});

await client.listBots();
```
