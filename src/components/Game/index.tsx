import * as React from 'react';
import './style.scss';
import StartScreen from './StartScreen'
import Table from './Table'
import clone from 'clone'

interface Props{

}

interface State{
    isStart:boolean,
    settings:{
        width:number,
        height:number
    },
    snake:number[][]
    direction:{
        x:number,
        y:number
    }
}

let timerId ;

class Game extends React.Component<Props,State>{



    state:State={
        isStart:false,
        settings:{
            width:10,
            height:10
        },
        snake:[
            [0,0],
            [0,1],
            [0,2],
            [0,3]
        ],
        direction:{
            x:0,
            y:1
        }
    }



    handleOnStart(settings){
        this.setState({
            isStart:true,
            settings:settings
        })

        var timerId = setInterval(()=> {
            this.funcMove()
        }, 500); //TODO скороссть через настройки
    }

    funcMove(){
        console.log("move")

        let newSnake = clone(this.state.snake);

        for(let i = 0 ; i<newSnake.length ; i++){
            newSnake[i]= [newSnake[i][0]+ this.state.direction.x ,newSnake[i][1]+ this.state.direction.y]
        }

        this.setState({
            snake:newSnake
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
                            />
                        </div>
                }
            </div>
        )
    }
}

export default Game;