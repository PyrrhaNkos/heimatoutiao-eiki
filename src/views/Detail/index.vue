<template>
  <div>
    <div v-show="articleInfo" class="main">
      <!-- 导航 -->
      <van-nav-bar
        title="黑马头条"
        left-arrow
        @click-left="$router.back()"
        class="detail-navbar"
      />
      <!-- 标配 -->
      <h1 class="article-title">{{ articleInfo.title }}</h1>
      <!-- 作者栏 -->
      <div class="HouseDetail_User">
        <van-card>
          <template #thumb>
            <van-image
              round
              width="80"
              height="80"
              :src="articleInfo.aut_photo"
              alt=""
            />
          </template>

          <template #title>
            <h4 class="detail_user">{{ articleInfo.aut_name }}</h4>
          </template>

          <template #desc>
            <p class="detail_time">
              {{ articleInfo.pubdate }}
            </p>
          </template>
        </van-card>
        <van-button
          class="user-btn"
          v-if="!articleInfo.is_followed"
          @click="addFollow"
          :loading="followLoding"
        >
          <van-icon name="plus" />关注
        </van-button>
        <van-button
          class="user-btn-follow"
          v-else
          @click="cancelFollow"
          :loading="followLoding"
        >
          已关注
        </van-button>
      </div>
      <!-- 文章详情 -->
      <article
        v-html="articleInfo.content"
        class="markdown-body"
        ref="content"
      ></article>
      <van-divider class="divider" dashed> 正文结束 </van-divider>

      <!-- 文章评论列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="0"
        :error.sync="error"
        error-text="房间获取失败，点击重新加载"
      >
        <CommentList :commentList="articleCommentList"></CommentList>
      </van-list>

      <!-- 底部功能区域 -->
      <footer class="article-footer">
        <!-- 左侧评论 -->
        <van-button round @click="showAddComment = true">写评论</van-button>
        <van-popup
          position="bottom"
          :style="{ height: '22%' }"
          v-model="showAddComment"
        >
          <AddComment :id="id" @addComment="addComment"></AddComment>
        </van-popup>
        <!-- 右侧收藏点赞 -->
        <van-icon name="comment-o" :badge="total_count" />
        <van-icon
          :name="!articleInfo.is_collected ? 'star-o' : 'star'"
          @click="collectionsFn"
        />
        <van-icon
          :name="articleInfo.attitude === 1 ? 'good-job' : 'good-job-o'"
          @click="liking"
          :badge="articleInfo.like_count"
        />
        <van-icon name="share" />
      </footer>

      <!-- 评论的评论弹层 -->
      <van-popup
        v-model="showCommentPage"
        position="bottom"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
        close-icon="close"
      >
        <CommentPage
          :commentList="commentList"
          :id="comId"
          :art_id="id"
          :commentItem="commentItem"
          :showCommentPage="showCommentPage"
        ></CommentPage>
      </van-popup>
    </div>
  </div>
</template>
<script>
import AddComment from './components/AddComment.vue'
import CommentList from './components/CommentList.vue'
import CommentPage from './components/CommentPage.vue'
import { ImagePreview } from 'vant'
import {
  getArticleDetailApi,
  addFollowApi,
  cancelFollowApi,
  addCollectionsApi,
  cancelCollectionsApi,
  addLikingsApi,
  cancelLikingsApi,
  getArticleCommentsApi
} from '@/api'
export default {
  name: '',
  data() {
    return {
      comId: '', // 评论ID
      commentItem: {}, // 当前进入的评论项
      id: this.$route.query.id, // 文章id
      articleInfo: {}, // 文章信息
      followLoding: false,
      showAddComment: false,
      typeA: 'a', // 文章评论type
      articleCommentList: [], // 文章评论列表
      total_count: '',
      typeC: 'c', // 评论的评论type
      commentList: [], // 评论的评论列表
      limit: 5,
      loading: false,
      finished: false,
      error: false,
      showCommentPage: false // 二级评论页弹层
    }
  },
  components: { AddComment, CommentList, CommentPage },
  computed: {},
  created() {
    this.getArticleDetail()
    this.getArticleComments()
  },
  mounted() {
    this.$bus.$on('showComPage', async (item) => {
      this.showCommentPage = true
      this.comId = item.com_id
      this.commentItem = item
      console.log(item.com_id)
      const { data } = await getArticleCommentsApi({
        type: this.typeC,
        source: item.com_id,
        limit: 3
      })
      console.log(data)
      this.commentList = data.data.results
    })
    this.$bus.$on('addReplyCount', (id) => {
      console.log(id)
      const index = this.articleCommentList.findIndex(
        (item) => item.com_id === id
      )
      this.articleCommentList[index].reply_count += 1
    })
    this.$bus.$on('addCommentList', (item) => {
      console.log('添加评论的评论')
      this.commentList.unshift(item)
    })
  },
  updated() {
    this.getImg()
  },
  methods: {
    getImg() {
      const contentEl = this.$refs.content
      const allImg = contentEl.querySelectorAll('img')
      //   console.log(allImg)
      const images = []
      allImg.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    async getArticleDetail() {
      this.$toast.loading({
        message: '正在加载...',
        forbidClick: true
      })
      try {
        const { data } = await getArticleDetailApi(this.id)
        console.log(data)
        this.articleInfo = data.data
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('加载失败，请刷新后重试')
      }
    },
    async addFollow() {
      try {
        this.followLoding = true
        await addFollowApi(this.articleInfo.aut_id)
        this.articleInfo.is_followed = true
      } catch (error) {
        this.$toast.fail('关注失败，请刷新后重试')
      } finally {
        this.followLoding = false
      }
    },
    async cancelFollow() {
      try {
        this.followLoding = true
        await cancelFollowApi(this.articleInfo.aut_id)
        this.articleInfo.is_followed = false
      } catch (error) {
        this.$toast.fail('取消关注失败，请刷新后重试')
      } finally {
        this.followLoding = false
      }
    },
    async collectionsFn() {
      if (!this.articleInfo.is_collected) {
        // 添加收藏
        try {
          this.$toast.loading({
            message: '正在添加收藏...',
            forbidClick: true
          })
          await addCollectionsApi(this.articleInfo.art_id)
          this.articleInfo.is_collected = true
          this.$toast.success('添加收藏成功')
        } catch (error) {
          this.$toast.fail('添加收藏失败，请刷新后重试')
        }
      } else {
        try {
          // 取消收藏
          this.$toast.loading({
            message: '正在添加收藏...',
            forbidClick: true
          })
          await cancelCollectionsApi(this.articleInfo.art_id)
          this.articleInfo.is_collected = false
          this.$toast.success('取消收藏成功')
        } catch (error) {
          this.$toast.fail('取消收藏失败，请刷新后重试')
        }
      }
    },
    async liking() {
      if (this.articleInfo.attitude === 1) {
        // 取消点赞
        try {
          await cancelLikingsApi(this.articleInfo.art_id)
          this.articleInfo.attitude = -1
          this.$toast.success('取消点赞成功')
          this.articleInfo.like_count -= 1
        } catch (error) {
          this.$toast.fail('取消点赞失败，请刷新后重试')
        }
      } else {
        try {
          // 点赞
          await addLikingsApi(this.articleInfo.art_id)
          this.articleInfo.attitude = 1
          this.$toast.success('点赞成功')
          this.articleInfo.like_count += 1
        } catch (error) {
          this.$toast.fail('点赞失败，请刷新后重试')
        }
      }
    },
    async getArticleComments() {
      try {
        const { data } = await getArticleCommentsApi({
          type: this.typeA,
          source: this.id,
          limit: this.limit
        })
        console.log(data)
        this.articleCommentList = data.data.results
        this.total_count = data.data.total_count
      } catch (error) {
        this.$toast.fail('加载评论失败，请刷新后重试')
      }
    },
    async onLoad() {
      const index = this.articleCommentList.length - 1
      try {
        const { data } = await getArticleCommentsApi({
          type: this.typeA,
          source: this.id,
          offset: this.articleCommentList[index].com_id,
          limit: this.limit
        })
        console.log(data)
        if (
          !data.data.results ||
          data.data.total_count <= this.articleCommentList.length
        ) {
          this.finished = true
          this.loading = false
          return
        }
        this.articleCommentList = [
          ...this.articleCommentList,
          ...data.data.results
        ]
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    addComment(item) {
      this.articleCommentList.unshift(item)
      this.showAddComment = false
      this.total_count += 1
    }
  }
}
</script>
<style lang="less" scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
:deep(.detail-navbar) {
  .van-nav-bar__content {
    background-color: #3296fa;
    .van-nav-bar__left {
      .van-icon {
        color: #fff;
      }
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.article-title {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.HouseDetail_User {
  position: relative;
  :deep(.van-card) {
    background-color: #fff;
    margin: 0;
    padding: 0;
    .van-card__content {
      padding-left: 130px;
      .detail_user {
        font-size: 0.32rem;
        color: #3a3a3a;
        font-weight: 400;
      }
      .detail_time {
        font-size: 0.30667rem;
        color: #b7b7b7;
      }
    }
  }
  .user-btn,
  .user-btn-follow {
    position: absolute;
    top: 45px;
    right: 20px;
    width: 150px;
    height: 50px;
    color: #33be85;
    border-radius: 75px;
    padding: 3px 15px;
    font-size: 20px;
    color: #fff;
    border: 0.02667rem solid #1989fa;
    background: rgb(50, 150, 250);
    border-color: rgb(50, 150, 250);
  }
  .user-btn-follow {
    background-color: #fff;
    color: #000;
    border: 0.02667rem solid #000;
  }
  .van-card__thumb {
    position: absolute;
    top: 40px;
    left: 30px;
    width: 100px;
  }
}

:deep(.article-footer) {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  background-color: #fff;
  .van-button {
    width: 310px;
    height: 50px;
    margin-top: 10px;
    .van-button__text {
      font-size: 0.4rem;
      line-height: 0.61333rem;
      color: #a7a7a7;
    }
  }
  .van-icon {
    font-size: 40px;
    padding-top: 15px;
  }
}

.divider {
  color: #1989fa;
  border-color: #1989fa;
  padding: 0 16px;
}
.main {
  margin-bottom: 100px;
}
</style>
