import { get } from './http'

export const homeData = p => get('/xhr/index/index.json', p);