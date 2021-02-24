<template>
  <div class="fill-height">
    <v-container fluid>
      <v-row class="mx-5 mt-5 mb-0 row-ctrl">
        <v-col cols="12" md="10">
          <v-text-field
            v-model.trim="room"
            label="直播间地址或房间号"
            filled
            clearable
            dense
            :loading="loading"
            :error="validateRoom.error"
            :error-messages="validateRoom.msg"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            class="btn-fetch mt-1"
            large
            color="primary"
            :loading="loading"
            @click="handleGetList"
          >
            获取
          </v-btn>
        </v-col>
      </v-row>
      <template v-if="list.length > 0">
        <v-row class="ma-0 row-page">
          <v-col class="row-page-left" cols="3">
            <v-btn
              class="btn-page mr-1"
              small
              color="info"
              @click="handleChangePage(page - 1)"
              v-if="page > 1"
            >
              上一页
            </v-btn>
            <v-btn
              class="btn-page ml-1"
              small
              color="info"
              @click="handleChangePage(page + 1)"
              v-if="page < Math.ceil(count / 20)"
            >
              下一页
            </v-btn>
          </v-col>
          <v-col class="row-page-right" cols="9">
            <span>第</span>
            <v-text-field
              class="page-input mt-0"
              v-model="pageInput"
              single-line
              dense
              :error="pageInput <= 0 || pageInput > Math.ceil(count / 20)"
              hide-details
            ></v-text-field>
            <span class="mr-2">页&nbsp;共&nbsp;{{ Math.ceil(count / 20) }}&nbsp;页</span>
            <v-btn class="btn-page mr-5" small color="info" @click="handleChangePage(pageInput)">
              跳转
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          class="mx-5 mt-0 mb-5 row-list"
          :style="{
            position: 'relative',
            height: loading ? `15rem` : 'unset',
            overflow: loading ? `hidden` : 'unset',
          }"
        >
          <v-overlay absolute :opacity="1" color="white" :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
          <v-col cols="3" v-for="item of list" :key="item.rid">
            <a class="list-item" :href="item.href" target="_blank">
              <div class="list-image">
                <img :src="item.cover" referrerpolicy="no-referrer" />
                <span class="list-length">{{ item.length }}</span>
              </div>
              <span class="list-title">{{ item.title }}</span>
              <span class="list-date">{{ item.date }}&nbsp;{{ item.time }}</span>
            </a>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
const API_BASE = 'https://workers.dsrkafuu.su/bilive';

export default {
  name: 'BiLive',
  data() {
    return {
      loading: false,
      room: '',
      realID: NaN,
      count: NaN,
      list: [],
      page: 1,
      pageInput: 1,
    };
  },
  computed: {
    roomID() {
      const num = Number(this.room);
      if (num > 0) {
        return num;
      }
      const exp = /live\.bilibili\.com\/([0-9]*)\/?\??/.exec(this.room);
      if (exp && exp[1]) {
        const num = Number(exp[1]);
        if (num > 0) {
          return num;
        }
      }
      return NaN;
    },
    validateRoom() {
      if (this.room === '' || this.roomID > 0) {
        return { error: false, msg: '' };
      }
      return { error: true, msg: '无效的直播间地址或房间号' };
    },
  },
  methods: {
    /**
     * @param {number} roomID
     */
    async fetchRealID(roomID) {
      let res = await this.$axios.get(`${API_BASE}/room/v1/Room/room_init?id=${roomID}`);
      this.realID = res.data.data.room_id || roomID;
    },
    /**
     * @param {number} realID
     * @param {number} page
     */
    async fetchRecordList(realID, page = 1) {
      // get res
      let res = await this.$axios.get(
        `${API_BASE}/xlive/web-room/v1/record/getList?room_id=${realID}&page=${page}&page_size=20`
      );
      res = res.data;
      // set data
      res.data.count >= 0 && (this.count = res.data.count);
      if (res.data.list.length > 0) {
        const list = [];
        const fmt = (num) => (num > 9 ? `${num}` : `0${num}`);
        const cvt = (num) =>
          `${fmt(Math.floor(num / 3600))}` +
          `:${fmt(Math.floor((num % 3600) / 60))}` +
          `:${fmt(Math.floor(num % 60))}`;
        res.data.list.forEach((item, index) => {
          const date = new Date(item.start_timestamp * 1000);
          list.push({
            rid: item.rid,
            href: `https://live.bilibili.com/record/${item.rid}`,
            title: item.title,
            cover: `https${/https?(:\/\/.*)/.exec(item.cover)[1]}`,
            date: `${date.getFullYear()}-${fmt(date.getMonth() + 1)}-${fmt(date.getDate())}`,
            time: `${fmt(date.getHours())}:${fmt(date.getMinutes())}:${fmt(date.getSeconds())}`,
            length: cvt(item.length / 1000),
          });
        });
        this.list = list;
      }
      // set page
      this.page = page;
      this.pageInput = page;
    },
    async handleGetList() {
      this.loading = true;
      if (Number.isNaN(this.roomID)) {
        this.$message({ type: 'error', text: '无效的直播间地址或房间号' });
        return;
      }
      await this.fetchRealID(this.roomID);
      if (this.realID) {
        await this.fetchRecordList(this.realID);
      }
      this.loading = false;
    },
    /**
     * @param {number} page
     */
    async handleChangePage(page = 1) {
      if (page <= 0 || page > Math.ceil(this.count / 20)) {
        this.$message({ type: 'error', text: '无效的页号' });
        return;
      }
      this.loading = true;
      if (this.realID) {
        await this.fetchRecordList(this.realID, page);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $responsive-desktop) {
  .row-ctrl {
    & > div:first-child {
      padding-bottom: 0 !important;
    }

    & > div:last-child {
      padding-top: 0 !important;
    }
  }
}

.btn-fetch {
  width: 100%;
}

.row-page {
  &-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .btn-page:first-child {
      margin-left: 1.25rem !important;
    }
  }

  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .page-input {
      flex: 0 0 auto;
      width: 2rem;

      ::v-deep input {
        text-align: center;
      }
    }
  }
}

.list {
  &-item {
    border-radius: 0.25rem;
    overflow: hidden;
    transition: all 150ms ease;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: inherit;

    &:hover {
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
        0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
    }
  }

  &-image {
    overflow: hidden;
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
    background-color: #eeeeee;

    img {
      display: block;
      width: 100%;
      border-radius: 0.25rem;
    }
  }

  &-length {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 0.25rem;
    background-color: rgba(0, 0, 0, 0.3);
    color: rgb(220, 220, 220);
    z-index: 2;
    font-size: 0.875rem;
    border-bottom-right-radius: 0.25rem;
  }

  &-title {
    display: block;
    text-align: center;
    font-size: 0.9375rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.2rem 0.2rem;
    padding-bottom: 0;
  }

  &-date {
    display: block;
    text-align: center;
    font-size: 0.875rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    padding: 0 0.2rem;
    color: #999999;
  }
}
</style>
