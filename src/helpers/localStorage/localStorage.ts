import createStorageManager, { LocalStorageEngine } from '../kv-storage'
import { Block, BlockId } from '../../Pages/MainPage/blocksContext'
import { getComponentFromComponentNames } from '../parseComponents'
const FT_LOCAL_STORAGE_KEY = 'ft-local-storage'

export const LS = createStorageManager(FT_LOCAL_STORAGE_KEY, { engine: new LocalStorageEngine() })

export const setBlocksMapToLocalStorage = (key: string, mapData: Map<BlockId, Block>) => {
	const stringifiedData = JSON.stringify(Array.from(mapData.entries()))
	LS.set(key, stringifiedData)
}

export const getComponentMapFromLocalStorage = async <K, V>(key: string): Promise<Map<K, V>> => {
	const stringBlocksMap = await LS.get(key)
	const blocksMapWithoutComponent = JSON.parse(stringBlocksMap) as Array<[string, Block]>
	const parsedBlocksMap = blocksMapWithoutComponent.map(([key, block]) => {
		return [key, getComponentFromComponentNames(block)]
	}) as any

	return new Map(parsedBlocksMap)
}
