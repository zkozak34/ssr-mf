import { createApp } from "vue";
import App from "./App.vue";
import ApplicationRegister from "./mf/register-helper";

const mfRegister = new ApplicationRegister();

mfRegister.registerApplication({
  name: "child-1",
});

mfRegister.start();

createApp(App).mount("#app");
