import LikeService from "../service/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req,res) =>{
    try {
        const response = await likeService.create(req.query.modelType, req.query.modelId, req.body.userId);
        return res.status(201).json({
            success: true,
            message: 'Successfully toggled like',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Successfully created a new tweet',
            data: response,
            err: {}
        })
    }
}