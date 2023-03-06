import { FileModule } from './../file/file.module';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from 'src/user/user.model';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [SequelizeModule.forFeature([Post, User]), FileModule],
})
export class PostModule {}
