import React from "react";
import styled from 'styled-components';


const Radio = ({ option1, option2 }) => {
    return (
        <StyledWrapper>
            <div id="firstFilter" className="filter-switch">
                <input defaultChecked id="option1" name="options" type="radio" />
                <label className="option" htmlFor="option1">{option1}</label>
                <input id="option2" name="options" type="radio" />
                <label className="option" htmlFor="option2">{option2}</label>
                <span className="background" />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;  /* Centers the filter switch */
    align-items: center;
    height: 100vh;  /* Centers vertically */

    .filter-switch {
        border: 2px solid #16869C;  /* Border color */
        border-radius: 30px;
        position: relative;
        display: flex;
        align-items: center;
        height: 50px;
        width: 400px;
        overflow: hidden;
    }

    .filter-switch input {
        display: none;
    }

    .filter-switch label {
        flex: 1;
        text-align: center;
        cursor: pointer;
        border: none;
        border-radius: 30px;
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: all 0.5s;
        font-weight: 500;
        font-size: 18px;
        color: #7d7d7d;  /* Text color for non-selected options */
        margin: 0 5px;  /* Adds space between options */
    }

    .filter-switch input:checked + label {
        background-color: #16869C;  /* Background color for selected option */
        color: white;  /* White text for selected option */
    }

    .filter-switch .background {
        position: absolute;
        width: 49%;
        height: 38px;
        background-color: #16869C;  /* Background color for selected option */
        top: 4px;
        left: 4px;
        border-radius: 30px;
        transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    #option2:checked ~ .background {
        left: 50%;
    }

    #option1:checked + label[for="option1"],
    #option2:checked + label[for="option2"] {
        font-weight: bold;  /* Bold text for the selected option */
    }

    #option1:not(:checked) + label[for="option1"],
    #option2:not(:checked) + label[for="option2"] {
        color: #7d7d7d;  /* Gray text for non-selected options */
    }
`;

export default Radio;