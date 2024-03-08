import React, { useState } from "react";
import "../StyleForms/formStyle.css"
import { useFormContext } from "./FormsContext";
import imageMain from "./../img/imageApplicationForm.png"

export default function Forms() {
  const [isChecked1, setIschecked1] = useState(false)
  const [isChecked2, setIschecked2] = useState(false)
  const [isChecked3, setIschecked3] = useState(false)
  const { errorMessage, infoForm, isSubmit, handleChange, handleSubmit } = useFormContext();

  const [programsDisabled, setprogramsDisabled] = useState({
    programs1:false,
    programs2:false,
    programs3:false,
    programs4:false
  })

//    const handleKeyPress = (event) => {
//       const englishAlphabet = /^[A-Za-z]+$/;
//       const inputValue = event.key;
//       if (englishAlphabet.test(inputValue)) {
//         event.preventDefault();
//       }
//   };

  const checked = (e) => {


    let elemVal =e.target.value
    if(elemVal == "5-6 grades"){
        setIschecked1(!isChecked1)
        setIschecked2(false)
        setIschecked3(false)

        setprogramsDisabled((prev) => ({
            ...prev,
            programs1:false,
            programs2:false,
            programs3: true,
            programs4: true,
          }));

    } else if (elemVal=="7-8 grades"){
        setIschecked2(!isChecked2)
        setIschecked1(false)
        setIschecked3(false)

        setprogramsDisabled((prev) => ({
            ...prev,
            programs1: true,
            programs2: true,
            programs3: false,
            programs4: false,
          }));

    } else {
        setIschecked3(!isChecked3)
        setIschecked2(false)
        setIschecked1(false)

        setprogramsDisabled((prev) => ({
            ...prev,
            programs1: false,
            programs2: false,
            programs3: false,
            programs4: false    ,
          }));
    }
  }

  
  function check(e) {
    if (infoForm.scoolClass === "") {
      alert("Please select school class");
   

      e.target.checked=false    
    } else {
      
    }
  }


  return (
    
        <div className="formContainer">
            <div className="formContainerImage">
                <img src={imageMain} alt="image" />
            </div>
            <pre>{JSON.stringify(infoForm, undefined, 2)}</pre>
            <div className="formBlock">
                <form action="" onSubmit={handleSubmit}>
                    <h2 className="formTitle">Application form</h2>
                    <div className="formItem" >
                        <label htmlFor="marz" className="formItemLabel1">State</label>
                        <div className="select-wrapper">
                            <select name="marz" onChange={handleChange} value={infoForm.marz}>
                                <option value="">Choose</option>
                                <option value="Արագածոտն">Արագածոտն</option>
                                <option value="Արարատ">Արարատ</option>
                                <option value="Արմավիր">Գեղարքունիք</option>
                                <option value="Կոտայք">Կոտայք</option>
                                <option value="Լոռի">Լոռի</option>
                                <option value="Շիրակ">Շիրակ</option>
                                <option value="Սյունիք">Սյունիք</option>
                                <option value="Տավուշ">Տավուշ</option>
                                <option value="Վայոց Ձոր"> Վայոց Ձոր</option>
                                <option value="Երևան">Երևան </option>
                            </select>
                        </div>
                        <p className="errorMessge">{errorMessage.marz}</p>
                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="townOrCity" className="m-bottom formItemLabel1">Town/village</label>
                        <input type="text" placeholder="Your answer"  name="townOrCity" className={`formItemInput1 ${errorMessage.townOrCity ? "borderRed" : ""}`} value={infoForm.townOrCity} onChange={handleChange}  />
                        <p className="errorMessge">{errorMessage.townOrCity}</p>
                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="schoolName" className="m-bottom formItemLabel1">Scool Name</label>
                        <input type="text" placeholder="Your answer" name="schoolName"  className={`formItemInput1 ${errorMessage.schoolName ? "borderRed" : ""}`}  value={infoForm.schoolName} onChange={handleChange} />
                        <p className="errorMessge">{errorMessage.schoolName}</p>
                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="personAdulctContact" className="m-bottom formItemLabel1">Adult Contact Person <span>(teacher, school project coordinator) (Name, surname)</span></label>
                        <input type="text" placeholder="Your answer" name="personAdulctContact"   className={`formItemInput1 ${errorMessage.personAdulctContact ? "borderRed" : ""}`}  value={infoForm.personAdulctContact} onChange={handleChange}/>
                        <p className="errorMessge">{errorMessage.personAdulctContact}</p>
                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="personBirthday" className="m-bottom formItemLabel1">Birthdate of the contact person</label>
                        <input type="text" placeholder="Your answer" name="personBirthday" className={`formItemInput1 ${errorMessage.personEmail ? "borderRed" : ""}`} value={infoForm.personBirthday} onChange={handleChange}/>
                        <p className="errorMessge">{errorMessage.personEmail}</p>

                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="personEmail" className="m-bottom formItemLabel1">E-mail of the Contact Person</label>
                        <input type="text" placeholder="Your answer" name="personEmail" className={`formItemInput1 ${errorMessage.personEmail ? "borderRed" : ""}`} value={infoForm.personEmail}  onChange={handleChange}/>
                        <p className="errorMessge">{errorMessage.personEmail}</p>
                    </div>
                    <div className="formItem m-top">
                        <label htmlFor="personPhone" className="m-bottom formItemLabel1">Phone number of the Contact Person</label>
                        <input type="text" placeholder="Your answer" name="personPhone" className={`formItemInput1 ${errorMessage.phone ? "borderRed" : ""}`}  value={infoForm.personPhone} onChange={handleChange}/>
                        <p className="errorMessge">{errorMessage.phone}</p>
                    </div>
                    
                    <div className="formItem m-top">
                        <label htmlFor="scoolClass" className="formItemLabel1">What classes will your team (teams) represent?</label>
                        
                        <div className="formScoolBlock">
                            <div>
                                
                                <input type="checkbox" checked={isChecked1} onClick={checked} name="scoolClass" value="5-6 grades" onChange={handleChange} />
                                <label htmlFor="scoolClass">5-6 grades</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={isChecked2} onClick={checked} name="scoolClass" value="7-8 grades" onChange={handleChange}/>
                                <label htmlFor="scoolClass">7-8 grades</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={isChecked3} onClick={checked} name="scoolClass" value="We have 2 teams of both age groups (5-6 and 7-8 grades)."   onChange={handleChange}/>
                                <label htmlFor="scoolClass">We have 2 teams of both age groups (5-6 and 7-8 grades).</label>
                            </div>
                        </div>
                        <p className="errorMessge">{errorMessage.scoolClass}</p>
                    </div>

                    <div className="formItem m-top">
                        <label htmlFor="scoolClass" className="formItemLabel1">What category are you planning to  participate in?</label>
                        <span className="programSpan"> you can choose only 2 programs</span>
                        <div className="formScoolBlock">
                            <div>
                                <input type="checkbox"  disabled={programsDisabled.programs1} name="programs1" onClick={check} value="Healthy lifestyle in a playful way" onChange={handleChange } />
                                <label htmlFor="programs1">"Healthy lifestyle in a playful way"</label>
                            </div>
                            <div>
                                <input type="checkbox"   disabled={programsDisabled.programs2} name="programs2" onClick={check} value="Tasty and Healthy: My Favorite Healthy Recipes" onChange={handleChange}/>
                                <label htmlFor="programs2">"Tasty and Healthy: My Favorite Healthy Recipes"</label>
                            </div>
                            <div>
                                <input type="checkbox"   disabled={programsDisabled.programs3} name="programs1" onClick={check} value="Discovering the World of Healthy lifestyle: Our Research" onChange={handleChange}/>
                                <label htmlFor="programs1">"Discovering the World of Healthy lifestyle: Our Research"</label>
                            </div>
                            <div>
                                <input type="checkbox"   disabled={programsDisabled.programs4} name="programs2" onClick={check} value="My Healthy Community"   onChange={handleChange}/>
                                <label htmlFor="programs2">"My Healthy Community"</label>
                            </div>
                        </div>
                        <p className="errorMessge">{errorMessage.program}</p>
                    </div>
                    <div className="formBtnBlock">
                        <input type="submit" value="Next" className="btn-form"/>
                        <input type="submit" value="Clear Form" className="bnt-clear-form"/>
                    </div>
                </form>
            </div>
    </div>
  )
}
