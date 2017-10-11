<template>
  <div class="comment">
    <div class="comment-title">
      <div @click="openGitHub()">
        <img :src="comment.user.avatar_url">
        <span>{{comment.user.login}}</span>
      </div>

      <span class="time">{{$moment(comment.created_at).format('YYYY-MM-DD HH:mm')}}</span>
    </div>
    <div class="share-box">
      <span>分享到：</span>
      <share :config="config"></share>
    </div>
    <article class="markdown-body" v-html="renderedMarkdown"/>
  </div>
</template>
<style lang="scss" scoped>
@import '../../node_modules/social-share.js/dist/css/share.min.css';
  .share-box{
   margin-top:16px;
   position:relative;
   padding-left:80px;

   span{
    position: absolute;
    left:14px;
    line-height:40px;
   }

  
  }

  .comment {
    margin-top: 30px;
    border-radius: 4px;
    border: solid 1px #eeeeee;
  }

  .comment-title {
    height: 48px;
    line-height: 48px;
    background-color: #f9fafc;
    border-bottom: solid 1px #eeeeee;
    padding: 0px 30px;
    div {
      cursor: pointer;
      float: left;
      img {
        float: left;
        width: 30px;
        height: 30px;
        margin-top: 9px;
        border-radius: 15px;
        margin-right: 12px;
      }
      span {
        font-size: 14px;
        color: #4b595f;
      }
    }
    .time {
      float: right;
      margin-right: 20px;
      font-size: 12px;
      color: #849aa4;
    }
  }

  .markdown-body {
    padding: 15px;
  }
</style>
<script>
  import '../../node_modules/social-share.js/dist/js/social-share.min.js'
  export default {
    data () {
      return {
        renderedMarkdown: '',
        config: {}
      }
    },
    props: ['comment'],
    methods: {
      renderMarkdown () {
        this.renderedMarkdown = ''
        if (this.comment.body) {
          this.renderedMarkdown = this.$marked(this.comment.body)
        }
      },
      openGitHub () {
        window.open(this.comment.user.html_url)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.renderMarkdown()
      })
    }
  }
</script>
