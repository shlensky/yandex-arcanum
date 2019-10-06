import * as React from 'react';
import { cn } from '@bem-react/classname';

import 'components/FileIcon/FileIcon.scss';
import FolderIcon from 'components/FileIcon/icons/folder.svg';
import TextFileIcon from 'components/FileIcon/icons/text_file.svg';

const cnFileIcon = cn('FileIcon');

export interface DateTimeProps {
    type: string;
    className?: string;
}

export function FileIcon({ type, className }: DateTimeProps) {
    switch (type) {
        case 'tree':
            return <FolderIcon className={cnFileIcon(null, [className])} />;

        case 'blob':
            return <TextFileIcon className={cnFileIcon(null, [className])} />;

        default:
            return null;
    }
}
