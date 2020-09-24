//只是对 MultiPoint 有微小的改动


var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n'+
    'void main() {\n' +
    ' gl_Position = a_Position;\n' + // 设置坐标
   // ' gl_PointSize = 10.0;\n' + // 设置尺寸
    '}\n';

// 片元着色器程序
var FSHADER_SOURCE =
    'void main() {\n' +
    ' gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' + // 设置颜色
    '}\n';


function main() {
    // 获取<canvas>元素
    var canvas = document.getElementById('webgl');

    // 获取WebGL绘图上下文
    var gl = canvas.getContext('webgl');

    if(!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }

    //设置顶点位置  n为顶点个数
    var n = initVertexBuffers(gl)
    if(n<0)
    {
        console.log("Failed to set the positions of the vertices")
    }

    // 设置<canvas>的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);


    // 绘制n个点
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl)
{
    var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
    var n = 3;

    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    
    //将该对象和缓冲区绑定bind

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    //向绑定的缓冲区里面写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);


    var a_Position = gl.getAttribLocation(gl.program,'a_Position');


    //将缓冲区对象分配给a_postion变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

//链接a_Posision变量与分配给它的缓冲区对象

    gl.enableVertexAttribArray(a_Position);

    return n;


}