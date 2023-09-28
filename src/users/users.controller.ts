import {
    UseInterceptors,
    UploadedFile,
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Res,
    StreamableFile,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { createReadStream } from 'fs'
import { join } from 'path'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    //@UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    async updateUser(
        @Param('id') id: string,
        @Res() res: Response,
        @Body() updateUserDto,
        @UploadedFile() image
    ) {
        console.log(image, 'aaaa')
        const { data, status } = await this.usersService.update(
            id,
            updateUserDto.user
        )
        res.status(status).send(data)
    }

    @Patch('update/avatar/:id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    console.log(req)
                    cb(null, `${req.params.id}.jpg`)
                },
            }),
        })
    )
    async updateAvatar(
        @Param('id') id: string,
        @Res() res: Response
    ) {        res.status(201).send({message: 'Sucesso ao salvar a imagem!'});
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const { data, status } = await this.usersService.findOne(id)
        res.status(status).send(data)
    }

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }
}
