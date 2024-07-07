export default interface Schedule {
    id: number
    task: string
    start: string
    finish: string
    duration: number
    created_at: string
    updated_at: string
    deleted_at: string | null
}
