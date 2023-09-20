/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
// eslint-disable-next-line prettier/prettier
import { Users } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<{
    success: boolean;
    message: string;
    data?: Users[];
  }> {
    try {
      const users = await this.userService.findAllUsers();
      return {
        success: true,
        message: 'Users found successfully',
        data: users,
      };
    } catch (error) {
      return { success: false, message: 'Failed to retrieve users' };
    }
  }

  

  @Get(':id')
  async findUserById(@Param('id') id: any): Promise<{ message: string; user: Users }> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      return { message: `User found successfully by ID ${id}`, user };
    } catch (error) {  
      console.error(`Error finding user by ID ${id}:`, error);
      throw error; 
    }
  }

  @Post()
  async createUser(@Body() users: Users): Promise<{ message: string; user: Users }> {
    try {
      const createdUser = await this.userService.createUser(users);
      return { message: 'User created successfully', user: createdUser };
    } catch (error) {
      console.error(`Error creating user:`, error);
      throw error;
    }
  }

 
  @Put(':id')
  async updateUser(@Param('id') id: any, @Body() user: Users): Promise<{ message: string; updatedUser: Users }> {
    try {
      const updatedUser = await this.userService.updateUser(id, user);
      if (!updatedUser) {
        throw new Error(`User with ID ${id} not found`);
      }
      console.log(`User updated successfully`);
      return { message: 'User updated successfully', updatedUser };
    } catch (error) {
      console.error(`Error updating user by ID ${id}:`, error);
      throw error;
    }
  }


@Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.userService.deleteUser(id);
      console.log(`User deleted successfully by ID ${id}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(`Error deleting user by ID ${id}:`, error);
      throw error;
    }
  }
}