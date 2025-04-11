import { CHECK_BOOKMARKED_BEGIN, CHECK_BOOKMARKED_FAILED, CHECK_BOOKMARKED_SUCCESS, FETCH_BOOKMARK_BEGIN, FETCH_BOOKMARK_FAILED, FETCH_BOOKMARK_SUCCESS, POP_POST_FROM_BOOKMARK_BEGIN, POP_POST_FROM_BOOKMARK_FAILED, POP_POST_FROM_BOOKMARK_SUCCESS, PSUH_POST_TO_BOOKMARK_BEGIN, PSUH_POST_TO_BOOKMARK_FAILED, PSUH_POST_TO_BOOKMARK_SUCCESS } from "../../action/bookmark/bookmark.action.type";
import { CHECK_IS_FOLLOWED_SUCCESS } from "../../action/follow/follow.action.type";

export const checkBookmarkedReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CHECK_BOOKMARKED_BEGIN: {
            return {
                loading: true
            }
        }
        case CHECK_BOOKMARKED_SUCCESS: {
            return {
                loading: false,
                status: action.payload
            }
        }
        case CHECK_BOOKMARKED_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const pushPostToBookmarkedReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case PSUH_POST_TO_BOOKMARK_BEGIN: {
            return {
                loading: true
            }
        }
        case PSUH_POST_TO_BOOKMARK_SUCCESS: {
            return {
                loading: false
            }
        }
        case PSUH_POST_TO_BOOKMARK_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const popPostFromBookmarkedReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case POP_POST_FROM_BOOKMARK_BEGIN: {
            return {
                loading: true
            }
        }
        case POP_POST_FROM_BOOKMARK_SUCCESS: {
            return {
                loading: false
            }
        }
        case POP_POST_FROM_BOOKMARK_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const fetchBookmarkReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_BOOKMARK_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_BOOKMARK_SUCCESS: {
            return {
                loading: false,
                bookmarks: action.payload
            }
        }
        case FETCH_BOOKMARK_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}