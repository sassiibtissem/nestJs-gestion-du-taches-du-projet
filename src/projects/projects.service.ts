import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async createProject(
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    const project = await this.projectModel.create(createProjectInput); // Create an instance of the model
    return await project.save(); // Save the instance to the database
  }
  //find all project by id
  async findProjectById(_id: number): Promise<Project[]> {
    return await this.projectModel.findOne({ _id });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }
  async update(_id: number, updateProjectInput: UpdateProjectInput) {
    return await this.projectModel.findByIdAndUpdate(
      { _id: updateProjectInput },
      {
        $set: {
          //les champs
          projectName: updateProjectInput.projectName,
          subject: updateProjectInput.subject,
          description: updateProjectInput.description,
          leader_name: updateProjectInput.leader_name,
          userId: updateProjectInput.userId,
          start_date: updateProjectInput.start_date,
          end_date: updateProjectInput.end_date,
        },
      },
    );
  }
  async remove(_id: number): Promise<Project | null> {
    {
      // find and delete the project;
      const removedProject = await this.projectModel.findOneAndDelete({ _id });
      if (removedProject) {
        return removedProject;
      }
      return null; // if project not found.
    }
  }
  async getAllProjects(): Promise<Project[]> {
    try {
      const result = await this.projectModel.aggregate([
        {
          $addFields: {
            userIdObject: { $toObjectId: '$userId' }, // Convert userId to ObjectId
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObject',
            foreignField: '_id',
            as: 'userByProject',
          },
        },
        { $unwind: '$userByProject' },  
        {
          $project:{
            "subject":1,
            "description":1,
            "projectName":1,
            "start_date":1,
            "leader_name":"$userByProject.firstName",
            "end_date":1
          }
        }
      ]);

      console.log(result, 'join');
      return result;
    } catch (error) {
      console.error(error, 'error');
      throw error;
    }
  }

  async getTasksToProject() {
    return await this.projectModel
      .aggregate([
        // {

        //   // $match: filter,
        // },
        {
          $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'projectId',
            as: 'tasksByProject',
          },
        },
        //$unwind $unwind	Prend un tableau de documents et les renvoie sous forme de flux de documents.
        { $unwind: '$tasksByProject' },
        //$sort	Prend tous les documents d'entrée et les renvoie dans un flux de documents triés.
        // { $sort: {_id: 1} },

        //$project $project	Remodèle un flux de documents.
        // $projectpeut renommer, ajouter ou supprimer des champs ainsi que créer des valeurs calculées et des sous-documents.
        {
          $project: {
            projectName: '$tasksByProject.projectName',
          },
        },
      ])
      .then((res) => {
        console.log(res, 'jointure');
        return res;
      })
      .catch((err) => {
        console.log(err, 'error from join');
        return err;
      });
  }

  async getAllUsersByProject(): Promise<Project[]> {
    return await this.projectModel
      .aggregate([
      

        {
          $lookup: {
            from: 'users',
            localField: ' userIdObject',
            foreignField: '_id',
            as: 'users',
          },
        },

        // { $unwind: '$users' },

        // {
        //   $project: {
        //     "userId": '$users._id',
        //     "leader_name": '$users.leader_name',
        //     "project_name": 1,
        //     "description": 1,
        //     "subject": 1,
        //     "start_date": 1,
        //     "end_date": 1,
        //   },
        // },
      ])
      .then((res) => {
        console.log(res, 'jointureeeeeeeeeeeeeeeeeee');
        return res;
      })
      .catch((err) => {
        console.log(err, 'error from join');
        return err;
      });
  }

  async getUsersByProject(projectId) {
    const project = await this.projectModel.findById(projectId);

    return project.userId;
  }
}
