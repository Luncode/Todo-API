const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const models = require('../db/models')

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));

// 查询任务列表
app.get('/list/:status/:page',async(req,res,next)=>{
    //next(new Error('自定义异常'))
    let {status,page} = req.params;
    let limit = 10;
    let offset = (page-1)*limit;
    let where = {};
    if(status != -1){
        where.status = status;
    }
    let list =await models.Todo.findAndCountAll({
        where,
        offset,
        limit
    })
    res.json({
        list,
        message:'列表查询成功'
    })

})

//创建todo
app.post('/create',async (req,res,next)=>{
    try {
        let {name,deadline,content} = req.body
        let todo = await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            todo,
            message:'Todo创建成功'
        })
    } catch (error) {
        next(error)
    }
})

//编辑todo
app.post('/edit',async (req,res,next)=>{
    try {
        let {id,name,deadline,content} = req.body
        let todo =await models.Todo.findOne({
            where:{
                id
            }
        })

        if(todo){
            todo = await todo.update({
                name,
                deadline,
                content
            })
        }
        res.json({
        todo
        })
    } catch (error) {
        next(error)
    }
})

//修改删除todo
app.post('/edit_status',async (req,res,next)=>{
    let {id,status} = req.body
    let todo =await models.Todo.findOne({
        where:{
            id
        }
    })
    if(todo && status!= todo.status){
        todo =await todo.update({
            status
        })
    }
    res.json({
        todo,
    })
})

//错误信息处理
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            message:err.message,
            errcode:res.status
        })
    }
})

app.listen(3000,()=>{
    console.log('Server start');
})