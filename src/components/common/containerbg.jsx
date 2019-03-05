import React from "react";

 const ContainerBg = props => {
   let classes = "container1";

   return (
    <i
      // onClick={props.onClick}
 style={{
      cursor: "pointer",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
     //    backgroundColor: '#2d1a1a',
     //    width: 320
     }}
       className={classes}
      //aria-hidden="true"
    />
  );
};

 export default ContainerBg;