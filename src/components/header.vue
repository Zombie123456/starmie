<template>
    <div>
        <div>
            <div class="header">
                <a class="logo" :href="linkAdmin" target="_blank"></a>
                <p v-if="currentName == 'home'" class="web"><router-link to="/active/check">抽奖记录</router-link></p>
                <p v-if="currentName == 'check'" class="web"><router-link to="/">返回</router-link></p>
            </div>
            <Announcement></Announcement>
        </div>
    </div>
</template>
<script>
import Announcement from '../components/announcement'
import urls from '../urls'
export default {
    data () {
        return {
            currentName: '',
            linkAdmin: ''
        }
    },
    computed: {
    },
    created () {
        this.checkRouter()
        this.getAdmin()
    },
    methods: {
        checkRouter() {
            this.currentName = this.$router.currentRoute.name
        },
        getAdmin () {
            this.$http.get(urls.getAdmin)
            .then((res) => {
                this.linkAdmin = res.data.data.value
            })
        }
    },
    components: {
        Announcement
    }
}

</script>
<style lang="less">
.header .logo {
    background: url(../images/wap_logo.png) center center no-repeat;
    background-size: cover;
}
.header { 
    height: 50px; 
    line-height: 36px; 
    color: #fff; 
    width: 100%;
    text-align: center;
    -moz-background-size:cover;
    -webkit-background-size:cover;
    -o-background-size:cover;
    background-size:cover; 
    z-index: 999; 
    background-color: #000; 
}
.header .logo { 
    height: 38px;
    width: 220px;
    margin: 0 auto 0;
    display: block; 
    vertical-align: middle;
}
.header .web {
    position: absolute;
    top: 7px;
    right: 8px;
    line-height: 0.4rem;
    font-size: 0.28rem;
}
.header .web a {
    display: block;
    font-size: 0.6rem;
    color: #c4a94f;
    border: 1px solid #c4a94f;
    padding: 8px 3px;
    border-radius: 4px;
}
</style>