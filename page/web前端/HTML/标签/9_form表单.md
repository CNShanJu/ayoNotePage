# ==form表单==

form标签

```html
<form action="表单要提交的路径" method="post/get">

</form>
```

#### ==get请求方式==

		1. 会把请求参数放在url后面
		2. 速度相对快
		3. get请求相对不安全
		4. get一般用于查询或者删除操作
		5. 可以传送的数据比较小

#### ==post请求方式==

   			1. 会把请求的参数放到请求体里
   			2. 速度相对get要慢
   			3. post相对安全
   			4. post请求一般用于修改或者添加操作
   			5. 可以传送的数据相对get大



## ==input标签==

input：表单原素标签



#### 	input的type属性值

​			作用：设置input的作用

|  属性值  |    作用    |                       说明                       |
| :------: | :--------: | :----------------------------------------------: |
|   text   | 文本输入框 |                                                  |
| password |   密码框   |                                                  |
|  radio   |   单选框   | 必须有相同的name才能确定为一组，每一组只能选一个 |
| checkbox |   复选框   |                                                  |
|   file   |   文件域   |                   上传文件用的                   |
|  button  |  普通按钮  |                                                  |
|  submit  |  提交按钮  |                                                  |
|  reset   |  重置按钮  |                   清空表单内容                   |
|  hidden  |   隐藏域   |  页面显示不能见也不占空间，但表单提交时依据可用  |
|  number  |   数字框   |               只能输入和数字有关的               |
|   date   |   日期框   |                                                  |
|  email   |   邮箱框   |                                                  |
|  image   |  图片按钮  |                   可以提交表单                   |



#### input的其他属性

| 属性  |                            作用                             |
| :---: | :---------------------------------------------------------: |
| value |                     表示是表单元素的值                      |
| size  | 设置input的输入框的大小<br>（width无用！！！或者可以style） |

注：1. <span style="color:red;">所有要提交的表单元素都需要设置name属性</span>

​		2. 复选，单选和下拉框都必须设置value值

##  ==下拉列表框==	

```html
<select name="" id="">
    <option value="1">上海</option>
    <option value="2">北京</option>
    <option value="3">湖南</option>
    <option value="4">娄底</option>
</select>
```

 <span style="color:red;">注：option标签必须设置value值</span>

## ==文本域==

```html
<textarea name="" cols="30(即一行可以输入30个字母或15个汉字)" rows="10(即可以输入10行)">

</textarea>
```



## 禁用-只读-默认选中

```html
<!-- disabled禁用 -->
<input type="text" disabled/>
<!-- readonly只读 -->
<input type="text" readonly/>
<!-- input的checked默认选中 -->
<input type="radio" name="sex" value="男" checked/>男
<input type="radio" name="sex" value="男"/>女
<!-- selected用于下拉框默认选中 -->
<select name="">
    <option selected></option>
</select>
```



## 语义化的表单

```html
<form action="" method="get/post">
    <fieldset style="width: 400px;">
        <legend>用户信息表</legend> //表单域标题
        <ol>
            <li>可怜</li>  
            <li>可乐</li>
        </ol>
    </fieldset>
</form>
```



## ==label标签==

```html
<!-- 
	label标签里的内容通过for绑定id，让其里面的内容能实现id所在标签的事件
	如下：点击文字男就能选中单选标签的第一个选项
-->
<input id="kkk" type="radio" name="sex" value="男" >
<label for="kkk">男</label>
<input id="www" type="radio" name="sex" value="女" >
<label for="www">女</label>


<!-- 
	label标签第二种用户，不需要for和id(不能有for)
	所有内容放在一个一个label里面让里面所有事件进行绑定
	如下：点击文字男就能选中单选标签的第二个选项
-->
<label>
	<input id="www" type="radio" name="sex" value="女" >女
</label>
<label>
	<input id="kkk" type="radio" name="sex" value="男" >男
</label>




```

