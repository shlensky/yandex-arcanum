import { Response } from 'express';
import sinon, { SinonStub } from 'sinon';

interface MockResponse {
    status: SinonStub;
    json: SinonStub;
}

export function mockResponse() {
    const res = {
        status: sinon.stub(),
        json: sinon.stub(),
    };

    res.status = res.status.returns(res);
    res.json = res.json.returns(res);

    return (res as unknown) as Response & MockResponse;
}
