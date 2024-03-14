import singleSpaVue from 'single-spa-vue'
import { createApp } from 'vue'
import App from 'app.vue'

const childApplication = singleSpaVue({
  createApp,
  appOptions: {
    name: '@tesodev/child-1',
    render: (h: any) => h(App)
  },
  handleInstance: () => {}
});

export const bootstrap = childApplication.bootstrap;
export const mount = childApplication.mount;
export const unmount = childApplication.unmount;