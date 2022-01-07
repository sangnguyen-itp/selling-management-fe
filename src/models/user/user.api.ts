export interface GetUserRequest {
    id: string
}

export interface GetUserReply {
    address?: string
    first_name?: string
    id: string
    is_system?: true
    last_name?: string
    login_time?: string
    organization_id?: string
    phone_number?: string
    role?: string
    status?: string
    username?: string
}