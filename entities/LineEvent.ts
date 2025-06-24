export interface LineEvent {
    id: string
    status: 'DELETED' | 'CURRENT' | 'EXPIRED'
    pikud: string
    userId: string
    date: Date
}

export interface DeletedLineEvent extends LineEvent {
    status: 'DELETED'
}

export interface UpdatedLineEvent extends LineEvent {
    status: 'CURRENT' | 'EXPIRED'
}