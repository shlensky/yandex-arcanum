const expect = require('chai').expect;

describe('Страница списка файлов', function() {
    it('Отображает список файлов и директорий (верхний уровень)', function() {
        return this.browser
            .url('/first-repo')
            .getText('.FilesTable .Table-Data')
            .then(cells => {
                const [firstRow, secondRow] = [cells.slice(0, 5), cells.slice(5, 10)];

                expect(firstRow).to.eql([
                    'dir1',
                    'b668e90',
                    'Intial commit',
                    'Dmitry Shlensky',
                    '2019-10-08T09:19:14.000Z',
                ]);

                expect(secondRow).to.eql([
                    'first-file.txt',
                    'b668e90',
                    'Intial commit',
                    'Dmitry Shlensky',
                    '2019-10-08T09:19:14.000Z',
                ]);
            });
    });

    it('Отображает ссылку на родительскую директорию когда находимся внутри директории', function() {
        return this.browser
            .url('/first-repo/tree/master/dir1')
            .getText('.FilesTable .Table-Data')
            .then(cells => {
                expect(cells[0]).to.eql('..');
            });
    });

    it('Отображает список файлов (внутри директории)', function() {
        return this.browser
            .url('/first-repo/tree/master/dir1')
            .getText('.FilesTable .Table-Data')
            .then(cells => {
                const [firstRow, secondRow] = [cells.slice(1, 6), cells.slice(6, 11)];

                expect(firstRow).to.eql([
                    'first-file.txt',
                    'b668e90',
                    'Intial commit',
                    'Dmitry Shlensky',
                    '2019-10-08T09:19:14.000Z',
                ]);

                expect(secondRow).to.eql([
                    'second-file.txt',
                    'b668e90',
                    'Intial commit',
                    'Dmitry Shlensky',
                    '2019-10-08T09:19:14.000Z',
                ]);
            });
    });
});
