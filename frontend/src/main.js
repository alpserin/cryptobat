import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCaretDownFill, BiCaretUpFill } from "oh-vue-icons/icons";

addIcons(BiCaretDownFill, BiCaretUpFill);

const app = createApp(App).use(router)
app.component("v-icon", OhVueIcon);
app.mount("#app");
