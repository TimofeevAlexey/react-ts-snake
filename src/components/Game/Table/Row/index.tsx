import * as React from 'react'
import classNames from 'classnames'

interface Props{
    colCount:number,
    filterSnakeByRow?:number[][]
}

class Row extends React.Component<Props,{}>{
    render(){
        let cols =[];

        for(let i = 0 ; i < this.props.colCount; i++){

            let filterSnakeByCol = this.props.filterSnakeByRow.filter((f)=>
                f[1] === i
            );

            cols.push(
                <td
                    key={i}
                    className={classNames({
                        snake:filterSnakeByCol.length >0
                    })}
                >

                </td>
            )
        }
        return(
            <tr>
                {cols}
            </tr>
        )
    }
}

export default Row;