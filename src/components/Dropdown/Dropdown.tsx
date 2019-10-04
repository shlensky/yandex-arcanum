import * as React from 'react';

import { cn } from '@bem-react/classname';

import 'components/Dropdown/Dropdown.scss';

const cnDropdown = cn('Dropdown');

export interface DropdownProps {
    label?: string;
    className?: string;
    children: any;
}

export const Dropdown: React.FC<DropdownProps> = function Dropdown({ label, children, className }: DropdownProps) {
    const [opened, setOpened] = React.useState();

    return (
        <div onClick={() => setOpened(!opened)} className={cnDropdown({ state: opened ? 'opened' : '' }, [className])}>
            {label && <div className="Dropdown-Label">{label}</div>}
            {children}
        </div>
    );
};
