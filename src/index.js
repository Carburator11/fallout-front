import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import StartMenu from './component/StartMenu';
import Home from './component/Home';
import About from './component/About';
import NotFound from './component/NotFound';
import Scores from './component/Scores';
import Play from './component/Play';
import {unregister} from './registerServiceWorker';
//import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Link, NavLink, Switch, Route} from 'react-router-dom';

ReactDOM.render(
    <div>  
    <BrowserRouter>
        <div>
            <div className= "head">
                <ul>
                    <li id="reactSign"><Link to="/home">&#9762;</Link></li>
                    <li><NavLink
                        to="/home"
                        activeStyle = {{color:"#00ad00"}}
                        activeClassName ="activeLink">
                            Home
                        </NavLink></li>
                    <li><NavLink
                         to="/start"
                         activeStyle = {{color:"#00ad00"}}
                         activeClassName ="activeLink">
                            New game
                        </NavLink></li>
                    <li><NavLink
                         to="/scores"
                         activeStyle = {{color:"#00ad00"}}
                         activeClassName ="activeLink">
                            High scores
                        </NavLink></li>
                    <li><NavLink
                         to="/about"
                         activeStyle = {{color:"#00ad00"}}
                         activeClassName ="activeLink">
                            About
                        </NavLink></li>
                    <li><NavLink
                         to="/404"
                         activeStyle = {{color:"#00ad00"}}
                         activeClassName ="activeLink">
                            #404
                        </NavLink></li>
                </ul>
            </div>

          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exac path= "/home"   component= {Home}      />
              <Route path= "/start"  component= {StartMenu} />
              <Route path= "/about"  component= {About}     />
              <Route path= "/scores" component= {Scores}    />
              <Route path= "/play/:sessionId" component= {Play} />
              <Route path= "/*"    component= {NotFound}     />

           </Switch>
           
        </div>
    
    </BrowserRouter>

    </div>
    , document.getElementById('root'));


unregister();
//registerServiceWorker();