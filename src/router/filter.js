import router from "@/router/index"
import store from "@/util/vuex"
const whitelist = [
    '/index'
]
router.beforeEach(function(to,from,next){
    if(whitelist.indexOf(to.path) !== -1)
    {
        next()
    }
    else{
        //不在白名单，验证是否存在token 不存在的话重定向到登录
        if(store.getters.getToken)
        {
            next()
        }
        else{
            next('/index')
            //next('/login')
        }
    }
    
    
})
export default router