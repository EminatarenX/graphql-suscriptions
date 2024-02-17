export interface IPubsubService {
    publish(event: string, args: any): void
    asyncIterator(event: string): any
}