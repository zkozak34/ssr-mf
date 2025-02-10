import { createApp, type App } from "vue";
import { default as ChildComponent } from "./App.vue";
import EntryVue from "./lib/entry-vue";
import router from "./routes/router";

const entryVue = new EntryVue({
	name: "child-1",
	createApp,
	component: ChildComponent,
	domElement: "#child-1",
	instanceModifier: (instance: App) => {
		instance.use(router);
	},
});

export const mount = entryVue.mount.bind(entryVue);
export const unmount = entryVue.unmount.bind(entryVue);
