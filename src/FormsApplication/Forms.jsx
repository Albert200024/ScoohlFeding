import React, { useState } from "react";
import "../StyleForms/formStyle.css"
import { useFormContext } from "./FormsContext";
import imageMain from "./../img/imageApplicationForm.png"

export default function Forms() {
  const { errorMessage, infoForm, isSubmit, handleChange, handleSubmit, clearErrors } = useFormContext();
  const [programsDisable, setProgramsDisable] = useState({
      programs1Disable: false,
      programs2Disable: false,
      programs3Disable: false,
      programs4Disable: false,
  });

  
  const [programsChecked, setProgramsChecked] = useState({
    programs1: false,
    programs2: false,
    programs3: false,
    programs4: false,
  });


  
  const handleClear = (e) => {
     e.preventDefault();
     // Reset all form fields to their initial state
     setProgramsChecked({ programs1: false, programs2: false, programs3: false, programs4: false });
     setProgramsDisable({
         programs1Disable: false,
         programs2Disable: false,
         programs3Disable: false,
         programs4Disable: false,
     });

     // Reset other form fields as needed
     handleChange({ target: { name: "marz", value: "" } });
     handleChange({ target: { name: "townOrCity", value: "" } });
     handleChange({ target: { name: "schoolName", value: "" } });
     handleChange({ target: { name: "personAdulctContact", value: "" } });
     handleChange({ target: { name: "personBirthday", value: "" } });
     handleChange({ target: { name: "personEmail", value: "" } });
     handleChange({ target: { name: "personPhone", value: "" } });
     handleChange({ target: { name: "scoolClass", value: "" } });
 
     // Clear error messages by calling clearErrors function
     clearErrors();
  }

  const handleProgramChange = (e) => {
    const targetName = e.target.name;
    const isChecked = e.target.checked;

    console.log("Target name:", targetName);
    console.log("Is checked:", isChecked);

    if(!isChecked){
        e.target.value=""
    }
    
    if (infoForm.scoolClass === "") {
        alert("Please choose school class before selecting programs.");
        return;
    } 

     // Ensure only two programs are selected
     const selectedProgramsCount = Object.values(programsChecked).filter(val => val).length;

     // Check if the selected school class is the 3rd option
     const isThirdOption = infoForm.scoolClass === "We have 2 teams of both age groups (5-6 and 7-8 grades).";
 
     // If the selected school class is the 3rd option and more than 2 programs are already selected, prevent further selection
     if (isThirdOption && selectedProgramsCount >= 2 && isChecked) {
        alert("You can only 2 programs")
         return;
     }

    // Update the programsChecked state based on the checkbox name
    setProgramsChecked(prevState => ({
        ...prevState,
        [targetName]: isChecked
    }));

    handleChange(e);
  
  };


 const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    let updatedDisableState = {};
    let updatedCheckedState = { programs1: false, programs2: false, programs3: false, programs4: false };
    
  
    if (selectedClass === "5-6 grades") {
        updatedDisableState = {
            programs3Disable: true,
            programs4Disable: true,
            programs2Disable: false,
            programs1Disable: false,
        };

        infoForm.programs3 ="";
        infoForm.programs4 ="";
    } else if (selectedClass === "7-8 grades") {
        updatedDisableState = {
            programs1Disable: true,
            programs2Disable: true,
            programs3Disable: false,
            programs4Disable: false,
        };

            
        infoForm.programs1 ="";
        infoForm.programs2 ="";
    } else {
        updatedDisableState = {
            programs1Disable: false,
            programs2Disable: false,
            programs3Disable: false,
            programs4Disable: false,
        };

        infoForm.programs1 ="";
        infoForm.programs2 ="";
        infoForm.programs3 ="";
        infoForm.programs4 ="";
    }

    setProgramsChecked(updatedCheckedState);
    setProgramsDisable(updatedDisableState);
    handleChange(e);
  };

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
                        <label htmlFor="schoolName" className="m-bottom formItemLabel1">School Name</label>
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
                                <input type="checkbox" value="5-6 grades" name="scoolClass"
                                   onChange={handleClassChange}
                                   checked={infoForm.scoolClass === "5-6 grades"} 
                                />
                                <label htmlFor="scoolClass">5-6 grades</label>
                            </div>
                            <div>
                                <input type="checkbox" name="scoolClass" value="7-8 grades" 
                                    onChange={handleClassChange}
                                    checked={infoForm.scoolClass === "7-8 grades"}
                                />
                                <label htmlFor="scoolClass">7-8 grades</label>
                            </div>
                            <div>
                                <input type="checkbox" name="scoolClass" value="We have 2 teams of both age groups (5-6 and 7-8 grades)."  
                                    onChange={handleClassChange}
                                    checked={infoForm.scoolClass === "We have 2 teams of both age groups (5-6 and 7-8 grades)."}
                                />
                                <label htmlFor="scoolClass">We have 2 teams of both age groups (5-6 and 7-8 grades).</label>
                            </div>
                        </div>
                        <p className="errorMessge">{errorMessage.scoolClass}</p>
                    </div>

                    <div className="formItem m-top">
                        <label htmlFor="scoolClass" className="formItemLabel1">What category are you planning to  participate in?</label>
                        <span className="programSpan"> you can choose only 2 programs</span>
                        <div className="formScoolBlock">
                            <div>
                                <input 
                                    type="checkbox"  
                                    name="programs1"
                                    value="Healthy lifestyle in a playful way"
                                    disabled={programsDisable.programs1Disable}
                                    onChange={handleProgramChange}
                                    checked={programsChecked.programs1}
                                />
                                <label htmlFor="programs1">"Healthy lifestyle in a playful way"</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"   
                                    name="programs2"
                                    value="Tasty and Healthy: My Favorite Healthy Recipes"
                                    disabled={programsDisable.programs2Disable}
                                    onChange={handleProgramChange}
                                    checked={programsChecked.programs2}
                                />
                                <label htmlFor="programs2">"Tasty and Healthy: My Favorite Healthy Recipes"</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"  
                                    name="programs3"  
                                    value="Discovering the World of Healthy lifestyle: Our Research"
                                    disabled={programsDisable.programs3Disable}
                                    onChange={handleProgramChange}
                                    checked={programsChecked.programs3}
                                /> 
                                <label htmlFor="programs3">"Discovering the World of Healthy lifestyle: Our Research"</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"  
                                    name="programs4"
                                    value="My Healthy Community"
                                    disabled={programsDisable.programs4Disable}
                                    onChange={handleProgramChange}
                                    checked={programsChecked.programs4}
                                />
                                <label htmlFor="programs4">"My Healthy Community"</label>
                            </div>
                        </div>
                        <p className="errorMessge">{errorMessage.program}</p>
                    </div>
                    <div className="formBtnBlock">
                        <input type="submit" value="Next" className="btn-form"/>
                        <input type="submit" onClick={handleClear} value="Clear Form" className="bnt-clear-form"/>
                    </div>
                </form>
            </div>
    </div>
  )
}