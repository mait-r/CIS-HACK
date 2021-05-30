import React,{Component} from  "react";
import {NavLink,withRouter} from "react-router-dom"
import $ from "jquery"
class Sidebar extends Component{
  componentDidMount(){
    $('#sidebarCollapse').on('click', function () {
      console.log("button clicked")
        $('#sidebar').toggleClass('active');
      });
  }
    render(){
        return(
    <nav id="sidebar">
      <div class="custom-menu">
      
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	        </button>
       
      </div>
      <div class="img bg-wrap text-center py-4" style={{backgroundImage: 'url(' + require('../logo.png') + ')'}}

>
        <div class="user-logo">
          <div class="img"></div>
          {/* <h3>Vigil-19</h3> */}
        </div>
      </div>
      <ul class="list-unstyled components mb-5">
      <li>
            <NavLink role = "button" to = "/home" activeClassName = {window.location.pathname == "/home"?"activeLink":""} className = "list-item">Home</NavLink>
        </li>
        <li>
          <NavLink role = "button" to = "/dmrc" activeClassName = {window.location.pathname == "/dmrc"?"activeLink":""} className = "list-item"> Delhi Metro Rail Corporation</NavLink>
        </li>
        <li>
            <NavLink role = "button" to = "/dtc" activeClassName = {window.location.pathname == "/dtc"?"activeLink":""} className = "list-item"> Delhi Transport Corporation</NavLink>
        </li>
        <li>
            <NavLink role = "button" to = "/ndmc" activeClassName = {window.location.pathname == "/ndmc"?"activeLink":""} className = "list-item"> New Delhi Municipal Council </NavLink>
        </li>

        
      </ul>

    </nav>

        )
    }
}
export default withRouter(Sidebar);