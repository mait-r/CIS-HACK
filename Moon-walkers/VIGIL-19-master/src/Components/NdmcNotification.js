import React,{Component} from "react"
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap"
import MapComp  from "./Map.js"
class NdmcNotification extends Component{
	constructor(props){
		super(props);
		this.state = {
			open:false
		}
		this.location = {
			lat : 28.7383,
			lng:77.0822
		}
	}
	closeModal = ()=>{
		this.setState({open:false});
	}
	openModal = ()=>{
		this.setState({open:true})
	}
    render(){
        return(
        <div className = "body" style = {{width:"100%"}}>
			<Modal
			show = {this.state.open}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			>
			<Modal.Header >
				<Modal.Title id="contained-modal-title-vcenter">
					Last Scanned Location
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MapComp location = {this.location}/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.closeModal}>Close</Button>
			</Modal.Footer>
			</Modal>
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100 ver1 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column1">ID</th>
									<th class="cell100 column2">IsInfected</th>
									<th class="cell100 column3">IsQuarantined</th>
									
								</tr>
							</thead>
						</table>
					</div>

					<div class="table100-body js-pscroll">
						<table>
							<tbody>
							{this.props.Notifications?this.props.Notifications.map(notification=>{
									return <tr onClick = {this.openModal} style = {{cursor:"pointer"}} class = {`row100 body ${notification.isInfected === true? "danger":"none"} ${notification.isQuarantined=== true ? notification.isInfected === true?"danger":"alert":"none"}`} >
										<td class="cell100 column1">{notification.ID}</td>
										<td class="cell100 column2">{notification.isInfected===true?"Yes":"No"}</td>
										<td class="cell100 column3">{notification.isQuarantined === true?"Yes":"No"}</td>

									</tr>
								}):null}
								
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
	</div>
       
        )
    }
}
export default NdmcNotification