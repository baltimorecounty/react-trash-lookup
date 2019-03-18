import React from 'react';

import Autocomplete from 'react-autocomplete';

const RenderList = ({ dataList, selectedAddress, me }) => {
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
                    onChange={e =>
                        me.setState({
                            selectedAddress: e.target.value,
                            isCollectionScheduleTextHidden: true,
                            isAutoTextHidden: false,
                        })
                    }
                    onSelect={value =>
                        me.setState({
                            selectedAddress: value,
                            isCollectionScheduleTextHidden: false,
                            isAutoTextHidden: true,
                        })
                    }
                />
                <i className="fa fa-search" />
            </div>
        </div>
    );
}

export default RenderList;
