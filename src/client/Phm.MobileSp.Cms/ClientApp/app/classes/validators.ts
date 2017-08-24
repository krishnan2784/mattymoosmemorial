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