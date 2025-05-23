import api from "../interceptor/AxiosInterceptor"

const path = "/transactions"
class TransactionService {
    createTransaction(amount: number) {
        return api.post(path, {amount})
    }
    fetchTransaction() {
        return api.get(path)
    }
}
export default new TransactionService()