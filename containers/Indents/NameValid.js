import React from 'react';



export const NameValid = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[name].length > 0){
        return (
          <p >Name is invalid</p>
        )
      } else {
        return '';
      }
    })}
  </div>
