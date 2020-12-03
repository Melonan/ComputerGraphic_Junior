/*
2020.11.29_GHT
*/
// addEventListener() 方法用于向指定元素添加事件句柄。
// 当初始的 HTML 文档被完全加载和解析完成之后，
// DOMContentLoaded 事件被触发
document.addEventListener('DOMContentLoaded', () => {


  const grid = document.querySelector('.grid')
  // preGrids是200个div的数组
  let preGrids = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const widthOfgrid = 10
  let nextRandom = 0
  let timerId
  let score = 0
  var colors = [
    'pink',
    'blue',
    'green',
    'red',
    'coral'
  ]



  const lBlock = [
      [1, widthOfgrid + 1, widthOfgrid * 2 + 1, 2],
      [widthOfgrid, widthOfgrid + 1, widthOfgrid + 2, widthOfgrid * 2 + 2],
      [1, widthOfgrid + 1, widthOfgrid * 2 + 1, widthOfgrid * 2],
      [widthOfgrid, widthOfgrid * 2, widthOfgrid * 2 + 1, widthOfgrid * 2 + 2]
  ]

  const zBlock = [
    [0, widthOfgrid, widthOfgrid + 1, widthOfgrid * 2 + 1],
    [widthOfgrid + 1, widthOfgrid + 2, widthOfgrid * 2, widthOfgrid * 2 + 1],
    [0, widthOfgrid, widthOfgrid + 1, widthOfgrid * 2 + 1],
    [widthOfgrid + 1, widthOfgrid + 2, widthOfgrid * 2, widthOfgrid * 2 + 1]
  ]

  const tBlock = [
    [1, widthOfgrid, widthOfgrid + 1, widthOfgrid + 2],
    [1, widthOfgrid + 1, widthOfgrid + 2, widthOfgrid * 2 + 1],
    [widthOfgrid, widthOfgrid + 1, widthOfgrid + 2, widthOfgrid * 2 + 1],
    [1, widthOfgrid, widthOfgrid + 1, widthOfgrid * 2 + 1]
  ]

    const oBlock = [
      [0, 1, widthOfgrid, widthOfgrid + 1],
      [0, 1, widthOfgrid, widthOfgrid + 1],
      [0, 1, widthOfgrid, widthOfgrid + 1],
      [0, 1, widthOfgrid, widthOfgrid + 1]
    ]

    const iBlock = [
      [1, widthOfgrid + 1, widthOfgrid * 2 + 1, widthOfgrid * 3 + 1],
      [widthOfgrid, widthOfgrid + 1, widthOfgrid + 2, widthOfgrid + 3],
      [1, widthOfgrid + 1, widthOfgrid * 2 + 1, widthOfgrid * 3 + 1],
      [widthOfgrid, widthOfgrid + 1, widthOfgrid + 2, widthOfgrid + 3]
    ]

  var theBlockes = [lBlock, zBlock, tBlock, oBlock, iBlock]
  let nowPosi = 4
  let nowRot = 0
//随机选择方块
  let random = Math.floor(Math.random()*theBlockes.length)
  //console.log(random)
  let now = theBlockes[random][nowRot]


  // console.log(theBlockes)

  // console.log('Block')

  //console.log(random)

  //绘制方块函数：
  function paint() {
      now.forEach(index => {
          preGrids[nowPosi + index].classList.add('Block')
          preGrids[nowPosi + index].style.backgroundColor = colors[random]
      })
  }

  //清除方块函数：
  function cleanCanvas(){
    now.forEach(index => {
            preGrids[nowPosi + index].classList.remove('Block') 
            preGrids[nowPosi + index].style.backgroundColor =''
    })
  }



  document.addEventListener('keyup',control)

  //监视键盘，  通过keycode进行与键盘的交互
  function control(e){
    if(e.keyCode === 37){ //方向键左
      moveLeft() //向左移动
    } 
    else if (e.keyCode === 38) //方向键上
    {
      rotate()  //旋转当前方块的方向
    }
    else if (e.keyCode === 39) //方向键右
    {
      moveRight() //向右移动
    }
    else if (e.keyCode === 40)
    {
      moveDown() //向下移动
    }
  }




  //move down function
  //先抹去当前的方块
  //然后向下移动一个widthofGrid单位长度  
  //  即一个div/秒 的速度向下移动
  //然后再使用paint函数进行方块绘制

  function moveDown(){
    cleanCanvas()
    nowPosi += widthOfgrid
    paint()
    freeze()
  }
  //但是movedown 不会停止，一直到超出div界面


//当方块位于以0 10 20 30···索引的div中时，将不允许在被移动 （定义左边沿）
//move the Block left , unless is at the edge or there is a blockage
function moveLeft(){
  cleanCanvas()
  //当now的方块中  存在一个div的索引为0 10 20···证明已经抵达左边界
  const isAtLeftEdge = now.some(index => (nowPosi + index) % widthOfgrid === 0)

  if(!isAtLeftEdge) nowPosi -=1
  //尚未抵达0 10 20···时（即尚未抵达左边界时） 
  // 使用moveleft会将nowPosi减一
  //即向左移动一个单位
  
  //若左边有taken的div  则将当前位置+1 复原回去
  if(now.some(index=> preGrids[nowPosi + index].classList.contains('taken'))){
    nowPosi +=1
  }
  paint()
}



//move right
function moveRight()
{
  cleanCanvas()
  //若isAtRightEdge为真，则代表当前已经抵达右边界
  var isAtRightEdge = now.some(index => (nowPosi+index)%widthOfgrid === widthOfgrid-1)

  if(!isAtRightEdge) nowPosi +=1

  //若当前已经移动到了一个taken的div，则向左移动返回去
  if(now.some(index => preGrids[nowPosi + index].classList.contains('taken')))
  {
    nowPosi-=1
  }
  paint()
}


//rotate the Block
// 旋转
function rotate(){
  cleanCanvas()
  nowRot++
  if(nowRot === now.length)
  {
    nowRot = 0
  }
  now = theBlockes[random][nowRot]
  paint()
}




  //freeze function
  //当当前div有taken属性的时候，执行freeze ， 
  // 将不在下落，将方块中每一个div都设置成taken
  function freeze(){
    if(now.some(index => preGrids[nowPosi + index +widthOfgrid].classList.contains('taken')))
    {
      now.forEach(index => preGrids[nowPosi + index].classList.add('taken'))
      //start a new Block falling
      //新开始一个降落块，设置其属性，并绘制
      random = nextRandom
      nextRandom = Math.floor(Math.random()* theBlockes.length)
      now = theBlockes[random][nowRot]
      //设置方块位置为顶上中间
      nowPosi = 4
      displayShape() // 当有一个方块已经下落后，则再minigrid显示下一个方块
      paint()        //在界面最上方中间打印新一个方块
      addScore()    //判断是否最后一行可以消除，若可以，则执行加分
      gameOver()   //判断是否已经符合游戏结束要求
    }
  }



// show up-next Block in mini-grid display
const displaySqaures = document.querySelectorAll('.mini-grid div')
const displayWidth =4
let displayIndex = 0

//the tetronimoes without Rots

const upNextBlockes = [
  [1, displayWidth+1,displayWidth*2+1,2], //l形状
  [0, displayWidth, displayWidth+1,displayWidth*2+1],//z形状
  [1,displayWidth,displayWidth+1,displayWidth+2],
  [0,1,displayWidth,displayWidth+1],//四方块
  [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //I形状
]

//display the shape in the mini-grid display
function displayShape(){
  //displaypreGrids 再小网格上画出下一个的方块
  //擦除上一个
  displaySqaures.forEach(square => {
    square.style.backgroundColor = ''
    square.classList.remove('Block')
  })
  //画下一个 未来方块
  upNextBlockes[nextRandom].forEach( index => {
    displaySqaures[displayIndex+index].classList.add('Block')
    displaySqaures[displayIndex + index].style.backgroundColor = colors[nextRandom]
  })
}


//开始暂停功能
StartBtn.addEventListener('click',()=>{
  if(timerId){
    clearInterval(timerId)
    timerId = null
  } else {
    paint()
    timerId = setInterval(moveDown , 700)
     nextRandom = Math.floor(Math.random()*theBlockes.length)
     displayShape()
  }
})

//统计得分功能
function addScore(){
  for(let i=0;i<199;i+=widthOfgrid)
  {
    let row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

    if(row.every(index => preGrids[index].classList.contains('taken')))
    {
      score+=10
      ScoreDisplay.innerHTML = score
      //将这一行的所有属性都擦除，即没有taken， 也没有Block，
      // 变成一个空白的grid div
      row.forEach(index=> {
          preGrids[index].classList.remove('taken')
          preGrids[index].classList.remove('Block')
          preGrids[index].style.backgroundColor = ''
      })
      var preGridsRemoved = preGrids.splice(i,widthOfgrid)
      //将i之后的匹配到的一行全部删除出grid
      // console.log(preGridsRemoved)

      preGrids = preGridsRemoved.concat(preGrids)
      //将已经被删除的一行与square连接

      //再次使用square 来 更新grid
      preGrids.forEach(cell => grid.appendChild(cell))
    }
  }
}


//判断游戏是否结束
function gameOver(){
  if(now.some(index => preGrids[nowPosi + index].classList.contains('taken')))
  {
    ScoreDisplay.innerHTML = 'GAME OVER!'
    clearInterval(timerId)
  }
}


})