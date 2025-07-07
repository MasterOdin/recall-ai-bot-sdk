export interface Participant {
  id: number;
  name: string | null;
  is_host: boolean;
  platform: string | null;
  extra_data: Record<string, unknown>;
}

export interface Timestamp {
  absolute: string;
  relative: number;
}

export interface RealtimeEndpoint {
  id: string;
  metadata: Record<string, unknown>;
}

export interface EventData<T> {
  data: T;
  realtime_endpoint: RealtimeEndpoint;
  recording: Recording;
  bot?: Bot;
}

export interface Recording {
  id: string;
  metadata: Record<string, unknown>;
}

export interface Bot {
  id: string;
  metadata: Record<string, unknown>;
}

export interface ParticipantEvents {
  id: string;
  metadata: Record<string, unknown>;
}

export interface Transcript {
  id: string;
  metadata: Record<string, unknown>;
}

export interface ChatMessageData {
  text: string;
  to?: string;
}

export interface ParticipantEventData {
  participant: Participant;
  timestamp: Timestamp;
  data?: ChatMessageData | null;
}

export interface ParticipantChatMessagePayload {
  event: 'participant_events.chat_message';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantJoinPayload {
  event: 'participant_events.join';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantLeavePayload {
  event: 'participant_events.leave';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantSpeechOnPayload {
  event: 'participant_events.speech_on';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantSpeechOffPayload {
  event: 'participant_events.speech_off';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantUpdatePayload {
  event: 'participant_events.update';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantWebcamOnPayload {
  event: 'participant_events.webcam_on';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantWebcamOffPayload {
  event: 'participant_events.webcam_off';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantScreenshareOnPayload {
  event: 'participant_events.screenshare_on';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface ParticipantScreenshareOffPayload {
  event: 'participant_events.screenshare_off';
  data: EventData<ParticipantEventData> & {
    participant_events: ParticipantEvents;
  };
}

export interface TranscriptWord {
  text: string;
  start_timestamp: { absolute: string; relative: number };
  end_timestamp: { absolute: string; relative: number } | null;
}

export interface TranscriptData {
  words: TranscriptWord[];
  participant: Participant;
}

export interface TranscriptDataPayload {
  event: 'transcript.data';
  data: EventData<TranscriptData> & {
    transcript: Transcript;
  };
}

export interface TranscriptPartialDataPayload {
  event: 'transcript.partial_data';
  data: EventData<TranscriptData> & {
    transcript: Transcript;
  };
}

interface MediaData {
  buffer: string;
  timestamp: { absolute: string; relative: number };
}

export interface AudioMixedRawDataPayload {
  evenet: 'audio_mixed_raw.data';
  data: EventData<MediaData> & {
    audio_mixed: {
      id: string;
      metadata: Record<string, unknown>;
    };
  };
}

export interface AudioSeparateRawDataPayload {
  event: 'audio_separate_raw.data';
  data: EventData<MediaData & { participant: Participant }> & {
    audio_separate: {
      id: string;
      metadata: Record<string, unknown>;
    };
  };
}

export interface VideoSeparatePngDataPayload {
  event: 'video_separate_png.data';
  data: EventData<
    MediaData & { type: 'webcam' | 'screenshare'; participant: Participant }
  > & {
    video_separate: {
      id: string;
      metadata: Record<string, unknown>;
    };
  };
}

export type EventPayload =
  | ParticipantChatMessagePayload
  | ParticipantJoinPayload
  | ParticipantLeavePayload
  | ParticipantSpeechOnPayload
  | ParticipantSpeechOffPayload
  | ParticipantUpdatePayload
  | ParticipantWebcamOnPayload
  | ParticipantWebcamOffPayload
  | ParticipantScreenshareOnPayload
  | ParticipantScreenshareOffPayload
  | TranscriptDataPayload
  | TranscriptPartialDataPayload
  | AudioMixedRawDataPayload
  | AudioSeparateRawDataPayload
  | VideoSeparatePngDataPayload;

export type RealTimeEventTypes = Extract<
  EventPayload,
  { event: string }
>['event'];
