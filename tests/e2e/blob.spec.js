const expect = require('chai').expect;

describe('Страница просмотра файла', function() {
    it('Отображает содержимое файла', function() {
        return this.browser
            .url('/first-repo/blob/master/dir1/first-file.txt')
            .assertView('file-view', '.FileView')
            .getText('.CodeTable-Code')
            .then(cells => {
                expect(cells[0]).to.eql('First file in dir1 content!');
            });
    });

    it('Отображает номера строк', function() {
        return this.browser
            .url('/first-repo/blob/master/dir1/first-file.txt')
            .getText('.CodeTable-LineNumber')
            .then(cells => {
                expect(cells).to.eql(['1', '2']);
            });
    });

    it('Отображает имя файла', function() {
        return this.browser
            .url('/first-repo/blob/master/dir1/first-file.txt')
            .getText('.FileView .Pane-Header')
            .then(text => {
                expect(text).to.contains('dir1/first-file.txt');
            });
    });

    it('Отображает размер файла', function() {
        return this.browser
            .url('/first-repo/blob/master/dir1/first-file.txt')
            .getText('.FileView .Pane-Note')
            .then(text => {
                expect(text).to.eql('(28 bytes)');
            });
    });
});
