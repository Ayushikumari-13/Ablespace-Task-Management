import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Task,
  TaskDocument,
  TaskStatus,
} from './schemas/task.schema';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    ownerId: string,
  ) {
    if (!ownerId) {
      throw new BadRequestException(
        'User authentication is required.',
      );
    }

    if (!createTaskDto.title?.trim()) {
      throw new BadRequestException(
        'Task title is required.',
      );
    }

    const taskData: {
      title: string;
      description: string;
      status: TaskStatus;
      ownerId: string;
      dueDate?: Date;
    } = {
      title: createTaskDto.title.trim(),
      description:
        createTaskDto.description?.trim() || '',
      status:
        createTaskDto.status ?? TaskStatus.TODO,
      ownerId,
    };

    if (createTaskDto.dueDate) {
      const dueDate = new Date(
        createTaskDto.dueDate,
      );

      if (Number.isNaN(dueDate.getTime())) {
        throw new BadRequestException(
          'Invalid due date.',
        );
      }

      taskData.dueDate = dueDate;
    }

    const task =
      new this.taskModel(taskData);

    return task.save();
  }

  async findAll(
    ownerId: string,
    search?: string,
    status?: TaskStatus,
  ) {
    const filter: Record<string, unknown> = {
      ownerId,
    };

    if (status) {
      filter.status = status;
    }

    if (search?.trim()) {
      const searchText = search.trim();

      filter.$or = [
        {
          title: {
            $regex: searchText,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: searchText,
            $options: 'i',
          },
        },
      ];
    }

    return this.taskModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(
    id: string,
    ownerId: string,
  ) {
    const task = await this.taskModel
      .findOne({
        _id: id,
        ownerId,
      })
      .exec();

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    ownerId: string,
  ) {
    const updateData: Record<
      string,
      unknown
    > = {};

    if (updateTaskDto.title !== undefined) {
      if (!updateTaskDto.title.trim()) {
        throw new BadRequestException(
          'Task title cannot be empty.',
        );
      }

      updateData.title =
        updateTaskDto.title.trim();
    }

    if (
      updateTaskDto.description !==
      undefined
    ) {
      updateData.description =
        updateTaskDto.description.trim();
    }

    if (updateTaskDto.status !== undefined) {
      updateData.status =
        updateTaskDto.status;
    }

    if (
      updateTaskDto.dueDate !==
      undefined
    ) {
      if (!updateTaskDto.dueDate) {
        updateData.dueDate = undefined;
      } else {
        const dueDate = new Date(
          updateTaskDto.dueDate,
        );

        if (
          Number.isNaN(
            dueDate.getTime(),
          )
        ) {
          throw new BadRequestException(
            'Invalid due date.',
          );
        }

        updateData.dueDate =
          dueDate;
      }
    }

    const task =
      await this.taskModel
        .findOneAndUpdate(
          {
            _id: id,
            ownerId,
          },
          updateData,
          {
            new: true,
            runValidators: true,
          },
        )
        .exec();

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    return task;
  }

  async remove(
    id: string,
    ownerId: string,
  ) {
    const task =
      await this.taskModel
        .findOneAndDelete({
          _id: id,
          ownerId,
        })
        .exec();

    if (!task) {
      throw new NotFoundException(
        'Task not found.',
      );
    }

    return {
      message:
        'Task deleted successfully.',
    };
  }
}
