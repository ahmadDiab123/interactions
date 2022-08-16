import React , {Component} from 'react';
import "./App.css"
import axios from 'axios';


class Interaction extends Component
{


    constructor(){
        super()
        this.state={}
    }


handlechange = (e) =>{
    //console.log(e.target.value)
    this.setState({
       [ e.target.name] : e.target.value
    })
}
handleSubmit=async (e) =>
{ e.preventDefault();
    let xml= `<request> 
<drug>${this.state.DrugCode}</drug>
<disease>${this.state.DisCode}</disease>
<type>${this.state.type}</type>
    </request>`;
   
    console.log(xml)



    //send request to the server
    //->   POST /search


    let response=await axios.post("http://localhost:5000/search",{data:xml})
   // console.log(result)


    if (response) {
        let data=response['data']
        console.log(data);
        if (data) {
            if (data.success) {
            let result=data["result"]
            if (result&&result.length>0) {
                let row=result[0]

               let str=` ID = ${row["id"]}  /  DrugCode= ${row["drugcode"]} / DiseaseCode= ${row["diseasecode"]} / Type = ${row["type"]} / Discription= ${row["description"]} `

                this.setState({response:str})
                
            }
            else{
                //empty
                this.setState({response:" Sorry Not Found"})
            }
            }
            else{
                this.setState({error:"Please check the server"})
            }
        }
    }


}

    render()
    {

     //   let {response,error}=this.state
        return(
                    
                    <div className="Interaction">
                        <center>
                            <h1> Interaction  </h1>    
                        </center>
                       
                        <br/>
                    
                <form  class="submission-form"   onSubmit={this.handleSubmit}>

                <label for="DrugCode">
               <h3> Drug Code</h3>
                </label>

                <input type="text" id="DrugCode" name="DrugCode" onChange={this.handlechange} />
                  <br/><br/>

                <label for="Disease code ">
               <h3> Disease code </h3>  
                </label>
                <input type="text" id="Disease code " name="DisCode" onChange={this.handlechange} />
                  <br/><br/>
                 
               <h3> type : </h3> 
                       <input type="radio"  name="type" value={1} onChange={this.handlechange} /> 1
	                   <input type="radio" name="type" value={2} onChange={this.handlechange} /> 2

                            <br/><br/>
                <center>

                    <input type="submit" value="Search" id="sendbtn"/>

                </center>
               
                </form>
               
            {
               this.state.error?<h6 name= "clic">{this.state.error}</h6>:this.state.response?<h6>{this.state.response}</h6>:""   
            }
               
            </div>
        )
    }
}
export default Interaction;
