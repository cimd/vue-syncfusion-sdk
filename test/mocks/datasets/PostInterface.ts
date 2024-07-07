export default interface Post {
    id: number
    title: string
    text: string
    author_id: number
    created_at: string
    updated_at: string
    deleted_at: string | null
}
