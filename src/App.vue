<script setup lang="ts">
import { ref } from "vue";
import {
  listPrototypeKeys,
  createFromPrototype,
  type PrototypeKey,
  type Shape,
} from "./prototype/prototype";

const keys = listPrototypeKeys();
const selected = ref<PrototypeKey>(keys[0]);
const item = ref<Shape | null>(null);
const log = ref<string[]>([]);
const pushLog = (s: string) => { log.value.push(s); console.log(s); };

function makeClone() {
  pushLog("🟡 makeClone 클릭됨");
  item.value = createFromPrototype(selected.value);
  if (item.value) {
    pushLog(`✅ '${selected.value}'에서 복제 성공`);
  } else {
    pushLog("❌ 복제 실패: item이 null");
  }
}

function nudge(dx: number, dy: number) {
  if (!item.value) return;
  item.value.x += dx;
  item.value.y += dy;
}
function grow() {
  if (!item.value) return;
  if (item.value.kind === "circle") item.value.radius += 5;
  else { item.value.width += 8; item.value.height += 4; }
}
function shrink() {
  if (!item.value) return;
  if (item.value.kind === "circle") item.value.radius = Math.max(1, item.value.radius - 5);
  else {
    item.value.width = Math.max(2, item.value.width - 8);
    item.value.height = Math.max(2, item.value.height - 4);
  }
}
function setColor(c: string) {
  if (!item.value) return;
  item.value.color = c;
}
</script>

<template>
  <main style="padding:24px; max-width:820px;">
    <h1>Prototype Pattern</h1>

    <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
      <select v-model="selected" style="padding:8px 10px; border:1px solid #ccc; border-radius:10px;">
        <option v-for="k in keys" :key="k" :value="k">{{ k }}</option>
      </select>
      <button @click="makeClone">복제본 만들기</button>
    </div>

    <svg viewBox="0 0 220 160" width="440" height="320"
         style="background:#fafafa;border:1px solid #ddd;border-radius:10px;">
      <g v-if="item">
        <circle
            v-if="item.kind==='circle'"
            :cx="item.x + 110"  :cy="item.y + 80"
            :r="item.radius"
            :fill="item.color" stroke="#333" stroke-width="1"
        />
        <rect
            v-else
            :x="item.x + 110 - item.width/2" :y="item.y + 80 - item.height/2"
            :width="item.width" :height="item.height"
            :fill="item.color" stroke="#333" stroke-width="1" rx="4" ry="4"
        />
      </g>
    </svg>

    <!-- 조작 패널 -->
    <div v-if="item" style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
      <button @click="nudge(-5,0)">←</button>
      <button @click="nudge(5,0)">→</button>
      <button @click="nudge(0,-5)">↑</button>
      <button @click="nudge(0,5)">↓</button>
      <button @click="grow">크게</button>
      <button @click="shrink">작게</button>

      <label style="margin-left:8px;">색상:
        <input type="color" :value="item.color"
               @input="setColor(($event.target as HTMLInputElement).value)" />
      </label>
    </div>

    <h3 style="margin-top:16px;">로그</h3>
    <pre style="background:#333; padding:12px; border-radius:8px; white-space:pre-wrap;">
{{ log.join('\n') }}
    </pre>
  </main>
</template>

<style scoped>
button {
  padding: 8px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #444; color: #fff; transition: .15s;
}
button:hover { background: #666; }
</style>