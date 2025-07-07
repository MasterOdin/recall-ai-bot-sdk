import type {
  CreateBotRequest,
  CreateBotResponse,
  ListBotsRequest,
  ListBotsResponse,
} from './types/api.js';

interface RecallAiOptions {
  apiKey?: string;
  apiUrl?: string;
  region?: string;
}

export class RecallAi {
  private apiKey: string;
  private apiUrl: string;

  constructor(options: RecallAiOptions) {
    const apiKey = options.apiKey || process.env['RECALL_AI_API_KEY'];
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
    if (options.region) {
      this.apiUrl = `https://${options.region}.recall.ai/api/v1`;
    } else if (options.apiUrl) {
      this.apiUrl = options.apiUrl;
    } else {
      throw new Error('Either region or apiUrl must be provided');
    }
  }

  async listBots(options: ListBotsRequest = {}): Promise<ListBotsResponse> {
    const url = new URL(`${this.apiUrl}/bot`);
    url.search = new URLSearchParams(
      options as Record<string, string>,
    ).toString();
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${this.apiKey}`,
      },
    });
    return response.json() as Promise<ListBotsResponse>;
  }

  async createBot(options: CreateBotRequest): Promise<CreateBotResponse> {
    const makeRequest = async (): Promise<CreateBotResponse> => {
      const response = await fetch(`${this.apiUrl}/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.apiKey}`,
        },
        body: JSON.stringify(options),
      });

      if (response.status === 507) {
        throw new Error('RETRY_NEEDED');
      }

      if (response.status === 201) {
        return (await response.json()) as CreateBotResponse;
      }

      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`,
      );
    };

    try {
      return await makeRequest();
    } catch (error) {
      if (error instanceof Error && error.message === 'RETRY_NEEDED') {
        return this.createBot(options);
      }
      throw error;
    }
  }
}
