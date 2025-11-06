// ---- Visitor & Element 타입 ----
export type Visitor = {
    visitFile(file: FileElement): void;
    visitFolder(folder: FolderElement): void;
};

export type Element = FileElement | FolderElement;

export type FileElement = {
    kind: "file";
    name: string;
    size: number;
    accept(v: Visitor): void;
};

export type FolderElement = {
    kind: "folder";
    name: string;
    children: Element[];
    accept(v: Visitor): void;
};

export function createFile(name: string, size: number): FileElement {
    return {
        kind: "file",
        name,
        size,
        accept(v: Visitor) {
            v.visitFile(this);
        },
    };
}

export function createFolder(name: string, children: Element[] = []): FolderElement {
    return {
        kind: "folder",
        name,
        children,
        accept(v: Visitor) {
            v.visitFolder(this);
        },
    };
}


export function createSizeCalculator() {
    let total = 0;
    const visitor: Visitor = {
        visitFile(file) {
            total += file.size;
        },
        visitFolder(folder) {
            for (const ch of folder.children) ch.accept(visitor);
        },
    };
    return {
        visitor,
        getTotalSize: () => total,
    };
}

export function createNamePrinter(sink: (line: string) => void) {
    const visitor: Visitor = {
        visitFile(file) {
            sink(`파일: ${file.name}`);
        },
        visitFolder(folder) {
            sink(`폴더: ${folder.name}`);
            for (const ch of folder.children) ch.accept(visitor);
        },
    };
    return { visitor };
}

export function createJsonPrinter(sink: (line: string) => void) {
    const visitor: Visitor = {
        visitFile(file) {
            sink(JSON.stringify({ type: "file", name: file.name, size: file.size }));
        },
        visitFolder(folder) {
            sink(JSON.stringify({ type: "folder", name: folder.name }));
            for (const ch of folder.children) ch.accept(visitor);
        },
    };
    return { visitor };
}