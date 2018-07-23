import * as React from 'react'
import classNames from 'classnames'

interface Props{
    colCount:number,
    filterSnakeByRow?:number[][],
    filteredApple?:number[]
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
                        snake:filterSnakeByCol.length >0,
                        apple:this.props.filteredApple.length >1 && this.props.filteredApple[1] ===i
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