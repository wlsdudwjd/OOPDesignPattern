export type Device = {
    isOn(): boolean;
    enable(): void;
    disable(): void;

    getVolume(): number;
    setVolume(v: number): void;

    getName(): string
};

export function createTV(name = "TV"): Device {
    let on = false;
    let volume = 30;
    return {
        isOn: () => on,
        enable: () => { on = true; },
        disable: () => { on = false; },
        getVolume: () => volume,
        setVolume: (v: number) => { volume = Math.max(0, Math.min(100, Math.round(v))); },
        getName: () => name,
    };
}

export function createRadio(name = "Radio"): Device {
    let on = true;
    let volume = 50;
    return {
        isOn: () => on,
        enable: () => { on = true; },
        disable: () => { on = false; },
        getVolume: () => volume,
        setVolume: (v: number) => { volume = Math.max(0, Math.min(100, Math.round(v))); },
        getName: () => name,
    };
}

export type Remote = {
    togglePower(): void;
    volumeUp(): void;
    volumeDown(): void;
};

export function createBasicRemote(device: Device, step = 5): Remote {
    return {
        togglePower() { device.isOn() ? device.disable() : device.enable(); },
        volumeUp() { device.setVolume(device.getVolume() + step); },
        volumeDown() { device.setVolume(device.getVolume() - step); },
    };
}

export type AdvancedRemote = Remote & { mute(): void };
export function createAdvancedRemote(device: Device, step = 5): AdvancedRemote {
    return {
        ...createBasicRemote(device, step),
        mute() { device.setVolume(0); },
    };
}