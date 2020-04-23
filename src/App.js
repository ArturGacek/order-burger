import React, {Component} from 'react';
import './App.module.css';
// import Auxx from "./hoc/Auxx";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
        <div>
            <Layout>
                <BurgerBuilder/>
            </Layout>
        </div>
    );
  }
}

export default App;
