import type { KVStorageEngine } from "./interface";

export default class SessionStorageEngine {
	get(key: string): ReturnType<KVStorageEngine['get']> {
		return sessionStorage.getItem(key)
	}

	remove(key: string): ReturnType<KVStorageEngine['remove']> {
		return sessionStorage.removeItem(key)
	}
}