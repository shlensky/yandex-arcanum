import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';

import 'components/Section/HomeSection/HomeSection.scss';

const cnHomeSection = cn('HomeSection');

export const HomeSection: React.FC<{}> = function NotFoundContent() {
    return (
        <div className={cnHomeSection(null, ['Layout-Container'])}>
            <p>To see repositoryContent, navigate to /repo-id.</p>
            <p>
                For example:&nbsp;
                <Link to="/yandex-arcanum" className="Link">
                    /yandex-arcanum
                </Link>
            </p>
        </div>
    );
};

export default HomeSection;
