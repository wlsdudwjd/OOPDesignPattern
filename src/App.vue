<script setup lang="ts">
import { ref } from "vue";
import { Singleton } from "./services/singleton";

// 싱글톤 인스턴스 가져오기
const instance = Singleton.getInstance();

const message = ref("");

function handleClick() {
  message.value = instance.sayHello();
}
</script>

<template>
  <main style="padding: 24px">
    <h1>Eager Singleton Demo</h1>

    <button @click="handleClick">
      싱글톤 메서드 호출하기
    </button>

    <p style="margin-top: 16px;">{{ message }}</p>
  </main>
</template>

<style scoped>
button {
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid #aaa;
  cursor: pointer;
  background: gray;
}
button:hover {
  background: #e8e8e8;
}
</style>