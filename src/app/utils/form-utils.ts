import { AbstractControl, ValidationErrors } from "@angular/forms";

export class FormUtils{
    static nameValidator() {
        return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value || '';
        const specialChars = /[_*#\/-]/;
        const numbers = value.match(/\d/g) || [];
        const hasOnlyNumbers = /^\d+$/.test(value);

        if (specialChars.test(value)) {
            return { specialChars: true };
        }
        if (numbers.length > 3) {
            return { maxNumbers: true };
        }
        if (hasOnlyNumbers) {
            return { onlyNumbers: true };
        }
        return null;
        };
    }
}