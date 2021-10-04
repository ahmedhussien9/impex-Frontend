import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class Helper {
    constructor() { }

    isFieldValid(
        field: string,
        child: string,
        index: number,
        formGroup: FormGroup,
        formSubmitAttempt
    ) {
        let controlField = formGroup.get(field);

        if (index !== -1 && child) {
            controlField = (<FormArray>formGroup.get(field)).at(index).get(child);
        } else if (index === -1 && child) {
            controlField = formGroup.get(`${field}.${child}`);
        }

        return (
            (!controlField.valid && controlField.touched) ||
            (controlField.untouched && controlField.invalid && formSubmitAttempt)
        );
    }


    /**
     * 
     * @param file get the selected file 
     */
    ValidateSingleInput(file) {
        const _validFileExtensions = ["pdf", "docx", "doc"];
        let fileName = file.name;
        let extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (_validFileExtensions.includes(extension)) {
            return true;
        }
        return false;
    }


    dataURItoBlob(dataURI, fileType, fileName) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: fileType });
        const file = new File([blob], fileName,{ type: fileType });      
        return file;
    }

}
