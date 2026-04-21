import type { Side } from "./definitions.js";

export interface CoverpageStartup {
    elementId: string;
}

export interface CoverpageShutdown {
    elementId: string;
}

export interface CoverpageBeforeAnimation {
    elementId: string;
}

export interface CoverpageAfterAnimation {
    elementId: string;
}

export interface CoverpageProgress {
    elementId: string;
    t: number;
    travel: number;
    side: Side;
}

export enum CoverpageEvents {
    Startup = 'coverpage-startup',
    Shutdown = 'coverpage-shutdown',
    BeforeAnimation = 'coverpage-before-animation',
    AfterAnimation = 'coverpage-after-animation',
    Progress = 'coverpage-progress'
}

export interface CoverpageEventMap {
    [CoverpageEvents.Startup]: CoverpageStartup;
    [CoverpageEvents.Shutdown]: CoverpageShutdown;
    [CoverpageEvents.BeforeAnimation]: CoverpageBeforeAnimation;
    [CoverpageEvents.AfterAnimation]: CoverpageAfterAnimation;
    [CoverpageEvents.Progress]: CoverpageProgress;
}

declare global {
    interface WindowEventMap {
        [CoverpageEvents.Startup]: CustomEvent<CoverpageEventMap[CoverpageEvents.Startup]>;
        [CoverpageEvents.Shutdown]: CustomEvent<CoverpageEventMap[CoverpageEvents.Shutdown]>;
        [CoverpageEvents.BeforeAnimation]: CustomEvent<CoverpageEventMap[CoverpageEvents.BeforeAnimation]>
        [CoverpageEvents.AfterAnimation]: CustomEvent<CoverpageEventMap[CoverpageEvents.AfterAnimation]>
        [CoverpageEvents.Progress]: CustomEvent<CoverpageEventMap[CoverpageEvents.Progress]>
    }
}