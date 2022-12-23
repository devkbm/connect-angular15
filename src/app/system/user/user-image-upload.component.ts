import { inject } from '@angular/core/testing';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';
import { GlobalProperty } from 'src/app/core/global-property';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-image-upload',
  template: `
  <div style="text-align: center;">
    <img nz-image [nzSrc]="imageSrc + pictureFileId" width="100px" height="100px" />
    <br/>
    <nz-space [nzAlign]="'center'">
      <nz-upload
          [nzAction]="upload.url"
          [nzShowUploadList]="false"
          [nzPreview]="handlePreview"
          [nzRemove]="handleRemove"
          [nzWithCredentials]="true"
          [nzData]="upload.data"
          [nzHeaders]="upload.headers"
          [nzFileList]="fileList"
          (nzChange)="fileUploadChange($event)">
          <button nz-button class="upload-button">
            <span nz-icon nzType="upload" class="button-icon"></span>
          </button>
      </nz-upload>
      <button nz-button class="download-button" (click)="downloadImage()">
        <span nz-icon nzType="download" class="button-icon"></span>
      </button>
    </nz-space>
  </div>
  `,
  styles: [`
    .upload-button {
      position: absolute;
      left: 65px;
      top: 76px;

      width: 12px;
      height: 24px;
      /*background-color: darkslategray;*/

      padding-top: -20px;
      text-align: center;
    }

    .download-button {
      position: absolute;
      left: 95px;
      top: 76px;

      width: 12px;
      height: 24px;
      /*background-color: darkslategray;*/

      padding-top: -20px;
    }

    .button-icon {
      position: absolute;
      margin-left: -6px;
      margin-top: -6px;
    }
  `]
})
export class UserImageUploadComponent implements OnInit, OnChanges {

  /*
  uploadUrl: string = GlobalProperty.serverUrl + '/api/system/user/image';
  headers: any = { Authorization: sessionStorage.getItem('token') };
  data: any;
  */

  upload: {url: string, headers: any, data: any} = {
    url: GlobalProperty.serverUrl + '/api/system/user/image',
    headers: { Authorization: sessionStorage.getItem('token') },
    data: null
  }

  previewImage: string | undefined = '';

  imageSrc: string = GlobalProperty.serverUrl + '/static/';

  @Input() imageWidth: string = '150px';
  @Input() imageHeight: string = '200px';
  @Input() pictureFileId: any;
  @Input() userId: string = '';

  /*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }*/
  fileList: NzUploadFile[] = [];

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.upload.data = {userId : changes['userId'].currentValue};
    }
  }

  ngOnInit(): void {
    /*
    this.headers = {
      "Authorization": sessionStorage.getItem('token')
    }
    */
  }

  // 미리보기 버튼 클릭시
  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
  }

  // 삭제버튼 클릭스
  handleRemove = (file: NzUploadFile) => {
    console.log(file);
    return true;
  }

  fileUploadChange(param: NzUploadChangeParam): void {
    if (param.type === 'success') {
      const serverFilePath = param.file.response.data;
      this.pictureFileId = this.findFileName(serverFilePath);
    }
  }

  downloadImage(): void {
    this.userService
        .downloadUserImage(this.userId)
        .subscribe(
          (model: Blob) => {
            const blob = new Blob([model], { type: 'application/octet-stream' });
            saveAs(blob, this.userId + ".jpg");
          }
        );
  }

  private findFileName(path: string): string {
    const names: string[] = path.split("\\");
    return names[names.length-1];
  }



  onclick() {
    //location.href=this.imageSrc + this.imageBase64;
    saveAs(this.imageSrc + this.pictureFileId, 'image.jpg');
  }

}
