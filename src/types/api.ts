import type { RealTimeEventTypes } from './events';

export interface ListBotsRequest {
  join_at_after?: string;
  join_at_before?: string;
  meeting_url?: string;
  page?: number;
  platform?:
    | 'zoom'
    | 'google_meet'
    | 'goto_meeting'
    | 'microsoft_teams'
    | 'microsoft_teams_live'
    | 'webex'
    | 'chime_sdk'
    | 'zoom_rtms'
    | 'slack_authenticator'
    | 'slack_huddle_observer';
  status?:
    | 'ready'
    | 'joining_call'
    | 'in_waiting_room'
    | 'in_call_not_recording'
    | 'recording_permission_allowed'
    | 'recording_permission_denied'
    | 'in_call_recording'
    | 'recording_done'
    | 'call_ended'
    | 'done'
    | 'fatal'
    | 'media_expired'
    | 'analysis_done'
    | 'analysis_failed';
}

export interface ListBotsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: string;
    bot_name: string;
    join_at: string | null;
    meeting_url:
      | string
      | {
          meeting_id: string;
          meeting_password: string | null;
          tk: string | null;
          zak: string | null;
          platform: string;
        };
  };
}

export interface CreateBotRequest {
  meeting_url: string;
  bot_name?: string;
  join_at?: string;
  recording_config?: {
    transcript?: {
      // TODO: document other providers
      provider: {
        meeting_captions: Record<string, never>;
      };
    };
  };
  realtime_endpoints?:
    | {
        type: 'rtmp';
        url: string;
        events: Array<'video_mixed_flv.data'>;
      }
    | {
        type: 'websocket' | 'webhook';
        url: string;
        events: RealTimeEventTypes[];
      }
    | {
        type: 'desktop_sdk_callback';
        events: RealTimeEventTypes[];
      }[];
  // TODO: document other parameters
}

export interface CreateBotResponse {
  id: string;
  meeting_url:
    | string
    | {
        meeting_id: string;
        meeting_password: string | null;
        tk: string | null;
        zak: string | null;
        platform: string;
      };
  bot_name: string;
  join_at: string | null;
}
