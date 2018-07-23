import * as React from 'react'
import './style.scss'

interface Props{
    onStart:Function,
    settings:{
        width:number,
        height:number,
        speed:number,
    }

}

interface State{
    width:number,
    height:number,
    speed:number,
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