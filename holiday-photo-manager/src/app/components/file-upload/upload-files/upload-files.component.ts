import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo/photo.service';
import ServiceResponse from 'src/app/shared/models/service-response.interface';
import { ErrorModalService } from '../../../services/error/error-modal.service';

@Component({
	selector: 'app-upload-files',
	templateUrl: './upload-files.component.html',
	styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

	message: string = '';
	urls: string[] = [];

	constructor(private photoService: PhotoService,
		private errorModalService: ErrorModalService) { }

	ngOnInit() {
	}

	uploadFile = (files: any, type: number) => {
		if (files.length === 0) {
			return;
		}

		let filesToUpload: File[] = files;
		let formData = new FormData();

		Array.from(filesToUpload).map((file, index) => {
			return formData.append('file' + index, file, file.name);
		});

		this.photoService.upload(formData, type).subscribe(
			{
				next: (response: ServiceResponse) => {

					this.message = response.message;
					this.urls.push(...response.data);
				},
				error: (error: any) => {
					this.errorModalService.show(error.message, error);
				},
				complete() {

				},
			});

	}

}
