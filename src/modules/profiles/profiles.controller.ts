import { Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { Delete } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { UnsupportedMediaTypeException } from "@nestjs/common";
import { UploadedFile } from "@nestjs/common";
import { Req } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { UserRole } from "src/core/types/user";
import { Roles } from "src/core/decorators/roles.decorator";
import { AuthGuard } from "src/core/guards/jwt-guard";
import { RolesGuard } from "src/core/guards/role-guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";
import { ApiConsumes } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Profile")
@Controller("api/profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./uploads/avatar_url",
        filename: (req, file, cb) => {
          const filename = uuidv4() + extname(file.originalname);
          cb(null, filename);
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new UnsupportedMediaTypeException("type jpeg, jpg yoki png bo'lishi kerak"),
            false
          );
        }
        cb(null, true);
      }
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        poster: { type: "string", format: "binary" },
        full_name: { type: "string" },
        gender: { type: "string", enum: ["male", "female"] },
        date_of_birth: { type: "string", format: "date" },
        country: { type: "string" },
        bio: { type: "string" },
        phone: { type: "string" }
      },
      required: ["full_name", "gender"]
    }
  })
  create(@Body() payload: Required<CreateProfileDto>, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
    return this.profilesService.create(payload, file.filename, req["user"].id);
  }

  @Get("all")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get("one/:id")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param("id") id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch("update/:id")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param("id") id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete("delete/:id")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param("id") id: string) {
    return this.profilesService.remove(id);
  }
}
