import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly fileService: FileService,
  ) {}

  async createPost(dto: CreatePostDto, image: Express.Multer.File) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
