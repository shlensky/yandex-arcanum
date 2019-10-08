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
    const containerRef = React.useRef(null);

    function outsideClickHandler(e: MouseEvent) {
        if (opened && (e.target as HTMLElement).parentNode !== containerRef.current) {
            setOpened(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', outsideClickHandler);
        return () => document.removeEventListener('click', outsideClickHandler);
    });

    return (
        <div
            onClick={() => setOpened(!opened)}
            className={cnDropdown({ state: opened ? 'opened' : '' }, [className])}
            ref={containerRef}
        >
            {label && <div className="Dropdown-Label">{label}</div>}
            {children}
        </div>
    );
};
