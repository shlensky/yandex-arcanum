const expect = require('chai').expect;

describe('Страница списка файлов', function() {
    it('Отображает список файлов и директорий (верхний уровень)', function() {
        return this.browser
            .url('/first-repo')
            .assertView('files-table', '.FilesTable')
            .getText('.FilesTable tbody tr:first-of-type .Table-Data')
            .then(cells => {
                expect(cells).to.eql([
                    'dir1',
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
            .getText('.FilesTable tbody tr:first-of-type .Table-Data')
            .then(cell => {
                expect(cell).to.eql('..');
            });
    });

    it('Отображает список файлов (внутри директории)', function() {
        return this.browser
            .url('/first-repo/tree/master/dir1')
            .getText('.FilesTable tbody tr:nth-child(2) .Table-Data')
            .then(cells => {
                expect(cells).to.eql([
                    'first-file.txt',
                    'b668e90',
                    'Intial commit',
                    'Dmitry Shlensky',
                    '2019-10-08T09:19:14.000Z',
                ]);
            });
    });
});
