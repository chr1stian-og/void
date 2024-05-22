import { useState } from "react";
import React from "react";


function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div>
        <h1>Terms & conditions</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          velit nec mauris sodales scelerisque. Nulla facilisi. Proin ut sapien
          et nisi ullamcorper consectetur ut a velit. Vivamus scelerisque lacus
          non eros bibendum, nec convallis sapien facilisis. Mauri
        </p>

        <div className="pb-3">
          <label htmlFor="agree">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            I accept the terms and conditions
          </label>
        </div>
        <button disabled={!isChecked} className="btn">Submit</button>
      </div>
    </>
  );
}

export default TermsAndConditions;
