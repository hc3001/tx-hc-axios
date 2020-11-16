import { AxiosRequestConfig } from './types/index'

function xhr(config: AxiosRequestConfig) {
    const { data = null, url, method = 'get'} = config
}

export default xhr