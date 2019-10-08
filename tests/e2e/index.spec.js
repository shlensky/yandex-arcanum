const expect = require('chai').expect;

describe('Главная страница', function() {
    it('Отображает список репозиториев', function() {
        return this.browser
            .url('/')
            .getText('.HomeSection li')
            .then(repoNames => {
                expect(repoNames).to.eql(['first-repo', 'second-repo']);
            });
    });
});
