export interface INavMenu {
    name: string,
    url: string
}

export interface Ihttp {
    request<T>(method: string,
        url: string,
        params?: unknown):Promise<T>
}

export interface ITableData {
    name: string,
    count: number,
    state: boolean,
}
export interface IformData {
    goodsName: string,
    goodsNum: number,
    checkState: boolean,
}