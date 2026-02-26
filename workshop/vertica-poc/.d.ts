declare module 'vertica-nodejs' {
  export class Client {
    constructor(config?: any)
    connect(): void
    query(queryText: string, callback: (err: Error | null, res: { rows: any[] }) => void): void
    end(): void
  }
}
