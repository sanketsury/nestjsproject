/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}



  
  async findAllUsers(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: any): Promise<Users> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async createUser(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: any, user: Users): Promise<Users> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOneById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
