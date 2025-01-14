<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

const instance: any = getCurrentInstance();

function changeEvn() {
    console.log(import.meta.env.VITE_APP_URL);
    import.meta.env.VITE_APP_URL = "http://cj.lziapi.com/api.php/provide/vod/at/xml/"
    console.log(import.meta.env.VITE_APP_URL);
    getData();
}


function getData() {
    instance.proxy.$request.getListData({

    }).then((res: Object) => {
        console.log(res);
    })
}
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="changeEvn">count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
