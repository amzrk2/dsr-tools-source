<template>
  <transition name="fade">
    <div :class="['message', `message-${type}`]" v-if="show">
      <div class="message-text">{{ text }}</div>
      <div class="message-progress" :style="style"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      show: false,
      type: 'success',
      text: '',
      style: { transition: 'width 5000ms linear', width: '100%' },
    };
  },
  mounted() {
    if (!document.body.contains(this.$el)) {
      document.body.appendChild(this.$el);
    }
  },
  beforeDestroy() {
    if (document.body.contains(this.$el)) {
      document.body.removeChild(this.$el);
    }
  },
};
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  right: 1rem;
  top: 1rem;
  z-index: 99;
  height: 3rem;
  border-radius: 4px;
  color: #ffffff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  min-width: 5rem;
  max-width: 20rem;
  overflow: hidden;

  &-info {
    background-color: $color-info;
  }
  &-error {
    background-color: $color-error;
  }

  &-text {
    height: 2.8rem;
    line-height: 2.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 1rem;
  }
  &-progress {
    height: 0.2rem;
    line-height: 0.2rem;
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
