import React, { Component } from "react";

import Autocomplete from 'react-autocomplete';

class RenderList extends Component {
    settingState(selectedAddress, isAutoTextHidden) {
        return this.setState({
            selectedAddress,
            isAutoTextHidden
        });
    };
    render() {
        const { dataList, selectedAddress } = this.props;
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


export default RenderList;
