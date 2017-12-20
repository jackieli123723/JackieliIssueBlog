<template>
  <!-- 最外层套一层 div 避免 gitHubUser 还未加载完时，右侧占满整个浏览器 -->
  <div>
    <div class="left-layout-container">
      <div class="user-info">
        <img v-if="gitHubUser" @click="home" :src="gitHubUser.avatar_url">
        <div v-if="gitHubUser" class="login-name">{{gitHubUser.login}}</div>
        <div v-if="gitHubUser">{{gitHubUser.bio}}</div>
      </div>
      <ul class="other-site">
        <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
          <img :src="site.img">
        </li>
      </ul>
      <ul class="left-menu" >
        <router-link :class="isBlog ? 'selected-menu':''" tag="li" :to="{name: 'BlogList'}" v-touch-ripple>个人博客</router-link>
        <div class="line30"></div>
        <router-link :class="isAboutMe ? 'selected-menu':''" tag="li" :to="{name: 'AboutMe'}" v-touch-ripple>关于博客</router-link>
         <div class="line30"></div>
        <router-link :class="isChart ? 'selected-menu':''" tag="li" :to="{name: 'OpusChart'}">开源项目</router-link>
      </ul>
      <div v-if="showWeiXinGroup" class="weixin-group">
        <span>公众号</span>
        <span>web前端开发</span>
        <img src="/static/img/weixinPublic.jpg">
      </div>
      <div class="icon-svg">
        <img src="/static/img/npm.svg" />
        <img src="/static/img/rust.svg" />
        <img src="/static/img/node.svg" />
        <img src="/static/img/license.svg" />
      </div>
      <div class="powered">
        Powered by <span
        @click="openThirdPartySite('http://lilidong.cn')">西门互联</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $indicator-color: #3593f2;

  .icon-svg{
    text-align: center;
    img{
     display: inline-block;
    }
  }

  .left-layout-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }

  .user-info {
    flex: 0 0 150px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: 70px;
      flex: 0 0 70px;
      border-radius: 35px;
      cursor: pointer;
    }

    .login-name {
      margin-top: 14px;
      margin-bottom: 12px;
      font-size: 14px;
      flex: 0 0 16px;
      line-height: 16px;
      color: #4b595f;
    }

    :last-child {
      font-size: 13px;
      margin: 0 20px;
      flex: 0 0 18px;
      line-height: 18px;
      color: #849aa4;
    }
  }

  .other-site {
    margin-top: 20px;
    margin-bottom: 67px;
    list-style: none;
    flex: 0 0 20px;
    display: flex;
    justify-content: center;
    li {
      cursor: pointer;
      margin-right: 20px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    :last-child {
      margin-right: 0px;
    }
  }

  .left-menu {
    flex: 1 1 150px;
    min-height: 150px;
    display: flex;
    list-style: none;
    flex-direction: column;
    color: #4b595f;
    li {
      width: 100%;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      font-size: 16px;
      position:relative;
      &:before {
        width: 4px;
        height: 100%;
        content: '';
        margin-right: 46px;
        float: left;
        display: table;
      }
      &:hover {
        &:before {
          background-color: $indicator-color;
        }
      }
    }
    :first-child {
    
    }
    .line30{
      height:30px;
    }
  }

  .selected-menu {
    background-color: #e5f1fc;
    color: $indicator-color;
    &:before {
      background-color: $indicator-color;
    }
  }

  .weixin-group {
    flex: 0 0 170px;
    margin-top: 50px;
    margin-left: 55px;
    width: 90px;
    span {
      display: block;
      width: 100%;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      text-align: center;
      color: #849aa4;
      margin-bottom: 10px;
    }
    span:first-child {
      color: #4b595f;
    }
    img {
      width: 90px;
      height: 90px;
    }
  }

  .powered {
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #888888;
    span {
      text-decoration: underline;
    }
    span:hover {
      color: #484848;
      cursor: pointer;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'gitHubUser',
        'showWeiXinGroup',
        'thirdPartySite'
      ]),
      isBlog () {
        return this.$route.name && this.$route.name.startsWith('Blog')
      },
      isAboutMe () {
        return this.$route.name === 'AboutMe'
      },
      isChart () {
        return this.$route.name === 'OpusChart'
      }
    },
    methods: {
      home () {
        this.$router.push('/')
      },
      openThirdPartySite (url) {
        window.open(url)
      }
    }
  }
</script>
