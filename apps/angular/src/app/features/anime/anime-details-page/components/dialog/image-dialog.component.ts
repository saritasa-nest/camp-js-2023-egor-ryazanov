import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

/** Image dialog data. */
interface ImageDialogData {

	/** Image URL. */
	imageUrl: string;
}

/** Image dialog. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: './image-dialog.component.html',
	styleUrls: ['./image-dialog.component.css'],
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
})
export class ImageDialogComponent {
	public constructor(@Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {}
}