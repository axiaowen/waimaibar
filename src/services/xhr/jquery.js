import { rootPath } from './config'
import 'whatwg-fetch'

const xhr = ({ url, body = null, method = 'get' }) => {

    fetch(rootPath + url, {
        method: method,
        body: body
    })
}

export default xhr
