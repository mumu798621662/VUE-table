const router = new VueRouter({
    routes:[
        {path:'/',component:mains,
        children:[
            {path:'/',component:Index},
            {path:'/add',component:add},
            {path:'/update/:id',component:update},
        ]
        },

        {path:'/login',component:login},
        {path:'/reg',component:reg},

    ]
})

router.beforeEach(function (to,from,next) {
    if(to.path=="/login" || to.path=="/reg"){//要进入登录或者注册页不需要检测
        next()
    }else{
        if(sessionStorage.login){
            next();
        }else{
            router.push("/login")
        }

    }
})