import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
    // 解决多次点击左侧菜单报错问题
    const VueRouterPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
    }
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import beifen from '@/views/modules/databaseBackup/beifen'
import huanyuan from '@/views/modules/databaseBackup/huanyuan'

     import users from '@/views/modules/users/list'
    import address from '@/views/modules/address/list'
    import dictionary from '@/views/modules/dictionary/list'
    import forum from '@/views/modules/forum/list'
    import gonggao from '@/views/modules/gonggao/list'
    import liulangdongwu from '@/views/modules/liulangdongwu/list'
    import liulangdongwuCollection from '@/views/modules/liulangdongwuCollection/list'
    import liulangdongwuHuafei from '@/views/modules/liulangdongwuHuafei/list'
    import liulangdongwuJinkuang from '@/views/modules/liulangdongwuJinkuang/list'
    import liulangdongwuLiuyan from '@/views/modules/liulangdongwuLiuyan/list'
    import liulangdongwuOrder from '@/views/modules/liulangdongwuOrder/list'
    import liulangdongwuZhuyang from '@/views/modules/liulangdongwuZhuyang/list'
    import yonghu from '@/views/modules/yonghu/list'
    import config from '@/views/modules/config/list'
    import dictionaryDongwuZhuangtai from '@/views/modules/dictionaryDongwuZhuangtai/list'
    import dictionaryForum from '@/views/modules/dictionaryForum/list'
    import dictionaryForumState from '@/views/modules/dictionaryForumState/list'
    import dictionaryGonggao from '@/views/modules/dictionaryGonggao/list'
    import dictionaryIsdefault from '@/views/modules/dictionaryIsdefault/list'
    import dictionaryJinyong from '@/views/modules/dictionaryJinyong/list'
    import dictionaryLiulangdongwu from '@/views/modules/dictionaryLiulangdongwu/list'
    import dictionaryLiulangdongwuCollection from '@/views/modules/dictionaryLiulangdongwuCollection/list'
    import dictionaryLiulangdongwuErji from '@/views/modules/dictionaryLiulangdongwuErji/list'
        import dictionaryLiulangdongwuErjiAddOrUpdate from '@/views/modules/dictionaryLiulangdongwuErji/add-or-update'//二级
    import dictionaryLiulangdongwuHuafei from '@/views/modules/dictionaryLiulangdongwuHuafei/list'
    import dictionaryLiulangdongwuJinkuang from '@/views/modules/dictionaryLiulangdongwuJinkuang/list'
    import dictionaryLiulangdongwuOrder from '@/views/modules/dictionaryLiulangdongwuOrder/list'
    import dictionaryLiulangdongwuOrderYesno from '@/views/modules/dictionaryLiulangdongwuOrderYesno/list'
    import dictionarySex from '@/views/modules/dictionarySex/list'
    import dictionaryXingbie from '@/views/modules/dictionaryXingbie/list'





//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }, {
        path: '/huanyuan',
        name: '数据还原',
        component: huanyuan
    }, {
        path: '/beifen',
        name: '数据备份',
        component: beifen
    }, {
        path: '/users',
        name: '管理信息',
        component: users
    }
    ,{
        path: '/dictionaryDongwuZhuangtai',
        name: '动物状态',
        component: dictionaryDongwuZhuangtai
    }
    ,{
        path: '/dictionaryForum',
        name: '帖子类型',
        component: dictionaryForum
    }
    ,{
        path: '/dictionaryForumState',
        name: '帖子状态',
        component: dictionaryForumState
    }
    ,{
        path: '/dictionaryGonggao',
        name: '公告类型',
        component: dictionaryGonggao
    }
    ,{
        path: '/dictionaryIsdefault',
        name: '是否默认地址',
        component: dictionaryIsdefault
    }
    ,{
        path: '/dictionaryJinyong',
        name: '账户状态',
        component: dictionaryJinyong
    }
    ,{
        path: '/dictionaryLiulangdongwu',
        name: '动物类型',
        component: dictionaryLiulangdongwu
    }
    ,{
        path: '/dictionaryLiulangdongwuCollection',
        name: '收藏表类型',
        component: dictionaryLiulangdongwuCollection
    }
    ,{
        path: '/dictionaryLiulangdongwuErji',
        name: '详细类型',
        component: dictionaryLiulangdongwuErji
    }
    ,{
        path: '/dictionaryLiulangdongwuErjiAddOrUpdate',
        name: '详细类型的新增修改页面',
        component: dictionaryLiulangdongwuErjiAddOrUpdate
    }
    ,{
        path: '/dictionaryLiulangdongwuHuafei',
        name: '消费类型',
        component: dictionaryLiulangdongwuHuafei
    }
    ,{
        path: '/dictionaryLiulangdongwuJinkuang',
        name: '流浪动物状态',
        component: dictionaryLiulangdongwuJinkuang
    }
    ,{
        path: '/dictionaryLiulangdongwuOrder',
        name: '领养状态',
        component: dictionaryLiulangdongwuOrder
    }
    ,{
        path: '/dictionaryLiulangdongwuOrderYesno',
        name: '申请状态',
        component: dictionaryLiulangdongwuOrderYesno
    }
    ,{
        path: '/dictionarySex',
        name: '性别类型',
        component: dictionarySex
    }
    ,{
        path: '/dictionaryXingbie',
        name: '性别',
        component: dictionaryXingbie
    }
    ,{
        path: '/config',
        name: '轮播图',
        component: config
    }


    ,{
        path: '/address',
        name: '收货地址',
        component: address
      }
    ,{
        path: '/dictionary',
        name: '字典',
        component: dictionary
      }
    ,{
        path: '/forum',
        name: '论坛',
        component: forum
      }
    ,{
        path: '/gonggao',
        name: '公告',
        component: gonggao
      }
    ,{
        path: '/liulangdongwu',
        name: '流浪动物',
        component: liulangdongwu
      }
    ,{
        path: '/liulangdongwuCollection',
        name: '流浪动物收藏',
        component: liulangdongwuCollection
      }
    ,{
        path: '/liulangdongwuHuafei',
        name: '流浪动物花费',
        component: liulangdongwuHuafei
      }
    ,{
        path: '/liulangdongwuJinkuang',
        name: '流浪动物近况',
        component: liulangdongwuJinkuang
      }
    ,{
        path: '/liulangdongwuLiuyan',
        name: '流浪动物留言',
        component: liulangdongwuLiuyan
      }
    ,{
        path: '/liulangdongwuOrder',
        name: '流浪动物订单',
        component: liulangdongwuOrder
      }
    ,{
        path: '/liulangdongwuZhuyang',
        name: '流浪动物助养',
        component: liulangdongwuZhuyang
      }
    ,{
        path: '/yonghu',
        name: '用户',
        component: yonghu
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
