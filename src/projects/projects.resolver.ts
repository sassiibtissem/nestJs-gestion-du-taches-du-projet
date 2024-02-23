import { User } from './../users/entities/user.entity';

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput, userProject } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return await this.projectsService.createProject(createProjectInput);
  }

  @Mutation(() => Project) // Assuming Project is the type you are returning
  async findById(
    @Args('_id', { type: () => Int }) _id: number,
  ): Promise<Project[]> {
    return await this.projectsService.findProjectById(_id);
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('_id', { type: () => Int }) _id: number) {
    return this.projectsService.findOne(_id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('_id', { type: () => Int }) _id: number,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return await this.projectsService.update(_id, updateProjectInput);
  }

  @Mutation(() => Project)
  async removeProject(@Args('_id', { type: () => Int }) id: number) {
    const removedProject = await this.projectsService.remove(id);
    if (removedProject) {
      return removedProject;
    } else {
      throw new NotFoundException(`project with id ${id} not found`);
    }
  }
  @Query(() => [Project])
  async getProjects() {
    return this.projectsService.getAllProjects();
  }
  // @Mutation(() => Project)
  // async assignTasksToProject(
  // @Args('assignTasksToProjectInput') assignTasksToProjectInput: AssignTasksToProjectInput
  // ): Promise<Project> {
  //   const { _id } = assignTasksToProjectInput;
  //   return this.projectsService.assignTasksToProject(_id);
  // }
  @Query(() => [Project]) // to change to result of join form
  getTasksByProject() {
    return this.projectsService.getTasksToProject();
  }

  // @Query(() => [Project])
  // async getUsersByProject(){ {
  //     let users = await this.projectsService.getAllUsers();
  //     console.log(users,"s")
  //     return users;

  // }
  // }}
  @Query(() => [User])
  async getUsersByProject(
    @Args('projectId', { type: () => ID }) projectId: string,
  ) {
    return this.projectsService.getUsersByProject(projectId);
  }

  @Query(() => [userProject])
  async getUserssss() {
    let users = await this.projectsService.getAllUsersByProject();
    console.log(users, 'users');
    return users;
  }
  @Query(() => [Project])
  async getProject() {
    return this.projectsService.getAllProjects();
  }
}
