import Vue from 'vue';
import Message from '@/components/Message.vue';

const MessageClass = Vue.extend(Message);

function showMessage({ type = 'success', text = '', duration = 5000 }) {
  // remove exist message
  if (window._message) {
    window._message._timers.forEach((timer) => clearTimeout(timer));
    window._message.$destroy();
    window._message = null;
  }

  const message = new MessageClass({
    data() {
      return {
        text: text,
        type: type,
        style: { transition: `width ${duration}ms linear`, width: '100%' },
      };
    },
  });

  message.$mount();
  document.body.appendChild(message.$el);
  message.show = true;
  message._timers = [
    setTimeout(() => {
      message.style.width = '0';
    }, 300),
    setTimeout(() => {
      message.show = false;
    }, duration),
    setTimeout(() => {
      message.$destroy();
      document.body.removeChild(message.$el);
    }, duration + 600),
  ];

  window._message = message;
}

export const $message = showMessage;
export default {
  install(Vue) {
    Vue.prototype.$message = showMessage;
  },
};
