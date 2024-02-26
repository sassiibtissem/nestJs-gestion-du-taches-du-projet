import { Tasks } from './entities/taskSchema';
import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/entities/usersSchema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  // creation d'une tache
  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = await this.taskModel.create(createTaskInput); // create an instance of the model
    return await task.save(); // save the instance to the database
  }

  //find all tasks by id
  async findTaskById(_id: number): Promise<Task[]> {
    return await this.taskModel.find({ _id });
  }
  async findTaskByState(state) {
    return await this.taskModel.findOne({ state });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(_id: number, updateTaskInput: UpdateTaskInput) {
    return await this.taskModel.findByIdAndUpdate(
      { _id: updateTaskInput },
      {
        $set: {
          //les champs
          task_name: updateTaskInput.task_name,

          projectId: updateTaskInput.projectId,
          description: updateTaskInput.description,
          start_date: updateTaskInput.start_date,
          estimation_time: updateTaskInput.estimation_time,
          developer_name: updateTaskInput.developer_name,

          state: updateTaskInput.state,
        },
      },
    );
  }

  async remove(_id: number): Promise<Task | null> {
    {
      // find and delete the task;
      const removedTask = await this.taskModel.findOneAndDelete({ _id });
      if (removedTask) {
        return removedTask;
      }
      return null; // if task not found.
    }
  }
  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.aggregate([
      {
        $addFields: {
          projectIdObject: { $toObjectId: '$projectId' }, // Convert projectId to ObjectId
        },
      },

      {
        $lookup: {
          from: 'projects',
          localField: 'projectIdObject',
          foreignField: '_id',
          as: 'projects',
        },
      },

      { $unwind: '$projects' },

      {
        $project: {
          projectId: '$projects._id',
          projectName: '$projects.projectName',
          task_name: 1,
          description: 1,
          start_date: 1,
          estimation_time: 1,
          state: 1,
        },
      },
    ]);
  }
  async getTasksByState(state: string): Promise<Task[]> {
    return await this.taskModel.aggregate([
      { $match: { state: state } }, // Match documents with the specified state
      { $addFields: { projectIdObject: { $toObjectId: '$projectId' } } }, // Convert projectId to ObjectId
      {
        $lookup: {
          from: 'projects',
          localField: 'projectIdObject',
          foreignField: '_id',
          as: 'projects',
        },
      },
      { $unwind: '$projects' },
      {
        $project: {
          projectId: '$projects._id',
          projectName: '$projects.projectName',
          task_name: 1,
          description: 1,
          start_date: 1,
          estimation_time: 1,
          developer_name: 1,
          state: 1,
        },
      },
    ]);
  }

  //get Developer And Project    by   Tasks
  getDeveloperAndProjectbyTasks(): Promise<Task[]> {
    return this.taskModel.aggregate([
      {
        $addFields: {
          projectIdObject: { $toObjectId: '$projectId' }, // Convert projectId to ObjectId
          userIdObject: { $toObjectId: '$userId' }, // Convert userId to ObjectId
        },
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectIdObject',
          foreignField: '_id',
          as: 'project',
        },
      },
      { $unwind: '$project' },
      {
        $project: {
          projectId: '$project._id',
          projectName: '$project.projectName',
          task_name: 1,
          description: 1,
          start_date: 1,
          estimation_time: 1,
          state: 1,
          userIdObject: 1, // Include userIdObject for next lookup stage
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userIdObject',
          foreignField: '_id',
          as: 'developer',
        },
      },
      { $unwind: '$developer' },
      {
        $project: {
          projectId: 1,
          projectName: 1,
          task_name: 1,
          description: 1,
          start_date: 1,
          estimation_time: 1,
          state: 1,
          developerId: '$developer._id',
          developer_name: '$developer.firstName',
        },
      },
    ]);
  }


  //get ALL developper by tasks
  async getAllProjects(): Promise<Task[]> {
    // getAllProjectByUser
    return this.taskModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'developerId',
            foreignField: '_id',
            as: 'userBytask',
          },
        },
        // { $unwind: '$userByProject' },

        // {
        //   $project: {
        //     Id: '$userByProject.userId',
        //     leader_name: '$userByProject.leader_name',
        //     projectName: 1,
        //     subject: 1,
        //     description: 1,
        //     start_date: 1,
        //     end_date: 1,
        //   },
        // },
      ])
      .then((res) => {
        console.log(res, 'join');
        return res;
      })
      .catch((err) => {
        console.log(err, 'error');
        return err;
      });
  }
}
