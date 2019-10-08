import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store';

import 'components/Section/HomeSection/HomeSection.scss';

const cnHomeSection = cn('HomeSection');

export const HomeSection: React.FC<{}> = function NotFoundContent() {
    const repos = useSelector((state: AppState) => state.repos);

    return (
        <div className={cnHomeSection(null, ['Layout-Container'])}>
            <p>Please select repository:</p>
            <ul>
                {repos.map(repo => (
                    <li key={repo.name}>
                        <Link to={repo.name} className="Link">
                            {repo.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeSection;
