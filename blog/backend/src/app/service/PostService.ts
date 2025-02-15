import postRepository from "../dataobject/repository/post.repository"

class PostService {

    private postRepo = postRepository

    createPost(postRequest: any) {
        return this.postRepo.save(postRequest)
    }

}

export default new PostService()