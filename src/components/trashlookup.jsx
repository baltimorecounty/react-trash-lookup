
import React, { Component } from 'react';
import PostData from '../Data/street.json';
import _ from 'lodash';
import InformationSection from './common/InformationSection';
import { getTrashService } from '../services/trashService';
import * as moment from 'moment';
import TrashSchedule from './common/trashSchedule';
import RenderList from './common/renderList';
import { getFullAddress } from './Services/AddressService'
class TrashLookUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: '',
      isAutoTextHidden: false,
      dateFormat: 'D/M/YYYY',
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
    this.handleResetFormClick = this.handleResetFormClick.bind(this);
    this.settingState = this.settingState.bind(this);
  }
  handleResetFormClick(event) {
    this.setState({
      isAutoTextHidden: false,
      selectedAddress: '',
    });
  }
  settingState = (selectedAddress, isAutoTextHidden) => {
    this.setState({
      selectedAddress,
      isAutoTextHidden
    });
  };

  addressData(isAutoTextHidden) {
    let searchQuery = _.trim(this.state.selectedAddress);
    let filtered = PostData;


    if (searchQuery.length > 0) {
      filtered = PostData.filter(m => m.address1.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
    }
    return { data: filtered };
  }


  renderDayofWeek = type => {

    return type === "trash"
      ? this.trashNextCollectionDate()
      : type === "recycle"
        ? this.recylceNextCollectionDate()
        : this.leafNextCollectionDate();
  };
  leafNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();
    return today === dayOfWeek.friday
      ? moment()
        .add(14, 'd')
        .format(dateFormat)
      : moment()
        .add(12 - today, 'd')
        .format(dateFormat);
  }

  recylceNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();
    return today >= dayOfWeek.sunday && today < dayOfWeek.friday
      ? moment()
        .add(5 - today, 'd')
        .format(dateFormat)
      : moment()
        .add(6, 'd')
        .format(dateFormat);
  }

  trashNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();

    return today >= dayOfWeek.monday && today < dayOfWeek.saturday
      ? moment()
        .add(6 - today, 'd')
        .format(dateFormat)
      : today === dayOfWeek.saturday
        ? moment()
          .add(2, 'd')
          .format(dateFormat)
        : moment()
          .add(1, 'd')
          .format(dateFormat);
  }
  render() {
    let isAutoTextHidden = this.state.isAutoTextHidden;
    const selectedAddress = _.trim(this.state.selectedAddress);
    const { data } = this.addressData(isAutoTextHidden);
    const fullAddress = getFullAddress(data);
    const renderDayofWeek = this.renderDayofWeek

    return (
      <React.Fragment>
        <h6>Find Your Collection Schedule.</h6>
        <div className="row">
          <div className="col-5">{!isAutoTextHidden && <RenderList dataList={data} selectedAddress={selectedAddress} resetState={this.settingState} />}</div>
        </div>

        {isAutoTextHidden && <InformationSection address={fullAddress} resetForm={this.handleResetFormClick} />}

        {isAutoTextHidden && <TrashSchedule services={getTrashService()}
          renderDayofWeek={renderDayofWeek} />}

      </React.Fragment>
    );
  }
}

export default TrashLookUp;
