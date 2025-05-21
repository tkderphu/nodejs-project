import api from "../interceptor/AxiosInterceptor"

class BookmarkService {
    checkBoormarked(userId: string, objId: string, objType: "POST" | "SERIES") {
        return api.get(`/bookmarks/check/${objId}/${objType}/${userId}`)
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