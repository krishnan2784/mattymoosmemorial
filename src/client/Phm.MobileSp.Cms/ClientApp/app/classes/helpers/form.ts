export class FormEx {
    public static getFormValidationErrors(form) {
        if (!form || !form.controls)
            return [];
        var errArray = [];
        Object.keys(form.controls).forEach(key => {
            var c = form.get(key);
            if (c.controls) {
                var childErrors = this.getFormValidationErrors(c);
                errArray.concat(childErrors);
            } else {
                const controlErrors = c.errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        errArray.push(c);
                        //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);
                    });
                }
            }
        });
        return errArray;
    }
}