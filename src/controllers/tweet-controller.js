import TweetService from "../service/tweet-service.js";

const tweetService = new TweetService();

export const createTweet = async (req,res) =>{
    try {
        const response = await tweetService.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Successfully created a new tweet',
            data: {},
            err: error
        })
    }
}

export const getTweet = async(req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            message: "Successfully fetched a tweet",
            success: true,
            err:{},
            data: response  
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: true,
            err: error,
            data: {}
        })
    }
}