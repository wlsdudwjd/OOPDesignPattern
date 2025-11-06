<script setup lang="ts">
import { ref, watch } from "vue";
import {
  createStock,
  createPriceDisplay,
  createPriceAlert,
  createMovingAvg,
  type Subject,
  type Observer,
} from "./observer/observer";

const logLines = ref<string[]>([]);
function sink(line: string) {
  logLines.value.push(line);
  console.log(line);
}

const stock: Subject = createStock();

const displayObserver: Observer = createPriceDisplay(sink);
const alertObserver: Observer = createPriceAlert(100, sink);
const maObserver: Observer = createMovingAvg(3, sink);

const price = ref<number>(0);
const selected = ref({
  display: true,
  alert: false,
  movingAvg: false,
});

watch(
    () => selected.value.display,
    (on) => (on ? stock.register(displayObserver) : stock.unregister(displayObserver)),
    { immediate: true }
);
watch(
    () => selected.value.alert,
    (on) => (on ? stock.register(alertObserver) : stock.unregister(alertObserver)),
    { immediate: true }
);
watch(
    () => selected.value.movingAvg,
    (on) => (on ? stock.register(maObserver) : stock.unregister(maObserver)),
    { immediate: true }
);

function applyPrice() {
  logLines.value = [];
  stock.setPrice(price.value);
}
</script>

<template>
  <main style="padding:24px; max-width:760px;">
    <h1>Observer Pattern Demo</h1>
    <p>주가를 바꾸면 등록된 옵저버(표시/알림/이동평균)가 자동으로 반응합니다.</p>

    <div style="display:flex; gap:12px; align-items:center; margin:12px 0;">
      <label>주가:</label>
      <input
          type="number"
          v-model.number="price"
          style="padding:8px 10px; border:1px solid #ccc; border-radius:10px; width:160px;"
      />
      <button @click="applyPrice">가격 반영</button>
    </div>

    <div style="display:flex; gap:16px; flex-wrap:wrap; margin:8px 0 16px;">
      <label><input type="checkbox" v-model="selected.display" /> Display</label>
      <label><input type="checkbox" v-model="selected.alert" /> Alert(> 100)</label>
      <label><input type="checkbox" v-model="selected.movingAvg" /> 3개 이동평균</label>
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