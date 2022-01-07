export interface Product {
    code: string,
    currency: string,
    ID: string,
    name: string,
    organization_id: string,
    retail_price: number,
    retail_unit: string,
    search_name: string,
    status: string,
    type: string,
    wholesale_price: number,
    wholesale_unit: string
}

export interface ProductListRequest {
    ids?: string[]
    codes?: string[]
    keyword?: string
    organization_ids?: string[]
    status?: string
    limit?: number
    page?: number
}

export type Products = Product[]