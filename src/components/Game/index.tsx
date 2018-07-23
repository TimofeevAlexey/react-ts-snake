import * as React from 'react';
import clone from 'clone'
import random from 'random';

import './style.scss';
import StartScreen from './StartScreen'
import Table from './Table'


interface Props{

}

interface State{
    isStart:boolean,
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
    apple?:number[]
}

let timerId ;

class Game extends React.Component<Props,State>{

    state:State={
        isStart:false,
        settings:{
            width:10,
            height:10,
            speed:5
        },
        snake:[
            [0,0],
            [0,1],
            [0,2],
            [0,3]
        ],
        direction:{
            x:1,
            y:0
        },
    }

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
            default:
                break;
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
            settings:settings
        },()=>{
           this.funcNewApple()
           this.funcTimerStart()
        })


    }

    funcTimerStart(){
        timerId = setInterval(()=> {
            this.funcMove()
        }, (1000/this.state.settings.speed)*1.9);
    }
    funcMove(callback:Function=()=>{}){

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
        }
        else{
            //смещаем тело
            for(let i = 0 ; i<newSnake.length-1 ; i++){
                newSnake[i]= oldSnake[i+1]
            }
        }



        this.setState({
            snake:newSnake
        },()=>{
            callback()
        })
    }
    funcChangeDirection(direction){
        this.setState({
            direction:direction
        },()=>{
            clearInterval(timerId);

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

        this.setState({
            apple
        })
    }

    render(){
        return(
            <div className="Game">
                {
                    !this.state.isStart ?
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
                        </div>
                }
            </div>
        )
    }
}

export default Game;