import Vue from 'vue';
import Message from '@/components/Message.vue';

const MessageClass = Vue.extend(Message);

function showMessage({ type = 'success', text = '' }) {
  const message = new MessageClass({
    data() {
      return {
        text: text,
        type: type,
      };
    },
  });
  message.$mount();
  document.body.appendChild(message.$el);
  message.show = true;
  setTimeout(() => {
    message.style.width = '0';
  }, 300);
  setTimeout(() => {
    message.show = false;
  }, 5000);
  setTimeout(() => {
    message.$destroy();
    document.body.removeChild(message.$el);
  }, 5600);
}

export const $message = showMessage;
export default {
  install(Vue) {
    Vue.prototype.$message = showMessage;
  },
};
