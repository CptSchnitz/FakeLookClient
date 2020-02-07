import { AbstractControl } from '@angular/forms'

const allowedImageTypes = ['image/jpeg', 'image/png'];

export function ValidateImageType (control: AbstractControl){
    const file = control.value as File;
    if (file == null){
        return {required: true}
    }else if (allowedImageTypes.includes(file.type)){
        return null
    }
    else { 
        return {badType : true}
    };
}