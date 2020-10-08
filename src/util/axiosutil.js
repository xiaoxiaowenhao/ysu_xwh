import axios from 'axios'
import store from '@/util/vuex'
import router from '@/router/filter'
import { Loading, Message, MessageBox } from 'element-ui'
axios.defaults.baseURL = 'http://39.96.6.126:38005'
if(store.getters.getToken)
{
   axios.defaults.headers.common['token']=store.getters.getToken
   axios.defaults.headers.common['role']=store.getters.getRole
}
export default {
    get(url, callback, params = {}) {
        const loading = Loading.service({
            lock: true,
            text: '数据加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
        })
        axios.get(url, { params: params }).then(response => {
            if (response.data.code === 200) {
                callback(response.data)
            }
            else if(response.data.code == 401){
                router.push('/index')
            }
            else {
                Message.error(response.data.message)
            }
        }).catch(err => {
            Message.error(err)
        })
            .finally(() => {
                loading.close()
            })
    },
    post(url, callback, params = {},msg) {
        const loading = Loading.service({
            lock: true,
            text: '数据提交中',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
        })
        setTimeout(() => { loading.close() }, 5000)
        const formD = new FormData()
        for (let key in params) {
            formD.append(key, params[key])
        }
        axios.post(url, formD).then(response => {
            if (response.data.code === 200) {
                //Message.success(response.data.message)
                if(msg == null)
                {
                    Message.success(response.data.message)
                }
                else{
                    Message.success(msg)
                }
                callback(response.data)
            }
            else if(response.data.code == 401){
                router.push('/index')
            }
            else {
                Message.error(response.data.message)
            }
            
        }).catch(err => {
            Message.error(err)
        }).finally(() => {
            loading.close()
        })

    },
    del(url, callback, params = {},flag = 'del') {
        const text = flag === 'del' ? '将删除数据,是否继续？' : '将恢复数据,是否继续？'
        MessageBox.confirm(text,
            '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const loading = Loading.service({
                lock: true,
                text: '删除中',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            })
            setTimeout(() => { loading.close() }, 5000)
            const formD = new FormData()
            for (let key in params) {
                formD.append(key, params[key])
            }
            axios.post(url, formD).then(response => {
                if (response.data.code === 200) {
                    Message.success(response.data.message)
                    callback(response.data)
                }
                else if(response.data.code == 401){
                    router.push('/login')
                }
                else {
                    Message.error(response.data.message)
                }
                
            }).catch(err => {
                    Message.error(err)
                }
            )
            .finally(() => {
                loading.close()
            })
        })
    },
    setToken(token,role)
    {
        axios.defaults.headers.common['token']=token
        axios.defaults.headers.common['role']=role
    }
}