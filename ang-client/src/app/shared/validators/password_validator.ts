import { AbstractControl } from "@angular/forms"

export const passwordsMatchValidator = (passwordControlName:string, confirmPassword:string) => {
    const validator = (form: AbstractControl) => {
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(confirmPassword);

        if(!passwordControl || !confirmPasswordControl) return;

        if(passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({notMatch: true});
        } else {
            const errors = confirmPasswordControl.errors;

            if(!errors) return;

            delete errors.notMatch;
            confirmPasswordControl.setErrors(errors);
        }
    }

    return validator;
}