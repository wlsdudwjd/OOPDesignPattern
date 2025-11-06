<script setup lang="ts">
import { ref } from "vue";
import {
  createFile,
  createFolder,
  createSizeCalculator,
  createNamePrinter,
  createJsonPrinter,
  type Element,
} from "./visitor/visitor";

const root: Element = createFolder("docs", [
  createFile("a.txt", 10),
  createFolder("sub", [createFile("b.txt", 20)]),
]);

const logLines = ref<string[]>([]);
function sink(line: string) {
  logLines.value.push(line);
  console.log(line);
}

function runSize() {
  logLines.value = [];
  const { visitor, getTotalSize } = createSizeCalculator();
  (root as any).accept(visitor);
  sink(`총 크기: ${getTotalSize()}`);
}

function runNames() {
  logLines.value = [];
  const { visitor } = createNamePrinter(sink);
  (root as any).accept(visitor);
}

function runJson() {
  logLines.value = [];
  const { visitor } = createJsonPrinter(sink);
  (root as any).accept(visitor);
}
</script>

<template>
  <main style="padding:24px; max-width:760px;">
    <h1>Visitor Pattern Demo</h1>
    <p>파일/폴더 구조(객체)는 그대로 두고, 연산(크기 계산/이름/JSON)만 Visitor로 교체합니다.</p>

    <div style="display:flex; gap:10px; margin:12px 0 16px;">
      <button @click="runSize">총 크기 계산</button>
      <button @click="runNames">이름 출력</button>
      <button @click="runJson">JSON 출력</button>
    </div>

    <pre style="background:#333; padding:16px; border-radius:10px; white-space:pre-wrap;">
{{ logLines.join('\n') }}
    </pre>
  </main>
</template>

<style scoped>
button {
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #444;
  color: #fff;
  transition: 0.15s;
}
button:hover { background: #666; }
</style>