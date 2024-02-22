import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';

//declaration entity (table)
type ProjectDocument = HydratedDocument<Projects>;

@Schema()
export class Projects {
  @Prop({ nullable: true })
  projectName: string;
  @Prop({ nullable: true })
  subject: string;
  @Prop({ nullable: true })
  description: string;
  @Prop({nullable: true })
  userId: string;
  @Prop({ nullable: true })
  leader_name: string;
  @Prop({ nullable: true })
  start_date: string;
  @Prop({ nullable: true })
  end_date: string;
  @Prop((type) => [Task])
  tasks: string[];
}

//export schema entity
export const ProjectSchema = SchemaFactory.createForClass(Projects);
