<script setup lang="ts">
import { ref } from "vue";
import { buildNotifier, type Channel } from "./decorator/decorator";

const msg = ref("긴급 서버 장애 발생!");
const logLines = ref<string[]>([]);
const selected = ref<Record<Channel, boolean>>({
  email: true,
  sms: false,
  slack: true,
  push: false,
});

function sink(line: string) {
  logLines.value.push(line);
  console.log(line);
}

function send() {
  logLines.value = [];
  const channels: Channel[] = (Object.keys(selected.value) as Channel[])
      .filter((k) => selected.value[k]);

  const notifier = buildNotifier(channels, sink);
  notifier.send(msg.value);

  if (logLines.value.length === 0) {
    logLines.value.push("(선택된 채널이 없습니다. 기본 알림만 사용하려면 아무 채널도 체크하지 말고 동작하게 변경하세요.)");
  }
}
</script>

<template>
  <main style="padding:24px; max-width:760px;">
    <h1>Decorator Pattern Demo</h1>
    <p>체크한 채널만 데코레이터로 감싸 조합합니다.</p>

    <label style="display:block; margin:12px 0 6px;">메시지</label>
    <input
        v-model="msg"
        style="width:100%; padding:10px 12px; border:1px solid #ccc; border-radius:10px;"
        placeholder="보낼 메시지를 입력하세요"
    />

    <div style="display:flex; gap:14px; flex-wrap:wrap; margin:16px 0;">
      <label><input type="checkbox" v-model="selected.email" /> Email</label>
      <label><input type="checkbox" v-model="selected.sms" /> SMS</label>
      <label><input type="checkbox" v-model="selected.slack" /> Slack</label>
      <label><input type="checkbox" v-model="selected.push" /> Push</label>
    </div>

    <button @click="send">알림 보내기</button>

    <pre style="background:#333; padding:16px; border-radius:10px; margin-top:16px; white-space:pre-wrap;">
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