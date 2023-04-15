import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController{
    // async create (req, res){
    //     try{
    //         //const post = await Post.create({author, title, content, picture});
    //         console.log(req.files);
    //         const post = await PostService.create(req.body, req.files.picture);
    //         res.json(post);
    //     } catch(e){
    //         res.status(500).json(e);
    //     }
    // } 
    async create (req, res){
        try{
            //const post = await Post.create({author, title, content, picture});
            //console.log(req.files);
            const post = await PostService.create(req.body);
            res.json(post);
        } catch(e){
            res.status(500).json(e);
        }
    }

    async getAuthorization(req, res){
        try{
            const post = await PostService.getAuthorization(req.body.login, req.body.password);
            return res.json(post);
        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async getAll(req, res){
        try{
            const posts = await PostService.getAll();
            return res.json(posts);
        } catch(e){
            res.status(500).json(e);
        }    
    }
    async getOne(req, res){
        try{
            const post = await PostService.getOne(req.params.id);
            return res.json(post);
        }catch(e){
            res.status(500).json(e.message);
        }
    }    
    async update(req, res){
        try{
            const updatedPost = await PostService.update(req.body);
            return res.json(updatedPost);
        } catch(e){
            res.status(500).json(e.message);
        }
    }
    async delete(req, res){
        try{
            const post = await PostService.delete(req.params.id);
            return res.json(post);
        }catch(e){
            res.status(500).json(e.message);
        }
        
    }
    // async steamUser(req, res){
    //     app.post('/api/steam/user', (req, res) => {
    //         console.log("req.body " + JSON.stringify(req.body));
    //         console.log("req.body.token " + req.body.token);
    //         axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D1893E0A93FA327C5D749D6B9303C05E&steamids=${req.body.token}`)
    //           .then((response) => {
    //             // Отправляйте ответ на клиент, содержащий информацию о пользователе
    //             res.send({ user: response.data.response.players[0] });
    //         });
    //     });
    // }
}

export default new PostController();