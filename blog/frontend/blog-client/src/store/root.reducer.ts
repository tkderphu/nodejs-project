import {combineReducers} from 'redux'
import { createCommentReducer } from './reducer/comment/comment.reducer'

const rootReducer = combineReducers({
    createComment: createCommentReducer
})

export default rootReducer