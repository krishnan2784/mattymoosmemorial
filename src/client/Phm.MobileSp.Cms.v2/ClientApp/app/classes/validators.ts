import { ValidatorFn, AbstractControl, FormGroup, FormArray } from "@angular/forms";
function isEmptyInputValue(value: any) {
    return value == null || typeof value === 'string' && value.length === 0;
}

export function minValue(min: Number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (isEmptyInputValue(control.value)) {
            return null;  
        }
        const input = control.value,
            isValid = input >= min;
        if (!isValid)
            return { 'minValue': { min } }
        else
            return null;
    };
}
export function maxValue(max: Number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value,
            isValid = input <= max;
        if (!isValid)
            return { 'maxValue': { max } }
        else
            return null;
    };
}
export function minCorrectAnswers(min: Number): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
        var c = 0;
        var a = <FormArray>form.controls['answers'];
        for (var i = 0; i < a.controls.length; i++) {
            var fg = <FormGroup>a.controls[i];
            if (fg.controls['isCorrect'].value == true) {
                c++;
            }
        }
        if (c >= min)
            return null;
        return { 'minCorrect': { min } }
    };
}
export function validEmailAddress(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        var emailRx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
        if (control.value != "" && (control.value.length <= 5 || !emailRx.test(control.value))) {
            return { "invalidEmailAddress": true };
        }
        return null;
    };
}
export function validUserRole(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        var c = control.value;
        if (c !== null && c.name != null && c.name !== "") {
            return null;
        }
        return { "invalidUserRole": true };
    };
}
export function minLengthArray(min: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': { valid: false } };
    }
}
