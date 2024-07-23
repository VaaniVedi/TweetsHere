import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag)=> tag.substring(1));  //this is a regex that extracts hashtags. Ref: https://regexr.com/3gkpo

        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags =await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tags=>tags.title)
        let newTags = tags.filter(tag => !alreadyPresentTags.includes(tag));
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags)
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
        })
        /*todo: 
        - create hashtags and add here
        - bulkcreate in mongoose; insertMany
        - filter title of hashtag based on multiple tags : const tweets = await Tweet.find({content:['First Tweet','My tweet','464']});
        - how to add tweet id inside all of the hashtags : aggregation*/
        return tweet;
    }
}

export default TweetService;

/*
    this is my #first #tweet . I am really #excited.
*/