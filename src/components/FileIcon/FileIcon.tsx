import * as React from 'react';
import { cn } from '@bem-react/classname';

import 'components/FileIcon/FileIcon.scss';
import folderIcon from 'components/FileIcon/icons/folder.svg';
import textFileIcon from 'components/FileIcon/icons/text_file.svg';

const cnFileIcon = cn('FileIcon');

export interface DateTimeProps {
    type: string;
    className?: string;
}

export function FileIcon({ type, className }: DateTimeProps) {
    switch (type) {
        case 'tree':
            return <img src={folderIcon} className={cnFileIcon(null, [className])} alt="folder" />;

        case 'blob':
            return <img src={textFileIcon} className={cnFileIcon(null, [className])} alt="file" />;

        default:
            return null;
    }
}
