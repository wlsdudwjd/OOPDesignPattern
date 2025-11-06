<script setup lang="ts">
import { ref } from "vue";
import { Dialog, WindowsDialog, MacDialog } from "./factory/dialog";

const result = ref("");
let dialog: Dialog | null = null;

function setOS(os: "Windows" | "Mac") {
  dialog = os === "Windows" ? new WindowsDialog() : new MacDialog();
  result.value = ` ${os} 환경 제조 공장 선택됨`;
}

function createButton() {
  if (!dialog) {
    result.value = "⚠️ 먼저 OS를 선택하세요!";
    return;
  }
  const { label, clicked } = dialog.render();
  result.value = `${label}\n ${clicked}`;
}
</script>

<template>
  <main style="padding: 24px">
    <h1>Factory Method Pattern Demo</h1>
    <p>OS에 따라 다른 버튼을 생성합니다 ✔</p>

    <button @click="setOS('Windows')">Windows 설정</button>
    <button @click="setOS('Mac')">Mac 설정</button>

    <hr style="margin: 16px 0" />

    <button @click="createButton">버튼 생성</button>

    <pre style="margin-top: 20px; background: #444; padding: 16px; border-radius: 8px;">
{{ result }}
    </pre>
  </main>
</template>

<style scoped>
button {
  margin-right: 10px;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #444;
  color: #fff;
  transition: 0.15s;
}
button:hover {
  background: #666;
}
</style>