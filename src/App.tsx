import * as React from 'react'

import Game from './components/Game/index'
import './App.scss'

class App extends React.Component<{},{}>{
    render(){
        return(
            <div className="App">
                <h1>React TypeScript Snake</h1>
                <Game/>
            </div>
        )
    }
}

export  default App