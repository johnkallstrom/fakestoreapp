// A cache which uses the javascript based Cache API to store requests in the browser
// Used primarily to store requests from the Fake Store API which provides the data for this application
// https://developer.mozilla.org/en-US/docs/Web/API/Cache

interface IFakeStoreAppCache {
    add(request: Request): void
    addMultiple(request: Array<Request>): void
    get(request: Request): Promise<Response | undefined>
    remove(request: Request): void
    removeCache(): Promise<boolean>
}

class FakeStoreAppCache implements IFakeStoreAppCache {
    private readonly cache_name: string;

    constructor() {
        this.cache_name = process.env.VUE_APP_FAKE_STORE_API_CACHE_NAME;
    }

    private async open(): Promise<Cache> {
        return await caches.open(this.cache_name);
    }

    async add(request: Request) {
        const cache = await this.open();
        cache.add(request);
    }

    async addMultiple(requests: Array<Request>) {
        const cache = await this.open();
        cache.addAll(requests);
    }

    async get(request: Request): Promise<Response | undefined> {
        const cache = await this.open();
        const response = await cache.match(request);
        return response;
    }

    async remove(request: Request) {
        const cache = await this.open();
        cache.delete(request);
    }

    async removeCache(): Promise<boolean> {
        return await caches.delete(this.cache_name);
    }
}

export default FakeStoreAppCache;