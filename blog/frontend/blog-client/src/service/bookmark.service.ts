import api from "../interceptor/AxiosInterceptor"

class BookmarkService {
    checkBoormarked(objId: string, objType: "POST" | "SERIES") {
        return api.get(`/bookmarks/${objId}/${objType}`)
    }
    save(objId: string, objType: "POST" | "SERIES") {
        return api.post(`/bookmarks/${objId}/${objType}`)
    }
    delete(objId: string, objType: "POST" | "SERIES") {
        return api.delete(`/bookmarks/${objId}/${objType}`)
    }
    getBookmarks(userId: string, objType: string) {
        return api.get(`/bookmarks/user/${userId}/${objType}`)
    }
}
export default new BookmarkService()