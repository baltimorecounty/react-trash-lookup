import React, { Component } from "react";
import Autocomplete from "react-autocomplete";


class Form2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isHidden: true,
      isAutoTextHidden: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

    this.setState({ isAutoTextHidden: false, isHidden: true, value: '' });
  }
  renderList(dataList) {
    const items = dataList.map((item, index) => (

      {
        id: item._id,
        label: item.address1
      }

    ));
    return (

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
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value, isHidden: true, isAutoTextHidden: false })}
            onSelect={value => this.setState({ value, isHidden: false, isAutoTextHidden: true })}
          />
          <i className="fa fa-search"></i>
        </div>
      </div>
    );
  }

}

export default Form2;
