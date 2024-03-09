import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export function useFormContext() {
    return useContext(FormContext);
}

export function FormProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    const [infoForm, setInfoForm] = useState({
        marz: "",
        townOrCity: "",
        schoolName: "",
        personAdulctContact: "",
        personBirthday:"",
        personEmail: "",
        personPhone: "",
        scoolClass:"",
        programs1:"",
        programs2:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInfoForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(validete(infoForm))
        setIsSubmit(true)
        validete(infoForm)
    };

    const clearErrors = (e) => {
        if (e) {
            e.preventDefault();
        }
        setErrorMessage({});
        console.log(errorMessage); 
    };

    useEffect(() => { 
        if(Object.keys(errorMessage).length === 0 &&  isSubmit){
           console.log(infoForm)
           console.log("hayer jan")
        }
    }, [errorMessage])

    const validete = (values) => {
        const errors = {};
        const regExpMail = /^[^@\s\t\r\n]+@[^@\s\t\r\n]+\.[^@\s\t\r\n]/;
        const regExpText = /^([Ա-ՖA-Z])([ա-ֆa-z])+$/;
        const regExpNameUsername = /^(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-ֆ'-]+)(?:\s(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-զ'-]+))*$/u;
        const regExpPhone = /^\+\(\d{3}\)\d{8}$/;

        // Validation marz
        if(!values.marz){
            errors.marz = "Please choos state․"
        }
        //
        
        // Validation town or city vailidation 
        if(!values.townOrCity){
            errors.townOrCity = "Town/Village is requerd․"
        }  else {
           if(!regExpText.test(values.townOrCity)){
               errors.townOrCity = "You must use only letters and the first letter must be capitalized․"
           } 
        }
        
        // Validation scool name 
        if(!values.schoolName){
            errors.schoolName = "Scool name is requerd."
        }
        //

        // Validation Adult Contact Person person
         if(!values.personAdulctContact){
           errors.personAdulctContact = "Person Adulct Contact is requerd."
         } else {
            if(!regExpNameUsername.test(values.personAdulctContact)){
                errors.personAdulctContact = "Must be armenian charhacther․"
            }
         }
    
        //Validation birthdate
        // if(!values.personNameSurname){
        //     errors.personNameSurname = "Name surname is requerd"
        // }
        //

        // Validation email
        if(!values.personEmail){
            errors.personEmail = "Email is required."

        } else {
            if(!regExpMail.test(values.personEmail)){
                 errors.personEmail = "Email must be correct."
             }

             console.log(values.personEmail)
        }
    
        // Validation Phone
        if(!values.personPhone){
            errors.phone = "Phone is required";
        } else if (!regExpPhone.test(infoForm.personPhone)){
            errors.phone = "Muste be number and example +(374)98776348"
        }


        //Validetion sdool class
        if(!values.scoolClass){
            errors.scoolClass = "Scool class is required."
        }

    
        //Validetion sdool programs
        if(values.scoolClass == "5-6 grades"){
            if(!values.programs1 && !values.programs2){
                errors.program ="Programs must be requerd"
            }
        } else if (values.scoolClass == "7-8 grades"){
            if(!values.programs3 && !values.programs4){
                errors.program ="Programs must be requerd"
           }
        } else {
            if(!values.programs1 && !values.programs2 && !values.programs3 && !values.programs4){
                errors.program ="Programs must be requerd"
            }
        }
        // console.log(values.programs1)
        // if(!values.programs1 && !values.programs2){
        //     errors.program ="Programs must be requerd"
        //     console.log("ahyer ajn")
        // } else if(!values.programs3 && !values.programs4 ){
        //     errors.program ="Programs must be requerd"
        //     console.log("barev")
        // }
        
        return errors
    }



    const contextValue = {
        errorMessage,
        infoForm,
        isSubmit,
        handleChange,
        handleSubmit,
        clearErrors,
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
}