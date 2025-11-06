// ==== 장바구니 상태 타입 ====
export type CartItem = { id: string; name: string; price: number; qty: number };
export type CartState = { items: CartItem[] };

// ==== Memento ====
export type CartMemento = {
    readonly state: CartState;
    readonly ts: number;
    readonly tag?: string;
};

// 간단 deep copy (items: 순수 데이터)
function cloneState(s: CartState): CartState {
    return JSON.parse(JSON.stringify(s)) as CartState;
}

// ==== Originator: 장바구니 ====
export function createCart(initial?: CartItem[]) {
    // 내부 상태 (Originator)
    let _state: CartState = { items: initial ? [...initial] : [] };

    function findIndex(id: string) {
        return _state.items.findIndex((x) => x.id === id);
    }

    return {
        getState(): CartState {
            return cloneState(_state);
        },

        setState(next: CartState) {
            _state = cloneState(next);
        },

        addItem(item: CartItem) {
            const i = findIndex(item.id);
            if (i >= 0) {
                // ✅ 인덱스 검사 후 안전하게 접근
                _state.items[i]!.qty += item.qty;
            } else {
                _state.items.push({ ...item });
            }
        },

        setQty(id: string, qty: number) {
            const i = findIndex(id);
            if (i >= 0) {
                _state.items[i]!.qty = Math.max(0, Math.round(qty));
            }
        },

        remove(id: string) {
            const i = findIndex(id);
            if (i >= 0) {
                _state.items.splice(i, 1);
            }
        },

        clear() {
            _state.items = [];
        },

        createMemento(tag?: string) {
            return { state: cloneState(_state), ts: Date.now(), tag };
        },

        restore(m: CartMemento) {
            _state = cloneState(m.state);
        },
    };
}

// ==== Caretaker: undo/redo ====
export function createCaretaker(limit = 100) {
    const undo: CartMemento[] = [];
    const redo: CartMemento[] = [];

    return {
        canUndo: () => undo.length > 0,
        canRedo: () => redo.length > 0,
        save(originator: ReturnType<typeof createCart>, tag?: string) {
            undo.push(originator.createMemento(tag));
            if (undo.length > limit) undo.shift();
            redo.length = 0;
        },
        undo(originator: ReturnType<typeof createCart>) {
            if (!undo.length) return;
            const curr = originator.createMemento("auto-current");
            const target = undo.pop()!;
            redo.push(curr);
            originator.restore(target);
        },
        redo(originator: ReturnType<typeof createCart>) {
            if (!redo.length) return;
            const curr = originator.createMemento("auto-current");
            const target = redo.pop()!;
            undo.push(curr);
            originator.restore(target);
        },
        history() {
            return { undo, redo };
        },
    };
}

export function formatTime(ms: number) {
    const d = new Date(ms);
    const p = (n: number) => String(n).padStart(2, "0");
    return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}