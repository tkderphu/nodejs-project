import api from "../interceptor/AxiosInterceptor"
import { Comment } from "../model/Comment"
import { Post } from "../model/Post"
import { UserProfile } from "../model/User"
export interface ReportResp {
    type: "COMMENT" | "POST",
    post?: Post,
    comment?: Comment,
    reason: string,
    _id: string,
    createdAt: string
    status:  "PENDING" | "RESOLVED",
    user: UserProfile
}
export interface ReportReq {
    type: "COMMENT" | "POST",
    typeId: any
    reason: string
}
class ReportService {
    report(req: ReportReq) {
        return api.post("/reports", req)
    }
    getListReport(type: any, status?: "PENDING" | "RESOLVED") {
        return api.get(`/reports?type=${type}${status ? `&status=${status}` : ""}`)
    }
}
export default new ReportService()