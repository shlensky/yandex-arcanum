const expect = require('chai').expect;

describe('Хлебные крошки', function() {
    it('Отображают имя репозитория', function() {
        return this.browser
            .url('/first-repo')
            .getText('.Breadcrumbs *')
            .then(breadCrumb => {
                expect(breadCrumb).to.eql('first-repo');
            });
    });

    it('Отображают имя директории', function() {
        return this.browser
            .url('/first-repo/tree/master/dir1')
            .getText('.Breadcrumbs *')
            .then(breadCrumbs => {
                expect(breadCrumbs).to.eql(['first-repo', 'dir1']);
            });
    });

    it('Отображают имя файла', function() {
        return this.browser
            .url('/first-repo/blob/master/dir1/first-file.txt')
            .assertView('breadcrumbs', '.Breadcrumbs')
            .getText('.Breadcrumbs *')
            .then(breadCrumbs => {
                expect(breadCrumbs).to.eql(['first-repo', 'dir1', 'first-file.txt']);
            });
    });
});
