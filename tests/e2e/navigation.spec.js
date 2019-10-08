const expect = require('chai').expect;

describe('Навигация', function() {
    it('Можно перейти с главной на репозиторий', function() {
        return this.browser
            .url('/')
            .then(() =>
                this.browser
                    .$('.HomeSection')
                    .$('=first-repo')
                    .click(),
            )
            .getUrl()
            .then(url => {
                expect(url).to.contains('/first-repo');
            });
    });

    it('Можно перейти из списка файлов в подпапку', function() {
        return this.browser
            .url('/first-repo')
            .then(() => this.browser.$('=dir1').click())
            .getUrl()
            .then(url => {
                expect(url).to.contains('/first-repo/tree/master/dir1');
            });
    });

    it('Можно перейти из подпапки в родительскую директорию', function() {
        return this.browser
            .url('/first-repo/tree/master/dir1')
            .then(() => this.browser.$('=..').click())
            .getUrl()
            .then(url => {
                expect(url).to.contains('/first-repo');
            });
    });

    it('Можно перейти из списка файлов в просмотр файла', function() {
        return this.browser
            .url('/first-repo')
            .then(() => this.browser.$('=first-file.txt').click())
            .getUrl()
            .then(url => {
                expect(url).to.contains('/first-repo/blob/master/first-file.txt');
            });
    });

    describe('Хлебные крошки', function() {
        it('Можно перейти из просмотра файла назад в директорию', function() {
            return this.browser
                .url('/first-repo/blob/master/dir1/first-file.txt')
                .then(() =>
                    this.browser
                        .$('.Breadcrumbs')
                        .$('=dir1')
                        .click(),
                )
                .getUrl()
                .then(url => {
                    expect(url).to.contains('/first-repo/tree/master/dir1');
                });
        });

        it('Можно перейти из просмотра файла назад в репозиторий', function() {
            return this.browser
                .url('/first-repo/blob/master/dir1/first-file.txt')
                .then(() =>
                    this.browser
                        .$('.Breadcrumbs')
                        .$('=first-repo')
                        .click(),
                )
                .getUrl()
                .then(url => {
                    expect(url).to.contains('/first-repo');
                });
        });

        it('Можно перейти из просмотра директории назад в репозиторий', function() {
            return this.browser
                .url('/first-repo/tree/master/dir1')
                .then(() =>
                    this.browser
                        .$('.Breadcrumbs')
                        .$('=first-repo')
                        .click(),
                )
                .getUrl()
                .then(url => {
                    expect(url).to.contains('/first-repo');
                });
        });
    });
});
