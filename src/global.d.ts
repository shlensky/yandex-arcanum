declare type Optional<T = any> = T | undefined;

declare namespace Express {
    export interface Request {
        state: import('server/schema/ExpressState').ExpressState;
    }
}

declare module '*.svg' {
    const url: string;
    export default url;
}

declare module '*.png' {
    const url: string;
    export default url;
}
