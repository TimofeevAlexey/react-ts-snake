import * as React from 'react'
import './style.scss'

interface Props{
    onStart:Function,
    settings:{
        width:number,
        height:number
    }

}

interface State{
    width:number,
    height:number
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

    handleStart(){
        this.props.onStart(this.state)
    }

    render(){
        return(
            <div className="StartScreen">
                <form action="" onSubmit={()=>this.handleStart()}>
                    <div className="StartScreen__input-wrap">
                        <label htmlFor="">
                            Ширина:
                            <input
                                type="text"
                                value={this.state.width|| 0}
                                onChange={(e)=>this.handleChangeWidth(parseInt(e.target.value))}
                            />
                        </label>
                    </div>
                    <div className="StartScreen__input-wrap">
                        <label htmlFor="">
                            Высота:
                            <input
                                type="text"
                                value={this.state.height|| 0}
                                onChange={(e)=>this.handleChangeHeight(parseInt(e.target.value))}
                            />
                        </label>
                    </div>
                    <button type="submit">
                        Старт
                    </button>
                </form>

            </div>
        )
    }
}

export default StartScreen