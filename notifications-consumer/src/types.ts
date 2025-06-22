export interface LineEvent {
    id: string
    status: 'DELETED' | 'CURRENT' | 'EXPIRED'
    userId: string
}