export interface Account {
    id: number;
    token: string;
    storeId: number;
    roleId: number;
}
export type Accounts = Array<Account>;