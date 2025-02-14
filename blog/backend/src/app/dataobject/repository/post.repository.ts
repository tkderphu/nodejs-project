import { ObjectId } from "mongodb";
import db from "../../../db/mongo";
import { Post } from "../model/post";


class PostRepository {

    private postCollection = db.collection("post")


    save(post: Post) {
        return this.postCollection.insertOne({
            ...post,
            _id: new ObjectId(post._id)
        })
    }
    findById(postId: string) {
        return this.postCollection.findOne({
            _id: new ObjectId(postId)
        })
    }

    findAll() {
        return this.postCollection.find().toArray();
    }

    findAllByTaggingId(tagginId: string) {
        return this.postCollection.find({
            taggingId: tagginId
        })
    }

    countPostIsCreatedByUserId(userId: string) {
        return this.postCollection.find({
            userPostId: userId
        }).count();
    }
}

export default new PostRepository()