import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: '',
      isCollectionScheduleTextHidden: true,
      isAutoTextHidden: false,
      dateFormat: 'D/M/YYYY',
      scheduleType: {
        trash: 'trash',
        recycle: 'recycle',
        leaf: 'leaf',
      },
      dayOfWeek: {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thrusday: 4,
        friday: 5,
        saturday: 6,
      },
    };
    this.handleClick = this.resetFormClick.bind(this);
  }
  resetFormClick(event) {
    this.setState({
      isAutoTextHidden: false,
      isCollectionScheduleTextHidden: true,
      selectedAddress: '',
    });
  }
  settingState(value, isAutoTextHidden) {
    return this.setState({
      selectedAddress: value,
      isCollectionScheduleTextHidden: false,
      isAutoTextHidden: isAutoTextHidden
    });
  };

  renderList(dataList) {
    const { selectedAddress } = this.state;
    const items = dataList.map((item, index) => ({
      id: item._id,
      label: item.address1,
    }));
    return (
      <div className="p-3 mb-2 bg-secondary text-white">
        <div className="inner-addon right-addon">
          <Autocomplete
            getItemValue={item => item.label}
            items={items}
            renderItem={(item, isHighlighted) => (
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'black' }}>
                {item.label}
              </div>
            )}
            value={selectedAddress}
            onChange={e => this.settingState(e.target.value, false)}
            onSelect={value => this.settingState(value, true)}
          />
          <i className="fa fa-search" />
        </div>
      </div>
    );
  }
}

export default Form;
