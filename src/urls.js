'use strict'
const config = require('../config')
const env = process.env.NODE_ENV === 'development' ? config.dev.env : config.build.env
const host = 'http://api.chalice.top/backend_api'
const prefix = host + '/v1/member/'
export default {
    announcements: prefix + 'announcement/',
    checkMoney: prefix + 'deposits/',
    searchMember: prefix + 'envelopeclaim/',
    catchEnvelopement: prefix + 'envelopeclaim/',
    getList: prefix + 'envelopelevel/',
    getAdmin: prefix + 'global-preferences/domain/',
    getRewardList: prefix + 'rewards/',
    timeLimit: prefix + 'eventtypes/',
    onlieService: prefix + 'global-preferences/customer_service'
}
