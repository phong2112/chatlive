import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto?.password;

    return await this.userRepository.save(user);
  }

  async findOne(payload: Partial<CreateUserDto>): Promise<User> {
    const listPayloadAttributes =
      Object.keys(payload).map((key) => {
        return {
          [key]: payload[key],
        };
      }) || [];

    return await this.userRepository.findOne({
      where: [...listPayloadAttributes],
    });
  }

  async update(id: string, payload: UpdateUserDto): Promise<any> {
    return await this.userRepository.update(id, {
      ...payload,
    });
  }

  async register(payload: CreateUserDto): Promise<User> {
    const user = await this.findOne({
      username: payload?.username,
      email: payload?.email,
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username or email is already available!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword = await hash(payload.password, 10);
    payload.password = hashedPassword;

    return await this.userRepository.save(payload);
  }
}
