export interface Button {
    render(): string; // 화면에 보여줄 메시지
    onClick(): string; // 클릭 결과 메시지
}

export class WindowsButton implements Button {
    render(): string {
        return "윈도우 스타일 버튼";
    }
    onClick(): string {
        return "윈도우 버튼 클릭!";
    }
}

export class MacButton implements Button {
    render(): string {
        return "맥 스타일 버튼";
    }
    onClick(): string {
        return "맥 버튼 클릭!";
    }
}