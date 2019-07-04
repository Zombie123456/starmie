<template>
    <div>
        <Header></Header>
        <div class="container">
            <div class="lucky-wheel">
                <div class="lucky-title"></div>
                <div class="wheel-main">
                    <div class="wheel-pointer-box">
                        <div class="wheel-pointer1"></div>
                        <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                        <div v-if="pointerCover" class="wheel-pointerCover"></div>
                    </div>               
                    <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    </div>
                </div>
                <img class="img-zp" src="../images/img-zp.png">
            </div>
            
            <!-- 这是查询是否可以抽奖 -->
            <div class="lucky-draw">
                <div class="show-times">
                    您当前有 <span style="color: white;"> {{ lottery_ticket }} </span>次抽奖机会
                </div>
                <group class="input-content">  
                    <flexbox style="height: 0px;">
                        <flexbox-item :span="4"></flexbox-item>
                        <flexbox-item :span="5">
                            <div class="only-num">{{ vErrors.first('decimal') | onlyNumber}}</div> 
                        </flexbox-item>
                    </flexbox> 
                    <flexbox>
                        <flexbox-item :span="3">
                            <div class="flex-demo input-title">会员账号:</div>
                        </flexbox-item>
                        <flexbox-item :span="6">
                            <div class="flex-demo input-user">
                                <x-input 
                                    class="input-user" 
                                    v-validate="'alpha_num'"
                                    name="decimal"
                                    v-model="username" 
                                    placeholder="请输入用户名"></x-input>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="3">
                            <div class="flex-demo">
                                <x-button type="primary" mini @click.native="serchSpins">查询</x-button>
                            </div>
                        </flexbox-item>
                    </flexbox>
                    
                    <flexbox class="bottom">
                        <flexbox-item :span="3">
                            <div class="flex-demo input-title">总存款:</div>
                        </flexbox-item>
                        <flexbox-item :span="6">
                            <div class="flex-demo input-user">
                                <x-input disabled placeholder="-" v-model="saveMoney"></x-input>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="3"></flexbox-item>
                    </flexbox>
                    <!-- <flexbox class="bottom">
                        <flexbox-item :span="4">
                            <div class="flex-demo input-title">当日有效投注:</div>
                        </flexbox-item>
                        <flexbox-item :span="5">
                            <div class="flex-demo input-user">
                                <x-input disabled placeholder="-"></x-input>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="3"></flexbox-item>
                    </flexbox> -->
                </group>             
            </div>
            <!-- 中奖信息 -->
            <div class="rewarded">
                <div class="rewardedContent">
                    <div v-if="canGetSalary" class="insideContent">
                        <vue-seamless-scroll :data="salaryLists" :class-option="classOption">
                            <ul id="roll-ul" class="getSalaryList">
                                <li
                                    v-for="(item, i) in salaryLists"
                                    ref="rollul"
                                    :class="{anim:animate==true}"
                                    :key="`${item.link}${i}`"
                                >
                                    <nobr>
                                        <span class="yo">{{item.name}}</span>
                                        <span class="yt">{{item.money}}</span>
                                        <span class="yth">05-08</span>
                                    </nobr>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                    <div v-else class="insideContent wait">
                        敬请期待！
                    </div>
                </div>
            </div>
            <!-- 这是奖品展示 -->
            <div class="notic">活动期间在金沙娱乐城最低存款500以上的会员，将获得幸运转盘次数，并有机会获得北欧航线‘帝王公主号’豪华15日游，名额不限，赶快参与！
            </div>
            <div class="show-gift">
                <div class="show-content">
                    <vue-seamless-scroll :data="giftLists" :class-option="classOption1">
                        <ul id="roll-ul1" class="userImageAllWrapper">
                            <li
                                v-for="(item, i) in giftLists"
                                ref="rollul1"
                                :class="{anim:animate==true}"
                                :key='i'
                            >
                                <img :src="item.link">
                            </li>
                        </ul>
                    </vue-seamless-scroll>
                </div>
            </div>
            <!-- 这是抽奖条件 -->
            <div class="show-tips">
                <p class="tips-title">劳动最光荣，好运转出来</p>
                <p class="tips-content">为了回馈广大新老客户，澳门金沙娱乐场在5.1劳动节推出年幸运大转盘惊喜优惠，超级大奖价值38888元的海上欧洲豪华15日游，赶快加入！
                <a :href="`${linkAdmin}Register`" target="_blank" style="color: red;">立即注册GO</a>更多惊喜优惠请关注澳门金沙娱乐场19222.com</p>
                <table cellpadding="0" cellspacing="0" border="1">
                    <tbody>
                        <tr style="height: 40px;">
                            <th width="25%">存款时间</th>
                            <th>存款范围</th>
                            <th width="20%">转盘次数</th>
                            <th width="20%">提款要求</th>
                        </tr>
                        <tr>
                            <td rowspan="13">
                                （美东时间）2019年5月1日至5月7日
                            </td>
                            <td>{{ envelopeFirst.name}}</td>
                            <td>{{ envelopeFirst.quantity}}</td>
                            <td rowspan="13" style="text-align: center; padding-left: 5px;">
                                1倍流水
                            </td>
                        </tr>
                        <tr v-for="item in envelopeLevel">
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="tips-details">
                    <p class="details-title">优惠规则与条款</p>
                    <p>1. 所有优惠以人民币（CNY）为结算金额，存款总额和有效投注额按照美东时间统计，即每天中午12点至次日中午12点为一个计算周期</p>
                    <p>2. 产生的转盘次数将在次日北京时间14:00生效,生效后即可凭游戏账号参与澳门金沙幸运大转盘活动</p>
                    <p>3. 本活动抽中东南亚七日豪华游, 海上欧洲豪华15日游请第一时间联系在线客服申请，具体出游时间由澳门金沙决定，两人同行，其中包含港澳台通行证，国际往返机票，旅游景点门票，全程中文导游，领队全陪。包括豪华巴士，旅游用车，全程包吃住，以及导游小费，此活动有效兑换期限是1星期,逾期视为放弃</p>
                    <p>4. 本活动抽中IPhone XS 256G（黑色，256G，国行）实物奖品的会员，奖品不可折现，请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收货地址后十个工作日内寄出，如中奖后三个工作日内未联系我司确认收货地址 或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄达快递退回的情况，均视为自动放弃不再安排寄送</p>
                    <p>5. 本活动抽中“现金筹码”的会员无需联系申请, 系统将在30分钟内自动添加到中奖会员账号内, 1倍流水即可申请提款</p>
                    <p>6. 本活动抽中“电子游艺存xxx送xxx优惠券”的会员务必在中奖后，在美东时间当天内存款xxx元后联系在线客服申请送xxx元的优惠（申请期间不可下注，否则视为弃权处理），此项存送优惠，需在电子游艺中完成（本金+红利）*5倍流水方可全额提款</p>
                    <p>7. 每一位会员，每一住址，每一电子邮箱地址，每一电话号码， 相同支付方式(相同借记卡/信用卡/银行账户)及IP地址当日最多仅获得3次转盘机会，如发现会员同一个IP下登陆多个账号，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益</p>
                    <p>8. 澳门金沙娱乐的所有优惠特为会员而设，如发现任何团体或个人，以不诚实方式套取彩金或任何威胁，滥用优惠彩金等行为，澳门金沙娱乐将保留冻结、取消该团体或个人账户余额的权利</p>
                    <p class="last-tips">9.澳门金沙娱乐场保留对活动的最终解释权，以及在无通知的情况下修改、终止活动的权利</p>    
                </div>
            </div>
            <!-- 这是弹出框 -->
            <div class="toast" v-show="toast_control">
                <div class="toast-container">
                    <img :src="toast_pictrue" class="toast-picture">
                    <div class="close" @click="close_toast()"></div>
                    <div class="toast-title">
                        {{toast_title}}
                    </div>
                    <div class="toast-btn">
                        <div class="toast-cancel" @click="close_toast">关闭</div>
                    </div>
                </div>
            </div>
            <div class="toast-mask" v-show="toast_control"></div>

            <!-- 这是时间限制弹出框 -->
            <div v-if="showMask" class="cover" @click="showMask = false">
                <div class="alert alert2" v-if="showMask">
                    <h3>温馨提醒</h3>
                    <p>{{ warmText }}</p>
                    <div>
                        <span class="left" @click="showMask = false">确定</span>
                    </div>
                </div>
            </div>
            <div v-if="showMask1" class="cover cover2">
                <div class="alert alert2" v-if="showMask1">
                    <h3>温馨提醒</h3>
                    <p>{{ warmText1 }}</p>
                </div>
            </div>
        </div>
        <!-- 这是底部选项卡 -->
        <ul class="fNavi">
            <li class="li01">
                <a :href="`${linkAdmin}Register`" target="_blank">
                    <span class="img">
                        <img src="../images/img01.png" alt="">
                    </span>
                    <span class="text">注册</span>
                </a>
            </li>
            <li class="li03">
                <a :href="`${linkAdmin}Promotion`" target="_blank">
                    <span class="img">
                        <img src="../images/img03.png" alt="">
                    </span>
                    <span class="text">优惠</span>
                </a>
            </li>
            <li class="li02">
                <a href="https://jsbet088.com/m.html"  target="_blank">
                    <span class="img"><img src="../images/img02.png" alt=""></span>
                    <span class="text">下载</span>
                </a>
            </li>
            <li class="li04">
                <a :href="onlineServiceLink" target="_blank">
                    <span class="img">
                        <img src="../images/img04.png" alt="">
                    </span>
                <span class="text">客服</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import urls from '../urls'
import Header from '../components/header'
import { Flexbox, FlexboxItem, XInput, Group, XButton } from 'vux'
import { salaryList } from '../constants/salary-list.json'

export default {
    data() {
        return {
            linkAdmin: '',
            animate: true,
            show2: true,
            showMask: false,
            showMask1: false,
            canGetSalary: true,
            pointerCover: false,
            saveMoney: '-',
            onlineServiceLink: '',
            warmText: '',
            warmText1:'',
            toast_title: '',
            username: '',
            prize_list: [
                {
                    name: ''
                }
            ],
            envelopeFirst: [],
            envelopeLevel: [],
            setTime: '',
            giftLists: [
                {
                    "link": require('../images/gift1.png')
                },
                {
                    "link": require('../images/gift2.png')
                },
                {
                    "link": require('../images/gift3.png')
                },
                {
                    "link": require('../images/gift4.png')
                },
                {
                    "link": require('../images/gift5.png')
                },
                {
                    "link": require('../images/gift6.png')
                },
                {
                    "link": require('../images/gift7.png')
                },
                {
                    "link": require('../images/gift8.png')
                },
                {
                    "link": require('../images/gift9.png')
                },
                {
                    "link": require('../images/gift10.png')
                },
                {
                    "link": require('../images/gift11.png')
                },
                {
                    "link": require('../images/gift12.png')
                }
            ],
            easejoy_bean: 0, //奖品
            lottery_ticket: 0, //抽奖次数
            toast_control: false, //抽奖结果弹出框控制器
            hasPrize: true, //是否中奖
            start_rotating_degree: 0, //初始旋转角度
            rotate_angle: 0, //将要旋转的角度
            start_rotating_degree_pointer: 0, //指针初始旋转角度
            rotate_angle_pointer: 0, //指针将要旋转的度数
            rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
            rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
            click_flag: true, //是否可以旋转抽奖
            index: 0 
        };
    },
    filters:{
        onlyNumber (val){
            if (val == null) {
                return
            } else {
                return '*只能输入字母或数字'
            }
        }
    },
    created() {
        this.getList()
        this.timeLimit()
        this.getRewardList()
        this.showRewardList()
        // this.init_prize_list()
        this.getAdmin()
        this.getOnlineService()
    },
    computed: {
        classOption () {
            return {
                direction: 1,
                step: 0.3
            }
        },
        classOption1 () {
            return {
                direction: 2,
                step: 1,
                // singleWidth: 166,
                limitMoveNum: 5
            }
        },
        salaryLists: () => salaryList,
        // prize_list: () => prize_list,
        // toast_title() {
        //     // return this.hasPrize ? "恭喜您，获得" + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name : "未中奖";
        //     return this.hasPrize ? "恭喜您，获得" +  this.prize_list[this.index - 1].name : "未中奖";
        // },
        toast_pictrue() {
            return this.hasPrize ? require("../images/congratulation.png") : require("../images/sorry.png");
        }
    },
    methods: {
        timeLimit() {
            this.$http.get(urls.timeLimit + '?code=wheel')
            .then((res) => {
                this.setTime = res.data.data[0]
                if(!this.setTime.is_active) {
                    this.showMask1 = true
                    this.warmText1 = this.setTime.memo
                    this.pointerCover = false;
                    return
                }
            })
        },
        getOnlineService () {
            this.$http.get(urls.onlieService)
            .then((res) => {
                this.onlineServiceLink = res.data.data.value
            })
        },
        getList () {
            this.$http.get(urls.getList + '?event_type=wheel')
            .then((res) => {
                res.data.data.forEach((v, i) => {
                    if (i == 0) {
                        this.envelopeFirst = v
                    } else if (i > 0) {
                        this.envelopeLevel.push(v)

                    }
                })
            })
        },
        showRewardList() {
            let now = new Date()
            let hours = now.getHours()
            let day = now.getDate()
            let month = now.getMonth()+1
            if (hours >= 14 && day >= 1 && month > 4) {
                this.canGetSalary = true
            }
        },
        //此方法为处理奖品数据,从后台获取数据
        getRewardList(){
            this.$http.get(urls.getRewardList + '?event_type=wheel')
            .then((res) => {
                this.prize_list = res.data.data
            })
        },
        serchSpins () {
            this.$validator.validateAll().then((result)=>{
               if(result){
                    if(this.username == '') {
                        alert('请输入用户名')
                        return
                    }
                    this.pointerCover = false;
                    // 这是查询充值金额
                    this.$http.get(urls.checkMoney + '?event_type=wheel&username=' + this.username)
                    .then((res) => {
                        this.saveMoney = res.data.data.amount
                    })

                    // 这是查询剩余次数
                    this.$http.get(urls.catchEnvelopement + '?event_type=wheel&claim_left=1&username=' + this.username)
                    .then((res) => {
                        this.lottery_ticket = res.data.data.claim_left
                    })
                }
            })
        },
        getAdmin () {
            this.$http.get(urls.getAdmin)
            .then((res) => {
                this.linkAdmin = res.data.data.value
            })
        },
        // 比较时间
        CompareDate(d1,d2){
            return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
        },
        // init_prize_list(list) {},
        // 点击抽奖
        rotate_handle() {
            this.pointerCover = true


            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
            var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
            var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
                    + " "  + date.getHours()  + seperator2  + date.getMinutes()
                    + seperator2 + date.getSeconds();

            let startTime = this.setTime.date_from + ' ' + this.setTime.time_from
            let stopTime = this.setTime.date_to + ' ' + this.setTime.time_to
            if( this.CompareDate( currentdate, startTime) && this.CompareDate( stopTime, currentdate)) {
                console.log('活动正在进行中')
                return
            } else {
                 this.showMask = true
                this.warmText = '抽奖时间:' + startTime +  "~" + stopTime
                this.pointerCover = false;
                return
            }


            if (this.username == '') {
                this.showMask = true
                this.warmText = '亲～～请输入用户名'
                this.pointerCover = false;
                return
            }

            if (this.lottery_ticket === 0 ) {
                this.showMask = true
                this.warmText = '亲～～您没有更多抽奖次数'
                this.pointerCover = false;
                return
            }
            let data = {
                username: this.username,
                event_type: 'wheel'
            }
            this.$http.post(urls.catchEnvelopement + '?opt_expand=reward', data)
            .then((res) => {
                if (res.data.code == 3001) {
                    this.showMask = true
                    this.warmText = '亲～～您没有更多抽奖次数'
                    return
                } else if (res.data.code == 2000) {
                    this.index = res.data.data.reward.id
                    this.rotating();
                    this.lottery_ticket = res.data.data.claim_left
                    this.toast_title =  "恭喜您，获得" +  res.data.data.reward.name
                }
            })
            // this.index = 7  //指定每次旋转到的奖品下标
        },
        rotating() {
            if (!this.click_flag) return;
            var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
            var during_time = 5; // 默认为1s
            var random = Math.floor(Math.random() * 7);
            var result_index = this.index - 1; // 最终要旋转到哪一块，对应prize_list的下标

            var result_angle = [0.5, 330.5, 300.5, 270.5, 240.5, 210.5, 180.5, 150.5, 120.5, 90.5, 60.5, 30.5]; //最终会旋转到下标的位置所需要的度数

            var rand_circle = 10; // 附加多转几圈，2-3
            this.click_flag = false; // 旋转结束前，不允许再次触发
            if (type == 0) {
                // 转动盘子
                var rotate_angle =
                this.start_rotating_degree +
                rand_circle * 360 +
                result_angle[result_index] -
                this.start_rotating_degree % 360;
                this.start_rotating_degree = rotate_angle;
                this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                //转动指针
                // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
                // this.start_rotating_degree_pointer =360*rand_circle;
                var that = this;
                // 旋转结束后，允许再次触发
                setTimeout(function() {
                    that.click_flag = true;
                    that.game_over();
                }, during_time * 1000 + 1500); // 延时，保证转盘转完
            } else {
                //...
            }
        },
        game_over() {
            this.toast_control = true;
            // this.hasPrize = this.prize_list[this.index].isPrize
        },
        //关闭弹窗
        close_toast() {
            this.toast_control = false;
            this.pointerCover = false;
        }
    },
    components: {
        Header,
        Flexbox,
        FlexboxItem,
        XInput,
        Group,
        XButton
    }
};
</script>
<style scoped lang="less">
.container {
    width: 100%;
    padding-bottom: 30px;
}
.lucky-wheel {
    width: 100%;
    height: 31.5625rem;
    background: black url("../images/color_pillar.png") no-repeat center bottom;
    background-size: 100%;
    padding-top: 1.5625rem;
    overflow: hidden;
    position: relative;
}
.only-num {
    font-size: 12px;
    color: red;
}
.img-zp {
    width: 96%;
    display: block;
    left: 5%;
    /*overflow: hidden;*/
    top: 66%;
    position: absolute;
}
.lucky-title {
    width: 100%;
    height: 8.125rem;
    background: url("../images/lucky_title.png") no-repeat center top;
    background-size: 100%;
}
.wheel-main {
    display: flex;
    z-index: 100;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.wheel-bg {
    width: 18.4375rem;
    height: 18.4375rem;
    background: url("../images/draw_wheel1.png") no-repeat center top;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
}
.wheel-pointer-box {
    position: absolute;
    top: 54%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
    width: 8.3125rem;
    height: 8.3125rem;
}
.wheel-pointer1 {
    width: 8.3125rem;
    height: 8.3125rem;
    position: absolute;
    background: url("../images/draw_btn.png") no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
}
.wheel-pointer {
    width: 7.3125rem;
    height: 7.3125rem;
    left: 2.6rem;
    top: 1.2rem;
    position: absolute;
    background: url("../images/draw_btn1.png") no-repeat center top;
    background-size: 100%;
    /*transform-origin: center 60%;*/
    transform: rotate(-20deg);
}
.wheel-pointerCover {
    width: 7.3125rem;
    height: 7.3125rem;
    left: 2.6rem;
    top: 1.2rem;
    position: absolute;
    /*background: red;*/
    background-size: 100%;
    /*transform-origin: center 60%;*/
    transform: rotate(-20deg);
    z-index: 9999;
}
.wheel-bg div {
    text-align: center;
}
.prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 5555px;
}
.prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
.prize-item {
    width: 5.875rem;
    height: 9rem;
}

.prize-pic img {
    width: 4.0625rem;
    height: 2.5rem;
    margin-top: 1.5625rem;
}
.prize-count {
    font-size: 0.875rem;
}
.prize-type {
    font-size: 0.75rem;
}
.main {
    position: relative;
    width: 100%;
    min-height: 14.25rem;
    padding-bottom: 1.6875rem;
}
.main-bg {
    width: 100%;
    height: 6.5625rem;
    position: absolute;
    top: -3.4375rem;
    left: 0;
    background-size: 100%;
}
.bg-p {
    width: 100%;
    height: 2.95rem;
    background: rgb(252, 207, 133);
}
.content {
    position: absolute;
    top: 0.175rem;
    left: 0;
    height: 5.1875rem;
    font-size: 1.125rem;
    color: #ffeb39;
    padding-left: 6.75rem;
}
.content div {
  text-align: left;
}

.toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
}
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 15.4375rem;
    background: #fff;
    border-radius: 0.3125rem;
    padding: 0.3125rem;
    background-color: rgb(252, 244, 224);
}
.toast-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #fccc6e;
}
.toast-picture {
    position: absolute;
    top: -6.5rem;
    left: -1.5rem;
    width: 18.75rem;
    height: 8.5625rem;
}
.toast-pictrue-change {
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
}
.toast-title {
    padding: 2.8125rem 0;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
}
.toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.9375rem;
}
.toast-btn div {
    background-image: -moz-linear-gradient(
        -18deg,
        rgb(242, 148, 85) 0%,
        rgb(252, 124, 88) 51%,
        rgb(252, 124, 88) 99%
    );

    background-image: -ms-linear-gradient(
        -18deg,
        rgb(242, 148, 85) 0%,
        rgb(252, 124, 88) 51%,
        rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
        -18deg,
        rgb(242, 148, 85) 0%,
        rgb(252, 124, 88) 51%,
        rgb(252, 124, 88) 99%
    );
    box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
    width: 4.6875rem;
    height: 1.875rem;
    border-radius: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    color: #fff;
}
.close {
    position: absolute;
    top: -0.9375rem;
    right: -0.9375rem;
    width: 2rem;
    height: 2rem;
    background: url("../images/close_store.png") no-repeat center top;
    background-size: 100%;
}
.show-times {
    text-align: center;
    color: #bcad8d;
}
.notic {
    width: 96%;
    margin: 0 auto;
    text-indent: 28px;
    font-size: 14px;
    color: #bcad8d;
    margin-bottom: 0.5rem;
}
.input-title {
    text-align: right;
    font-size: 0.8rem;
    color: #bcad8d;
}
.input-user {
    font-size: 0.8rem;
    color: #bcad8d;
}

.lucky-draw {
    width: 90%;
    padding: 10px 5px;
    margin: 0 auto;
    background: #201614;
}
.bottom {
    margin-bottom: 1rem;
}
.show-tips {
    width: 96%;
    margin: 0 auto;
    font-size: 14px;
    color: #bcad8d;
    .tips-title {
        text-align: center;
        color: #e07d1e;
        font-size: 18px;
    }
    .tips-content {
        text-indent: 28px;
    }
    .tips-details {
        color: #989082;
        margin-top: 10px;
        font-size: 13px;
        text-indent: 24px;
        margin-bottom: 100px;
        .details-title {
            font-size: 18px;
            color: #e07d1e;
            text-align: center;
        }
        .last-tips {
            margin-bottom: 40px;
        }
    }
    .title {
        display: block;
        width: 77%;
        margin: 0.3rem auto;
    }
    .red {
        color: #e07d1e;
    }
    table {
        width: 100%;
        margin: 0;
        text-align: center;
        font-size: 10px;
        line-height: 20px;
        th {
            color: #e07d1e;
            text-align: center;
            font-weight: normal;
            padding: 0.1rem 0.03rem;
            line-height: 15px;
        }
        td {
            text-align: center;
            padding: 10px 0;
            color: #d0a679;
        }
    }
}
.cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    background: rgba(6, 6, 6, 0.2);
    .imgContent {
        position: relative;
        .closeButton {
            position: absolute;
            top: 4%;
            right: 28%;
            font-size: 18px;
        }
        .showRes {
            position: absolute;
            width: 37%;
            height: 20%;
            text-align: center;
            top: 32%;
            left: 32%;
            p {
                font-size: 0.42rem;
                /*margin-top: 0.2rem;*/
                span {
                    color: red;
                    font-size: 0.6rem;
                }
            }
        }
    }
}
.cover2 {
    z-index: 999999;
}
.alert {
    position: absolute;
    width: calc(70% - 10px);
    left: 15%;
    top: 3%;
    background: #fff;
    border-radius: 8px;
    z-index: 1000001;
    font-size: 12px;
    padding: 0 10px;
    overflow-y: scroll;
    h3 {
        text-align: center;
    }
    p {
        text-align: center;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    div {
        color: blue;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
    }
    &.alert2 {
        font-size: 14px;
        top: 30%;
        div {
            display: flex;
            height: 40px;
            line-height: 40px;
            .left {
                width: 100%;
                /*border-right: 1px solid #ccc;*/
            }
            .right {
                width: 50%;
            }
        }
    }
}
.rewarded {
    width: 100%;
    font-size: 12px;
    .rewardedContent {
        background: url('../images/lucky03.png') no-repeat;
        background-size: 96%;
        position: relative;
        height: 19rem;
        background-position: 0.5rem 0;
        .insideContent {
            height: 10.6rem;
            width: 80%;
            position: absolute;
            left: 10%;  
            top: 26%;
            overflow: hidden;
            z-index: 50;
            .yo {
                width: 15%;
                margin-left: 10%;
                display: inline-block;
                text-align: left;
            }
            .yt {
                width: 58%;
                display: inline-block;
                /*overflow: hidden;*/
                text-align: center;
                color: #bc2b35;
            }
            .yth {
            }
        }
        .wait {
            line-height: 10rem;
            font-size: 1.6rem;
            text-align: center;
            color: #ad4c4c;
        }
    }
}
.show-gift {
    width: 98%;
    margin: 0 auto;
    margin-bottom: 14px;
    overflow: hidden;
    .userImageAllWrapper {
        width: 125.5rem;
        li {
            float: left;
            margin-right: 0.4rem;
            img {
                width: 10rem;
                display: flex;
            }
        }
    }
}
.fNavi {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #3c3938;
    overflow: hidden;
    zoom: 1;
    z-index: 99999;
}
.fNavi li {
    float: left;
    width: 25%;
    font-size: 12px;
    text-align: center;
}
.fNavi li a{
    padding: 10px 0;
    display: block;
    border-right: 1px solid #715e32;
}
.fNavi li .img {
    display: block;
    width: 22%;
    margin: 0 auto 2px;
}
.fNavi li img {
    width: 100%;
}
.fNavi li .text {
    display: block;
    color: #e8e9eb;
    font-size: 0.8rem;
}
@media screen and (min-width:416px){ 
    .activity { 
        height: 6.6rem;
    }
    .activityContent {
        height: 4.2rem!important;
    }
}
@media screen and (min-width:320px) and (max-width:415px){ 
    .insideContent { 
        height: 12.4rem!important; 
        top: 24%!important;
    }
    .activity { 
        height: 6.6rem;
    }
    .activityContent {
        height: 4.2rem!important;
    }
}
@media screen and (max-width:320px){
    .rewardedContent{
        height: 16.7rem!important;
    }
    .insideContent { 
        height: 9.8rem!important; 
        top: 27%!important;
    }
    .img-zp {
        top: 70%!important;
    }
    .activity { 
        height: 11.6rem;
    }
    .activityContent {
        height: 7.4rem!important;
    }
}
</style>


