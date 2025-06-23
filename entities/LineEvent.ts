export interface LineEvent {
    id: string
    status: 'DELETED' | 'CURRENT' | 'EXPIRED'
    userId: string
    date: Date
}

export interface DeletedLineEvent extends LineEvent {
    status: 'DELETED'
}

export interface UpdatedLineEvent extends LineEvent {
    status: 'CURRENT' | 'EXPIRED'
}