import { ToastrService } from 'ngx-toastr';
import { FORMAT_BYETS } from '../formatBytes';
import { Helper } from '../helper.class';


export class UploadSingleFileClass {
    helper: Helper;
    singleFileSource: File;
    fileDetail: any;

    constructor(
    ) {
        this.helper = new Helper();
    }

    uploadSingleFile = (event, edit?) => {
        const file = (event.target as HTMLInputElement).files[0];
        const that = this;
        const reader = new FileReader();
        if (!file) {
            return;
        }
        if (!this.helper.ValidateSingleInput(file)) {
            alert("Sorry, This file is not supported type");
            return;
        }
        this.singleFileSource = file;
        reader.onloadend = () => {
            // that.singleFilePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }


    getFileDetails(): any {
        if (this.singleFileSource) {
            return {
                name: this.singleFileSource.name,
                size: FORMAT_BYETS(this.singleFileSource.size, 'en'),
                type: this.singleFileSource.type
            }
        }
        return null;
    }


}