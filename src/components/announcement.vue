<template>
    <div>
        <group class="announcements">
            <div class="clearfix" @click="showAnnouncements = true">
                <span class="annouce-badge fl">
                    <img src="../images/icon01.png">
                </span>
                <div class="marquee banners fl">
                  <marquee class="nogo" :messages="announcements" :speed="announcementSpeed"></marquee>
                </div>
            </div>
        </group>
        <div class="vux-x-dialog weui_dialog_alert fix_ios_fixed" v-if="showAnnouncements">
            <div class="weui_mask" @click="showAnnouncements=!showAnnouncements"></div>
            <div class="weui_dialog">
                <div class="dialog-title vux-1px-b">公告</div>
                <swiper nterval=4000 dots-position="center"  auto height="180px">
                    <swiper-item v-for="a in announcements"><p>{{a}}</p></swiper-item>
                </swiper>
            </div>
        </div>
       
        <div class="vux-x-dialog weui_dialog_alert fix_ios_fixed" v-if="popFirst">
            <div class="weui_mask" @click="popFirst=!popFirst"></div>
            <div class="weui_dialog">
                <div class="dialog-title vux-1px-b">公告</div>
                <swiper :interval=4000 dots-position="center"  auto height="180px">
                    <swiper-item v-for="a in popMsg"><p v-html="a.message"></p></swiper-item>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
import Marquee from './Marquee'
import { Group, Swiper, SwiperItem } from 'vux'
import urls from '../urls'

export default {
    data () {
        return {
            showAnnouncements: false,
            announcementContent: '',
            announcementSpeed: 20,
            merchantid: '',
            announcements: [],
            showAnnouncements: false,
            popMsg: [],
            popFirst: false
        }
    },
    computed: {
    },
    created () {
        this.animateAnnouce()
    },
    methods: {
        animateAnnouce () {
            this.$http.get(urls.announcements)
                .then ((respond) => {
                    if (respond.data.code === 2000) {
                        this.announcements = respond.data.data.reverse().map(data => data.announcement)
                    }
                })
        }
    },
    components: {
        Marquee,
        Group,
        Swiper,
        SwiperItem
    }
}

</script>
<style lang="less">
    .announcements {
        margin-top: -14px;
        position: relative;
        .annouce-badge {
            font-size: 12px;
            display: inline-block;
            float: left;
            margin: 0 0 0 10px;
            line-height: 34px;
            img {
                padding-top: 9px;
            }
        }
        .vux-swiper-item {
            font-size: 12px;
            line-height: 32px;
        }
        .banners {
            color: #dcb1b1;
            border-top: 1px solid #eec972;
            border-bottom: 1px solid #eec972;
            background: #000;
        }
        .announcement-box {
            position: absolute;
            font-size: 14px;
            line-height: 32px;
            margin-left: 37px;
            .annouce-pos {
                width: 300px;
            }
        }
    }
    .weui_mask {
        position: fixed;
        z-index: 1000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .weui_dialog {
        position: fixed;
        z-index: 5000;
        width: 85%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FAFAFC;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
    }
    .dialog-title {
        text-align: center;
        padding: 5px 0;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .vux-slider {
        overflow: hidden;
        position: relative;
    }
    .vux-swiper-item {
        font-size: 12px;
    }
    .nogo {
        line-height: 33px!important;
        font-size: 13px;
    }
</style>