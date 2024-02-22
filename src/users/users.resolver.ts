import { create } from 'domain';

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Users } from './entities/usersSchema';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') CreateUserInput: CreateUserInput) {
    return await this.usersService.create(CreateUserInput);
  }

  @Query(() => [User])
  async findAll() {
    return this.usersService.findAllUser();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => Int }) _id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.update(_id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('_id', { type: () => Int }) id: number) {
    const removedUser = await this.usersService.remove(id);

    if (removedUser) {
      return removedUser;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  @Query(() => [User])
  async getUserss() {
   
      const users = await this.usersService.getUserByRole();
      console.log(users, "users");
      return users;
    } }
