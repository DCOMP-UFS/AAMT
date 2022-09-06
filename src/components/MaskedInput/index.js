import React from 'react'
import InputMask from 'react-input-mask'
import MaskTypes from './maskTypes'

//Componente que aplica uma mascara no input e exibe para o usuario
//Por trás dos panos, o input é puro EX: para usuario(49010-050) | para sistema(49010050)
//Fique atento ao atributo "type" do props, ele deve ser igual à um dos tipos contidos no arquivo
//maskTypes.js, como "cep" ou "cpf" por exemplo
const MaskedInput = props => {
    const { id, className, type, value, required, disabled, onChange } = props;
    
    //Função que retirar mascara do input
    function limparMascara(event){
        onChange({
            ...event,
            target: {
                ...event.target,
                value: MaskTypes[type].clearInput(event.target.value)
            }
        })
    }

    return (
        <div className='input-mask-container'>
            <InputMask
                id={id}
                value={value}
                className={className}
                onChange={onChange}
                mask={MaskTypes[type].mask}
            />
            <input
                className="input-required"
                type="text"
                value={value}
                tabIndex={-1}
                autoComplete="off"
                required={required}
                disabled={disabled}
            />
        </div>
    );
}

export default MaskedInput