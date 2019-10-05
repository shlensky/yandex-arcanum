import * as React from 'react';

export interface DateTimeProps {
    date: Date;
}

export function DateTime({ date }: DateTimeProps) {
    return <>{date.toISOString()}</>;
}
