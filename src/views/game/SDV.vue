<template>
  <div class="fill-height">
    <div class="image-wrapper">
      <v-img :src="$api.resolve(`/dsr-tools/sdv/stardew.webp`)" />
    </div>
    <v-container class="px-5 py-5">
      <v-row v-if="alert">
        <v-alert class="alert mt-3" type="info" :icon="mdiAlert" dense>{{ alert }}</v-alert>
      </v-row>
      <v-row>
        <v-col cols="12" sm="7">
          <v-card class="mx-auto">
            <v-card-title class="primary white--text">
              <span class="title">整合详情</span>
            </v-card-title>
            <v-card-text class="version-card version-card-detail">
              <v-list class="detail-wrapper">
                <v-subheader>模组列表</v-subheader>
                <v-list-item v-for="item of modList" :key="item.name">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }} - {{ item.version }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list class="detail-wrapper">
                <v-divider></v-divider>
                <v-subheader>下载地址</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <div class="download">
                      <div class="download-item" v-for="item of downloads" :key="item.code">
                        <v-btn large color="primary" :href="item.link" target="_blank">
                          {{ item.name }}&nbsp;-&nbsp;{{ item.code }}
                        </v-btn>
                      </div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5">
          <v-card class="mx-auto mb-5">
            <v-card-title class="primary white--text">
              <span class="title">游戏版本</span>
            </v-card-title>
            <v-card-text class="py-0 version-cur">
              <span>{{ curVersion }}</span>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto">
            <v-card-title class="primary white--text">
              <span class="title">版本历史</span>
            </v-card-title>
            <v-card-text class="py-0 version-list">
              <v-timeline dense>
                <v-timeline-item
                  v-for="(item, index) of versions"
                  :key="item"
                  :color="index === 0 ? 'info' : 'primary'"
                  small
                >
                  <span class="version-items grey--text text--darken-4">{{ item }}</span>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiAlert } from '@/utils/mdi';

export default {
  name: 'SDV',
  data() {
    return {
      loading: true,
      versions: [],
      modList: [],
      downloads: [],
      alert: '',
      mdiAlert,
    };
  },
  computed: {
    curVersion() {
      if (this.versions.length > 0) {
        const vArr = this.versions[0].split('.');
        vArr.pop();
        return vArr.join('.');
      }
      return '';
    },
  },
  async mounted() {
    const response = await this.$api.get('/dsr-tools/sdv/index.json');
    const res = response.data;
    res.versions.length && (this.versions = res.versions);
    res.modList.length && (this.modList = res.modList);
    res.downloads.length && (this.downloads = res.downloads);
    res.alert.length && (this.alert = res.alert);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.version-items {
  font-size: 0.875rem;
}

.ex-code {
  margin-left: 1rem;
}

.version-card {
  overflow: auto;
}

.version-card,
.version-items {
  height: 400px;
}

@media screen and (max-width: $responsive-width) {
  .version-card {
    height: 400px;
  }
}

.download {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .download-item {
    margin: 0.25rem;
    flex: 0 1 auto;
  }
}

.alert {
  margin: 12px;
  width: 100%;
}

.version-card-detail {
  display: flex;
  flex-direction: column;

  .detail-wrapper {
    &:first-child {
      flex: 1 1 auto;
      overflow-y: auto;
    }

    &:last-child {
      flex: 0 0 auto;
    }
  }
}

.version-cur span {
  display: block;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.2rem;
}

.version-list {
  max-height: 16.75rem;
  overflow-y: auto;
}
</style>
