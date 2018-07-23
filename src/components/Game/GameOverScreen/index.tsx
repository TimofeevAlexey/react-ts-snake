import * as React from 'react'

interface Props{
    score:number,
}

class GameOverScreen extends React.Component<Props,{}>{
    render(){
        return(
            <div>
                <h2>Конец игры</h2>
                <h3>Очки: {this.props.score}</h3>
                <p>Пробел  - новая игра</p>
                <button
                    onClick={()=>{
                       window.location.reload()
                    }}
                >Перезагрузить игру</button>
            </div>
        )
    }
}

export default GameOverScreen