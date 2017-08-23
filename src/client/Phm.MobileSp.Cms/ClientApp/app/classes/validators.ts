import { ValidatorFn, AbstractControl } from "@angular/forms";
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