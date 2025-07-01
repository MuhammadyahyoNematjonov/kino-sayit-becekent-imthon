import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/core/types/user';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("User")
@Controller('api')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("users")
    @Roles(UserRole.Admin,UserRole.SuperAdmin)
    @UseGuards(AuthGuard,RolesGuard)
    getAllUsers(){
        return this.userService.findAll()
    }

    @Post("/create/add/admin")
    @Roles(UserRole.SuperAdmin, UserRole.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    AddAdmin(@Body() payload:CreateAdminDto){
        return this.userService.AddAdmin(payload)
    }

    @Delete("/create/delete/:id")
    @Roles(UserRole.SuperAdmin, UserRole.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    delete(@Param("id") id:string){
        return this.userService.delete(id)
    }

    
    @Post("/create/update/:id")
    @Roles(UserRole.SuperAdmin, UserRole.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    update(@Param("id") id:string,@Body() payload:CreateAdminDto){
        return this.userService.update(payload,id)
    }


}
