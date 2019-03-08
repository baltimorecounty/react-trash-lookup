import React, { Component } from "react";
//import Input from "./input";
import _ from "lodash";
import Autocomplete from "react-autocomplete";

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: '',
      isCollectionScheduleTextHidden: true,
      isAutoTextHidden: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
 
    this.setState({ isAutoTextHidden: false, isCollectionScheduleTextHidden: true, selectedAddress: '' });
  }
  renderList(dataList) {
    const items = dataList.map((item, index) => (
        {
            id: item._id,
            label: item.address1
          }
    
        ));
 return(
      <div className="p-3 mb-2 bg-secondary text-white">
        <div className="inner-addon right-addon">

          <Autocomplete
            getItemValue={(item) => item.label}
            items={items}
            renderItem={(item, isHighlighted) =>
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'black' }}>
                {item.label}
              </div>
            }
            value={this.state.selectedAddress}
            onChange={e => this.setState({ selectedAddress: e.target.value, isCollectionScheduleTextHidden: true, isAutoTextHidden: false })}
            onSelect={value => this.setState({ selectedAddress:value, isCollectionScheduleTextHidden: false, isAutoTextHidden: true })}
          />
          <i className="fa fa-search"></i>
        </div>
      </div>
    );
  }
}

 export default Form;