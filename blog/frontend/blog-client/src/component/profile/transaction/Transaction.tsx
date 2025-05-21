import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTransactionAction } from "../../../redux/store/action/transaction/transaction.action"
import { formatDate } from "../../../utils/utils"
import FullScreenLoader from "../../common/fullspinner/FullScreenLoader"
import "./Transaction.css"
export default function Transaction() {
    const fetchTransactionState: {
        loading: boolean,
        transactions: {
            createdAt: any
            message: string
            numberFlower: number,
            userId: string
        }[]
    } = useSelector((state: any) => {
        return state.fetchTransaction
    })

    const dispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchTransactionAction())
    }, [])

    return (
        <div className="">
            {fetchTransactionState.loading && <FullScreenLoader />}
            <div className="card-body">
                <div className="table-container">
                    <div className="table-responsive">
                        <table className="table table-hover text-center table-striped align-middle mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Nội dung</th>
                                    <th scope="col">Ngày giao dịch</th>
                                </tr>
                            </thead>
                            <tbody className="text-start">
                                {fetchTransactionState.transactions?.map((transaction, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>
                                                {transaction.numberFlower.toLocaleString()}
                                            </td>
                                            <td>
                                                {transaction.message}
                                            </td>
                                            <td>
                                                {formatDate(transaction.createdAt)}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>


    )
}