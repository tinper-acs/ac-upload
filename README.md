# 上传 AcUpload

基于tinper-bee组件库封装开发

手动上传组件，可以帮助你打开一个模态框选择文件进行上传、也包括拖拽式的上传方式，支持单个文件以及多个文件一起上传使用，上传完毕后，组件会显示查看附件信息

## 何时使用

代替原生上传组件

## 如何使用


- 通过npm下载使用
`npm install ac-upload -S`


通过ES6的方式进行加载使用

```js
import AcUpload from 'ac-upload';//加载组件
import 'ac-upload/build/ac-upload.css';//加载组件样式
```
然后在render使用的时候传入相应组件需要的参数：

> 注：只要放在AcUpload组件之间的一个按钮即可

```js
<AcUpload
    title="图片上传"
    action="/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload"
    name="filelist[]"
    data={{ "other": "params" }}
    accept="image/*"
    multiple={true}
    onError={(err) => console.log(err)}
    onSuccess={(data) => console.log(data)}
>
    <Button shape="border" colors="info">图片上传</Button>
</AcUpload>

```

## API


序号 | 参数 | 类型 | 说明
---|---|---|---
1|title|string|打开上传的模态框显示的标题文字
2|defaultFileList|object[]|默认已经上传的文件列表
3|multiple|bool|是否允许多选,选择附件可以使用shift多选。设置单选后窗体会自动上传完成后关闭
4|action|string|必选参数, 上传的地址
5|accept|string|接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
6|data|JSON|随着上传的时候附加一些参数，接收JSON对象
7|name|string|上传设置的参数file名字默认`files[]`
8|locale|string|语言设置选项，默认为简体中文(zh_CN)，目前支持简体中文(zh_CN)，繁体中文(zh_TW)，英文(en_US)三种
9|onSuccess|function|上传成功后的回调，返回所有response
10|onError|function|上传失败后的回调，用于处理后续失败操作
11|maxSize|number|附件限制大小
12|onDelete|function|删除的时候触发的回调参数为file对象
13|beforeUpload|function|在上传之前执行的函数，当Promise返回false或者被拒绝，函数被中指。不兼容老ie
14|uploadTip|string|上传面板中的文字，默认为'点击选择上传文件'


## 注意事项

暂无

## 更新日志