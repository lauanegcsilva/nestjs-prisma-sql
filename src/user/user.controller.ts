import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  // faz Injectable na classe UserController, para usar serviço abaixo
  constructor(private readonly userService: UserService) {}

  @Post() // recebe o body e os dados do corpo da solicitação é do tipo CreateUserDTO
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data); //chama serviço userService com método create e passa dados dto pra ele
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id') // aqui recupera o id com params
  async show(@ParamId() id: number) {
    console.log({ id });

    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    //da pra colocar mais de um decorator aqui
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
