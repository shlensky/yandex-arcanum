import * as React from 'react';

import { cn } from '@bem-react/classname';

import { Link } from 'react-router-dom';

import 'components/Header/Header.scss';
import { Dropdown } from '../Dropdown/Dropdown';

import Logo from 'components/Header/logo.svg';

const cnHeader = cn('Header');

export interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = function Header({ className }: HeaderProps) {
    return (
        <header className={cnHeader(null, ['Navigation', className])}>
            <Link to="/">
                <Logo className={cnHeader('Logo')} />
            </Link>

            <Dropdown label="Repository Arc" className="Navigation-Item Navigation-Item_current">
                <div className="Dropdown-Content Dropdown-Menu Navigation-DropdownContent">
                    <div className="Dropdown-MenuItem">Arc</div>
                    <div className="Dropdown-MenuItem">My repository</div>
                    <div className="Dropdown-MenuItem">Devtools-team repository</div>
                </div>
            </Dropdown>
        </header>
    );
};
