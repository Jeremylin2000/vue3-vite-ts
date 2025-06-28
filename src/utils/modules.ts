export interface INavMenu {
    name: string,
    url: string,
    icon?: Component; // 或者具体类型，比如 typeof IconDocument
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