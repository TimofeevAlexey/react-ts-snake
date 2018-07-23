import * as React from 'react'
import classNames from 'classnames';

import Row from './Row'
import './style.scss'

interface Props{
    width:number,
    height:number,
    snake:number[][],
    apple?:number[],
    walls:boolean
}


class Table extends React.Component<Props,{}>{
    render(){

        let rows = [];

        for(let i =0 ; i< this.props.height; i++){
            let filterSnakeByRow = this.props.snake.filter((f)=>
               f[0] === i
            )
            let filteredApple = [];

            if(this.props.apple && this.props.apple.length>0){
                filteredApple = this.props.apple[0] ===i ? this.props.apple : []
            }

            rows.push(
                <Row
                    key={i}
                    colCount={this.props.width}
                    filterSnakeByRow={filterSnakeByRow}
                    filteredApple={filteredApple}
                />
            )
        }

        return(
            <table className={
                classNames({
                    "Table":true,
                    "withBorder":this.props.walls
                })}
            >
                <tbody>
                {rows}
                </tbody>

            </table>
        )
    }
}

export default Table;