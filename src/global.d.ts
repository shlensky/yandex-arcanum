declare type Optional<T = any> = T | undefined;

declare namespace Express {
    export interface Request {
        state: import('server/schema/ExpressState').ExpressState;
    }
}

declare module '*.svg' {
    const content: any;
    export default content;
}
