import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { Dropdown } from 'components/Dropdown/Dropdown';

import 'components/Header/Header.scss';
import 'styles/Navigation.scss';
import Logo from 'components/Header/logo.svg';

const cnHeader = cn('Header');

export interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = function Header({ className }: HeaderProps) {
    const params = useSelector((state: AppState) => state.router && state.router.params);
    const repos = useSelector((state: AppState) => state.repos);

    const selectedRepo = params && params.repositoryId ? params.repositoryId : '';

    return (
        <header className={cnHeader(null, ['Navigation', className])}>
            <Link to="/">
                <Logo className={cnHeader('Logo')} />
            </Link>

            <Dropdown label={`Repository ${selectedRepo}`} className="Navigation-Item Navigation-Item_current">
                <div className="Dropdown-Content Dropdown-Menu Navigation-DropdownContent Scroll">
                    {repos.map(repo => (
                        <Link to={repo.name} className="Dropdown-MenuItem" key={repo.name}>
                            {repo.name}
                        </Link>
                    ))}
                </div>
            </Dropdown>
        </header>
    );
};
