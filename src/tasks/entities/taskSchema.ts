import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
   


// declaration entity (table)
type TaskDocument = HydratedDocument <Tasks>;

@Schema()
export class Tasks{
  @Prop({})
  projectId:string;
  @Prop({nullable:true})
  projectName:string
  @Prop({nullable:true})
  task_name:string;
  @Prop({nullable:true})
  description:string;
  @Prop({nullable:true})
  start_date:string;
  @Prop({nullable:true})
  estimation_time:string;
  @Prop({nullable:true})
  developer_name:string;
  @Prop({nullable:true})
  developerId:string;
  @Prop({nullable:true})
  state:'To Do' | 'In Progress' | 'Done' | 'StandBy';
}

// export schema entity
export const TaskSchema = SchemaFactory.createForClass(Tasks)