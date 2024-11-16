import React from 'react';
import styled from 'styled-components';

const Categories = () => {
    return (
        <StyledWrapper>
            <fieldset>
                <div className="button-group">
                    <input type="radio" id="apartments" name="category" defaultChecked />
                    <label htmlFor="apartments">Apartments</label>
                </div>
                <div className="button-group">
                    <input type="radio" id="vacationHomes" name="category" />
                    <label htmlFor="vacationHomes">Vacation Homes</label>
                </div>
            </fieldset>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button-group {
    flex-grow: 1;
    margin: auto;
  }

  .button-group input[type="radio"] {
    display: none;
  }

  .button-group label {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #FFC677;  /* Stroke color */
    background-color: white;
    color: #FFC677;  /* Text color for non-selected */
    border-radius: 15px;
    transition: all ease 0.2s;
    text-align: center;
    flex-grow: 1;
    flex-basis: 0;
    width: 140px;  /* Adjust width to fit the labels */
    font-size: 13px;
    margin: 5px;
    box-shadow: 0px 0px 50px -15px #000000;
  }

  .button-group input[type="radio"]:checked + label {
    background-color: #FFC677;  /* Selected option background color */
    color: white;  /* Text color for selected option */
  }

  fieldset {
    border: 0;
    display: flex;
  }
`;

export default Categories;
