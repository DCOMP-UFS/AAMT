import React from 'react'
import Select from 'react-select';


//No compontonente 'Select' da biblioteca 'react-select', a atributo 'required' não funciona
//Por isso foi criado o componente abaixo
const SelectWrap = props => {
  const { value, required, disabled, className } = props;
  let pardeValue = value;
  if(Array.isArray(value) || typeof value === 'object')
    pardeValue = Object.keys(value).length > 0 ? value : "";

  return (
    <div className="select-wrapper-container">
      <Select 
        {...props}
        className={`${className} select-wrapper`}
        menuPortalTarget={document.body}
        menuPosition="fixed" 
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
          menu: (provided) => ({ ...provided, zIndex: 9999 })
        }}/>
      <input 
        className="input-required" 
        type="text" 
        value={pardeValue && JSON.stringify(pardeValue)} 
        tabIndex={-1}
        autoComplete="off" 
        required={required} 
        disabled={disabled} 
      />
    </div>
  )
}

export default SelectWrap