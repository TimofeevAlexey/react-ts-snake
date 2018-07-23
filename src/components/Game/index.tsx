import * as React from 'react';
import clone from 'clone'
import random from 'random';
import equal from 'deep-equal';

import './style.scss';
import StartScreen from './StartScreen'
import GameOverScreen from './GameOverScreen'
import Table from './Table'


interface Props{

}

interface State{
    isStart:boolean,
    gameOver:boolean,
    settings:{
        width:number,
        height:number,
        speed:number
    },
    snake:number[][]
    direction:{
        x:number,
        y:number
    },
    apple?:number[],
    score:number
}

let timerId ;

let defaultSnake=[
    [0,0],
    [0,1],
    [0,2],
]
let defaultDirection = {
    x:1,
    y:0
}
let defaultScore = 0;

class Game extends React.Component<Props,State>{

    state:State= {
        isStart:false,
        gameOver:false,
        settings:{
            width:10,
            height:10,
            speed:5
        },
        snake:defaultSnake,
        direction:defaultDirection,
        score:defaultScore
    };

    componentWillMount(){
        document.addEventListener("keydown",(e)=> this.handleKeyDown(e));
    }

    handleKeyDown(e){
        console.log(e.keyCode)
        switch (e.keyCode){
            case 38: // стрелка вверх
                this.handleChangeDirectionUp()
                break;
            case 40: // стрелка вниз
                this.handleChangeDirectionDown()
                break;
            case 39: // стрелка вправо
                this.handleChangeDirectionRight()
                break;
            case 37: // стрелка влево
                this.handleChangeDirectionLeft()
                break;
            case 32: // пробел
                this. handleStartNewGame()
            default:
                break;
        }
    }

    handleStartNewGame(){
        if(!this.state.isStart){
            this.handleOnStart(this.state.settings)
        }
    }

    handleChangeDirectionUp(){
        this.funcChangeDirection({
            x:0,
            y:-1
        })
    }
    handleChangeDirectionDown(){
        this.funcChangeDirection({
            x:0,
            y:1
        })
    }
    handleChangeDirectionRight(){
        this.funcChangeDirection({
            x:1,
            y:0
        })
    }
    handleChangeDirectionLeft(){
        this.funcChangeDirection({
            x:-1,
            y:0
        })
    }
    handleOnStart(settings){
        this.setState({
            isStart:true,
            gameOver:false,
            settings:settings,
            snake:defaultSnake,
            direction:defaultDirection,
            score:defaultScore
        },()=>{
           this.funcNewApple()
           this.funcTimerStart()
        })


    }


    funcTimerStart(){
        clearInterval(timerId);
        timerId = setInterval(()=> {
            if(!this.state.isStart){
                clearInterval(timerId);
            }
            this.funcMove()
        }, (1000/this.state.settings.speed)*1.9);
    }
    funcMove(callback:Function=()=>{}){

        if(this.state.gameOver){
            return false;
        }

        let oldSnake = clone(this.state.snake);
        let newSnake = clone(this.state.snake);


        //смешаем голову
        let headIndex = newSnake.length-1;

        newSnake[headIndex] = [
            newSnake[headIndex][0]+ this.state.direction.y,
            newSnake[headIndex][1]+ this.state.direction.x,
        ]

        // если встретили яблоко , то добавляем элемент
        if(
            newSnake[headIndex][0] === this.state.apple[0]&&
            newSnake[headIndex][1] === this.state.apple[1]
        ){
            newSnake.splice(-1,0,oldSnake[headIndex]);
            this.setState({
                score:++this.state.score
            })

            this.funcNewApple()
        }
        else{
            //смещаем тело
            for(let i = 0 ; i<newSnake.length-1 ; i++){
                newSnake[i]= oldSnake[i+1]
            }
        }

        //удар об стену
        let head = newSnake[newSnake.length-1];
        if(
            head[0] === -1
            ||  head[1] === -1
            ||  head[0] > this.state.settings.width-1
            ||  head[1] > this.state.settings.height-1
        ){
          this.funcGameOver();
        }

        this.setState({
            snake:newSnake
        },()=>{
            callback()
        })
    }
    funcGameOver(){
        clearInterval(timerId);
        this.setState({
            gameOver:true,
            isStart:false
        })
    }
    funcChangeDirection(direction){

        let oldDirection = this.state.direction;

        //не допускается противоположное направление
        if(oldDirection.x === -direction.x || oldDirection.y === - direction.y){
            return false;
        }

        clearInterval(timerId);
        this.setState({
            direction:direction
        },()=>{


            this.funcMove(()=>{
                this.funcTimerStart()
            })


        })
    }
    funcNewApple(){

        let apple = [
             random.int(0,this.state.settings.width-1),
             random.int(0,this.state.settings.height-1)
        ]

        let isIncludeSnake = false;

        isIncludeSnake = this.state.snake.some((elem)=>{
            return equal(elem,apple)
        })

       if(isIncludeSnake){
           this.funcNewApple()
          return false;
       }

        this.setState({
            apple
        })
    }

    render(){
        return(
            <div className="Game">
                {
                    !this.state.isStart ?
                        this.state.gameOver?
                            <GameOverScreen
                             score={this.state.score}
                            />
                            :
                            <StartScreen
                                settings={this.state.settings}
                                onStart={(settings)=>this.handleOnStart(settings)}
                            />
                        :
                        <div>
                            <Table
                                width={this.state.settings.width}
                                height={this.state.settings.height}
                                snake={this.state.snake}
                                apple={this.state.apple}
                            />
                            <div>
                                <h2>Очки: {this.state.score}</h2>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Game;