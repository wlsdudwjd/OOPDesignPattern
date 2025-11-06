export type Notifier = {
    send(message: string): void;
};

export function baseNotifier(sink: (line: string) => void): Notifier {
    return {
        send(message: string) {
            sink(`기본 알림: ${message}`);
        },
    };
}

export function withEmail(n: Notifier, sink: (line: string) => void): Notifier {
    return {
        send(message: string) {
            n.send(message);
            sink(`이메일 발송: ${message}`);
        },
    };
}

export function withSMS(n: Notifier, sink: (line: string) => void): Notifier {
    return {
        send(message: string) {
            n.send(message);
            sink(`SMS 발송: ${message}`);
        },
    };
}

export function withSlack(n: Notifier, sink: (line: string) => void): Notifier {
    return {
        send(message: string) {
            n.send(message);
            sink(`Slack 발송: ${message}`);
        },
    };
}

export function withPush(n: Notifier, sink: (line: string) => void): Notifier {
    return {
        send(message: string) {
            n.send(message);
            sink(`푸시 발송: ${message}`);
        },
    };
}

export type Channel = "email" | "sms" | "slack" | "push";

export function buildNotifier(selected: Channel[], sink: (line: string) => void): Notifier {
    let n = baseNotifier(sink);      // 시작점

    if (selected.includes("email")) n = withEmail(n, sink);
    if (selected.includes("sms"))   n = withSMS(n, sink);
    if (selected.includes("slack")) n = withSlack(n, sink);
    if (selected.includes("push"))  n = withPush(n, sink);

    return n;
}