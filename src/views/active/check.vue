<template>
	<div class="appd">
        <div class="doubleKill" :style="{'min-height': resultsHeight + 'px'}">
            <Header></Header>
            <div class="search-box">
                <form action="/wap/query" method="get">
                    <input type="text" placeholder="输入用户账号查询中奖记录" v-model="searchName">
                    <a @click="serchUser"></a>
                </form>
            </div>
            <div class="result-box"  v-if="times != 0">    
                <h4 class="name-h">
                   <img src="../../images/search-fl.png">
                   <p v-if="nameCon != ''">会员账号：<span>{{nameCon}}</span></p>
                   <img src="../../images/search-fr.png">
                </h4>
                <div class="query-ul">
                    <table class="table1" cellpadding="0" cellspacing="0" num="0" data-id="" style="display: table;">
                        <tbody>
                            <tr>
                                <td class="back-yell" width="40%">转盘奖励</td>
                                <td class="back-yell">领取时间</td>
                                <td class="back-yell">是否派彩</td>
                            </tr>
                            <tr v-for="item in checkList">
                                <td width="50%">{{ item.reward.name }}</td>
                                <td>{{ item.created_at | moment('YYYY-MM-DD HH:mm:ss')}}</td>
                                <td style="color: #eee;" v-if="item.status === 0">待处理</td>
                                <td style="color: #cac34a;" v-if="item.status === 1">已派彩</td>
                                <td style="color: red;" v-if="item.status === 2">已拒绝</td>
                            </tr>
                        </tbody>
                    </table>
                </div> 
                <div v-if="times != 0" class="pages pagination">
                    <li v-if='count >= 2' class="disabled" @click="weekPage(0)">
                        <a class="first">首页</a>
                    </li>
                    <li v-if="count != 1" @click="weekPage('prev')">
                        <a class="pre">上一页</a>
                    </li>
                    <li>
                        <a class="next">第{{count}}页</a>
                    </li>
                    <li v-if="close" @click="weekPage('next')">
                        <a class="next">下一页</a>
                    </li>
                </div>
            </div>
        </div>
		<downs></downs>
	</div>
</template>
<script>
import Header from '../../components/header.vue'
import downs from '../../components/footer.vue'
import { Group } from 'vux'
import urls from '../../urls'
export default { 
    data () {
        return {
            nameCon: '',
            searchName: '',
            count: 1,
            checkList: '',
            number: 9,
            times: '',
            roundNumber: 0,
            close: true
        }
    },
    computed: {
        resultsHeight () {
            return (document.documentElement.clientHeight || document.body.clientHeight) - 40
        }
    },
    filters:{
    },
    watch: {   
    },
    created(){
    },
    methods: {
        weekPage (val) {
            this.close = true
            if (this.roundNumber == 0 && this.times%this.number != 0) {
                this.close = false
            }
            if (val === 0) {
                this.checkList = this.saveData.slice(0, this.number)
                this.count = 1
                this.number = 9
            } else if (val === 'prev') {
                this.checkList = this.saveData.slice((this.count-2)*this.number, (this.count-1)*this.number)
                this.count = this.count - 1
                this.close = true
            } else if (val === 'next') {
                let ss = this.number*this.count
                this.checkList = this.saveData.slice(this.count*this.number, (this.count+1)*this.number)
                this.count += 1
                if (this.count > this.roundNumber) {
                    this.close = false
                }
            } 
        },
        serchUser () {
            if (this.searchName == '') {
                alert('输入会员账号不能为空')
                return
            }
            console.log(this.searchName)
            this.$http.get(urls.catchEnvelopement + '?event_type=wheel&opt_expand=reward&username=' + this.searchName)
            .then((res) => {
                if (res.data.code === 2000) {
                    if (res.data.data.length === 0) {
                        alert('亲～没有查询到此用户数据')
                        return
                    } else {
                        // this.totalMoney()
                        console.log(res)
                        console.log(res.data)
                        console.log(res.data.data)
                        this.count = 1
                        this.number = 9
                        this.nameCon = this.searchName
                        this.checkList = res.data.data
                        this.saveData = res.data.data
                        this.times = this.saveData.length
                        this.close = true
                        this.roundNumber = Math.floor(this.times/this.number)
                        if (this.roundNumber == 0 && this.times%this.number != 0) {
                            this.close = false
                        }
                        if (this.saveData.length > this.number) {
                            this.checkList = this.checkList.slice(0, this.number)
                        } else {
                            return
                        }
                    }
                }

            })
        }
    },
    components: {
        Header,
        downs
    }
}
</script>
<style lang="less" scoped>
.search-box {
    padding: 8px 10px;
    padding-right: 0;
    background: none;
    overflow: hidden;
    background: url(../../images/search-vip.png) center center no-repeat;
    background-size: 100%;
    margin: 0 auto;
    width: 91%;
    max-width: 400px;
    input {
        width: 72%;
        height: 43px;
        border: 0;
        line-height: 36px;
        text-indent: 10px;
        background: none;
        color: red;
        margin: 0;
        float: left;
        font-family: 'Microsoft Yahei';
        font-size: 14px;
    }
    a {
        display: block;
        float: right;
        width: 26%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: none;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
    }
    input:focus {
        outline-offset: 0;
        outline: 0;
    }
}
.result-box {
    h4 {
        font-size: 17px;
    }
    .total {
        color: white;
        font-size: 14px;
        text-align: center;
        margin-top: 12px;
        .red {
            color: red;
        }
    }
    .name-h {
        text-align: center;
        img {
            display: inline;
            margin-bottom: -20px;
        }
        p {
            display: inline-block;
            line-height: 36px;
            border-top: 1px solid #FFD053;
            border-bottom: 1px solid #FFD053;
            padding: 0 6px;
            color: #FFD053;
            span {
                color: #fff;
                font-weight: bold;
            }
        }
    }
    .query-ul {
        padding: 0 12px;
        margin: 12px 0;
        table {
            width: 100%;
            margin: 12px 0;
        }
        .table1 {
            tr {
                .back-yell {
                    background: #724522;
                    color: #f8e978;
                }
                td {
                    padding: 6px 2px;
                    color: #ccc;
                    font-weight: normal;
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid #212121;
                    font-size: 12px;
                    line-height: 1.5;
                    background: #303030;
                    border: 1px solid #362C2B;
                    font-size: 12px;
                    line-height: 1.5;
                    background: #251D1D;
                }
            }
        }
    }
    .pagination {
        display: inline-block;
        text-align: center;
        width: 100%;
        padding-left: 0;
        margin: 20px auto;
        border-radius: 4px;
        float: left;
        li {
            display: inline-block;
            a {
                float: left;
                padding: 6px 4px;
                margin-left: -1px;
                line-height: 1.42857143;
                letter-spacing: 1px;
                font-size: 10px;
                text-decoration: none;
                color: #999;
                background-color: #4F4F4F;
            }
        }
    }
    pagination > li:first-child > span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
}
@media screen and (min-width:400px){html {font-size: 41.1px;}}
@media screen and (min-width:320px)and(max-width:400px){html{font-size: 37.5px;}}
@media screen and (max-width:320px){html{font-size: 28px;}}
</style>
