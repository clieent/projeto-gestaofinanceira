import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Res,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
    
    //@UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    async updateUser(@Param('id') id: string, @Res() res: Response, @Body() updateUserDto) {
        const {data, status} = await this.usersService.update(id, updateUserDto.user)
        console.log(updateUserDto, 'aaaa')
        res.status(status).send(data);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const {data, status} = await this.usersService.findOne(id)
        res.status(status).send(data);
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
