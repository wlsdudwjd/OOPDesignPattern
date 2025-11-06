<script setup lang="ts">
import { ref } from "vue";
import {
  NewPaymentGateway,
  PaymentAdapter,
  processPayment,
  type OldPaymentProcessor,
} from "./adapters/payment";

const amount = ref<number>(1000);
const log = ref<string>("(결제 로그가 여기 표시됩니다)");

let processor: OldPaymentProcessor | null = null;

function connectNewGateway() {
  const gateway = new NewPaymentGateway();
  processor = PaymentAdapter(gateway);
  log.value = "새 결제 게이트웨이를 어댑터로 연결했습니다.";
}

function doPay() {
  if (!processor) {
    log.value = "먼저 '게이트웨이 연결'을 눌러 주세요.";
    return;
  }
  processPayment(processor, amount.value);
  log.value = `${amount.value}원 결제 처리 요청 완료 (콘솔 로그 확인)`;
}
</script>

<template>
  <main style="padding:24px; max-width:680px">
    <h1>Adapter Pattern Demo</h1>
    <p>신규 결제 API를 기존 인터페이스(OldPaymentProcessor)로 연결합니다.</p>

    <div style="margin:12px 0;">
      <label>결제 금액: </label>
      <input
          type="number"
          v-model.number="amount"
          min="0"
          style="padding:6px 8px; border:1px solid #ccc; border-radius:8px; width:160px;"
      />
    </div>

    <div style="display:flex; gap:10px; margin:8px 0 16px;">
      <button @click="connectNewGateway">게이트웨이 연결</button>
      <button @click="doPay">결제 처리</button>
    </div>

    <pre style="background:#444; padding:16px; border-radius:8px;">{{ log }}</pre>

  </main>
</template>

<style scoped>
button {
  margin: 0;
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