import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto, FilesUploadDtos, FileUploadDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {Response} from "express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { VideoDto } from './dto/video.dto';
import { ListVideoDto } from './dto/list-video.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/upload.service';
import { CloudinaryUploadService } from 'src/shared/cloud-upload.service';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/user/dto/email.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService,
              private readonly cloudinaryService: CloudinaryUploadService,
              private readonly emailService: EmailService
  ) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto,
  @Res() res: Response
): Promise<Response<VideoDto>> {
  let newVideo = await this.videoService.create(createVideoDto);
    return res.status(HttpStatus.CREATED).json(newVideo);
  }
// page , size , keyword <= query
@ApiBearerAuth() //define cho swagger để imprt token vàp header của API 
@UseGuards(AuthGuard('jwt')) // thêm middleware authentication cho API (NestJS) và thêm trước decorator method 

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })

  async findAll(
    @Query('page') page: number , // by default thì query trên swagger sẽ là required
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response 
  ): Promise<Response<ListVideoDto>> {
    // by default các value như query , params , header, .... sẽ có kiểu dữ liệu là String
    // => phải ép kiểu về đúng định dạng
    const formatPage = page ? Number(page) : 1;
    const formatSize = size ? Number(size) : 10;
    let videos = await this.videoService.findAll(formatPage,formatSize,keyword)
    return res.status(HttpStatus.OK).json({videos , page , size});
  }



  @Post ('/upload-thumbnail')
  @ApiConsumes('multipart/form-data')// define kiểu dữ liệu gửi lên swagger
  @ApiBody({
    type: FileUploadDto,
    required: true
  }) // define body trên swagger
  @UseInterceptors(FileInterceptor('hinhAnh', {storage: storage('video')}))
  uploadthumnail(
    @UploadedFile() file: Express.Multer.File,
    @Res() res:Response
  ):any{
    return res.status(HttpStatus.OK).json(file);
  }


  // define api upload single cloud
  @Post ('/upload-thumbnail-cloud')
  @ApiConsumes('multipart/form-data')// define kiểu dữ liệu gửi lên swagger
  @ApiBody({
    type: FileUploadDto,
    required: true
  }) // define body trên swagger
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async uploadThumbnailCloud( 
    @UploadedFile() file: Express.Multer.File,
    @Res() res:Response
  ):Promise<any>{
    try {
      const result = await this.cloudinaryService.uploadImage(file , "video");
      return res.status(HttpStatus.OK).json(result);

    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "upload fail"})
    }
  }





  // upload nhieu img
  @Post ('/upload-multiple-thumbnail')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDtos,
    required: true 
  })
  @UseInterceptors(FilesInterceptor('hinhAnhs', 20, {storage: storage('video')}))
  uploadMultpileThumbnsil(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res:Response
  ): any {
    return res.status(HttpStatus.OK).json(files);
  }
  



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }



  // define api send email
  @Post('/send-email')
  @ApiBody({
    type: EmailDto,
  })
  async sendEmail(
    @Body() body:EmailDto,
    @Res()  res: Response
  ): Promise <any> {
   try {
    // lấy ìnfo {emailTo , subject , text} từ body
    const {emailTo , subject , text} = body;
    // gọi service Email
    await this.emailService.sendEmail(emailTo , subject ,text);
    return res.status(HttpStatus.OK).json({message : "send email success"})



   } catch (error) {
    console.log(error)
   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "send mail fail"})
   } 
  }
}
