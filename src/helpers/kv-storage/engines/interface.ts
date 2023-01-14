type Nullable<T> = T | null | undefined
type CanPromise<T> = T | Promise<T>

export interface KVStorageEngine {
	get(key: string): CanPromise<Nullable<string>>
	set(key: string, value: string): CanPromise<void>
	remove(key: string): CanPromise<void>
}
