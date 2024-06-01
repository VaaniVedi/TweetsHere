const { TweetRepository }= require('../repository/index')

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
    }

    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g);  //this is a regex that extracts hashtags. Ref: https://regexr.com/3gkpo
        tags = tags.map((tag)=> tag.substring(1));
        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        /*todo: 
        - create hashtags and add here
        - bulkcreate in mongoose; insertMany
        - filter title of hashtag based on multiple tags : const tweets = await Tweet.find({content:['First Tweet','My tweet','464']});
        - how to add tweet id inside all of the hashtags : aggregation*/
        return tweet;
    }
}

module.exports = TweetService;

/*
    this is my #first #tweet . I am really #excited.
*/