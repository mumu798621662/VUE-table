var Tables = Vue.component("Tables",{
    template:`
    <div>
    <table  class="table table-bordered" style="width: 800px;margin: auto;">
      <tr style="padding:5px">
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in datas" style="padding:5px">
        <td>{{item.name}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.age}}</td>
        <td>
          <a  @click="del(item.id)" class="btn btn-danger">删除</a>
          <a :href="'#/update/'+item.id" class="btn btn-success">修改</a>
        </td>
      </tr>
</table>

 <Wait v-show="show"></Wait>

</div>
    `,
    data(){
        return{
            datas:[

            ],
            show:false,

        }
    },
    methods:{
      del(id){
          fetch("/del/"+id).then(function(e){
              // console.log(e.text())
              return e.text()
          }).then((e)=>{
              if(e=="ok"){
                  this.datas=this.datas.filter(function(item){
                      if(item.id!=id){
                          return item
                      }
                  })
                  alert("删除成功")
              }
          })
      }
    },
    mounted(){
        let that=this;
        this.show=true;
        fetch("/fetch").then(function (e) {
            return e.json();
        }).then(function (e) {
            that.show=false;
            that.datas=e;
        });
    },
})

var Index = Vue.component("Index",{
    template:`<div class="divs">
      <heads></heads>
      <Tables></Tables>
 </div>`
})

var add = Vue.component("add",{
    template:`

    <div class="container" style="width: 800px;margin: auto">
    <heads></heads>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">姓名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="name" name="name" v-model="name">
  </div>
  
  
  <div class="form-group">
    <label for="exampleInputPassword1">年龄</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="age" name="age" v-model="age">
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">性别</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="sex" name="sex" v-model="sex">
  </div>
  
  <div class="btn btn-default" @click="submit">Submit</div>
</form>
</div>
    `,
    data(){
      return {
         name:'',
          age:'',
          sex:'',
      }

    },
    methods:{
        submit(){
            var myHeaders = new Headers();
            var myInit = { method: 'GET',
                headers: myHeaders};
            fetch('/add?'+"name="+this.name+'&age='+this.age+'&sex='+this.sex,myInit).then(function(e){
                return e.text();
            }).then(function(e){
                if(e=='ok'){
                    alert('插入成功')
                }
            })
        }
    },

});

var update = Vue.component("update",{
    template:`
     <div class="container" style="width: 800px;margin: auto">
     <heads></heads>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">姓名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="name" name="name" v-model="name" value="name">
  </div>
  
  
  <div class="form-group">
    <label for="exampleInputPassword1">年龄</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="age" name="age" v-model="age" value="age">
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">性别</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="sex" name="sex" v-model="sex" value="sex">
  </div>
  
  <div class="btn btn-default" @click="updateCon">Submit</div>
</form>
</div>
    `,
    data(){
        return {
            name:'',
            age:'',
            sex:''
        }
    },
    methods:{
        updateCon(){
            var dataStr = "name="+this.name+'&age='+this.age+'&sex='+this.sex+'&id='+this.$route.params.id
            console.log(dataStr)

            fetch("/updateCon?"+dataStr).then(function (e) {
                return e.text()
            }).then((e)=>{
                if(e=='ok'){
                    alert('修改成功')
                }
            })
        }
    },
    mounted(){
      var id = this.$route.params.id;
      fetch("/update/"+id).then((e)=>{
          return e.json();
      }).then((e)=>{
          this.name=e[0].name;
          this.age=e[0].age;
          this.sex=e[0].sex;
      })
    }
})

//等待
var Wait=Vue.component("Wait",{
    template:`<div class="wait">
     <div></div>
     <div></div>
     <div></div>
</div>`
})

var login = Vue.component("login",{
    template:`
  <div style="width: 800px;margin: 20px auto">
  <div class="container"  style="width: 400px;margin: auto">
     <h3 style="text-align: center;color: #5bc0de">登录</h3>
     <div style="color: red">{{message}}</div>
    
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="用户名" v-model="name">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="密码" v-model="pass">
  </div>
  
  <button type="button" class="btn btn-default" @click="check">点击登录</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
 还没有有用户名和密码？<a href="#/reg" class="btn btn-default" >注册</a>
</form>
    
   </div>  
</div>
    `,
    data(){
      return{
          name:'',
          pass:'',
          message:''
      }
    },
    methods:{
        check(){
            var search = "name="+this.name+"&pass="+this.pass;
            fetch("/check?"+search).then(function (e) {
              return e.json();
            }).then((e)=>{
                if(e.state=='ok'){
                    console.log(1)
                    sessionStorage.login=e.code
                    this.$router.push('/')
                }else{
                    console.log(2)
                    this.$router.push('/login')
                    this.name='';
                    this.pass=''
                }
            })
        }
    }
})



var reg = Vue.component("reg",{
    template:`
  <div style="width: 800px;margin: 20px auto">
  <div class="container"  style="width: 400px;margin: auto">
     <h3 style="text-align: center;color: #5bc0de">注册</h3>
     <div style="color: red">{{message}}</div>
    
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="用户名" @blur="blur" v-model="name">
  </div>
  
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword12" placeholder="密码" v-model="pass">
  </div>
  
    <div class="form-group">
    <label for="exampleInputPassword1">确认密码</label>
    <input type="password" class="form-control" id="exampleInputPassword13" placeholder="确认密码" v-model="pass1">
  </div>
  
  <button type="button" class="btn btn-default" @click="submit">点击注册</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  已有用户名和密码？<a href="#/login"class="btn btn-default" >登陆</a>
</form>
    
   </div>  
</div>
    `,
    data(){
        return{
            name:'',
            pass:'',
            pass1:'',
            message:'',
            flag:false
        }
    },
    methods:{
        blur(){
            console.log(1)
            var search = "name="+this.name
            fetch("/check1?"+search).then(function (e) {
                return e.text()
            }).then((e)=> {
                if (e == 'ok') {
                    this.flag = true;
                } else {
                    this.flag = false;
                    this.message = "用户名已存在"
                }
            })
       },
        submit(){
            fetch("/adduser?",{
                method:'post',
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                body:"name="+this.name+"&pass="+this.pass
            }).then(function (e) {
                return e.text()
            }).then((e)=>{
                if(e=='ok'){
                    this.message='注册成功';
                    this.name='';
                    this.pass='';
                    this.pass1=''
                }else{
                    this.message='注册失败';
                    this.name='';
                    this.pass='';
                    this.pass1=''
                }
            })
        }
    }
})

var heads = Vue.component("heads",{
    template:`
         <div class="box">
          <h1 class="title">可编辑表格</h1>
         <router-link to="/add" style="padding-left: 650px">
             <a  class="btn btn-info" >添加</a>
         </router-link>
         <router-link to="/" >
             <a  class="btn btn-primary">首页</a>
         </router-link>
     </div>
    `
})

var mains = Vue.component("mains",{
    template:`
     <router-view></router-view>
    `
})