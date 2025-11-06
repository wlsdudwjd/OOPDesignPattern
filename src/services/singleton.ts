// 싱글톤 클래스 정의 (Eager Initialization)
export class Singleton {
    // 클래스 로딩 시 즉시 생성
    private static readonly instance: Singleton = new Singleton();

    private constructor() {}

    // 유일 인스턴스 반환
    public static getInstance(): Singleton {
        return Singleton.instance;
    }

    public sayHello(): string {
        return "안녕하세요! 저는 싱글톤 인스턴스입니다 👋";
    }
}