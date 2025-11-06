import type { Button } from "./buttons";
import { WindowsButton, MacButton } from "./buttons";

export abstract class Dialog {
    abstract createButton(): Button;

    render(): { label: string; clicked: string } {
        const btn = this.createButton();
        return {
            label: btn.render(),
            clicked: btn.onClick()
        };
    }
}

export class WindowsDialog extends Dialog {
    createButton(): Button {
        return new WindowsButton();
    }
}

export class MacDialog extends Dialog {
    createButton(): Button {
        return new MacButton();
    }
}