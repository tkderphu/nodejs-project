import { Filter, ObjectId } from "mongodb"
import { Post, PostBase, PostPageRequest, PostPageUserBookMarkRequest, PostResponseDetail, PostUpdateReq } from "../model/post"
import CommentService from "./CommentService"
import LikeService from "./LikeService"
import { BookMarkRepository, FlowerRepository, FollowRepository, PostRepository, SeriesRepository, UnlockPostRepository } from "../../db/mongo"
import AccessDeniedException from "../exception/AccessDeniedException"
import { PageResult } from "../framework/common/page"
import { POST_DOCUMENT, USER_DOCUMENT } from "../../db/document"
import TaggingService from "./TaggingService"
import PostNotFoundException from "../exception/PostNotFoundException"
import UserService from "./UserService"
import BookMarkService from "./BookMarkService"
import NotificationService from "./NotificationService"
import FollowService from "./FollowService"
import { Bookmark } from "../model/bookmark"
import { Series } from "../model/series"
import { Follow } from "../model/follow"
import TransactionService from "./TransactionService"
class PostService {


    async save(userId: string, postReq: PostUpdateReq) {
        const userSimpl = await UserService.findById(userId)
        const post: PostBase = {
            comment: 0,
            like: 0,
            view: 0,
            timestamps: {
                createdAt: new Date(),
                updatedAt: new Date()
            },
            userId: userId,
            content: postReq.content,
            description: postReq.description,
            displayUrl: postReq.displayUrl,
            title: postReq.title,
            bookmark: 0,
            seriesId: postReq.seriesId,
            numberFlower: postReq.numberFlower,
            needUnlock: postReq.needUnlock,
            showContentPercent: postReq.showContentPercent,
            taggings: (await TaggingService.save(postReq.taggingNames))
        }
        const resp = await PostRepository.insertOne(post)
        //@ts-ignore
        NotificationService.saveNotifyPost({ _id: userSimpl?._id.toString(), fullName: userSimpl?.fullName }, { _id: resp.insertedId, title: post.title })
            .then(resp => {
                //send
            }).catch(err => {
                console.error("error send notifcation: ", err)
            })

    }

    update(postId: string, post: PostUpdateReq) {
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $set: {
                ...post
            }
        })
    }

    async getPostDetail(postId: string, userId: any) {
        const post: any = await this.findById(postId)
        post.user = await UserService.findById(post.userId)
        post.bookmark = await BookMarkService.countBookmark(post._id.toString(), 'POST')

        if(post.numberFlower && userId) {
            const unlock: any = await UnlockPostRepository.findOne({
                postId: postId,
                userId: userId
            })

            if(unlock) {
                post.currentUserUnloked = true
            }
        }
        return post
    }

    async findById(postId: string) {
        const result = await PostRepository.findOne({
            _id: new ObjectId(postId)
        })
        if (result) return result

        throw new PostNotFoundException("post not found")
    }


    countPostIsCreatedByUserId(userId: string) {
        return PostRepository.countDocuments({
            userPostId: userId
        })
    }

    async findAll(page: number, limit: number) {

        const countDocuments = await PostRepository.countDocuments({})

        const totalPage = Math.ceil(countDocuments / limit)
        const skip = (page - 1) * limit

        let result = PostRepository.find({})
            .skip(skip)
            .sort({ 'timestamps.createdAt': -1 })
            .limit(limit)

        let posts: any = (await result.toArray())

        for (let i = 0; i < posts?.length; i++) {
            posts[i].user = await UserService.findById(posts[i].userId)
            posts[i].bookmark = await BookMarkService.countBookmark(posts[i]._id.toString(), 'POST')
        }


        const pageResult: PageResult<Post> = {
            currentPage: page,
            list: posts,
            totalPage: totalPage
        }

        return pageResult
    }

    async findAllByFollowed(userId: string, page: number, limit: number) {
        const followed = await FollowService.getListFollowed(userId, "USER") as Follow[]
        const followedIds = followed.map(fol => {
            return fol.followObject._id?.toString()
        })
        const countDocuments = await PostRepository.countDocuments({
            "userId": {
                $in: followedIds
            }
        })

        const totalPage = Math.ceil(countDocuments / limit)
        const skip = (page - 1) * limit
        let result = PostRepository.find({
            "userId": {
                $in: followedIds
            }
        })
            .skip(skip)
            .sort({ 'timestamps.createdAt': -1 })
            .limit(limit)

        let posts: any = (await result.toArray())

        for (let i = 0; i < posts?.length; i++) {
            posts[i].user = await UserService.findById(posts[i].userId)
            posts[i].bookmark = await BookMarkService.countBookmark(posts[i]._id.toString(), 'POST')
        }


        const pageResult: PageResult<Post> = {
            currentPage: page,
            list: posts,
            totalPage: totalPage
        }

        return pageResult
    }


    async findAllByMyBookmark(userId: string, type: "POST" | "SERIES", page: number, limit: number, sortDate: -1 | 1) {
        const bookmarks = (await BookMarkService.getBookmarks(userId, type)) as Bookmark[]

        if (type == 'POST') {
            const postObjectId = bookmarks.map(bookmark => {
                return new ObjectId(bookmark.objId)
            })
            const countDocuments = (await PostRepository.countDocuments({
                _id: {
                    $in: postObjectId
                }
            }))
            const totalPage = Math.ceil(countDocuments / limit)
            const skip = (page - 1) * limit
            let result = PostRepository.find({
                _id: {
                    $in: postObjectId
                }
            })
                .skip(skip)
                .sort({ 'timestamps.createdAt': sortDate })
                .limit(limit)

            let posts: any = (await result.toArray())

            for (let i = 0; i < posts?.length; i++) {
                posts[i].user = await UserService.findById(posts[i].userId)
                posts[i].bookmark = await BookMarkService.countBookmark(posts[i]._id.toString(), 'POST')
            }


            const pageResult: PageResult<Post> = {
                currentPage: page,
                list: posts,
                totalPage: totalPage
            }

            return pageResult

        } else {
            const seriesObjectIds = bookmarks.map(bookmark => {
                return new ObjectId(bookmark.objId)
            })
            const countDocuments = (await SeriesRepository.countDocuments({
                _id: {
                    $in: seriesObjectIds
                }
            }))
            const totalPage = Math.ceil(countDocuments / limit)
            const skip = (page - 1) * limit
            let result = SeriesRepository.find({
                _id: {
                    $in: seriesObjectIds
                }
            })
                .skip(skip)
                .sort({ 'timestamps.createdAt': sortDate })
                .limit(limit)

            let series: any = (await result.toArray()) as Series[]

            for (let i = 0; i < series?.length; i++) {
                series[i].user = await UserService.findById(series[i].userId)
                series[i].bookmark = await BookMarkService.countBookmark(series[i]._id.toString(), 'POST')
            }


            const pageResult: PageResult<Post> = {
                currentPage: page,
                list: series,
                totalPage: totalPage
            }

            return pageResult
        }


    }


    updatelikePost(postId: string, userLikeId: string, up: number) {
        if (up > 0) {
            LikeService.createLike({
                userLikeId: userLikeId,
                postId: postId
            })
        } else {
            LikeService.deletelikePost(postId, userLikeId)
        }
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $inc: {
                like: up
            }
        })
    }


    async unlockPost(postId: string, userId: string) {
        const flower: any = await FlowerRepository.findOne({
            userId: userId
        })

        const unlockDoc = await UnlockPostRepository.findOne({
            userId: userId,
            postId: postId
        })

        if(unlockDoc) {
            return;
        }
        console.log("flower: ", flower)

        if (!flower) {
            throw new Error("Bạn không đủ hoa để mở khóa")
        }

        const post: any = await PostRepository.findOne({
            _id: new ObjectId(postId)
        })

        if (post.numberFlower) {
            if (flower.numberFlower < post.numberFlower) {
                throw new Error("Bạn không đủ hoa để mở khóa")
            }

            await TransactionService.addFlower("UNLOCK_ARTICLE",post.numberFlower, userId ,post.userId, postId)
            await UnlockPostRepository.insertOne({
                postId: postId,
                userId: userId
            })
        }

    }

}

export default new PostService()