const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async(req, res) =>{
    const {title, description, category} = req.body;
    if (!title || !description || !category) throw new Error ('Missing input')
    const response = await Blog.create(req.body)
    return res.json({
        success: response ? true : false,
        createdBlog: response ? response : 'Cannot create new blog'
    })
});
const updateBlog = asyncHandler(async(req, res) =>{
    const {bid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing Input');
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    return res.json({
        success : response ? true : false,
        updatedBlog: response ? response : 'Cannot update blog'
    })
});

const getBlogs = asyncHandler(async(req, res) =>{
    const response = await Blog.find()
    return res.json({
        success : response ? true : false,
        blogs: response ? response : 'Cannot get blog'
    })
});

/*like and dislike
khi nguoi dung like mot bai blog thi
1: check xem nguoi do co dislike truoc hay ko - > bo dislike
2: check xem nguoi do truoc do co like hay kong - > bo like / them like
 */
const likeBlog = asyncHandler(async(req, res) =>{
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) throw new Error('Missing Input')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyDisliked){
        const response =  await Blog.findByIdAndUpdate(bid, { $pull: {dislikes: _id}},{new: true})
        return res.json({
            success: response ? true : false,
            rs: response 
        })
    }
    const isLiked = blog?.isLiked?.find(el => el.toString()=== _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})

const dislikeBlog = asyncHandler(async(req, res) =>{
    const {_id} = req. user
    const {bid} = req.params
    if(!bid) throw new Error ('Missing input')
    const blog = await Blog.findById(bid)
    const alreadyliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyliked){
        const response =  await Blog.findByIdAndUpdate(bid, { $pull: {likes: _id}},{new: true})
        return res.json({
            success: response ? true : false,
            rs: response 
        })
    }
    const isDisLiked = blog?.isLiked?.find(el => el.toString()=== _id)
    if(isDisLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    
})


const getBlog = asyncHandler(async(req, res)=>{
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: { numberViews: 1}}, {new: true})
    .populate('likes', "firstname lastname").populate('dislikes', "firstname lastname")
    return res.json({
        success: blog ? true : false,
        rs: blog
    })
})
const deleteBlog = asyncHandler(async(req, res)=>{
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
        return res.json({
        success: blog ? true : false,
        deletedBlog: blog || 'something went wrong'
    })
})

const uploadImagesBlog = asyncHandler(async(req, res)=>{
    const {bid} = req.params;
    if(!req.file) throw new Error ('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path }, {new: true})
    return res.status(200).json({
      status: response ? true : false,
      updatedBlog : response ? response : 'cannot upload imagesBlog'
    })
  })
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    getBlog,
    likeBlog,
    dislikeBlog,
    deleteBlog,
    uploadImagesBlog
}