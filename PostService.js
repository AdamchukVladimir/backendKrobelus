import Post from "./Post.js";
import fileService from "./fileService.js";
import md5 from 'md5';

class PostService {
    async create (post, picture){
        //const fileName = fileService.saveFile(picture);
        //const createdPost = await Post.create({...post, picture: fileName});
        const createdPost = await Post.create({login: post.login, email: post.email, password: md5(post.password), favouriteHeroes: post.favouriteHeroes});
        return createdPost;
    }

    async getAll(){
        const posts = await Post.find();
        return posts;       
    }
    async getOne(id){
       if (!id){
            throw new Error('Не указан Id'); 
       }
       const post = await Post.findById(id);
       return post;
    }
    async getAuthorization(login, password){
        if (!login){
            throw new Error('Не указан Login'); 
       }
       if (!password){
        throw new Error('Не указан Password'); 
   }
       //const post = await Post.findById(id);
       const post = await Post.findOne({login: login, password: password })
       return post;
    }    
    async update(post){
            if (!post._id){
                throw new Error('Не указан Id'); 
            }
            const updatePost = await Post.findByIdAndUpdate(post._id, post, {new: true});
            return updatePost; 
    }
    async delete(id){
            if (!id){
                throw new Error('Не указан Id'); 
            }
            const post = await Post.findByIdAndDelete(id);
            return post;
        
    }
}

export default new PostService();