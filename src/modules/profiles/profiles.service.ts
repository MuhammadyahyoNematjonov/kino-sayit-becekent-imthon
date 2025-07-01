import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/core/models/profiles.model';
import { User } from 'src/core/models/user.model';
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileService: typeof Profile) {}

  async create(createProfileDto: Required<CreateProfileDto>,avatar_url:string,user_id:string) {
    const status = await this.profileService.findOne({
      where: { user_id: user_id },
    });

    if (status) {
      throw new ConflictException("Ushbu foydalanuvchining profili allaqachon mavjud");
    }

    const data = await this.profileService.create({...createProfileDto,avatar_url,user_id});
    return {
      message: "Profil yaratildi",
      data,
    };
  }

  async findAll() {
    const data = await this.profileService.findAll({
      include: [{ model: User, as: 'mainProfile' }],
    });
    return data;
  }

  async findOne(id: string) {
    const pid = id.trim();
    const data = await this.profileService.findByPk(pid, {
      include: [{ model: User, as: 'mainProfile' }],
    });
    if (!data) throw new NotFoundException("Profil topilmadi");

    return data;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const upID =id.trim();
    const data = await this.profileService.findByPk(id);
    if (!data) throw new NotFoundException("Profil topilmadi");

    await this.profileService.update(updateProfileDto, { where: { id } });

    return {
      message: "Profil yangilandi",
      data: await this.profileService.findByPk(id),
    };
  }

  async remove(id: string) {
    const profile = await this.profileService.findOne({where:{id}});
    if (!profile) throw new NotFoundException("Profil topilmadi");
  
    const avatarFile = profile.avatar_url;
    const filePath = path.join(process.cwd(),'uploads', 'avatar_url', avatarFile);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  
    const count = await this.profileService.destroy({ where: { id } });
    if (!count) throw new NotFoundException("Profil topilmadi");
  
    return {
      message: "Profil o'chirildi",
    };
  }
}
