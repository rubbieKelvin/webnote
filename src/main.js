import { createApp } from "vue";
import App from "./App.vue";

import "./styles/index.css";
import "./styles/font.css";
import "./styles/scrollbar.css";

import { router } from "./routes";
import { store } from "./store";
// import hljs from 'highlight.js'
import "highlight.js/lib/common";
import "highlight.js/styles/stackoverflow-light.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(hljsVuePlugin);

app.mount("#app");
