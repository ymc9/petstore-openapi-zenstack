import fetch, { Headers, Request, Response } from 'node-fetch';
import { Fetcher } from 'openapi-typescript-fetch';
import { paths } from './client-types';

// polyfill `fetch` for node
if (!globalThis.fetch) {
    globalThis.fetch = fetch as any;
    globalThis.Headers = Headers as any;
    globalThis.Request = Request as any;
    globalThis.Response = Response as any;
}

async function main() {
    const fetcher = Fetcher.for<paths>();
    fetcher.configure({
        baseUrl: 'http://localhost:3000',
    });

    const login = fetcher.path('/api/login').method('post').create();
    const { data: loginResult } = await login({
        email: 'tom@pet.inc',
        password: 'abc123',
    });
    // loginResult is typed as { id: string, email: string, token: string }
    console.log('Login result:', JSON.stringify(loginResult, undefined, 2));
    const token = loginResult.token;

    // get orders together with their pets
    const getOrders = fetcher
        .path(`/api/order/findMany`)
        .method('get')
        .create();
    const { data: orders } = await getOrders(
        { q: JSON.stringify({ include: { pets: true } }) },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Orders:', JSON.stringify(orders, undefined, 2));
}

main();
