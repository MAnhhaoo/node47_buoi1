
import {Module} from '@nestjs/common';
import {CloudinaryService} from './cloudinary.service';
import {cloudinaryConfig} from "./cloudinary.config";

@Module ({
    providers: [cloudinaryConfig, CloudinaryService],
    exports: [CloudinaryService]
})

export class CloudinaryModule{}