// RotatedTriangle.js
// 顶点着色器
var VSHADER_SOURCE =
    // x` = x cos b - y sin b
    // y` = x sin b + y cos b
    // z` = z
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position.x = a_Position.x ;\n' +
    '   gl_Position.y = a_Position.y  ;\n' +
    '   gl_Position.z = a_Position.z;\n' +
    '   gl_Position.w = 1.0;\n' +
    '}\n';

// 片源着色器
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' + // uniform变量
    'void main() {\n' +
    '   gl_FragColor = u_FragColor;\n' +
    '}\n';

var gl;
// 旋转角度
var ANGLE = 1;
var c_Position;
// var count = 9;


function main() 
{
    // 获取<canvas>元素
    var canvas = document.getElementById('webgl');

    // 获取webGL上下文
    gl =getWebGLContext(canvas);

    if(!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }

  //  gl.clearColor(1.0, 0.0, 0.0, 1.0);
    //gl.clear(gl.COLOR_BUFFER_BIT);

   // var n = 3; //点的个数

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object ');
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    //向缓冲区对象写入数据
  //  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    
   c_Position = gl.getUniformLocation(gl.program,'u_FragColor');

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return a_Position;
    }

    // 将缓冲区对象分配给a_Position变量

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 连接a_Poisition变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    var vertices = new Float32Array([-0.65,-0.65,0.0,0.65,0.65,-0.65]);
    console.log('This is vertice origin');
    console.log(vertices);

    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    trianglePro(vertices,6);  

}

function trianglePro(vertices,count)
{

    
    console.log('This is vertice');
    console.log(vertices);
    
    var vertices2 = new Float32Array(6);
    var d1,d2,d3;
    d1 = Math.sqrt(vertices[0]*vertices[0]+vertices[1]*vertices[1]);
    d2 = Math.sqrt(vertices[2]*vertices[2]+vertices[3]*vertices[3]);
    d3 = Math.sqrt(vertices[4]*vertices[4]+vertices[5]*vertices[5]);

    vertices2[0]=vertices[0]*Math.cos(d1*ANGLE)-vertices[1]*Math.sin(d1*ANGLE);
    vertices2[1]=vertices[1]*Math.cos(d1*ANGLE)+vertices[0]*Math.sin(d1*ANGLE);

    vertices2[2]=vertices[2]*Math.cos(d2*ANGLE)-vertices[3]*Math.sin(d2*ANGLE);
    vertices2[3]=vertices[3]*Math.cos(d2*ANGLE)+vertices[2]*Math.sin(d2*ANGLE);

    vertices2[4]=vertices[4]*Math.cos(d3*ANGLE)-vertices[5]*Math.sin(d3*ANGLE);
    vertices2[5]=vertices[5]*Math.cos(d3*ANGLE)+vertices[4]*Math.sin(d3*ANGLE);

    if(count == 0)
    {
        huadian(vertices2);
        return ;
    }
    

    
    --count;
    console.log('This is vertice2');
    console.log(vertices2);
    console.log('\n');

    var vertices3 = new Float32Array(6);
    vertices3[0] = vertices[0];
    vertices3[1] = vertices[1];
    vertices3[2] =(vertices[0]+vertices[2])/2;
    vertices3[3] =(vertices[1]+vertices[3])/2;
    vertices3[4] =(vertices[0]+vertices[4])/2;
    vertices3[5] =(vertices[1]+vertices[5])/2;
    trianglePro(vertices3,count);

    var vertices4 = new Float32Array(6);
    vertices4[2] = vertices[2];
    vertices4[3] = vertices[3];
    vertices4[0] =(vertices[2]+vertices[0])/2;
    vertices4[1] =(vertices[3]+vertices[1])/2;
    vertices4[4] =(vertices[2]+vertices[4])/2;
    vertices4[5] =(vertices[3]+vertices[5])/2;
    trianglePro(vertices4,count);


    var vertices5 = new Float32Array(6);
    vertices5[0] =(vertices[4]+vertices[0])/2;
    vertices5[1] =(vertices[5]+vertices[1])/2;
    vertices5[2] =(vertices[2]+vertices[4])/2;
    vertices5[3] =(vertices[3]+vertices[5])/2;
    vertices5[4] = vertices[4];
    vertices5[5] = vertices[5];

    trianglePro(vertices5,count);

    var vertices6 = new Float32Array(6);
    vertices6[0] =(vertices[4]+vertices[0])/2;
    vertices6[1] =(vertices[5]+vertices[1])/2;
    vertices6[2] =(vertices[2]+vertices[0])/2;
    vertices6[3] =(vertices[3]+vertices[1])/2;
    vertices6[4] =(vertices[2]+vertices[4])/2;
    vertices6[5] =(vertices[3]+vertices[5])/2;
    trianglePro(vertices6,count);


}


function huadian(vertices)
{

    // 清空<canvas>的背景色
    

 //  
    console.log("One Triangle HAS WRITTEN!")
    
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 绘制三个点
  //  gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.uniform4f(c_Position,1.0,1.0,0.0,1.0);
    gl.drawArrays(gl.LINE_LOOP, 0, 3); // n is 3

}