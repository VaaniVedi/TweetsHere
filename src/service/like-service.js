import {LikeRepository, TweetRepository } from '../repository/index.js'

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId){ // "/api/v1/likes/toggle?id=modelid&type=Tweet" 
        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.find(modelId); 
        } else if(modelType == 'Comment'){
            //TODO
        } else {
            throw new Error('Unknown Model Type')
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
             user: userId,
             onModel: modelType,
             likeable: modelId
        });
        
        if(exists){
            likeable.likes.pull(exists);
            await likeable.save();
            await this.likeRepository.destroy(exists.id);
            var isAdded = false;
        } else{
            const newLike = await this.likeRepository.create({
             user: userId,
             onModel: modelType,
             likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();
            var isAdded = true;
        }
        return isAdded;
    }
}

export default LikeService;