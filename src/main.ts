import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { msalInstance } from "@/libs/microsoftGraph";

await msalInstance.initialize();
createApp(App).use(router).mount("#app");
