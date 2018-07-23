import * as React from 'react'

import Row from './Row'
import './style.scss'

interface Props{
    width:number,
    height:number,
    snake:number[][]
}


class Table extends React.Component<Props,{}>{
    render(){

        let rows = [];

        for(let i =0 ; i< this.props.height; i++){
            let filterSnakeByRow = this.props.snake.filter((f)=>
               f[0] == i
            )
            rows.push(
                <Row
                    key={i}
                    colCount={this.props.width}
                    filterSnakeByRow={filterSnakeByRow}
                />
            )
        }

        return(
            <table className="Table">
                <tbody>
                {rows}
                </tbody>

            </table>
        )
    }
}

export default Table;