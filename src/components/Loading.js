import React, { Component } from 'react'
import Loading from './Images/Loading.gif'

export class Loader extends Component {
  render() {
    return (
        <img src={Loading} style={{width:'200px', height:"200px"}}/>
    )
  }
}

export default Loader