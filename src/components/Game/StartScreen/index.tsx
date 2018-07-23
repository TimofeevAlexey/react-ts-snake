import * as React from 'react'
import './style.scss'

interface Props{
    onStart:Function,
    settings:{
        width:number,
        height:number,
        speed:number,
        walls:boolean
    }
}

interface State{
    width:number,
    height:number,
    speed:number,
    walls:boolean
}

class StartScreen extends React.Component<Props,State>{
    state:State={
      ...this.props.settings
    }

    handleChangeWidth(value){
        this.setState({
            width:value
        })
    }
    handleChangeHeight(value){
        this.setState({
            height:value
        })
    }
    handleChangeSpeed(value){
        this.setState({
            speed:value
        })
    }
    handleStart(){
        this.props.onStart(this.state)
    }
    handleToggleWalls(){
        this.setState({
            walls:!this.state.walls
        })
    }

    render(){
        return(
            <div className="StartScreen">
                <form action="" onSubmit={()=>this.handleStart()}>
                    <div className="StartScreen__input-wrap">
                        <label>
                            Ширина:
                        </label>
                        <input
                            min={5}
                            type="number"
                            value={this.state.width|| 0}
                            onChange={(e)=>this.handleChangeWidth(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="StartScreen__input-wrap">
                        <label>
                            Высота:
                        </label>
                        <input
                            min={5}
                            type="number"
                            value={this.state.height|| 0}
                            onChange={(e)=>this.handleChangeHeight(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="StartScreen__input-wrap">
                        <label>
                            Скорость:
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={this.state.speed|| 0}
                            onChange={(e)=>this.handleChangeSpeed(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="StartScreen__input-wrap">
                        <label>
                            Стены:
                        </label>
                        <input
                            type="checkbox"
                            checked={this.state.walls}
                            onChange={(e)=>this.handleToggleWalls()}
                        />
                    </div>
                    <div className="btn-wrap">
                        <button type="submit">
                        Старт
                         </button>
                    </div>

                </form>

            </div>
        )
    }
}

export default StartScreen