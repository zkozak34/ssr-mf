import { createApp } from "vue";
import App from "./App.vue";
import ApplicationRegister from "./mf/register-helper";
import "./style.css";

const mfRegister = new ApplicationRegister();

mfRegister.registerApplication({
  name: "child-1",
});

mfRegister.start();

createApp(App).mount("#app");
