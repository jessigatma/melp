import React, { Component } from "react";
import data from "../data/data.json";

class Search extends Component {
 constructor(props) {
   super(props);
   {
     this.state = {
       dataFiltered: data
     };
   }
 }
 handleChange = event => {
   
  let found =  data.restaurants.filter(i =>
    new RegExp(this.state.search, "i").exec(JSON.stringify(i))
  );

  
   this.setState({
     search: event.target.value,
     dataFiltered: found
   });

   this.props.eventSearch(found);
 };
 render() {
   //console.log(this.state.dataFiltered);
   return (
     <div className="searchBar">
       <input
         type="text"
         placeholder="Search.."
         value={this.state.search}
         onChange={this.handleChange}
       />
     </div>
   );
 }
}
export default Search;