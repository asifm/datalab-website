// https://vitepress.dev/guide/custom-theme
import { h } from "vue";

import Layout from "./MyLayout.vue";

export default {
    Layout() {
        return h("div", { id: "customapp" }, [h(Layout)]);
    },
};
