
import { User } from './entities/user.entity';

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Users } from './entities/usersSchema';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10; // Vous pouvez ajuster le coût du hachage selon vos besoins

  // hachage de mot de passe

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    
   ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await this.hashPassword(createUserInput.password);

    const newUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword, // Remplace le mot de passe en clair par le mot de passe haché
    });

    return await newUser.save();
  }
  // findAllUser by Id
  async findAllUser(): Promise<User[]> {
    return await this.userModel.find();
  }

  // findOneUser
  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({email}); // Use findById to find a single user by ID
  }

  // function to update User inputs
  async update(
    _id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    try {
      // Utilisez findByIdAndUpdate avec { new: true } pour obtenir le document mis à jour
      const updatedUser = await this.userModel.findByIdAndUpdate(
        _id,
        updateUserInput,
        { new: true },
      );

      // Vérifiez si l'utilisateur a été trouvé et mis à jour
      if (updatedUser) {
        // Vérifiez si le mot de passe a été modifié
        if (updateUserInput.password) {
          // hachage du nouveau mot de passe
          const hashedPassword = await this.hashPassword(
            updateUserInput.password,
          );

          // Mettez à jour le mot de passe dans l'objet d'utilisateur mis à jour
          updatedUser.password = hashedPassword;
        }

        // Sauvegardez l'utilisateur mis à jour
        await updatedUser.save();

        return updatedUser;
      }

      // Gérez le cas où l'utilisateur avec l'ID spécifié n'a pas été trouvé
      return null;
    } catch (error) {
      // Gérez les erreurs potentielles, par exemple, erreurs de validation ou d'accès à la base de données
      console.error(
        "Erreur lors de la mise à jour de l'utilisateur :",
        error.message,
      );
      throw new Error("Erreur lors de la mise à jour de l'utilisateur.");
    }
  }

  async remove(_id: number): Promise<User | null> {
    // Find and delete the user
    const removedUser = await this.userModel.findOneAndDelete({ _id });

    if (removedUser) {
      return removedUser;
    }

    return null; // If user not found
  } 
 async getUserByRole():Promise <User[]>{
 let user = await this.userModel.aggregate([

   { $match: { role:"projectLeader" }  } ,
   { $project:
     {
      "_id" : 1,
      "firstName" : 1,
      "lastName":1
     
    }


  }


    

])
 
  console.log(user, "userrr")
  return user;
 }


 async getDeveloperByRole():Promise <User[]>{
  let user = await this.userModel.aggregate([
 
    { $match: { role:"developer" }  } ,
    { $project:
      {
       "_id" : 1,
       "firstName" : 1,
       "lastName":1
      
     }
 
 
   }
 
 
     
 
 ])
  
   console.log(user, "userrr")
   return user;
  }














}
