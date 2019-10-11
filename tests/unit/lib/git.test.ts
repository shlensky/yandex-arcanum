import { expect } from 'chai';
import { stub } from 'sinon';
import child from 'child_process';
import 'mocha';

const execStub = stub(child, 'exec');
import { getTree } from 'server/lib/git';

describe('Обёртка над git', () => {
    describe('Метод getTree', () => {
        it('возвращает пустой массив когда git вернул пустую строку', async () => {
            execStub.reset();
            execStub.yields(null, { stdout: '' });

            const treeItems = await getTree('repo', 'master', 'src');
            expect(treeItems).to.eql([]);
        });

        it('корректно формирует список файлов', async () => {
            execStub.reset();
            execStub
                .onFirstCall()
                .yields(null, { stdout: '100644 blob 32df50c580da866996af14a548dd780a098810c9     512\tReadme.md' });

            execStub.onSecondCall().yields(null, {
                stdout: ['93b68f9', 'Commit Message', 'Dmitry Shlensky', '1570210581'].join('\n'),
            });

            const treeItems = await getTree('repo', 'master', 'src');
            expect(treeItems).to.eql([
                {
                    committer: 'Dmitry Shlensky',
                    hash: '32df50c580da866996af14a548dd780a098810c9',
                    lastCommit: '93b68f9',
                    lastMessage: 'Commit Message',
                    mode: '100644',
                    name: 'Readme.md',
                    size: '512',
                    type: 'blob',
                    updated: '2019-10-04T17:36:21.000Z',
                },
            ]);
        });
    });
});
